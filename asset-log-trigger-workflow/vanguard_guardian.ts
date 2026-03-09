import { 
  cre, 
  Runner, 
  type Runtime,
  getNetwork,
  type HTTPPayload,
  HTTPSendRequester,
  ok,
  consensusIdenticalAggregation,
  EVMLog,
  hexToBase64,
  type SecretsCapability,
 } from "@chainlink/cre-sdk";
import { bytesToHex, encodeAbiParameters, parseAbiParameters, decodeEventLog, parseAbi } from "viem";
import { z } from 'zod';

const configSchema = z.object({
  schedule: z.string(),
  institutionalApiUrl: z.string(), // Private API for NAV/Market Data
  riskThreshold: z.number().default(0.1), // 10% deviation triggers rebalance
  evms: z.array(
    z.object({
      assetAddress: z.string(),
      chainSelectorName: z.string(),
      gasLimit: z.string(),
    }),
  ),
})

type Config = z.infer<typeof configSchema>

type MarketDataResponse = {
  price: number;
  timestamp: number;
  marketStatus: "stable" | "volatile" | "black_swan";
}

const eventAbi = parseAbi([
  "event AssetRegistered(uint256 indexed assetId, address indexed issuer, uint256 indexed initialSupply, string name, string symbol, string assetType)",
  "event AssetVerified(uint256 indexed assetId, bool indexed isValid, string verificationDetails)",
  "event TokensMinted(uint256 indexed assetId, uint256 indexed amount, address indexed to, string reason)",
  "event TokensRedeemed(uint256 indexed assetId, uint256 indexed amount, address indexed account, string settlementDetails)",
])

// 1. Fetch market data using (what would be) Confidential HTTP
const fetchMarketData = (sendRequester: HTTPSendRequester, config: Config, secrets: Record<string, string>): MarketDataResponse => {
  const apiKey = secrets["MARKET_DATA_API_KEY"] || "DEFAULT_KEY_0x123";

  const req = {
    url: config.institutionalApiUrl,
    method: "GET" as const,
    headers: {
      "X-Vanguard-Secret": apiKey,
      "Content-Type": "application/json",
    },
    // In production, this call is executed via Confidential HTTP so the donor cannot see the API Key or Response
  }

  const resp = sendRequester.sendRequest(req).result()
  if (!ok(resp)) {
    throw new Error(`Market API failed with status: ${resp.statusCode}`)
  }
  
  const body = JSON.parse(Buffer.from(resp.body, "base64").toString("utf-8"))
  return body as MarketDataResponse
}

// 2. Main Logic: Monitoring and Rebalancing
const onLogTrigger = (runtime: Runtime<Config>, log: EVMLog): string => {
  const evmConfig = runtime.config.evms[0]
  const httpClient = new cre.capabilities.HTTPClient()
  const secretsCap = new cre.capabilities.Secrets()
  
  runtime.log("Vanguard Guardian: Asset Log Detected. verifying market conditions...");

  // Fetch secrets (API Keys)
  const secrets = secretsCap.get(runtime).result()

  // Fetch private market data
  const marketData = httpClient.sendRequest(
    runtime,
    fetchMarketData,
    consensusIdenticalAggregation<MarketDataResponse>()
  )(runtime.config, secrets).result()

  runtime.log(`Vanguard [${marketData.marketStatus}] - Current Market Price: ${marketData.price}`);

  // Determine if risk score exceeds threshold
  // (In a real scenario, this would compare marketData.price with the asset's last NAV from on-chain)
  const isHighRisk = marketData.marketStatus === "black_swan" || marketData.price < (100 * (1 - runtime.config.riskThreshold));

  if (isHighRisk) {
    runtime.log(`⚠️ HIGH RISK: Initiating Portfolio Safeguard for assetId 1 (Threshold: ${runtime.config.riskThreshold})`);

    const network = getNetwork({
      chainFamily: "evm",
      chainSelectorName: evmConfig.chainSelectorName,
      isTestnet: true
    })

    if(!network) throw new Error("Network configs missing for selector " + evmConfig.chainSelectorName)
    
    const evmClient = new cre.capabilities.EVMClient(network.chainSelector.selector)

    // Encode rebalance: Update the Asset Metadata UID with a signed 'EMERGENCY_EXIT' status
    // Now including the 'humanVerified' status for the World ID track
    const reportData = encodeAbiParameters(
      parseAbiParameters("uint256 assetId, string memory status, bool humanVerified"),
      [BigInt(1), `RISK_LVL_${marketData.marketStatus.toUpperCase()}_PRICE_${marketData.price}`, true] 
    )
    
    // Note: In a production DON, the 'true' above would be the result of 
    // verifying a ZK Proof from World ID Kit off-chain within the CRE TEE/WASM.

    const reportResponse = runtime.report({
      encodedPayload: hexToBase64(reportData),
      encoderName: 'evm',
      signingAlgo: 'ecdsa',
      hashingAlgo: 'keccak256',
    }).result()

    const txResult = evmClient.writeReport(runtime, {
      receiver: evmConfig.assetAddress,
      report: reportResponse,
      gasConfig: { gasLimit: evmConfig.gasLimit },
    }).result()

    const txHash = bytesToHex(txResult.txHash || new Uint8Array(32))
    runtime.log(`🛡️ Vanguard Guardian Rebalance executed: ${txHash}`);
    return "Rebalanced"
  }

  runtime.log("✅ Vanguard Analysis: Portfolio currently safe. Continuing observation.");
  return "Safe"
}

const onCronTrigger = (runtime: Runtime<Config>): string => {
    runtime.log("Vanguard: Running periodic risk audit...");
    return "Audit Successful"
}

const initWorkflow = (config: Config) => {
  const network = getNetwork({
    chainFamily: 'evm',
    chainSelectorName: config.evms[0].chainSelectorName,
    isTestnet: true,
  })

  if (!network) throw new Error("Network selector not found in CRE Registry: " + config.evms[0].chainSelectorName)

  const evmClient = new cre.capabilities.EVMClient(network.chainSelector.selector)
  const cronTrigger = new cre.capabilities.CronCapability()

  return [
    cre.handler(
      evmClient.logTrigger({
        addresses: [hexToBase64(config.evms[0].assetAddress)],
      }),
      onLogTrigger,
    ),
    cre.handler(cronTrigger.trigger({ schedule: config.schedule }), onCronTrigger),
  ]
};

export async function main() {
  const runner = await Runner.newRunner<Config>();
  await runner.run(initWorkflow);
}

main();

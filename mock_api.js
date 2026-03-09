const http = require('http');

const PORT = 8080;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // Logic: Cycle between 'stable', 'volatile', and 'black_swan' every minute
  // or use query param ?status=XXX
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const statusParam = url.searchParams.get('status');
  
  const now = new Date();
  const minutes = now.getMinutes();
  
  let status = "stable";
  let price = 100 + (Math.random() * 2);
  
  if (statusParam) {
      status = statusParam;
  } else if (minutes % 3 === 1) {
      status = "volatile";
      price = 90 + (Math.random() * 5);
  } else if (minutes % 3 === 2) {
      status = "black_swan";
      price = 50 + (Math.random() * 10);
  }

  const response = {
    price: parseFloat(price.toFixed(2)),
    timestamp: now.getTime(),
    marketStatus: status,
    source: "Mock Institutional Feed"
  };

  runtime_log(`Mock API: Served ${status} at ${price}`);
  res.end(JSON.stringify(response));
});

function runtime_log(msg) {
    console.log(`[${new Date().toISOString()}] ${msg}`);
}

server.listen(PORT, () => {
  console.log(`🚀 Mock Institutional API running at http://localhost:${PORT}`);
  console.log(`Use http://localhost:${PORT}/?status=black_swan to force a rebalance trigger.`);
});

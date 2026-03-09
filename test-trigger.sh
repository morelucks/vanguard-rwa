#!/bin/bash
# Vanguard Trigger Utility

echo "🛡️ Vanguard Guardian Test Script"
echo "------------------------------"

# 1. Check if mock API is running
if ! curl -s http://localhost:8080 > /dev/null; then
  echo "❌ Error: Mock API is not running. Run 'npm run api' first."
  exit 1
fi

# 2. Trigger volatility
echo "1️⃣ Activating VOLATILITY mode..."
curl -s "http://localhost:8080/?status=volatile" > /dev/null
echo "✅ Volatility signal active. CRE should pick this up on next poll."

# 3. Wait a moment
sleep 1

# 4. Trigger Black Swan
echo "2️⃣ Activating BLACK_SWAN mode (Critical Risk)..."
curl -s "http://localhost:8080/?status=black_swan" > /dev/null
echo "⚠️ Black Swan signal active. Rebalancing transaction should be triggered."

echo "------------------------------"
echo "Done. Watch the 'cre workflow simulate' terminal for rebalance output."

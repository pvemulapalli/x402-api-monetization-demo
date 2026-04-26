# x402 API Monetization Demo

APIs today are still gated by API keys, accounts, and subscriptions.

This project demonstrates a different model:

request → HTTP 402 Payment Required → USDC payment → access

It implements real x402 payment enforcement using Base Sepolia and exposes live endpoints that require payment before returning data.

---

## What is implemented

- HTTP 402 Payment Required enforcement at the API layer
- Machine-readable payment instructions returned in response headers
- USDC-based pricing on Base Sepolia
- Two monetized API endpoints:

### 1. `/api/paid/fx`

- Wraps Frankfurter FX rates
- Returns USD exchange rates for EUR, GBP, and INR
- Use case: cross-border commerce, FX comparison, settlement analysis

### 2. `/api/paid/weather`

- Wraps Open-Meteo weather data
- Returns real-time weather for Frisco, TX
- Use case: showing that any Web2 API can become pay-per-call

Note: This project enforces payment requirements but does not yet complete onchain transaction verification.

---

## Why this matters

Most APIs today rely on identity-based access:

- API keys
- user accounts
- billing systems

Agent-driven systems require a different model:

- programmatic discovery
- per-request pricing
- machine-native payment flows

x402 enables APIs to become directly monetizable resources that software and AI agents can pay for dynamically.

This shifts API access from identity to payment.

---

## Example flow

1. Client calls API endpoint  
2. API returns `HTTP 402 Payment Required`  
3. Response includes:
   - price in USDC  
   - network: Base Sepolia  
   - recipient wallet  
4. Client completes payment  
5. Client retries request  
6. API returns data  

---

## Tech stack

- Next.js
- TypeScript
- x402 protocol
- Base Sepolia (EVM testnet)
- USDC (testnet)

---

## Local setup

```bash
npm install
npm run dev
```

Create `.env.local`:

```env
NEXT_PUBLIC_APP_NAME="x402 API Monetization Demo"
X402_PAY_TO="your_wallet_address"
```

---

## Getting a testnet wallet (Base Sepolia / Ethereum Sepolia)

To interact with this project or extend it to complete payments, you will need an EVM-compatible wallet and a testnet address.

### Option 1: Phantom (recommended if you already use it)

1. Install the Phantom wallet browser extension  
2. Create or import a wallet  
3. Enable Ethereum / EVM networks in settings  
4. Switch network to:
   - Base Sepolia (preferred), or  
   - Ethereum Sepolia  

---

### Option 2: MetaMask

1. Install MetaMask extension  
2. Create a wallet  
3. Add Base Sepolia network manually:

Network details:

- Network Name: Base Sepolia  
- RPC URL: https://sepolia.base.org  
- Chain ID: 84532  
- Currency Symbol: ETH  

---

### Get testnet funds

You will need testnet ETH to simulate transactions:

- Use a Sepolia faucet (for ETH)
- Bridge or mint testnet USDC depending on your setup

Note: This project currently enforces payment but does not yet verify onchain transactions.

---

## Testing

Run:

```bash
curl -i http://localhost:3000/api/paid/fx
curl -i http://localhost:3000/api/paid/weather
```

Expected result:

- `HTTP 402 Payment Required`
- Payment instructions returned in headers
- No data returned until payment conditions are met

---

## Live deployment

The project is deployed on Vercel.

Live endpoints enforce real HTTP 402 responses and can be tested directly using curl or any HTTP client.

---

## Next steps

- Add onchain USDC transaction verification  
- Enable client-side payment execution and retry flow  
- Introduce agent-based API discovery and payment  
- Compare traditional API key access vs x402 payment access  

---

## Key takeaway

APIs are evolving from:

API key → authentication → billing system  

to:

request → payment → access  

This is a foundational shift required for agentic commerce and machine-to-machine transactions.
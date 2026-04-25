# x402 API Monetization Demo

This project demonstrates how existing Web2 APIs can be wrapped as machine-payable API products using HTTP 402 Payment Required and USDC testnet payments.

## What this project does

It exposes two x402-protected API endpoints:

1. `/api/paid/fx`
   - Wraps Frankfurter FX rates
   - Use case: cross-border commerce, FX comparison, settlement demos

2. `/api/paid/weather`
   - Wraps Open-Meteo weather data
   - Use case: generic Web2 data monetization

## Why this matters

Traditional API access usually requires API keys, account setup, pricing pages, subscriptions, and manual billing.

x402 changes the model:

request → 402 Payment Required → payment → access

This creates a path for AI agents and software clients to discover, pay for, and consume APIs programmatically.

## Tech stack

- Next.js
- TypeScript
- x402
- Base Sepolia
- USDC testnet payments

## Local setup

```bash
npm install
npm run dev 
```

Create .env.local:
`NEXT_PUBLIC_APP_NAME="x402 API Monetization Demo"`
`X402_PAY_TO="your_wallet_address"`

Test
`curl -i http://localhost:3000/api/paid/fx`
`curl -i http://localhost:3000/api/paid/weather`

Both endpoints should return 402 Payment Required until paid through an x402-compatible client.
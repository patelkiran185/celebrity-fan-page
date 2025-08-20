# Celebrity Fan Messages (Shardeum Unstablenet)

Minimal DApp: Fans pay 0.2 SHM to send a message to a celebrity. On-chain event is used to verify a wallet has sent a message.
- Decentralized platform for paid fan-to-celebrity messaging
- Fans pay SHM to send messages; celebrities can see
- All interactions are verifiable on-chain
- Optional charity integration for social good

## Key Features:
- Fans pay fixed fee to send messages
- Message metadata stored on-chain; full message on IPFS/Arweave
- Smart contract emits event for each message
- Revenue goes to celebrity wallet; optional charity split

## Workflow:
- Celebrity registers and verifies wallet/socials
- Fan selects celebrity, sends message, pays fee
- Smart contract logs event and metadata
- Celebrity views messages in inbox, 
- Public verification via API

## Technical Architecture:
- Solidity smart contract for payments/events/verification
- React frontend: fan dashboard, celebrity inbox, wallet integration
- Node.js/Express backend: event indexing, verification API
- IPFS for message storage; Shardeum for payments/registry

## What we built:
- Connected wallet for fans and celebrities
- Enabled paid message transactions
- Celebrity dashboard displays received transactions/messages

## Prerequisites
- Node 18+ (recommended Node 22 LTS)
- MetaMask
- SHM from Unstablenet faucet

## Setup
1. Create `.env` in project root:
```
PRIVATE_KEY=your_private_key_without_0x_or_with_0x
RPC_URL=https://api-unstable.shardeum.org
CONTRACT_ADDRESS=
PORT=3000
```

2. Install deps (already in package.json):
```
npm install
```

## Compile
```
npm run compile
```
Generates `artifacts/.../CelebrityFanMessages.json` and copies `abi.json` to `backend/` and `frontend/`.

## Deploy (Unstablenet)
```
npm run deploy:unstable
```
Copy the printed address into `.env` as `CONTRACT_ADDRESS` and also replace `REPLACE_WITH_DEPLOYED_ADDRESS` in `frontend/index.html`.

## Run backend (serves frontend + /api/verify)
```
npm run start
```
Open http://localhost:3000

- Send a message (pays 0.2 SHM)
- Verify: GET `/api/verify/<wallet>` returns `{ status: "pass" | "fail", count }`

## Notes
- Network: Shardeum Unstablenet
  - RPC: https://api-unstable.shardeum.org
  - Chain ID: 8080
  - Explorer: https://explorer-unstable.shardeum.org/ 

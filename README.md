# StanleyPOA - A "Build on Base" Showcase Mini App

[![Built on Base](https://img.shields.io/badge/Built%20on-Base-blue?logo=coinbase)](https://base.org)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

StanleyPOA is a production-grade Proof of Attendance (POA) NFT minting application built on the **Base blockchain**.  
This project serves as a comprehensive showcase of modern, user-friendly Web3 development.

This Mini App leverages the full power of Base, including **EIP-5792** standard for batch transactions, **Smart Wallets**, and the **Coinbase Paymaster** to deliver a truly seamless, one-click, gasless mint.

---

## Key Features

### 1. Gasless Transactions (Paymaster)
Leveraging the **Coinbase Paymaster**, this application sponsors all transaction fees for users who connect with a Coinbase Smart Wallet.  
Users can mint their POA token with **zero gas costs**, removing the need to own or spend cryptocurrency to participate.

### 2. One-Click Batch Transactions (EIP-5792)
To showcase the future of wallet UX, this app implements the **EIP-5792 standard**.  
Users with a Smart Wallet can mint their primary POA token and a bonus token in a single atomic transaction.

### 3. Seamless Onboarding (Passkeys & Smart Wallets)
Optimized for the **Coinbase Smart Wallet**, enabling secure onboarding with device biometrics via Passkeys — no seed phrases required.

### 4. Native Social Integration (Farcaster Mini App)
StanleyPOA includes a registered Farcaster Mini App manifest and meta tags, allowing minting directly inside the Farcaster social feed.

### 5. World-Class Frontend
- Framework: **Next.js 14** (App Router)
- Styling: **Tailwind CSS**
- Animations: **Framer Motion**
- UI Components: **Headless UI**, **Lucide React**

### 6. Robust Smart Contract
Secure, gas-efficient **ERC-1155 smart contract** built with Foundry, featuring:
- Minting controls
- Ownership management
- Verified on Basescan

---

## Technology Stack

### Smart Contract (Backend)
- Language: **Solidity**
- Framework: **Foundry**
- Standard: **ERC-1155**
- Dependencies: **OpenZeppelin Contracts**

### Frontend
- Framework: **Next.js 14**
- Language: **TypeScript**
- Styling: **Tailwind CSS**
- Web3 Libraries: **wagmi**, **@coinbase/onchainkit**
- Animations: **Framer Motion**
- UI: **Headless UI**, **Lucide React**
- Deployment: **Vercel**

---

## Getting Started

To run this project locally, you will need two separate terminal windows: one for the **smart contract** and one for the **frontend**.

### 1. Smart Contract Setup

```bash
# Clone the repository
git clone https://github.com/devstanl3y/poa-frontend.git
cd poa-frontend/poa-mini-app

# Install dependencies
forge install

# Set up your environment variables in a .env file
# (See .env.example)

# Compile the contract
forge build

# Deploy to a testnet or mainnet
forge script script/DeployStanleyPOA.s.sol:DeployStanleyPOA \
  --rpc-url $YOUR_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```
Example .env for Smart Contract

```
RPC_URL=https://sepolia.base.org
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_basescan_api_key_here
```

2. Frontend Setup

```
# In a new terminal, navigate to the frontend folder
cd poa-frontend/poa-frontend

# Install dependencies
npm install

# Set up your environment variables in a .env.local file
# (See .env.local.example)

# Run the development server
npm run dev
```

Example .env.local for Frontend

```
NEXT_PUBLIC_BASE_MAINNET_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
NEXT_PUBLIC_MAINNET_PAYMASTER_URL=https://api.developer.coinbase.com/rpc/v1/base/YOUR_PAYMASTER_ID
NEXT_PUBLIC_CDP_PROJECT_ID=your_coinbase_project_id
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_id
NEXT_PUBLIC_SITE_URL=https://your-deployed-site.com
```

## 👨‍💻 Built By

This project was built by **DevStanley**.

- GitHub: [github.com/devstanl3y](https://github.com/devstanl3y)  
- X (Twitter): [@Devstanley1](https://x.com/Devstanley1)  
- Website: [stanleyjinadu.dev](https://stanleyjinadu.dev)


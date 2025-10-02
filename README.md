# StanleyPOA - A "Build on Base" Showcase Mini App

StanleyPOA is a production-grade Proof of Attendance (POA) NFT minting application built on the **Base blockchain**.  
This project serves as a comprehensive showcase of modern, user-friendly Web3 development.

This Mini App leverages the full power of Base, including **EIP-5792** standard for batch transactions, **Smart Wallets**, and the **Coinbase Paymaster** to deliver a truly seamless, one-click, gasless mint.

---

## ✨ Key Features

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

## 🛠️ Technology Stack

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

## 🚀 Getting Started

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

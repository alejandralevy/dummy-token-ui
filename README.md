# 💸 Dummy Token UI + Smart Contract

A simple dApp to connect your wallet, view your balance, and transfer a custom dummy token — built in using a dummy token contract provided by Decentraland + Decentraland UI.

This repo includes both the UI and the dummy token contract to help you run everything locally faster 🚀

## ⚙️ Step 1: Run the Token Contract Locally

### 1.1. Install dependencies

```bash
cd dummy-ui/dummy-token
npm install
```

### 1.2. Start the local Ethereum node

```bash
npx hardhat node --hostname 0.0.0.0
```

### 1.3. Deploy the contract

In another terminal:

```bash
npx hardhat --network localhost run scripts/deploy.js
```

Copy the token address printed in the console — e.g.:

```
Token deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### 1.4. Use the faucet to get tokens and ETH

```bash
npx hardhat --network localhost faucet <token-address> <your-metamask-address>
```

✅ Replace:

- `<token-address>` with the one from the previous step
- `<your-metamask-address>` with your wallet address

---

## 🔌 Step 2: Connect MetaMask to Localhost

1. Open MetaMask → Settings → Networks → **Add Network**
2. Fill in:
   - **Network Name**: `Localhost 8545`
   - **New RPC URL**: `http://localhost:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: `ETH`
3. Save and switch to this network

📸 _Image placeholder — add screenshot here_

---

## 🪙 Step 3: Add the Dummy Token to MetaMask

1. In MetaMask, click **Import Tokens**
2. Paste the token address from step 1.3
3. Click **Add Custom Token** and confirm

📸 _Image placeholder — add screenshot here_

---

## 🖥️ Step 4: Run the Frontend

### 4.1. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and paste your deployed token address:

```env
VITE_TOKEN_ADDRESS=0xYourTokenAddressHere
```

### 4.2. Install and run the app

```bash
npm install
npm start
```

Visit 👉 [http://localhost:3000](http://localhost:3000)

---

## 🦊 Need a Wallet?

Create a MetaMask wallet in just a few steps:

1. Go to [metamask.io](https://metamask.io/) and install the extension
2. Click **Create a wallet**
3. Choose a password
4. Save your recovery phrase somewhere safe
5. Done! You're ready to go 🎉

---

Feel free to fork or adapt this for your own Web3 projects 💻✨

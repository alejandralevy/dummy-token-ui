# 💸 Dummy Token UI + Smart Contract

A simple dApp to connect your wallet, view your balance, and transfer a custom dummy token — built in using a dummy token contract provided by Decentraland + Decentraland UI.

This repo includes both the UI and the dummy token contract to help you run everything locally faster 🚀

## ⚙️ Step 1: Run the Token Contract Locally

### 1.1. Install dependencies

```bash
cd dummy-token-ui/dummy-token
npm install
```

### 1.2. Start the local Ethereum node

```bash
npx hardhat node --hostname 0.0.0.0
```
Keep this terminal open!

### 1.3. Deploy the contract

In another terminal:

```bash
npx hardhat --network localhost run scripts/deploy.js
```

Copy the token address printed in the console:

<img width="877" alt="Screenshot 2025-03-24 at 16 09 35" src="https://github.com/user-attachments/assets/185d7d85-066e-4b5e-8d64-a901a6533dae" />

### 1.4. Use the faucet to add ETH and DUMMY tokens to your wallet

```bash
npx hardhat --network localhost faucet <token-address> <your-metamask-address>
```

✅ Replace:

- `<token-address>` with the one from the previous step
- `<your-metamask-address>` with your wallet address

ℹ️ Do you need a Metamask wallet? Go to the end of the file where I explain you how to get one, it's very easy :)

---

## 🔌 Step 2: Connect MetaMask to Localhost

1. Open MetaMask extension and click on the top left corner => Select a network

<img width="357" alt="Screenshot 2025-03-24 at 17 20 22" src="https://github.com/user-attachments/assets/1a3d9bbe-ca46-49a6-b5a5-e828306669ff" />

3. Click on "+ Add custom network
<img width="354" alt="Screenshot 2025-03-24 at 16 12 04" src="https://github.com/user-attachments/assets/bcd65784-275f-4329-a930-f225d612ef1c" />

5. Fill in:
   - **Network Name**: `Localhost 8545`
   - **New RPC URL**: `http://localhost:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: `ETH`
6. Save and switch to this network

---

## 🪙 Step 3: Add the Dummy Token to MetaMask

1. In MetaMask, click **Import Tokens**
<img width="353" alt="Screenshot 2025-03-24 at 16 13 39" src="https://github.com/user-attachments/assets/e73204fc-ad32-419d-9355-2213180a1995" />

2. Paste the token address from step 1.3

<img width="337" alt="Screenshot 2025-03-24 at 16 18 12" src="https://github.com/user-attachments/assets/24dff0f1-1fad-40e9-8d09-22dadb30f845" />

3. Click **Next** and confirm

After running the ethereum node, deploying the token, setting your Metamask account, transfer tokens to the account and changing to the localhost network, you
d see something like this on your wallet.

<img width="364" alt="Screenshot 2025-03-24 at 17 22 46" src="https://github.com/user-attachments/assets/7d8c1015-425b-4a49-a269-718ee594d14b" />

---

## 🖥️ Step 4: Run the Frontend

### 4.1. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and paste the deployed token address (the one that you copied on step 1.3

```env
VITE_TOKEN_ADDRESS=0x...
```

### 4.2. Install and run the app

```bash
npm install
npm start
```

Open [http://localhost:5173/](http://localhost:5173/) and you should see your wallet running there :)

<img width="647" alt="Screenshot 2025-03-24 at 17 25 54" src="https://github.com/user-attachments/assets/55a088d4-e96b-43a8-91ae-fdbe4e58e300" />

---

## 🦊 Need a Wallet?

Create a MetaMask wallet in just a few steps:

1. Go to [metamask.io](https://metamask.io/download) and install the extension
2. Click **Create a wallet**
3. Choose a password
4. Save your recovery phrase somewhere safe
5. Done! You're ready to go.


---

Feel free to reach me in case of any issues or doubts to: alelevy15@gmail.com 💻✨

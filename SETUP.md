# Bookwarm Setup Instructions

## Prerequisites
- Node.js v16 or v18 (v21 is not supported by Hardhat)
- MetaMask wallet extension installed in your browser
- Git installed

## Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Hardhat Globally (Optional)**
   ```bash
   npm install -g hardhat
   ```

3. **Compile Smart Contracts**
   ```bash
   npx hardhat compile
   ```

4. **Run Tests**
   ```bash
   npx hardhat test
   ```

5. **Start Local Blockchain**
   ```bash
   npx hardhat node
   ```
   Keep this terminal open - this runs your local blockchain.

6. **Deploy Contracts (In a new terminal)**
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

7. **Start React Frontend**
   ```bash
   npm start
   ```

## Important Notes

1. **MetaMask Setup**: 
   - Add localhost network to MetaMask
   - Network Name: Localhost 8545
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337
   - Currency Symbol: ETH

2. **Import Test Account**:
   Use the private key from the hardhat node output to import a test account with ETH.

3. **Contract Address**: 
   After deployment, update the contract address in `src/config.json` if needed.

## Common Issues Fixed

1. ✅ Missing ethers dependency
2. ✅ Inconsistent price data types in items.json
3. ✅ Hardhat configuration issues
4. ✅ Contract address configuration
5. ✅ Typo in mythology category filtering
6. ✅ Error handling for wallet connections
7. ✅ Config file naming mismatch

## Available Scripts

- `npm start` - Runs the React development server
- `npm test` - Runs React tests
- `npm run build` - Builds the React app for production
- `npx hardhat compile` - Compiles smart contracts
- `npx hardhat test` - Runs smart contract tests
- `npx hardhat node` - Starts local blockchain
- `npx hardhat run scripts/deploy.js --network localhost` - Deploys contracts

## Troubleshooting

If you encounter issues:

1. **Node.js Version**: Make sure you're using Node.js v16 or v18
2. **MetaMask**: Ensure MetaMask is connected to the localhost network
3. **Hardhat**: If you get "non-local installation" error, install hardhat locally
4. **Dependencies**: Run `npm install` to ensure all dependencies are installed
5. **Port Conflicts**: Make sure ports 3000 and 8545 are not in use

## Project Structure

```
Bookwarm/
├── contracts/          # Smart contracts
├── scripts/           # Deployment scripts
├── test/             # Smart contract tests
├── src/              # React frontend
│   ├── components/   # React components
│   ├── abis/        # Contract ABIs
│   └── items.json   # Product data
├── public/           # Static files
└── package.json     # Dependencies
```

# Deploying Bookwarm to Vercel - Complete Guide

## 🚀 Overview
Deploying a blockchain project to Vercel requires special consideration since it has both React frontend and Hardhat backend components.

## 📋 Prerequisites
- Vercel account (free at https://vercel.com)
- GitHub repository with your code (✅ Already done!)
- Vercel CLI installed

## 🔧 Step 1: Prepare Your Project for Deployment

### 1.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 1.2 Update package.json for Vercel
Add these scripts to your package.json:
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "vercel-build": "npm run build"
  }
}
```

### 1.3 Create vercel.json Configuration
Create a `vercel.json` file in your project root:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "GENERATE_SOURCEMAP": "false"
  }
}
```

## 🌐 Step 2: Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)

1. **Connect to Vercel**:
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Select your `Bookwarm` repository

2. **Configure Build Settings**:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete

### Option B: Deploy via CLI

1. **Login to Vercel**:
   ```bash
   vercel login
   ```

2. **Deploy from project directory**:
   ```bash
   cd c:\Bookwarm\Bookwarm
   vercel
   ```

3. **Follow prompts**:
   - Link to existing project? No
   - Project name: bookwarm
   - Directory: ./
   - Want to override settings? No

## ⚠️ Important Considerations for Blockchain Projects

### 1. **Smart Contract Deployment**
Your Vercel deployment will only host the React frontend. For full functionality:

- **Local Development**: Use `npx hardhat node` locally
- **Testnet Deployment**: Deploy contracts to Sepolia, Goerli, or Polygon testnet
- **Mainnet**: Deploy to Ethereum mainnet (costs real ETH)

### 2. **Update Contract Configuration**
You'll need to update your contract addresses in `src/config.json`:

```json
{
  "11155111": {
    "bookwarm": {
      "address": "YOUR_SEPOLIA_CONTRACT_ADDRESS"
    }
  },
  "137": {
    "bookwarm": {
      "address": "YOUR_POLYGON_CONTRACT_ADDRESS"
    }
  }
}
```

### 3. **Environment Variables**
Add these to Vercel dashboard:
- `REACT_APP_ALCHEMY_KEY` (if using Alchemy)
- `REACT_APP_INFURA_KEY` (if using Infura)

## 🔄 Step 3: Deploy Smart Contracts to Testnet

### 3.1 Update hardhat.config.js
```javascript
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

module.exports = {
  solidity: '0.8.9',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk',
      }
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

### 3.2 Deploy to Sepolia Testnet
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 3.3 Update config.json with new address
Update `src/config.json` with the deployed contract address.

## 🎯 Step 4: Update Frontend for Production

### 4.1 Modify App.js for Multiple Networks
```javascript
const loadBlockchainData = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    
    // Check if contract exists for this network
    if (!config[network.chainId]?.bookwarm?.address) {
      alert('Contract not deployed on this network. Please switch to Sepolia testnet.');
      return;
    }
    
    const dappazon = new ethers.Contract(
      config[network.chainId].bookwarm.address,
      ABI,
      provider
    );
    setDappazon(dappazon);
    
    // Rest of your code...
  } catch (error) {
    console.error('Error loading blockchain data:', error);
  }
};
```

## 🚀 Step 5: Final Deployment

1. **Push changes to GitHub**:
   ```bash
   git add .
   git commit -m "🚀 Prepare for Vercel deployment"
   git push origin main
   ```

2. **Vercel will auto-deploy** from GitHub

3. **Your live URL**: `https://bookwarm-your-username.vercel.app`

## 📋 Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] MetaMask connection works
- [ ] Contract interaction works (if deployed to testnet)
- [ ] All links and features functional
- [ ] Social media links work
- [ ] Email contact works
- [ ] Responsive design works

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Sepolia Testnet**: https://sepolia.dev/
- **Sepolia Faucet**: https://sepoliafaucet.com/
- **Polygon Testnet**: https://mumbai.polygonscan.com/

## 🎉 Congratulations!
Your Bookwarm project will be live on Vercel! 🚀

Remember: The deployed version will be frontend-only unless you also deploy contracts to a public testnet/mainnet.

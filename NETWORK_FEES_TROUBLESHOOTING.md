# Network Fees Issue - Troubleshooting Guide

## Problem: Transaction fails with "network fees alert"

This typically happens due to one of these issues:

## 🔧 Quick Solutions

### 1. **Check MetaMask Network**
- Ensure you're connected to "Localhost 8545" network
- Network should show Chain ID: 31337
- If not connected, add the network:
  - Network Name: `Localhost 8545`
  - RPC URL: `http://127.0.0.1:8545`
  - Chain ID: `31337`
  - Currency Symbol: `ETH`

### 2. **Check Account Balance**
- You need ETH for both the book price AND gas fees
- Open MetaMask and check your balance
- If balance is low, import a test account from Hardhat node

### 3. **Import Test Account from Hardhat**
1. Look at your Hardhat node terminal window
2. Copy one of the private keys shown (they start with `0x`)
3. In MetaMask: Account menu → Import Account → Private Key
4. Paste the private key
5. This account will have 10,000 ETH for testing

### 4. **Restart Services if Needed**
```powershell
# Terminal 1 - Stop and restart Hardhat node
Ctrl+C
npx hardhat node

# Terminal 2 - Redeploy contracts
npx hardhat run scripts/deploy.js --network localhost

# Terminal 3 - Restart React app
Ctrl+C
npm start
```

## 🛠️ Advanced Troubleshooting

### Check Gas Price Settings
The updated code now:
- ✅ Estimates gas automatically
- ✅ Sets reasonable gas price (20 gwei)
- ✅ Adds 10% buffer to gas estimate
- ✅ Checks balance before transaction
- ✅ Provides detailed error messages

### Manual Gas Configuration
If you still have issues, try these MetaMask settings:
1. Click "Advanced" in the transaction popup
2. Set Gas Limit: `300000`
3. Set Gas Price: `20` (in gwei)

## 🔍 Common Error Messages & Solutions

### "Insufficient funds"
- **Solution**: Import a test account from Hardhat node
- **Check**: Balance should be > book price + 0.01 ETH for gas

### "Transaction rejected by user"
- **Solution**: Click "Confirm" in MetaMask popup
- **Check**: Don't close MetaMask popup too quickly

### "Network mismatch"
- **Solution**: Switch to Localhost 8545 network in MetaMask
- **Check**: Chain ID should be 31337

### "Item out of stock"
- **Solution**: Choose a different book or restart the application
- **Check**: Stock count in the UI

## 📊 Testing Your Setup

### 1. Check Network Connection
```javascript
// Open browser console (F12) and run:
window.ethereum.request({ method: 'eth_chainId' })
// Should return: "0x7a69" (which is 31337 in hex)
```

### 2. Check Account Balance
```javascript
// In browser console:
window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
// Should return a large number (not "0x0")
```

### 3. Test Transaction
- Try buying the cheapest book first (usually 0.01 ETH)
- Check console for detailed error messages
- Verify gas estimation is working

## 🎯 Expected Behavior After Fix

1. **Click "Buy Now"** → MetaMask popup appears
2. **See gas estimate** → Usually 200k-300k gas units
3. **See total cost** → Book price + gas fees
4. **Click "Confirm"** → Transaction processes
5. **Success message** → "Purchase successful!"

## 📋 Pre-Transaction Checklist

- [ ] MetaMask connected to Localhost 8545
- [ ] Account has sufficient ETH balance
- [ ] Hardhat node is running
- [ ] Contracts are deployed
- [ ] React app is running on localhost:3000
- [ ] Book has stock available

## 🆘 If All Else Fails

1. **Close all terminals and VS Code**
2. **Restart in this order**:
   ```powershell
   # Terminal 1
   cd c:\Bookwarm\Bookwarm
   npx hardhat node
   
   # Terminal 2 (new window)
   cd c:\Bookwarm\Bookwarm
   npx hardhat run scripts/deploy.js --network localhost
   
   # Terminal 3 (new window)
   cd c:\Bookwarm\Bookwarm
   npm start
   ```
3. **Reset MetaMask**: Settings → Advanced → Reset Account
4. **Re-import test account** from Hardhat node

The updated code should now handle network fees much more reliably! 🚀

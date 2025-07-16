# Node.js Version Setup for Windows

## Current Issue
You're using Node.js v21.7.2, but Hardhat requires Node.js v16 or v18 for proper functionality.

## Solution Options

### Option 1: Install nvm-windows (Recommended)

1. **Download nvm-windows**:
   - Go to: https://github.com/coreybutler/nvm-windows/releases
   - Download the latest `nvm-setup.zip`
   - Extract and run `nvm-setup.exe` as Administrator

2. **After installation, restart your PowerShell and run**:
   ```powershell
   nvm install 18.17.0
   nvm use 18.17.0
   ```

3. **Verify the installation**:
   ```powershell
   node --version
   npm --version
   ```

### Option 2: Direct Node.js Installation

1. **Download Node.js v18**:
   - Go to: https://nodejs.org/en/download/
   - Download Node.js v18.17.0 LTS
   - Install it (this will replace your current Node.js)

2. **Verify installation**:
   ```powershell
   node --version
   npm --version
   ```

### Option 3: Use Volta (Alternative Node Manager)

1. **Install Volta**:
   ```powershell
   winget install Volta.Volta
   ```

2. **Install Node.js 18**:
   ```powershell
   volta install node@18
   ```

## After Installing Node.js v18

1. **Reinstall project dependencies**:
   ```powershell
   npm install
   ```

2. **Compile contracts**:
   ```powershell
   npx hardhat compile
   ```

3. **Run tests**:
   ```powershell
   npx hardhat test
   ```

4. **Start local blockchain**:
   ```powershell
   npx hardhat node
   ```

5. **Deploy contracts** (in new terminal):
   ```powershell
   npx hardhat run scripts/deploy.js --network localhost
   ```

6. **Start React app**:
   ```powershell
   npm start
   ```

## Quick Manual Setup (If you can't install nvm)

If you can't install nvm-windows, you can:

1. Uninstall current Node.js from Control Panel
2. Download and install Node.js v18.17.0 from nodejs.org
3. Restart your terminal/PowerShell
4. Continue with the project setup

## Verification Commands

After installing Node.js v18, run these to verify everything works:

```powershell
node --version          # Should show v18.x.x
npm --version           # Should show compatible npm version
npx hardhat --version   # Should work without warnings
```

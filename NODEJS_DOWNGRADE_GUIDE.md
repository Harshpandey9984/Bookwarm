# Node.js Version Downgrade Guide (Windows)

## Current Situation
- Node.js v21.7.2 is installed but not in PATH
- Node.js v18 installer detected the newer version
- Need to properly downgrade to v18 for Hardhat compatibility

## Solution Steps

### Option 1: Uninstall and Reinstall (Recommended)

1. **Uninstall Current Node.js**:
   - Open "Add or Remove Programs" in Windows Settings
   - Search for "Node.js" 
   - Click "Uninstall"
   - Restart your computer

2. **Install Node.js v18.17.0 LTS**:
   - Download from: https://nodejs.org/en/download/
   - Select "18.17.0 LTS" (not the latest)
   - Install with default settings
   - Restart PowerShell

3. **Verify Installation**:
   ```powershell
   node --version    # Should show v18.17.0
   npm --version     # Should show compatible version
   ```

### Option 2: Use Chocolatey Package Manager

1. **Install Chocolatey** (if not installed):
   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

2. **Uninstall current Node.js**:
   ```powershell
   choco uninstall nodejs -y
   ```

3. **Install Node.js v18**:
   ```powershell
   choco install nodejs --version=18.17.0 -y
   ```

4. **Restart PowerShell and verify**:
   ```powershell
   node --version
   ```

### Option 3: Manual PATH Configuration

If Node.js v18 is installed but not in PATH:

1. **Find Node.js installation**:
   - Check: `C:\Program Files\nodejs\`
   - Or: `C:\Program Files (x86)\nodejs\`

2. **Add to System PATH**:
   - Windows + R → `sysdm.cpl` → Advanced → Environment Variables
   - Edit "Path" in System Variables
   - Add Node.js installation path
   - Restart PowerShell

### Option 4: Use Portable Node.js

1. **Download Node.js v18 Portable**:
   - Go to: https://nodejs.org/dist/v18.17.0/
   - Download `node-v18.17.0-win-x64.zip`
   - Extract to `C:\nodejs18\`

2. **Add to PATH temporarily**:
   ```powershell
   $env:PATH = "C:\nodejs18;$env:PATH"
   node --version
   ```

3. **Make permanent**: Add `C:\nodejs18` to System PATH

## Quick Test Commands

After successful installation:

```powershell
# Verify versions
node --version          # Should be v18.17.0
npm --version           # Should be compatible

# Test project
cd c:\Bookwarm\Bookwarm
npm install
npx hardhat compile
```

## Important Notes

- **Always restart PowerShell** after Node.js installation
- **Close VS Code** and restart it after Node.js changes
- **Use Node.js v18.17.0 LTS** specifically for best Hardhat compatibility
- **Avoid Node.js v20+ and v21+** as they have known issues with Hardhat

## Next Steps After Node.js v18 Works

1. Navigate to project: `cd c:\Bookwarm\Bookwarm`
2. Install dependencies: `npm install`
3. Compile contracts: `npx hardhat compile`
4. Run tests: `npx hardhat test`
5. Start blockchain: `npx hardhat node`
6. Deploy contracts: `npx hardhat run scripts/deploy.js --network localhost`
7. Start React app: `npm start`

Choose the option that works best for your system!

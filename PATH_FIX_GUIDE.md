# URGENT: Node.js and npm Path Issue Fix

## Current Problem
- Node.js and npm are not found in PATH
- This happened during the nvm-windows installation attempt

## Immediate Solution

### Step 1: Restart PowerShell as Administrator
Close current PowerShell and open a new one as Administrator

### Step 2: Check if Node.js is still installed
```powershell
Get-Command node -ErrorAction SilentlyContinue
Get-Command npm -ErrorAction SilentlyContinue
```

### Step 3: If Node.js is not found, reinstall it
1. Download Node.js v18.17.0 LTS from: https://nodejs.org/en/download/
2. Install it with default settings
3. Restart PowerShell

### Step 4: Verify installation
```powershell
node --version
npm --version
```

### Step 5: Navigate back to project and continue
```powershell
cd c:\Bookwarm\Bookwarm
npm install
```

## Alternative: Manual PATH Fix

If Node.js is installed but not in PATH:

1. **Find Node.js installation**:
   ```powershell
   Get-ChildItem -Path "C:\Program Files\nodejs" -ErrorAction SilentlyContinue
   Get-ChildItem -Path "C:\Program Files (x86)\nodejs" -ErrorAction SilentlyContinue
   ```

2. **Add to PATH temporarily**:
   ```powershell
   $env:PATH += ";C:\Program Files\nodejs"
   ```

3. **Test**:
   ```powershell
   node --version
   npm --version
   ```

## Quick Recovery Steps

1. **Close this PowerShell window**
2. **Open new PowerShell as Administrator**
3. **Run**: `node --version` and `npm --version`
4. **If they don't work**: Download and install Node.js v18.17.0 from nodejs.org
5. **After installation works**: Navigate to project and run `npm install`

## Next Steps After Node.js Works

```powershell
cd c:\Bookwarm\Bookwarm
npm install
npx hardhat compile
npx hardhat test
```

## Important Notes

- Always use Node.js v18.x for this project
- If you install nvm-windows successfully later, you can use it to manage versions
- The project should work fine once Node.js v18 is properly installed and in PATH

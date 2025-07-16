# Create a backup of the original package.json
Copy-Item package.json package.dev.json

# Copy production package.json for deployment
Copy-Item package.production.json package.json

# Install only production dependencies
npm install --only=production

# Build the project
npm run build

# Restore original package.json
Copy-Item package.dev.json package.json

Write-Host "Production build completed successfully!" -ForegroundColor Green

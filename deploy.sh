#!/bin/bash

# Create a backup of the original package.json
cp package.json package.dev.json

# Copy production package.json for deployment
cp package.production.json package.json

# Install only production dependencies
npm install --only=production

# Build the project
npm run build

# Restore original package.json
cp package.dev.json package.json

echo "Production build completed successfully!"

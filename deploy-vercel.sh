#!/bin/bash

# Bookwarm Vercel Deployment Script

echo "🚀 Deploying Bookwarm to Vercel..."

# Step 1: Install Vercel CLI (if not already installed)
echo "📦 Installing Vercel CLI..."
npm install -g vercel

# Step 2: Build the project
echo "🔨 Building the project..."
npm run build

# Step 3: Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete! Check your Vercel dashboard for the live URL."
echo "🔗 Your project will be available at: https://bookwarm-[username].vercel.app"

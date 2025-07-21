import React from 'react';
import './BlockchainLogo.css';

const BlockchainLogo = () => {
  return (
    <div className="futuristic-blockchain-logo">
      {/* Main Logo Container */}
      <div className="logo-container">
        {/* Animated Blockchain Network */}
        <svg className="blockchain-network" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* Background Glow */}
          <defs>
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1"/>
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background Circle */}
          <circle 
            cx="100" 
            cy="100" 
            r="90" 
            fill="url(#glowGradient)" 
            opacity="0.3"
            className="bg-pulse"
          />
          
          {/* Central Hub - Book Symbol */}
          <g className="central-hub">
            <circle cx="100" cy="100" r="20" fill="#00f5ff" opacity="0.8" filter="url(#glow)"/>
            <text x="100" y="110" textAnchor="middle" fill="#0a0a0f" fontSize="20" fontWeight="bold">📚</text>
          </g>
          
          {/* Blockchain Nodes */}
          <g className="blockchain-nodes">
            {/* Node 1 - Top */}
            <circle cx="100" cy="40" r="12" fill="#7c3aed" opacity="0.9" className="node node-1"/>
            <text x="100" y="47" textAnchor="middle" fill="white" fontSize="12">⛓️</text>
            
            {/* Node 2 - Top Right */}
            <circle cx="160" cy="70" r="10" fill="#f59e0b" opacity="0.9" className="node node-2"/>
            <text x="160" y="76" textAnchor="middle" fill="white" fontSize="10">🔗</text>
            
            {/* Node 3 - Right */}
            <circle cx="160" cy="130" r="10" fill="#10b981" opacity="0.9" className="node node-3"/>
            <text x="160" y="136" textAnchor="middle" fill="white" fontSize="10">💎</text>
            
            {/* Node 4 - Bottom Right */}
            <circle cx="130" cy="170" r="10" fill="#ef4444" opacity="0.9" className="node node-4"/>
            <text x="130" y="176" textAnchor="middle" fill="white" fontSize="10">🌐</text>
            
            {/* Node 5 - Bottom */}
            <circle cx="100" cy="180" r="12" fill="#00f5ff" opacity="0.9" className="node node-5"/>
            <text x="100" y="187" textAnchor="middle" fill="white" fontSize="12">🔐</text>
            
            {/* Node 6 - Bottom Left */}
            <circle cx="70" cy="170" r="10" fill="#7c3aed" opacity="0.9" className="node node-6"/>
            <text x="70" y="176" textAnchor="middle" fill="white" fontSize="10">📖</text>
            
            {/* Node 7 - Left */}
            <circle cx="40" cy="130" r="10" fill="#f59e0b" opacity="0.9" className="node node-7"/>
            <text x="40" y="136" textAnchor="middle" fill="white" fontSize="10">⚡</text>
            
            {/* Node 8 - Top Left */}
            <circle cx="40" cy="70" r="10" fill="#10b981" opacity="0.9" className="node node-8"/>
            <text x="40" y="76" textAnchor="middle" fill="white" fontSize="10">🚀</text>
          </g>
          
          {/* Connection Lines */}
          <g className="connections" stroke="#00f5ff" strokeWidth="2" opacity="0.6">
            <line x1="100" y1="80" x2="100" y2="40" className="connection connection-1"/>
            <line x1="120" y1="90" x2="160" y2="70" className="connection connection-2"/>
            <line x1="120" y1="110" x2="160" y2="130" className="connection connection-3"/>
            <line x1="110" y1="130" x2="130" y2="170" className="connection connection-4"/>
            <line x1="100" y1="120" x2="100" y2="180" className="connection connection-5"/>
            <line x1="90" y1="130" x2="70" y2="170" className="connection connection-6"/>
            <line x1="80" y1="110" x2="40" y2="130" className="connection connection-7"/>
            <line x1="80" y1="90" x2="40" y2="70" className="connection connection-8"/>
          </g>
          
          {/* Data Flow Particles */}
          <g className="data-particles">
            <circle r="3" fill="#00f5ff" opacity="0.8" className="particle particle-1">
              <animateMotion dur="3s" repeatCount="indefinite">
                <path d="M100,80 L100,40"/>
              </animateMotion>
            </circle>
            <circle r="2" fill="#7c3aed" opacity="0.8" className="particle particle-2">
              <animateMotion dur="4s" repeatCount="indefinite">
                <path d="M120,90 L160,70"/>
              </animateMotion>
            </circle>
            <circle r="2" fill="#f59e0b" opacity="0.8" className="particle particle-3">
              <animateMotion dur="3.5s" repeatCount="indefinite">
                <path d="M120,110 L160,130"/>
              </animateMotion>
            </circle>
            <circle r="3" fill="#10b981" opacity="0.8" className="particle particle-4">
              <animateMotion dur="4.5s" repeatCount="indefinite">
                <path d="M100,120 L100,180"/>
              </animateMotion>
            </circle>
          </g>
        </svg>
        
        {/* Logo Text Overlay */}
        <div className="logo-text-overlay">
          <div className="logo-title">
            <span className="book-icon">📚</span>
            <span className="chain-icon">⛓️</span>
          </div>
          <div className="logo-subtitle">BLOCKCHAIN</div>
        </div>
      </div>
      
      {/* Floating Hash Codes */}
      <div className="floating-hashes">
        <div className="hash hash-1">0x1a2b3c</div>
        <div className="hash hash-2">0x4d5e6f</div>
        <div className="hash hash-3">0x7g8h9i</div>
      </div>
      
      {/* Scanning Lines */}
      <div className="scan-lines">
        <div className="scan-line scan-1"></div>
        <div className="scan-line scan-2"></div>
      </div>
    </div>
  );
};

export default BlockchainLogo;

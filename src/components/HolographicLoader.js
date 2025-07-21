import React, { useState, useEffect } from 'react';
import './HolographicLoader.css';

const HolographicLoader = ({ isLoading = true, message = "Initializing Quantum Network..." }) => {
  const [dots, setDots] = useState('');
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);

    return () => {
      clearInterval(dotInterval);
      clearInterval(scanInterval);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="holographic-loader">
      <div className="loader-container">
        {/* Central Hologram */}
        <div className="hologram-core">
          <div className="quantum-ring quantum-ring-1"></div>
          <div className="quantum-ring quantum-ring-2"></div>
          <div className="quantum-ring quantum-ring-3"></div>
          <div className="data-core">
            <div className="core-symbol">⬢</div>
          </div>
        </div>

        {/* Scanning Effect */}
        <div className="scan-line" style={{ top: `${scanLine}%` }}></div>

        {/* Data Streams */}
        <div className="data-streams">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`data-stream stream-${i + 1}`}>
              <div className="data-packet"></div>
            </div>
          ))}
        </div>

        {/* Loading Text */}
        <div className="loading-text">
          <div className="message">{message}{dots}</div>
          <div className="sub-message">Quantum entanglement in progress</div>
          <div className="progress-indicators">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <div className="status-codes">
              <span className="status-code">QNT-{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}</span>
              <span className="status-code">SEC-OK</span>
              <span className="status-code">SYNC-{Math.floor(Math.random() * 99) + 1}%</span>
            </div>
          </div>
        </div>

        {/* Holographic Grid */}
        <div className="holo-grid">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="grid-line"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HolographicLoader;

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Rating from './Rating';
import './FuturisticProduct.css';

const FuturisticProduct = ({ item, provider, account, dappazon, togglePop, onPurchase }) => {
  const [order, setOrder] = useState(null);
  const [hasBought, setHasBought] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    if (!dappazon) return;
    
    try {
      const events = await dappazon.queryFilter("Buy");
      const orders = events.filter(
        (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
      );

      if (orders.length === 0) return;

      const order = await dappazon.orders(account, orders[0].args.orderId);
      setOrder(order);
      setHasBought(true);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  // Helper function to add local Hardhat network to MetaMask
  const addLocalNetwork = async () => {
    try {
      // Add network
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x7A69', // 31337 in hex (Hardhat's default chain ID)
          chainName: 'Hardhat Local',
          rpcUrls: ['http://127.0.0.1:8545', 'http://localhost:8545'],
          nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
          },
          blockExplorerUrls: null,
        }],
      });
      
      // Switch to the network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x7A69' }],
      });
      
      // Copy test account private key to clipboard
      const testPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
      const testAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
      
      try {
        await navigator.clipboard.writeText(testPrivateKey);
        if (onPurchase) {
          onPurchase({
            type: 'success',
            title: 'MetaMask Configured! 🎉',
            message: `✅ Network added & switched!\n📋 Private key copied to clipboard!\n💰 Account: ${testAddress}\n💸 Balance: 10,000 ETH\n\n👉 Now import the account in MetaMask using the copied private key.`
          });
        }
      } catch (clipboardError) {
        if (onPurchase) {
          onPurchase({
            type: 'success',
            title: 'Network Configured! 🎉',
            message: `✅ Hardhat Local network added to MetaMask!\n💰 Test Account: ${testAddress}\n🔑 Private Key: ${testPrivateKey}\n💸 Balance: 10,000 ETH\n\n👉 Copy the private key above and import it in MetaMask.`
          });
        }
      }
      
    } catch (error) {
      console.error('Failed to add local network:', error);
      if (onPurchase) {
        onPurchase({
          type: 'error',
          title: 'Configuration Failed',
          message: 'Failed to add network. Please add manually:\n📡 RPC URL: http://127.0.0.1:8545\n🆔 Chain ID: 31337\n💱 Currency: ETH'
        });
      }
    }
  };

  const buyHandler = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    setScanProgress(0);
    
    // IMMEDIATE MetaMask check - BEFORE any delays to preserve user interaction
    if (!window.ethereum) {
      if (onPurchase) {
        onPurchase({
          type: 'error',
          title: 'MetaMask Required',
          message: 'Please install MetaMask to complete the purchase.'
        });
      }
      setIsProcessing(false);
      setScanProgress(0);
      return;
    }

    try {
      // Request MetaMask access immediately on button click
      console.log('Requesting MetaMask connection...');
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (!accounts || accounts.length === 0) {
        throw new Error('Please connect your MetaMask wallet to continue.');
      }

      console.log('MetaMask connected, preparing transaction...');

      // Start scanning animation while preparing transaction
      const scanInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(scanInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);

      // Create provider and signer
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = web3Provider.getSigner();
      
      // Debug network information
      const network = await web3Provider.getNetwork();
      console.log('Current network:', network);
      console.log('Network name:', network.name);
      console.log('Chain ID:', network.chainId);
      console.log('Contract available:', !!dappazon);
      console.log('Item to purchase:', item);
      
      // Check account balance
      const balance = await web3Provider.getBalance(accounts[0]);
      console.log('Account balance:', ethers.utils.formatEther(balance), 'ETH');
      
      if (network.chainId !== 31337) {
        console.log('⚠️ Warning: Not on Hardhat Local network (31337). Current chain:', network.chainId);
      }

      // Wait for scanning animation
      await new Promise(resolve => setTimeout(resolve, 1200));

      if (!dappazon) {
        // Demo mode - create a real transaction to trigger MetaMask popup
        console.log('Demo mode: Creating test transaction...');
        
        const demoTransaction = {
          to: accounts[0], // Send to self
          value: ethers.utils.parseEther('0'), // 0 ETH
          gasLimit: 21000
        };
        
        // This will trigger MetaMask popup for confirmation
        const txHash = await signer.sendTransaction(demoTransaction);
        console.log('Demo transaction sent:', txHash.hash);
        await txHash.wait();
        
        setHasBought(true);
        setOrder(txHash);
        
        if (onPurchase) {
          onPurchase({
            type: 'blockchain',
            title: 'Transaction Complete',
            message: `${item.name} purchased successfully! TX: ${txHash.hash.substring(0, 10)}...`
          });
        }
        return;
      }

      console.log('Executing contract transaction...');
      
      // Execute actual contract transaction - this will trigger MetaMask popup
      const transaction = await dappazon.connect(signer).buy(item.id, { 
        value: item.cost,
        gasLimit: 300000
      });
      
      console.log('Contract transaction created, waiting for confirmation...');
      await transaction.wait();
      
      setHasBought(true);
      setOrder(transaction);
      
      if (onPurchase) {
        onPurchase({
          type: 'blockchain',
          title: 'Blockchain Transaction Complete',
          message: `${item.name} purchased successfully! TX: ${transaction.hash.substring(0, 10)}...`
        });
      }
    } catch (error) {
      console.error('Purchase error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        reason: error.reason,
        stack: error.stack
      });
      
      let errorMessage = 'Transaction failed. Please try again.';
      
      if (error.message?.includes('user rejected') || error.code === 4001) {
        errorMessage = 'Transaction cancelled by user';
      } else if (error.message?.includes('insufficient funds') || error.code === -32000) {
        errorMessage = 'Insufficient funds in your wallet';
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message?.includes('contract') || error.message?.includes('call revert') || error.message?.includes('execution reverted')) {
        errorMessage = 'Smart contract not available. The contract may not be deployed or accessible.';
      } else if (error.message?.includes('chain') || error.message?.includes('wrong network')) {
        errorMessage = 'Wrong network. Please switch to the correct network in MetaMask.';
      } else if (error.code === -32603) {
        errorMessage = 'Internal JSON-RPC error. Please check network connection.';
      } else if (error.message) {
        errorMessage = `Transaction failed: ${error.message}`;
      }
      
      if (onPurchase) {
        onPurchase({
          type: 'error',
          title: 'Purchase Failed',
          message: errorMessage
        });
      }
    } finally {
      setIsProcessing(false);
      setScanProgress(0);
    }
  };

  return (
    <div className="futuristic-product-overlay" onClick={togglePop}>
      <div className="futuristic-product-modal" onClick={(e) => e.stopPropagation()}>
        {/* Holographic Border */}
        <div className="holo-border"></div>
        
        {/* Scanning Effect */}
        {isProcessing && (
          <div className="quantum-scanner">
            <div className="scan-line" style={{ top: `${scanProgress}%` }}></div>
            <div className="scan-grid">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="grid-cell"></div>
              ))}
            </div>
          </div>
        )}

        {/* Close Button */}
        <button className="close-btn-futuristic" onClick={togglePop}>
          <div className="close-core">
            <span>✕</span>
          </div>
        </button>

        <div className="product-content">
          {/* Product Header */}
          <div className="product-header">
            <div className="product-id">
              <span className="id-label">ITEM-ID</span>
              <span className="id-value">{String(item.id).padStart(4, '0')}</span>
            </div>
            <div className="quantum-status">
              <div className="status-indicator">
                <div className="pulse-dot"></div>
                <span>{hasBought ? 'ACQUIRED' : 'AVAILABLE'}</span>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="product-image-container">
            <div className="image-frame">
              <img src={item.image} alt={item.name} className="product-image" />
              <div className="image-overlay">
                <div className="overlay-grid"></div>
              </div>
              {hasBought && (
                <div className="acquired-badge">
                  <div className="badge-glow"></div>
                  <span>✓ OWNED</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="product-details">
            <h2 className="product-title">{item.name}</h2>
            
            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">CATEGORY</span>
                <span className="meta-value">{item.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">RATING</span>
                <div className="meta-value">
                  <Rating value={item.rating} />
                </div>
              </div>
            </div>

            <div className="product-price">
              <div className="price-container">
                <span className="price-label">QUANTUM PRICE</span>
                <span className="price-value">
                  {ethers.utils.formatUnits(item.cost.toString(), 'ether')} 
                  <span className="currency">ETH</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                className="details-btn"
                onClick={() => setShowDetails(!showDetails)}
              >
                <span className="btn-text">
                  {showDetails ? 'HIDE DETAILS' : 'SCAN DETAILS'}
                </span>
                <div className="btn-glow"></div>
              </button>
              
              {!hasBought && (
                <button 
                  className={`purchase-btn ${isProcessing ? 'processing' : ''}`}
                  onClick={buyHandler}
                  disabled={isProcessing}
                >
                  <span className="btn-text">
                    {isProcessing ? 'PROCESSING...' : 'ACQUIRE ITEM'}
                  </span>
                  <div className="btn-glow"></div>
                  {isProcessing && (
                    <div className="processing-indicator">
                      <div className="processing-wave"></div>
                    </div>
                  )}
                </button>
              )}
              
              {/* MetaMask Configuration Button for Local Development */}
              {!hasBought && window.location.hostname === 'localhost' && (
                <button 
                  className="metamask-config-btn"
                  onClick={addLocalNetwork}
                  title="Add Hardhat Local Network to MetaMask"
                >
                  <span className="btn-text">
                    ⚙️ CONFIGURE METAMASK
                  </span>
                  <div className="btn-glow"></div>
                </button>
              )}
            </div>

            {/* Extended Details */}
            {showDetails && (
              <div className="extended-details">
                <div className="details-container">
                  <h3>QUANTUM ANALYSIS</h3>
                  <div className="analysis-grid">
                    <div className="analysis-item">
                      <span className="analysis-label">NEURAL COMPATIBILITY</span>
                      <div className="compatibility-bar">
                        <div className="compatibility-fill" style={{ width: '87%' }}></div>
                      </div>
                      <span className="compatibility-value">87%</span>
                    </div>
                    <div className="analysis-item">
                      <span className="analysis-label">QUANTUM ENCRYPTION</span>
                      <span className="analysis-value">256-BIT SECURED</span>
                    </div>
                    <div className="analysis-item">
                      <span className="analysis-label">DOWNLOAD SIZE</span>
                      <span className="analysis-value">{Math.floor(Math.random() * 50 + 10)} MB</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Purchase History */}
            {hasBought && order && (
              <div className="purchase-history">
                <h3>ACQUISITION RECORD</h3>
                <div className="history-details">
                  <div className="history-item">
                    <span>Transaction Hash:</span>
                    <span className="hash-value">{order.hash ? order.hash.slice(0, 10) + '...' : 'N/A'}</span>
                  </div>
                  <div className="history-item">
                    <span>Block Number:</span>
                    <span>{order.blockNumber || 'N/A'}</span>
                  </div>
                  <div className="history-item">
                    <span>Status:</span>
                    <span className="status-confirmed">CONFIRMED</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quantum Particles */}
        <div className="quantum-particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`quantum-particle particle-${i % 5 + 1}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FuturisticProduct;

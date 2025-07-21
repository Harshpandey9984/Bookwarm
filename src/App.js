import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Navigation from './components/Navigation';
import Section from './components/Section'
import Product from './components/Product'
import FuturisticProduct from './components/FuturisticProduct'
import ParticleBackground from './components/ParticleBackground'
import FuturisticCard from './components/FuturisticCard'
import Dashboard from './components/Dashboard'
import HolographicLoader from './components/HolographicLoader'
import BlockchainLogo from './components/BlockchainLogo'
import AIAssistant from './components/AIAssistant'
import QuantumNotifications, { useQuantumNotifications } from './components/QuantumNotifications'
import ABI from './abis/Bookwarm.json'
import config from './config.json'
import logo from './assets/store/main_banner.png';
import Footer from './components/Footer';
import fallbackItems from './items.json';

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState('0.000');
  const [dappazon, setDappazon] = useState(null)
  const [bestsellers, setBestsellers] = useState(null); // State for bestseller items
  const [history, setHistory] = useState(null);
  const [hindi, setHindi] = useState(null);
  const [marvel, setMarvel] = useState(null);
  const [mythology, setMythology] = useState(null);
  const [goosebumps, setGoosebumps] = useState(null);
  const [toggle, setToggle] = useState(false)
  const [item, setItem] = useState({})
  const [showDashboard, setShowDashboard] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [useFuturisticUI, setUseFuturisticUI] = useState(true)
  
  // Quantum Notifications
  const { notifications, notify, dismissNotification } = useQuantumNotifications();

  const togglePop = (item) => {
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
  }

  const handlePurchaseNotification = (notification) => {
    notify[notification.type](notification.message, notification.title);
  }

  const loadBlockchainData = async () => {
    try {
      // Check if MetaMask is available and we're in development mode
      if (typeof window.ethereum !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('localhost'))) {
        console.log('Connecting to local blockchain...');
        notify.blockchain('Initiating quantum blockchain connection...', 'Neural Network Active');
        
        //connect to blockchain
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        const network = await provider.getNetwork()
        console.log('Current network:', network)
        
        // Check if we're on the correct network (Hardhat Local = 31337)
        if (network.chainId !== 31337) {
          console.log('Wrong network detected. Attempting to switch to Hardhat Local...');
          notify.blockchain('Switching to Hardhat Local network...', 'Network Switch');
          
          try {
            // Try to switch to Hardhat Local network
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x7A69' }], // 31337 in hex
            });
            notify.success('Switched to Hardhat Local network', 'Network Connected');
          } catch (switchError) {
            console.log('Network not found, adding Hardhat Local network...');
            // If network doesn't exist, add it
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x7A69',
                chainName: 'Hardhat Local',
                rpcUrls: ['http://127.0.0.1:8545'],
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
              }],
            });
            notify.success('Hardhat Local network added and connected', 'Network Ready');
          }
          
          // Reload network info after switch
          const updatedNetwork = await provider.getNetwork();
          console.log('Updated network:', updatedNetwork);
        }
        
        notify.success('Blockchain network synchronized', 'Network Connected');

        //connect to contract
        try {
          const dappazon = new ethers.Contract (
            config[network.chainId].bookwarm.address,
            ABI,
            provider
          )
          setDappazon(dappazon)
          notify.blockchain('Smart contract interface established', 'Contract Linked');
        
          const items = []

          for(let i=0; i<19; i++){
            const item = await dappazon.items(i)
            items.push(item)
          }
          
          console.log('Blockchain items loaded:', items)
          filterAndSetItems(items);
          notify.success('Quantum inventory synchronized successfully', 'Data Matrix Complete');
        } catch (contractError) {
          console.log('Contract not available, running in demo mode:', contractError);
          notify.blockchain('Contract not deployed, switching to demo mode', 'Demo Mode Active');
          
          // Use fallback data when contract is not available
          const items = fallbackItems.items.map(item => ({
            ...item,
            cost: ethers.utils.parseEther(item.price.toString()),
            id: ethers.BigNumber.from(item.id)
          }));
          filterAndSetItems(items);
          notify.success('Demo data loaded successfully', 'Demo Mode Ready');
        }
      } else {
        // Use fallback data for production deployment or when MetaMask isn't available
        console.log('Using fallback data for deployment...');
        notify.blockchain('Switching to quantum fallback protocols...', 'Offline Mode');
        const items = fallbackItems.items.map(item => ({
          ...item,
          cost: ethers.utils.parseEther(item.price.toString()), // Convert price to cost in wei
          id: ethers.BigNumber.from(item.id) // Convert id to BigNumber to match blockchain format
        }));
        filterAndSetItems(items);
        notify.success('Fallback data matrix loaded', 'Quantum Cache Active');
      }
    } catch (error) {
      console.error('Error loading blockchain data, using fallback:', error);
      notify.error('Blockchain connection failed, switching to quantum backup', 'Network Error');
      // Fallback to static data if blockchain connection fails
      const items = fallbackItems.items.map(item => ({
        ...item,
        cost: ethers.utils.parseEther(item.price.toString()), // Convert price to cost in wei
        id: ethers.BigNumber.from(item.id) // Convert id to BigNumber to match blockchain format
      }));
      filterAndSetItems(items);
      notify.success('Emergency protocols activated successfully', 'Backup Systems Online');
    }
  }

  const loadBalance = async () => {
    if (provider && account) {
      try {
        const balance = await provider.getBalance(account);
        const balanceInEth = ethers.utils.formatEther(balance);
        setBalance(parseFloat(balanceInEth).toFixed(3));
      } catch (error) {
        console.error('Error loading balance:', error);
        setBalance('0.000');
      }
    }
  }

  const filterAndSetItems = (items) => {
    console.log(items)
    // const top = items.filter((item) => item.category === 'top')
    const bestsellerItems = items.filter((item) => item.category === 'bestseller');
    setBestsellers(bestsellerItems);

    const historyItems = items.filter((item) => item.category === 'history');
    setHistory(historyItems);

    const marvelItems = items.filter((item) => item.category === 'marvel');
    setMarvel(marvelItems);

    const mythologyItems = items.filter((item) => item.category === 'mythology');
    setMythology(mythologyItems);
    
    const hindiItems = items.filter((item) => item.category === 'hindi');
    setHindi(hindiItems);    
    const goosebumpsItems = items.filter((item) => item.category === 'goosebumps');
    setGoosebumps(goosebumpsItems);
  }

  useEffect(() => {
    const initializeApp = async () => {
      setIsLoading(true);
      notify.blockchain('Initializing quantum bookstore systems...', 'Startup Sequence');
      
      try {
        await loadBlockchainData();
        notify.success('Bookwarm quantum interface ready', 'System Online');
      } catch (error) {
        notify.error('System initialization error', 'Startup Failed');
      } finally {
        // Add a slight delay for smooth loading experience
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };
    
    initializeApp();
  }, [])

  useEffect(() => {
    loadBalance()
  }, [account, provider])

  return (
    <div>
      <ParticleBackground />
      
      {/* Holographic Loader for loading states */}
      {isLoading && <HolographicLoader />}
      
      {/* Quantum Notifications */}
      <QuantumNotifications 
        notifications={notifications} 
        onDismiss={dismissNotification} 
      />
      
      {/* AI Assistant */}
      {showAI && (
        <AIAssistant 
          onClose={() => setShowAI(false)}
          onNotify={handlePurchaseNotification}
        />
      )}
      
      {/* AI Assistant Toggle Button */}
      <button
        onClick={() => setShowAI(!showAI)}
        className="ai-assistant-toggle"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00fff9, #7c3aed)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0, 255, 249, 0.3)',
          transition: 'all 0.3s ease'
        }}
        title="Toggle AI Assistant"
      >
        🤖
      </button>
      
      {showDashboard ? (
        // Dashboard View
        <>
          <Navigation account={account} setAccount={setAccount} />
          <div className="dashboard-header" style={{ padding: '20px', textAlign: 'center' }}>
            <button 
              onClick={() => setShowDashboard(false)}
              className="back-btn"
              style={{
                background: 'var(--gradient-primary)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                marginBottom: '20px',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: '600'
              }}
            >
              ← Back to Bookstore
            </button>
          </div>
          <Dashboard 
            balance={balance}
            isConnected={!!account}
            accountAddress={account}
          />
        </>
      ) : (
        // Main Bookstore View
        <>
          <Navigation account={account} setAccount={setAccount} />
          
          {/* Futuristic Blockchain Header */}
          <div className="blockchain-hero-section">
            <div className="quantum-grid-bg"></div>
            <div className="hero-content">
              <div className="blockchain-logo-container">
                <BlockchainLogo />
              </div>
              
              <div className="hero-text-container">
                <h1 className="blockchain-title">
                  <span className="title-main">BOOKWARM</span>
                  <span className="title-sub">BLOCKCHAIN</span>
                </h1>
                <h2 className="hero-subtitle">
                  Decentralized Knowledge Marketplace
                </h2>
                <div className="blockchain-features">
                  <div className="feature-item">
                    <span className="feature-icon">🔗</span>
                    <span>Smart Contracts</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">💎</span>
                    <span>NFT Books</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🌐</span>
                    <span>Web3 Library</span>
                  </div>
                </div>
                <div className="network-status">
                  <div className="status-indicator">
                    <div className="pulse-dot"></div>
                    <span>Ethereum Network {account ? 'Connected' : 'Ready'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Blockchain Elements */}
            <div className="floating-elements">
              <div className="floating-block block-1">
                <div className="block-content">
                  <div className="block-hash">#ABC123</div>
                  <div className="block-data">📚 Genesis</div>
                </div>
              </div>
              <div className="floating-block block-2">
                <div className="block-content">
                  <div className="block-hash">#DEF456</div>
                  <div className="block-data">⛓️ Chain</div>
                </div>
              </div>
              <div className="floating-block block-3">
                <div className="block-content">
                  <div className="block-hash">#GHI789</div>
                  <div className="block-data">💎 Ledger</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Futuristic Wallet Card with Dashboard Link */}
          <div className="container mx-auto px-4 py-6">
            <div style={{ position: 'relative' }}>
              <FuturisticCard 
                balance={balance}
                isConnected={!!account}
                accountAddress={account}
              />
              <button 
                onClick={() => setShowDashboard(true)}
                className="dashboard-btn"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'var(--gradient-accent)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: '500'
                }}
              >
                Dashboard →
              </button>
            </div>
          </div>

          {bestsellers && history && hindi && marvel && mythology && goosebumps && (
            <>
              <Section title={"Bestseller"} items={bestsellers} togglePop={togglePop} />
             
              <Section title={"Marvel"} items={marvel} togglePop={togglePop} />
              <Section title={"Mythology"} items={mythology} togglePop={togglePop} />
               <Section title={"History"} items={history} togglePop={togglePop} />
              <Section title={"Hindi"} items={hindi} togglePop={togglePop} />
              <Section title={"Goosebumps"} items={goosebumps} togglePop={togglePop} />
            </>
          )}
          {toggle && useFuturisticUI ? (
            <FuturisticProduct 
              item={item} 
              provider={provider} 
              account={account} 
              dappazon={dappazon} 
              togglePop={togglePop}
              onPurchase={handlePurchaseNotification}
            />
          ) : toggle && (
            <Product item={item} provider={provider} account={account} dappazon={dappazon} togglePop={togglePop} />
          )}
          <Footer/>
        </>
      )}
    </div>
  );
}

export default App;
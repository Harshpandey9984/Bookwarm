import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Navigation from './components/Navigation';
import Section from './components/Section'
import Product from './components/Product'
import ABI from './abis/Bookwarm.json'
import config from './config.json'
import logo from './assets/store/main_banner.png';
import Footer from './components/Footer';

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [dappazon, setDappazon] = useState(null)
  const [bestsellers, setBestsellers] = useState(null); // State for bestseller items
  const [history, setHistory] = useState(null);
  const [hindi, setHindi] = useState(null);
  const [marvel, setMarvel] = useState(null);
  const [mythology, setMythology] = useState(null);
  const [goosebumps, setGoosebumps] = useState(null);
  const [toggle, setToggle] = useState(false)
  const [item, setItem] = useState({})

  const togglePop = (item) => {
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
  }

  const loadBlockchainData = async () => {
    //connect to blockchain
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    setProvider(provider);
    const network = await provider.getNetwork()
    console.log(network)

    //connect to contract
    const dappazon = new ethers.Contract (
      '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      ABI,
      provider
    )
    setDappazon(dappazon)
    
    const items = []

    for(let i=0; i<19; i++){
      const item = await dappazon.items(i)
      items.push(item)
    }
    console.log(items)
    // const top = items.filter((item) => item.category === 'top')
    const bestsellerItems = items.filter((item) => item.category === 'bestseller');
    setBestsellers(bestsellerItems);

    const historyItems = items.filter((item) => item.category === 'history');
    setHistory(historyItems);


    const marvelItems = items.filter((item) => item.category === 'marvel');
    setMarvel(marvelItems);

    const mythologyItems = items.filter((item) => item.category === 'mythalogy');
    setMythology(mythologyItems);
    
    const hindiItems = items.filter((item) => item.category === 'hindi');
    setHindi(hindiItems);

    const goosebumpsItems = items.filter((item) => item.category === 'goosebumps');
    setGoosebumps(goosebumpsItems);
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <div className='logo__homepage'>
        <img className='logo__home' src={logo} alt="Pharma-Sync"/>
        <h2>Welcome to Bookwarm</h2>
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
      {toggle && (
        <Product item={item} provider={provider} account={account} dappazon={dappazon} togglePop={togglePop} />
      )}
      <Footer/>
    </div>
  );
}

export default App;
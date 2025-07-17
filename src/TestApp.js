import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Navigation from './components/Navigation';
import Section from './components/Section'
import Product from './components/Product'
import logo from './assets/store/main_banner.png';
import Footer from './components/Footer';

// Hardcoded items for testing
const testItems = [
  {
    id: 1,
    name: "Tor Books The Echo Wife, by Sarah Gailey",
    category: "bestseller",
    image: "https://i.ibb.co/PMPhwdL/1646683506-41of2u-Zc-DFL-SL500.jpg",
    cost: ethers.utils.parseEther("1"),
    rating: 4,
    stock: 20
  },
  {
    id: 2,
    name: "Del Rey Snow Crash, by Neal Stephenson",
    category: "bestseller",
    image: "https://i.ibb.co/RD7bjSX/1646683050-51nb-Yw-WXNu-L-SL500.jpg",
    cost: ethers.utils.parseEther("1.2"),
    rating: 5,
    stock: 6
  },
  {
    id: 3,
    name: "Gallery Books Contact, by Carl Sagan",
    category: "bestseller",
    image: "https://i.ibb.co/4F3b4rV/1646683083-419-IIE0-Gh4-L-SL500.jpg",
    cost: ethers.utils.parseEther("0.2"),
    rating: 2,
    stock: 24
  },
  {
    id: 4,
    name: "John Adams",
    category: "history",
    image: "https://i.ibb.co/rmCF49r/image.png",
    cost: ethers.utils.parseEther("0.0002"),
    rating: 5,
    stock: 10
  },
  {
    id: 5,
    name: "1776",
    category: "history",
    image: "https://upload.wikimedia.org/wikipedia/en/5/5f/David_McCullough1776_book_cover.jpg",
    cost: ethers.utils.parseEther("0.55"),
    rating: 4,
    stock: 25
  }
];

function TestApp() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [dappazon, setDappazon] = useState(null)
  const [bestsellers, setBestsellers] = useState(null);
  const [history, setHistory] = useState(null);
  const [hindi, setHindi] = useState([]);
  const [marvel, setMarvel] = useState([]);
  const [mythology, setMythology] = useState([]);
  const [goosebumps, setGoosebumps] = useState([]);
  const [toggle, setToggle] = useState(false)
  const [item, setItem] = useState({})

  const togglePop = (item) => {
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
  }

  useEffect(() => {
    // Load test items
    const bestsellerItems = testItems.filter((item) => item.category === 'bestseller');
    setBestsellers(bestsellerItems);

    const historyItems = testItems.filter((item) => item.category === 'history');
    setHistory(historyItems);

    console.log('Loaded test items:', testItems);
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <div className='logo__homepage'>
        <img className='logo__home' src={logo} alt="Bookwarm"/>
        <h2>Welcome to Bookwarm</h2>
      </div>
      {bestsellers && history && (
        <>
          <Section title={"Bestseller"} items={bestsellers} togglePop={togglePop} />
          <Section title={"History"} items={history} togglePop={togglePop} />
          <Section title={"Marvel"} items={marvel} togglePop={togglePop} />
          <Section title={"Mythology"} items={mythology} togglePop={togglePop} />
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

export default TestApp;

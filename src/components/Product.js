import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Rating from './Rating'
import close from '../assets/close.svg'

const Product = ({ item, provider, account, dappazon, togglePop }) => {
  const [order, setOrder] = useState(null)
  const [hasBought, setHasBought] = useState(false)

  const fetchDetails = async () => {
    // Skip fetching details if no dappazon contract (demo mode)
    if (!dappazon) {
      return;
    }
    
    try {
      const events = await dappazon.queryFilter("Buy")
      const orders = events.filter(
        (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
      )

      if (orders.length === 0) return

      const order = await dappazon.orders(account, orders[0].args.orderId)
      setOrder(order)
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  }
  const buyHandler = async () => {
    console.log("Buy button clicked");

    // Check if we're in production/demo mode (no dappazon contract available)
    if (!dappazon) {
      // Demo mode - simulate purchase
      alert(`Demo Purchase Successful! 🎉\n\nBook: ${item.name}\nPrice: ${ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH\n\nNote: This is a demo. In the full version, connect to a blockchain network to make real purchases.`);
      setHasBought(true);
      return;
    }

    try {
        // Check if MetaMask is installed
        if (!window.ethereum) {
            alert("MetaMask is not installed. Please install it to use this feature.");
            return;
        }

        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the provider and signer from MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        // Get the current network and check if it's localhost
        const network = await provider.getNetwork();
        console.log("Network:", network);
        
        // Check if we're on a supported network
        if (network.chainId !== 31337) {
            // If not on localhost, offer to switch or show demo
            const switchToLocal = window.confirm(
                `You're currently on ${network.name || 'Unknown'} network (Chain ID: ${network.chainId}).\n\n` +
                `For full functionality, you need to:\n` +
                `1. Start Hardhat local node (npx hardhat node)\n` +
                `2. Add Localhost 8545 network to MetaMask\n` +
                `3. Switch to Localhost network\n\n` +
                `Click OK to see demo purchase, or Cancel to learn how to set up local network.`
            );
            
            if (switchToLocal) {
                // Show demo purchase
                alert(`Demo Purchase Successful! 🎉\n\nBook: ${item.name}\nPrice: ${ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH\n\nNote: This was a demo transaction. To make real transactions, set up local blockchain network.`);
                setHasBought(true);
                return;
            } else {
                // Show setup instructions
                alert(
                    `To set up local blockchain:\n\n` +
                    `1. Open terminal in project folder\n` +
                    `2. Run: npx hardhat node\n` +
                    `3. In MetaMask, add network:\n` +
                    `   - Network Name: Localhost 8545\n` +
                    `   - RPC URL: http://127.0.0.1:8545\n` +
                    `   - Chain ID: 31337\n` +
                    `   - Currency: ETH\n\n` +
                    `4. Import test account from Hardhat console\n` +
                    `5. Switch to Localhost network in MetaMask`
                );
                return;
            }
        }

        // Get current account balance
        const balance = await signer.getBalance();
        console.log("Account balance:", ethers.utils.formatEther(balance), "ETH");
        
        // Check if user has enough balance (item cost + gas fees)
        const itemCost = ethers.BigNumber.from(item.cost);
        const estimatedGasFees = ethers.utils.parseEther("0.01"); // Estimate ~0.01 ETH for gas
        const totalNeeded = itemCost.add(estimatedGasFees);
        
        if (balance.lt(totalNeeded)) {
            alert(`Insufficient balance. You need at least ${ethers.utils.formatEther(totalNeeded)} ETH (${ethers.utils.formatEther(itemCost)} for item + ~0.01 for gas)`);
            return;
        }

        // Estimate gas for the transaction
        let gasEstimate;
        try {
            gasEstimate = await dappazon.connect(signer).estimateGas.buy(item.id, { value: item.cost });
            console.log("Gas estimate:", gasEstimate.toString());
        } catch (estimateError) {
            console.error("Gas estimation failed:", estimateError);
            gasEstimate = ethers.BigNumber.from("300000"); // Fallback gas limit
        }

        // Set transaction overrides with reasonable gas limit
        const overrides = {
            value: item.cost,
            gasLimit: gasEstimate.mul(110).div(100), // Add 10% buffer to gas estimate
            gasPrice: ethers.utils.parseUnits("20", "gwei") // Set reasonable gas price for localhost
        };

        console.log("Transaction overrides:", overrides);

        // Buy item - this triggers MetaMask to prompt the user for confirmation
        let transaction = await dappazon.connect(signer).buy(item.id, overrides);
        console.log("Transaction initiated:", transaction);

        // Wait for the transaction to be mined
        await transaction.wait();

        console.log("Transaction confirmed");
        setHasBought(true);
        alert("Purchase successful!");
        
    } catch (error) {
        console.error('Error buying item:', error);

        // Handle specific errors
        if (error.code === 4001) {
            alert("Transaction rejected by the user.");
        } else if (error.code === -32603) {
            alert("Transaction failed. Please check your balance and try again.");
        } else if (error.message.includes("insufficient funds")) {
            alert("Insufficient funds. Please ensure you have enough ETH for the purchase and gas fees.");
        } else if (error.message.includes("Item is out of stock")) {
            alert("Sorry, this item is out of stock.");
        } else if (error.message.includes("Not enough ether")) {
            alert("Not enough ETH to buy this item.");
        } else {
            alert(`Transaction failed: ${error.message || 'Unknown error'}`);
        }
    }
};
  
  
  
  useEffect(() => {
    fetchDetails()
  }, [hasBought])

  return (
    <div className="product">
      <div className="product__details">
        <div className="product__image">
          <img src={item.image} alt="Product" />
        </div>
        <div className="product__overview">
          <h1>{item.name}</h1>

          <Rating value={item.rating} />

          <hr />

          <p>{item.address}</p>

          <h2>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h2>

          <hr />

          <h2>Overview</h2>

          <p>
            {item.description}

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem, iusto,
            consectetur inventore quod soluta quos qui assumenda aperiam, eveniet doloribus
            commodi error modi eaque! Iure repudiandae temporibus ex? Optio!
          </p>
        </div>

        <div className="product__order">
          <h1>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h1>

          <p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </strong>
          </p>

          {item.stock > 0 ? (
            <p>In Stock.</p>
          ) : (
            <p>Out of Stock.</p>
          )}

          <button className='product__buy' onClick={buyHandler}>
            Buy Now
          </button>

          <p><small>Ships from</small> BOOKWARM</p>
          <p><small>Sold by</small> BOOKWARM</p>

          {order && (
            <div className='product__bought'>
              Item bought on <br />
              <strong>
                {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  })}
              </strong>
            </div>
          )}
        </div>


        <button onClick={togglePop} className="product__close">
          <img src={close} alt="Close" />
        </button>
      </div>
    </div >
  );
}

export default Product;
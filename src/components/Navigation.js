import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

const Navigation = ({ account, setAccount }) => {


    const connectHandler = async () => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                const account = ethers.utils.getAddress(accounts[0]);
                setAccount(account);
                console.log(account);
            } else {
                alert('Please install MetaMask to use this application');
            }
        } catch (error) {
            console.error('Error connecting to wallet:', error);
            alert('Failed to connect to wallet. Please try again.');
        }
    }

    return (
        <nav>
            <div className="nav__top-row">
               <a className='link__header' href='/'>
               <div className='nav__brand pulse-animation'>
                    <h1>BOOKWARM</h1>
                    <div>
                        <img className="float-animation" src="https://i.ibb.co/W0CW3Pt/logo1.png" alt="Ethereum" />
                    </div>
                </div>
               </a>

            <h2 className='nav_top'>Find your genre and order your Book</h2>


            {
                account ?
                    <button
                        type='button'
                        className='nav__connect'
                    >
                        {"connected to "+ account.slice(0, 6) + "..." + account.slice(42)}
                    </button>
                    :
                    <button
                        type='button'
                        className='nav__connect'
                        onClick={connectHandler}
                    >
                        Connect
                    </button>
            }
            </div>

            <ul className='nav__links'>
                <li>
                    <a href='#Bestseller'>Fiction</a>
                </li>
                <li>
                    <a href='#Marvel'>Marvel</a>
                </li>
                <li>
                    <a href='#Mythology'>Mythology</a>
                </li>
                <li>
                    <a href='#History'>History</a>
                </li>
                <li>
                    <a href='#Hindi'>Hindi</a>
                </li>
                <li>
                    <a href='#Goosebumps'>Goosebumps</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

const Navigation = ({ account, setAccount }) => {


    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
        console.log(account);
    }

    return (
        <nav>

               <a className='link__header' href='/'>
               <div className='nav__brand'>
                    <h1>BOOKWARM</h1>
                    <div>
                        <img src="https://i.ibb.co/W0CW3Pt/logo1.png" alt="Ethereum" />
                    </div>
                </div>
               </a>

            <h2 className='nav_top'>Find your gener and order your Book</h2>


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
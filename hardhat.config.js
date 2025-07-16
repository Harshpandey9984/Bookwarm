require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  solidity: '0.8.9',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk',
      }
    }
  }
};
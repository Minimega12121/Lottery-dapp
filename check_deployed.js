const {Web3 }= require('web3');
const web3 = new Web3('wss://sepolia.drpc.org'); // e.g., Infura, Alchemy, or your Ethereum node

const contractAddress = '0xeF4471C32A6212f4237B64B29b2E83dd8a5fd351';

web3.eth.getCode(contractAddress)
  .then((code) => {
    if (code === '0x') {
      console.log('No contract found at this address');
    } else {
      console.log('Contract is deployed at the address');
    }
  })
  .catch((err) => console.error('Error checking contract code:', err));

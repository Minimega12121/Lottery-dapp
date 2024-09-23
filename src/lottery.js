import web3 from "./web3";

const address = "0xeF4471C32A6212f4237B64B29b2E83dd8a5fd351";

const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "manager",
    "outputs": [{ "name": "", "type": "address" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getPlayers",
    "outputs": [{ "name": "", "type": "address[]" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  },
  {
    "constant": false,
    "inputs": [],
    "name": "pickWinner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "constant": false,
    "inputs": [],
    "name": "enter",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function",
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
  },
];
const lottery = new web3.eth.Contract(abi, address);

export default lottery;

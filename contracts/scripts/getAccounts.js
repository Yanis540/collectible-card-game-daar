const { ethers } = require('ethers');
const { MAIN_CONTRACT_ADDRESS , MAIN_CONTRACT_OWNER_PRIVATE_KEY } = require('../constants');
// Connect to Ethereum network
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const wallet = new ethers.Wallet(MAIN_CONTRACT_OWNER_PRIVATE_KEY, provider);
// Load your NFT smart contract (replace with your contract address and ABI)
const contractAddress = MAIN_CONTRACT_ADDRESS;
const contract = require("../artifacts/src/Main.sol/Main.json");
const contractABI = contract.abi; // Your contract's ABI
const nftContract = new ethers.Contract(contractAddress, contractABI, wallet);

// Mint a new NFT
const getOwners = async () =>{
  
  const tx = await nftContract.getOwners();
  // await tx.wait(); // Wait for the transaction to be confirmed
  console.log("TX : ",tx);
  return tx;
}

module.exports = {
  getOwners
};


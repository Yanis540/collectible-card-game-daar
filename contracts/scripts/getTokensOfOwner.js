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

const getNFTsOfOwner = async (ownerAddress)=> {
    const balance = await nftContract.balanceOf(ownerAddress); //Returns the number of tokens owned by the address
    
    let tokens = [];
  
    for(let i = 0; i < balance.length; i++) {
        for(let j = 0;j<balance[i];j++){
            const tokenId = await nftContract.tokenOfOwnerByIndex(i, ownerAddress, j); //Get the token ID based on the index from the balanceOf call
            const tokenURI = await nftContract.tokenURI(i, tokenId);
            tokens.push({tokenId: tokenId.toString(), tokenURI: tokenURI});
        }
    }
  
    console.log(tokens);
    return tokens;
}



module.exports = {
    getNFTsOfOwner
};
  
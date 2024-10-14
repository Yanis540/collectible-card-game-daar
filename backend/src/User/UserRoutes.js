const axios = require('axios');
const {getOwners} = require('../../../contracts/scripts/getAccounts')
const {getNFTsOfOwner} = require('../../../contracts/scripts/getTokensOfOwner')


const getUsers = async (req, res) => {
    try {
        
        console.log("Get USERS Route");
        const users = await getOwners();
        res.json(users);


    } catch (err) {
        console.error('Erreur lors de la récupération des Users', err); 
        res.send(err)
    }
};


const getUserNFTs = async (req, res) => {
    try {
        
        console.log("Get UserNFTs Route");
        const adress = req.params.id;
        console.log("User ID : ",adress);
        
        const userNFTs =  await getNFTsOfOwner(adress);  
        res.json(userNFTs);

    } catch (err) {
        console.error('Erreur lors de la récupération des UserNFTs', err); 
        res.send(err)
    }
};



module.exports = {
    getUsers,
    getUserNFTs
};

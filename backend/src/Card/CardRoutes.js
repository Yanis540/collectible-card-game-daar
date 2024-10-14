const axios = require('axios');
const {getNFTsOfOwner} = require('../../../contracts/scripts/getTokensOfOwner')



// Pour limiter le nombre des cartes à recevoir -> ajout du parametre pageSize
// https://api.pokemontcg.io/v2/cards?pageSize=5


const getCards = async (req, res) => {
    try {

        const response = await axios.get('https://api.pokemontcg.io/v2/cards');
        const data = response.data;        
        // console.log("Cards : ",data);

        let REP= [{}];
        REP = []; 
        //Filtrer la reponse
        data.data.forEach((card) => {
            REP.push({
                "id": card.id,
                "number": card.number,
                "image": card.images.large
            })
        });

        // console.log(REP);
        
        res.json(REP);


    } catch (err) {
        console.error('Erreur lors de la récupération des Cards', err); 
        res.send(err)
    }
};

const getCardById = async (req, res) => {

    try {
        const id = req.params.id;

        // console.log("--> ID = ",id);
        
        const response = await axios.get('https://api.pokemontcg.io/v2/cards/'+id);
        const data = response.data;        

        res.json({
            "id": data.data.id,
            "number": data.data.number,
            "image": data.data.images.large
        });

        
    } catch (err) {
        console.error('Erreur lors de la récupération du Card by id :', err);
        res.send(err)
    }
};

// const ownerAddress = "0x875675345E7aaF3228EF68014C86c51121A74962";

// const getUserCards = async (req, res) => {
//     try {
//         const nfts = await getNFTsOfOwner(ownerAddress); // Assuming getNFTsOfOwner is an async function

    
//     } catch (err) {
//         console.error('Erreur lors de la récupération des Cards', err); 
//         res.send(err)
//     }
// };

module.exports = {
    getCards,
    getCardById
};


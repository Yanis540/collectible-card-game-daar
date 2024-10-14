const axios = require('axios');


const getTypes = async (req, res) => {
    try {

        const response = await axios.get('https://api.pokemontcg.io/v2/types');
        const data = response.data;        
        console.log("Types : ",data);
        res.json(data);

    } catch (err) {
        console.error('Erreur lors de la récupération des Types : ', err);
        res.send(err)
    }
};


const getSubTypes = async (req, res) => {
    try {

        const response = await axios.get('https://api.pokemontcg.io/v2/subtypes');
        const data = response.data;        
        console.log("SubTypes : ",data);
        res.json(data);

    } catch (err) {
        console.error('Erreur lors de la récupération des SubTypes : ', err);
        res.send(err)
    }
};


const getSuperTypes = async (req, res) => {
    try {

        const response = await axios.get('https://api.pokemontcg.io/v2/supertypes');
        const data = response.data;        
        console.log("SuperTypes : ",data);
        res.json(data);

    } catch (err) {
        console.error('Erreur lors de la récupération des SuperTypes : ', err);
        res.send(err)
    }
};

const getRarities = async (req, res) => {
    try {

        const response = await axios.get('https://api.pokemontcg.io/v2/rarities');
        const data = response.data;        
        console.log("Rarities : ",data);  
        res.json(data);

    } catch (err) {
        console.error('Erreur lors de la récupération des Rarities : ', err);
        res.send(err)
    }
};


module.exports = {
    getTypes,
    getSubTypes,
    getSuperTypes,
    getRarities
};


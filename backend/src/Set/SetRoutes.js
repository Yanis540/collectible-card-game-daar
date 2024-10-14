const axios = require('axios');


const getSets = async (req, res) => {
    try {

        const response = await axios.get('https://api.pokemontcg.io/v2/sets');
        const data = response.data;        
        console.log(data);
        res.json(data);

    } catch (err) {
        console.error('Erreur lors de la récupération des Sets : ', err);        
        res.send(err)
    }
};

const getSetById = async (req, res) => {
    try {
        const id = req.params.id;

        console.log("--> ID of Set = ",id);
        
        const response = await axios.get('https://api.pokemontcg.io/v2/sets/'+id);
        const data = response.data;        
        console.log("Set of id ("+id+") : ",data);
        res.json(data);

    } catch (err) {
        console.error('Erreur lors de la récupération du Set by id : ', err);
        res.send(err)
    }
};



const getSetCards = async (req, res) => {
    try {
        const id = req.params.id;

        console.log("--> ID of Set = ",id);
        const response = await axios.get('https://api.pokemontcg.io/v2/cards?q=set.id:'+id);
        const data = response.data;        

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

        console.log("Cards of Set("+id+") : ",REP);
        res.json(REP);

    } catch (err) {
        console.error('Erreur lors de la récupération du getSetCards by id - ', err);
        res.send(err)
    }
};


module.exports = {
    getSets,
    getSetById,
    getSetCards
};


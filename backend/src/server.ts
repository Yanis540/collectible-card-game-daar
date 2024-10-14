import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const {getCards,getCardById, getUserCards} = require('./Card/CardRoutes')
const {getSets,getSetById,getSetCards} = require('./Set/SetRoutes')
const {getTypes,getSubTypes,getSuperTypes,getRarities} = require('./Type/TypeRoutes')
const {getUsers,getUserNFTs} = require('./User/UserRoutes')
const {createCollection} = require('../../contracts/scripts/createCollection')
const {mintNFT} = require('../../contracts/scripts/mint')
const {MAIN_CONTRACT_OWNER_ADDRESS} = require("../../contracts/constants")
const cors = require('cors')
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;



// create collections in blockchain when server is loading
createCollection();

app.get("/",async(req:Request,res:Response)=>{
  const tx = await mintNFT("base1" ,MAIN_CONTRACT_OWNER_ADDRESS, 'mcd19-3');
  res.json({tx})
})
// Card Routes
app.get('/getCards', getCards);
app.get('/getCard/:id', getCardById); 
// app.get('/getUserCards', getUserCards);

// Set Routes
app.get('/getSets', getSets);
app.get('/getSet/:id', getSetById);
app.get('/getSetCards/:id', getSetCards);


// Type Routes
app.get('/getTypes', getTypes);
app.get('/getSubTypes', getSubTypes);
app.get('/getSuperTypes', getSuperTypes);
app.get('/getRarities', getRarities);

// User Routes
app.get('/getUsers', getUsers);
app.get('/getUserNFTs/:id', getUserNFTs);

app.listen(port, () => {
  console.log(`Server is running at PORT ${port}`);
});
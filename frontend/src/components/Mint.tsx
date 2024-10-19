import { useEffect, useState } from "react";
import axios from 'axios';
import Web3 from "web3";
import Sets from "./Sets";
import "../css/Mint.css"
import PokemonCard from "./PokemonCard";
import { useWalletStore } from "@/state/use-wallet-store";
import { MAIN_CONTRACT_OWNER_ADDRESS } from "@/constants";
import ethereum from "@/lib/ethereum"
import * as main from '@/lib/main'


function Mint() {
    const [showSets, setShowSets] = useState(true);
    const [setId, setSetId] = useState();
    const [selectedCards, setCards] = useState([]);
    const [adresse, setAdresse] = useState("");
    const {contract} = useWalletStore()

    const mintCards = () => {
        const mint = async () => {
            for (let card of selectedCards) {
                try{

                    let tx = await contract.mintCard(setId, MAIN_CONTRACT_OWNER_ADDRESS, card);
                    // let tx = await contract.mintCard(setId, adresse, card);
                    await tx.wait(); // Wait for the transaction to be confirmed
                    alert('NFT minted!');
                }
                catch(err){
                    console.error(err)
                }

                // let result = contract.methods.mintCard(setId, adresse, card).send({ from: accounts[0] });
            }
        };
        mint();
        // Send Ethereum to an address

    }
    const handleValue = (event:any) => {
        setAdresse(event.target.value);
    }

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/getUsers');
            await setUsers(response.data);
          } catch (error) {
            console.error('Error while fetching users:', error);
          }
        };
                
        fetchData();
    }, []);

    return (

        <div className="pokemon-sets-div">
            <select className="mint-input" onChange={handleValue}>
                {users.map((user) => (
                    <option key={user} value={user}>
                    {user}
                    </option>
                ))}
            </select>
            <input type="text" onChange={handleValue}></input>
            {!showSets && <button onClick={() => { setShowSets(!showSets); setCards([]) }}>Back to sets</button>}
            {!showSets && <button onClick={() => mintCards()}
                disabled={selectedCards.length === 0}  >Mint !</button>}
            {showSets && <Sets setSetId={setSetId} setShowSets={setShowSets} preventNavigation={true}></Sets>}
            {!showSets && <PokemonCard setId={setId} minting={true} setCardsToMint={setCards}></PokemonCard>}
        </div>
    );
}

export default Mint;


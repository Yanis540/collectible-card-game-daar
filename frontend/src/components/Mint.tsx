import { useEffect, useState } from "react";
import axios from 'axios';
import Sets from "./Sets";
import "../css/Mint.css"
import PokemonCard from "./PokemonCard";
import { useWalletStore } from "@/state/use-wallet-store";
import { MAIN_CONTRACT_OWNER_ADDRESS } from "@/constants";



function Mint() {
    const [showSets, setShowSets] = useState(true);
    const [setId, setSetId] = useState();
    const [selectedCards, setCards] = useState([]);
    // const [adresse, setAdresse] = useState("");
    const {contract} = useWalletStore()

    const mintCards = () => {
        const mint = async () => {
            for (let card of selectedCards) {
                try{
                    let tx = await contract.mintCard(setId, MAIN_CONTRACT_OWNER_ADDRESS, card);
                    await tx.wait(); // Wait for the transaction to be confirmed
                    alert('NFT minted!');
                }
                catch(err){
                    console.error(err)
                }

            }
        };
        mint();

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
         
            <div className="flex flex-row items-center justify-center gap-x-5 py-4">
                {!showSets && <button className="   bg-teal-600  hover:text-teal-900 hover:bg-teal-400 " onClick={() => { setShowSets(!showSets); setCards([]) }}>{"<"}</button>}
                {!showSets && <button className="bg-teal-600  hover:text-teal-900 hover:bg-teal-400" onClick={() => mintCards()}
                    disabled={selectedCards.length === 0}  >Mint cards</button>}
            </div>
            {showSets && <Sets setSetId={setSetId} setShowSets={setShowSets} preventNavigation={true}></Sets>}
            {!showSets && <PokemonCard setId={setId} minting={true} setCardsToMint={setCards}></PokemonCard>}
        </div>
    );
}

export default Mint;


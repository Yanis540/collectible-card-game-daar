import "../css/Card.css"
import { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom'

function PokemonCard({setId, minting, setCardsToMint}:any) {

  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const location = useLocation()
  if(!setId) { setId = location.state.setId}
  useEffect(() => {
    axios.get('http://localhost:5000/getSetCards/'+setId)
      .then((response:any) => {
        setCards(response.data);
      })
      .catch((error:any) => {
        console.error('Error while fetching cards:', error);
      });
  }, []);
  
  const selectCard = (cardId:any) => {
    if(minting){
      if(selectedCards.includes(cardId as never)){
        let newArray = selectedCards.filter((id) => id!=cardId);
        setSelectedCards(newArray);
        setCardsToMint(newArray);
      }else{
        let newArray = [...selectedCards,cardId];
        setSelectedCards(newArray as never);
        setCardsToMint(newArray);
      }
    }
  }
  
  return (
  <>
      <h1 className="text-gray-200 font-bold text-4xl py-4 text-center w-full mx-auto ">Set : {setId}</h1>
    <div className="pokemon-card-div ">
      <ul className="pokemon-card-grid ">
        {cards.map((card:any) => (
          <li key={card.id} style={{filter: minting&&!selectedCards.includes(((card as any).id as never))? "grayscale(1)":"none" }}
            className="pokemon-card animated transition-all duration-400" onClick={() => selectCard(card.id)}>
            <img src={card.image} alt={card.number} />
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default PokemonCard;


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
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error('Error while fetching cards:', error);
      });
  }, []);
  
  const selectCard = (cardId:any) => {
    if(minting){
      if(selectedCards.includes(cardId)){
        let newArray = selectedCards.filter((id) => id!=cardId);
        setSelectedCards(newArray);
        setCardsToMint(newArray);
      }else{
        let newArray = [...selectedCards,cardId];
        setSelectedCards(newArray);
        setCardsToMint(newArray);
      }
    }
  }
  
  return (
  
    <div className="pokemon-card-div">
      <h1>Pokemon Cards</h1>
      <ul className="pokemon-card-grid">
        {cards.map(card => (
          <li key={card.id} style={{filter: minting&&!selectedCards.includes(card.id)? "grayscale(1)":"none" }}
            className="pokemon-card animated" onClick={() => selectCard(card.id)}>
            <img src={card.image} alt={card.number} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonCard;


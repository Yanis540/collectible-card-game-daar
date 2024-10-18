import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import '../css/Sets.css'; 
import '../css/UsersCard.css'



function UserCards({userId}:any){
    const [userCards, setUserCards] = useState([]);
    const location = useLocation();

    if(!userId) { userId = location.state.userId}
    useEffect(() => {
      axios.get('http://localhost:5000/getUserNFTs/'+userId)
        .then(response => {
            let getList = async () => {
                let list = [];
                for(let card of response.data){
                    let m = await axios.get(card.tokenURI).then((res) => list.push({URI: card.tokenURI, image: res.data.image}));
                }
                const images = await Promise.all(list);
                setUserCards(images);
            }
            getList();     
        })
        .catch(error => {
          console.error('Error while fetching sets:', error);
        });
        
    }, []);
    
    return (
        <>
        <h1>USER CARDS</h1>
        <div className="pokemon-card-div">
            <ul className="pokemon-card-grid">
                {(userCards)? userCards.map(card => (
                <li key={card.id} className="pokemon-card animated" >
                    <img src={card.image} alt={card.id} />
                </li>
                )): ""}
            </ul>
        </div> 
        </> 
       
    )
}

export default UserCards;
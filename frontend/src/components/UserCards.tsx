import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
// import '../css/Sets.css'; 
import '../css/UsersCard.css'



function UserCards({userId}:any){
    const [userCards, setUserCards] = useState([]);
    const location = useLocation();

    if(!userId) { userId = location.state.userId}
    useEffect(() => {
      axios.get('http://localhost:5000/getUserNFTs/'+userId)
        .then(response => {
            let getList = async () => {
                let list:any[] = [];
                for(let card of response.data){
                    let m = await axios.get(card.tokenURI).then((res) => list.push({URI: card.tokenURI, image: res.data.image}));
                }
                const images = await Promise.all(list);
                setUserCards(images as any);
            }
            getList();     
        })
        .catch(error => {
          console.error('Error while fetching sets:', error);
        });
        
    }, []);
    
    return (
        <div className=" gap-y-4  py-8  w-full max-w-[1300px] mx-auto ">
            <h1 className="text-gray-200 font-bold text-4xl py-4 text-center">User Cards</h1>
        
            <div className="pokemon-card-div">
                <ul className="pokemon-card-grid">
                    {userCards?.map((card:any,i:number) => (
                    <li key={i} className="pokemon-card animated" >
                        <img src={card.image} alt={card.id} />
                    </li>
                    ))}
                </ul>
            </div> 
        </div>
       
    )
}

export default UserCards;
import { useEffect, useState } from "react";
import "../css/Sets.css"
import { Link } from "react-router-dom";
import axios from 'axios';



export const useAnimateCards= ()=>{
    useEffect(()=>{
        if(typeof document!=undefined && document != null){
            const cards = document.getElementById("cards") as HTMLElement
            if(!cards) return 
            cards.onmousemove = (e:MouseEvent) => {
                const card_list = document.getElementsByClassName("card");
                for(const card of  card_list as any )  {
                    const rect = card.getBoundingClientRect(),
                            x = e.clientX - rect.left,
                            y = e.clientY - rect.top;
                
                    card.style.setProperty("--mouse-x", `${x}px`);
                    card.style.setProperty("--mouse-y", `${y}px`);
                };
            }
        }
         
    },[])
}
function Sets({preventNavigation, setSetId, setShowSets}:any) {
  const [sets, setSets] = useState([]);
  useAnimateCards();
  useEffect(() => {
    axios.get('http://localhost:5000/getSets')
      .then((response:any) => {
        setSets(response.data.data);
      })
      .catch((error:any) => {
        console.error('Error while fetching sets:', error);
      });
  }, []);

  const handleClick = (e:any, setId:any) => {
    e.preventDefault(); 
    setSetId(setId)
    setShowSets(false)
  };
  
  return (
  
    <div className=" gap-y-4  py-8  w-full max-w-[1300px] mx-auto ">
      <h1 className="text-gray-200 font-bold text-4xl py-4">Pokemon Card Sets</h1>
      <ul id="cards" className="grid grid-cols-2 md:grid-cols-4  gap-2 items-center px-4 ">
        {sets.map((set:any) => (
        <Link className="relative card flex flex-col items-center col-span-1 gap-1 lg:gap-4 hover:scale-[1.005] transition-all duration-500 rounded-xl w-full bg-[#111111]" to={"/pokemonCards/"+set.id} state={{ setId: set.id }}
          onClick={preventNavigation ? (e) => handleClick(e, set.id) : undefined}>
          <li key={set.id} className="flex flex-col rounded-lg   min-w-[260px] min-h-[260px] p-4 ">
            <h3 className="font-bold text-white text-center text-xl ">{set.name}</h3>
            <div className="flex-1 flex flex-col items-center justify-center">
              <img src={set.images.logo} alt={set.name} className="h-32 w-32 object-contain" />
            </div>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sets;


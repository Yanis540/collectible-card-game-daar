import { useEffect, useState } from "react";
import "../css/Sets.css"
import { Link } from "react-router-dom";
import axios from 'axios';

function Sets({preventNavigation, setSetId, setShowSets}:any) {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/getSets')
      .then(response => {
        setSets(response.data.data);
      })
      .catch(error => {
        console.error('Error while fetching sets:', error);
      });
  }, []);

  const handleClick = (e, setId) => {
    e.preventDefault(); 
    setSetId(setId)
    setShowSets(false)
  };
  
  return (
  
    <div className="pokemon-sets-div">
      <h1>Pokemon Card Sets</h1>
      <ul className="pokemon-sets-grid">
        {sets.map(set => (
        <Link className="pokemon-sets-a" to={"/pokemonCards/"+set.id} state={{ setId: set.id }}
          onClick={preventNavigation ? (e) => handleClick(e, set.id) : undefined}>
          <li key={set.id} className="pokemon-sets">
            <img src={set.images.logo} alt={set.name} />
            <h3>{set.name}</h3>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sets;


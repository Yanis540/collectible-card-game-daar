import '../css/Styles.css'; 


function SearchBar() {

  
  const usersList = [
    {   
        adress: 1 ,
        balance : 50, 
        pokemonCards: [ 
            {
                "id":"hgss4-1",
                "number":"1",
                "image":"https://images.pokemontcg.io/hgss4/1_hires.png"
            }, 
            {
                "id":"ru1-1",
                "number":"1",
                "image":"https://images.pokemontcg.io/ru1/1_hires.png"
            },
            {
                "id":"base4-1",
                "number":"1",
                "image":"https://images.pokemontcg.io/base4/1_hires.png"
            }
        ]
    },
    {
        adress: 2 , 
        balance : 30,
        pokemonCards:  [ 
            {
                "id":"pl1-1",
                "number":"1",
                "image":"https://images.pokemontcg.io/pl1/1_hires.png"
            },
            {
                "id":"gym1-1",
                "number":"1",
                "image":"https://images.pokemontcg.io/gym1/1_hires.png"
             },
             {
                "id":"pop6-1",
                "number":"1",
                "image":"https://images.pokemontcg.io/pop6/1_hires.png"
             },
        ]
    },
    {
        adress: 3 , 
        balance : 60,
        pokemonCards: [
            {
                "id":"dp3-1",
                "number":"1",
                "image":"https://images.pokemontcg.io/dp3/1_hires.png"
            }, 
            {
                "id":"pl1-1",
                "number":"1",
                "image":"https://images.pokemontcg.io/pl1/1_hires.png"
            }
        ]
    },
    {
        adress: 4 , 
        balance: 44,
        pokemonCards: [ 
            {
                "id":"det1-1",
                "number":"1",
                "image":"https://images.pokemontcg.io/det1/1_hires.png"
            }
        ]
    },
]

  const handleSearch = () => {
    // Implement your search functionality here using the 'query' state
    console.log("Searching for:", usersList);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={usersList.values} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;

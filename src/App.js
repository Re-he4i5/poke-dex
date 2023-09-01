import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      loadPokemon(res.results);
      // console.log(res);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  return (
    <div className="App">
      {loading ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          <h1>Data loaded</h1>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

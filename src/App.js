import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      loadPokemon(res.results);
      // console.log(res);
      setNextURL(res.next);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setPrevURL(data.previous);
    setNextURL(data.next);
    setLoading(false);
  };

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setPrevURL(data.previous);
    setNextURL(data.next);
    setLoading(false);
  };

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
          <div className="btn">
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

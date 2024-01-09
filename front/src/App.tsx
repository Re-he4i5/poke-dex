import React, { useEffect } from "react";
import "./App.css";
import { getPokemon, getAllPokemon } from "./utils/pokemon";
import Card from "./components/Card";

interface PokemonListResponse {
  results: Array<{ name: string; url: string }>;
}

function App() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [pokemonData, setPokemonData] = React.useState<any[]>([]);
  const [nextURL, setNextURL] = React.useState<string>("");
  const [prevURL, setPrevURL] = React.useState<string>("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = (await getAllPokemon(
        `https://pokeapi.co/api/v2/pokemon`
      )) as PokemonListResponse;
      loadPokemon(response.results);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data: Array<{ name: string; url: string }>) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
    // 確認用にローディングを遅延させる
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="App">
      {loading ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <div className="pokemonCardContainer">
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;

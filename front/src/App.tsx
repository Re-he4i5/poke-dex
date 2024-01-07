import React, { useEffect } from "react";
import "./App.css";
import { getPokemon, getAllPokemon } from "./utils/pokemon";
import Card from "./components/Card";

interface PokemonListResponse {
  results: Array<{ name: string; url: string }>;
}

function App() {
  const [pokemonData, setPokemonData] = React.useState<any[]>([]);

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
  };

  return (
    <div className="App">
      <div className="pokemonCardContainer">
        {pokemonData.map((pokemon, i) => {
          return <Card key={i} pokemon={pokemon} />;
        })}
      </div>
    </div>
  );
}

export default App;

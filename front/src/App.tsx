import React, { useEffect } from "react";
import "./App.css";
import { getPokemon, getAllPokemon } from "./utils/pokemon";

interface PokemonResponse {
  results: Pokemon[];
}

interface Pokemon {
  name: string;
  url: string;
}

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
      const pokemonList = response.results;

      console.log(pokemonList);
    };
    fetchPokemonData();
  }, []);

  return <div className="App"></div>;
}

export default App;

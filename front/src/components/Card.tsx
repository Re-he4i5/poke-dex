import React from "react";

interface PokemonProps {
  pokemon: {
    name: string;
    url: string;
    sprites: {
      front_default: string;
    };
  };
}

const Card: React.FC<PokemonProps> = ({ pokemon }) => {
  return (
    <div>
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <h3>{pokemon.name}</h3>
    </div>
  );
};

export default Card;

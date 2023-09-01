import React from "react";

const Card = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <div class="card">
      <div class="card__image-container">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <h4>
          {pokemon.types.map((type) => {
            return <p>{type.type.name}</p>;
          })}
        </h4>
        <div className="cardInfo">
          <div className="cardData">
            <p className="title">重さ: {pokemon.weight} </p>
          </div>
          <div className="cardData">
            <p className="title">高さ: {pokemon.height} </p>
          </div>
          <div className="cardData">
            <p className="title">
              アビリティ: {pokemon.abilities[0].ability.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

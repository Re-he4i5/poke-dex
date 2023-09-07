import React from "react";
import "./Card.css";

const Card = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <h3>{pokemon.name}</h3>
      <div className="cardType">
        <p>
          タイプ:{" "}
          {pokemon.types.map((type) => {
            return <span>{type.type.name}</span>;
          })}
        </p>
      </div>
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
  );
};

export default Card;

import React from "react";
import "./style.css";

const CardList = (props) => {
  return (
    <div className="downloades-game-container">
      <div className="downloades-game-img">
        <img src={props.imagem_url} alt={props.name} />
      </div>

      <div className="downloades-game-info">
        <div>
          <h1 className="downloades-game-title">{props.name}</h1>
          <p className="downloades-game-cost">R$: {props.cost},00</p>
          <p className="downloades-game-category">
            Categoria: {props.category}
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CardList;

import React from "react";
import "./style.css";

const CardAnnoucement = (props) => {

  // console.log("Caminho da imagem:", props.imagem); 

  return (
    <div className="card-annoucement-container">
      <div className="card-annoucement-img">
        <img src={props.imagem} alt={props.name} />
      </div>

      <div className="card-annoucement-info">
        <div>
          <h1 className="card-annoucement-title">{props.name}</h1>
          <p className="card-annoucement-cost">R$: {props.cost},00</p>
          <p className="card-annoucement-category">Categoria: {props.category}</p>
        </div>
        <div>
          <button className="btn-annoucement">Ver Mais</button>
        </div>
      </div>
    </div>
  );
};

export default CardAnnoucement;

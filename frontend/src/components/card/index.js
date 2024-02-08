import React from "react";
import "./style.css";
import { Navigate, useNavigate } from "react-router-dom";

const Card = (props) => {
  // const [open, setOpen] = React.useState(false);
  const Navigate = useNavigate();

  const handleClickCard = () => {
    // setOpen(true);
    Navigate("/gameInformation");
  };

  return (
    <>
      {/* <FormDialog
        open={open}
        setOpen={setOpen}
        name={props.name}
        cost={props.cost}
        category={props.category}
        ListCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      /> */}

      <div className="card-container" onClick={() => handleClickCard()}>
        <img src={props.imagem} alt={props.name} />
        <h1 className="card-title">{props.name}</h1>
        <div className="card-info">
          <p className="card-cost">R$:{props.cost},00</p>
          <p className="card-category">Categoria:{props.category}</p>
        </div>
      </div>
    </>
  );
};

export default Card;

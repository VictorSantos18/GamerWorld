import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../../axiosInterceptor";
import CardAnnoucement from "../../cardAnnoucement/index";
import "./style.css";

const Annoucement = () => {
  const [listGames, setListGames] = useState([]);

  useEffect(() => {
    axiosInstance.get("http://localhost:3001/lista").then((response) => {
      setListGames(response.data);
    });
  }, []);

  return (
    <div className="annoucement-container">
      <div className="annoucement-content">
        <div className="annoucement-img"></div>
        <div className="annoucement-info">
          {listGames.map((value) => {
            if (value.category === "Hack and Slash") {
              return (
                <NavLink
                  to={`/gameInformation/${value.idgames}`}
                  key={value.idgames}
                >
                  <CardAnnoucement
                    listCard={listGames}
                    setListCard={setListGames}
                    id={value.idgames}
                    name={value.name}
                    cost={value.cost}
                    category={value.category}
                    imagem={`http://localhost:3001/img/` + value.imagem}
                  ></CardAnnoucement>
                </NavLink>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};
export default Annoucement;

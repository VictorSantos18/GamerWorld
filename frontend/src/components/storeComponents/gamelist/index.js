import React, { useState, useEffect } from "react";
import "./style.css";
import axiosInstance from "../../../axiosInterceptor";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import Card from "../../card";

const GameList = () => {
  const [listGames, setListGames] = useState([]);

  useEffect(() => {
    axiosInstance.get("http://localhost:3001/lista").then((response) => {
      setListGames(response.data);
    });
  }, []);

  return (
    <div className="games-container">
      <div className="games-content">
        <div className="games-title">
          <p>RPG</p>
        </div>
        <div className="map">
          {listGames &&
            listGames.map((value) => {
              if (value.category === "RPG") {
                return (
                  <NavLink to={`/gameInformation/${value.idgames}`} key={value.idgames}>
                    <Card
                      key={value.idgames}
                      listCard={listGames}
                      setListCard={setListGames}
                      id={value.idgames}
                      name={value.name}
                      cost={value.cost}
                      category={value.category}
                      imagem={`http://localhost:3001/img/` + value.imagem}
                    ></Card>
                  </NavLink>
                );
              }
              return null;
            })}
        </div>
      </div>
      <div className="games-content">
        <div className="games-title">
          <p>Hack and Slash</p>
        </div>
        <div className="map">
          {listGames &&
            listGames.map((value) => {
              if (value.category === "Hack and Slash") {
                return (
                  <NavLink to={`/gameInformation/${value.idgames}`} key={value.idgames}>
                    <Card
                      listCard={listGames}
                      setListCard={setListGames}
                      id={value.idgames}
                      name={value.name}
                      cost={value.cost}
                      category={value.category}
                      imagem={`http://localhost:3001/img/` + value.imagem}
                    ></Card>
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

export default GameList;

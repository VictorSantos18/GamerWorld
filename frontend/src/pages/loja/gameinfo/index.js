import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import Divider from "../../../components/divider";
import HeaderGameInfo from "../../../components/headergameinfo";
import LateralInformation from "../../../components/lateralInfo";

const GameInformation = (data) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [listGames, setListGames] = useState([]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="store-container">
      <div className={`flex ${showSidebar ? "shifted" : ""}`}>
        <Sidebar isOpen={showSidebar} onClose={toggleSidebar} />
        <Navbar />
        <main>
          <Divider>
            <div className="title-back-gameinfo">
              <Link to="/loja">
                <FaAngleLeft className="back-icon" />
              </Link>
            </div>
          </Divider>
          <div className="gameinformation-container">
            <div>
              <HeaderGameInfo />
            </div>
            <div>
              <LateralInformation />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GameInformation;

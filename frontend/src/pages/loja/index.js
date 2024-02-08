import React, { useState, useEffect } from "react";
import "./style.css";
import Annoucement from "../../components/storeComponents/annoucement";
import GamesList from "../../components/storeComponents/gamelist";
import Divider from "../../components/divider";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";

const Loja = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <>
      <div className="store-container">
        <div className={`flex ${showSidebar ? "shifted" : ""}`}>
          <Sidebar isOpen={showSidebar} onClose={toggleSidebar} />
          <Navbar />
          <main>
            <Divider>
              <div>Jogos Recomendados </div>
            </Divider>
            <div>
              <Annoucement />
            </div>
            <Divider>
              <div>jogos em destaque</div>
            </Divider>
            <div>
              <GamesList />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Loja;

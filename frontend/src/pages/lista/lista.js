import React, { useState, useEffect } from "react";
import "./style.css";
import Divider from "../../components/divider";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import UserDownloads from "../../components/storeComponents/userGameList";

const Lista = () => {
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
            <div className="list-container">
              <Divider>
                <div>Lista de Jogos</div>
              </Divider>
              <div>
                <UserDownloads />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Lista;

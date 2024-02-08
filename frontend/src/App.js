import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lista from "./pages/lista/lista";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Perfil from "./pages/perfil";
import Loja from "./pages/loja";
import "./components/global/globalStyle.css";
import GameInformation from "./pages/loja/gameinfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="registro" element={<Signup />} />
        <Route path="lista" element={<Lista />} />
        <Route path="perfil" element={<Perfil />} /> 
        <Route path="/loja" element={<Loja />} />
        <Route path="/gameInformation/:id" element={<GameInformation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

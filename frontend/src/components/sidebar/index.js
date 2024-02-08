import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor";
import { FaSignOutAlt, FaThList, FaBuffer } from "react-icons/fa";
import Axios from "axios";
import "./style.css";

const Sidebar = ({ isOpen, onClose }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onClose();
  };

  const getToggleButtonIcon = () => {
    return isSidebarOpen ? "✕" : "☰";
  };

  useEffect(() => {
    axiosInstance.get("http://localhost:3001").then((res) => {
      if (res.data.Status === "Tudo Certo!") {
        setAuth(true);
        setName(res.data.nome_cliente);
      } else {
        setAuth(false);
        navigate("/");
      }
    });
  }, []);

  const handleLogout = () => {
    axiosInstance
      .get("http://localhost:3001/logout")
      .then((res) => {
        if (res.data.Status === "Tudo Certo!") {
          navigate("/");
          window.location.reload(true);
        } else {
          alert("erro");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {getToggleButtonIcon()}
      </button>
      <div className="logo">
        <Link to="/loja" className="navlink">
          <h2>
            gamer<span>world</span>
          </h2>
        </Link>
      </div>
      <div className="links">
        <nav>
          <li>
            <NavLink to="/loja">
              <FaBuffer />
              <span>Loja</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/lista">
              <FaThList />
              <span>Lista de Jogos</span>
            </NavLink>
          </li>
          <div className="logout">
            <FaSignOutAlt />
            <button onClick={handleLogout} className="logout-link">
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor";
import ProfileModal from "../ProfileModal";
import { FaUserAlt } from "react-icons/fa";
import "./style.css";

const Navbar = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("http://localhost:3001").then((res) => {
      if (res.data.Status === "Tudo Certo!") {
        setAuth(true);
        setName(res.data.nome_cliente);
        setEmail(res.data.email_cliente);
      } else {
        setAuth(false);
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      {isModalOpen && (
        <ProfileModal
          closeModal={() => setIsModalOpen(false)}
          email={email}
          name={name}
        />
      )}
      <div className="navbar">
        <div className="logo"></div>
        <div className="info" onClick={() => setIsModalOpen(true)}>
          <FaUserAlt className="icon" />
          <span className="navname">Olá, {name}</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;

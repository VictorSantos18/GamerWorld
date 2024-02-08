import React, { useState } from "react";
import LoginImg from "../../assets/loginImg.jpg";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import Cookies from "js-cookie";

const Login = () => {
  const [values, setValues] = useState({
    email_cliente: "",
    password_cliente: "",
  });

  const navigate = useNavigate();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/login", values);

      if (response.data.Status === "Tudo Certo!") {
        Cookies.set("token", response.data.token, { expires: 1 });
        const { nome_cliente } = response.data;

        navigate("/loja");
        toast.success(`Bem vindo, ${nome_cliente}!`, { position: "top-right" });
        console.log(`Bem vindo, ${nome_cliente}!`)
      } else {
        alert(response.data.Message);
      }
    } catch (err) {
      console.error("Erro ao realizar login:", err);
      toast.error("Erro ao realizar login", { position: "top-right" });
    }
  };

  return (
    <>
      <div className="bg">
        <div className="login-img">
          <img src={LoginImg} alt="login-image" />
        </div>
        <div className="form-bg">
          <form onSubmit={handleLogin}>
            <div className="login-container">
              <span>Login</span>
              <div className="login-row">
                <input
                  type="email"
                  placeholder="Email"
                  className="login-input"
                  name="email_cliente"
                  onChange={handleChangeValues}
                  required
                />
              </div>
              <div className="login-row">
                <input
                  type="password"
                  placeholder="Senha"
                  className="login-input"
                  name="password_cliente"
                  onChange={handleChangeValues}
                  required
                />
              </div>
              <button type="submit" className="btn">
                Entrar
              </button>
            </div>
            <p className="click-link">
              Não possui registro ainda?<Link to="/registro">Registrar-se</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

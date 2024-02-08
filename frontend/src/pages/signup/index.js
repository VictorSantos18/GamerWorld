import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignImg from "../../assets/signImg.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../axiosInterceptor";
import "./style.css";

const Signup = () => {
  const [values, setValues] = useState({
    nome_cliente: "",
    email_cliente: "",
    password_cliente: "",
  });

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Isso evita o comportamento padrão de envio do formulário

    if (
      !values.nome_cliente ||
      !values.email_cliente ||
      !values.password_cliente
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios.", {
        position: "top-right",
      });
      return;
    }

    axiosInstance
      .post("/signup", {
        nome_cliente: values.nome_cliente,
        email_cliente: values.email_cliente,
        password_cliente: values.password_cliente,
      })
      .then((response) => {
        if (response.data.Status === "Sucesso!") {
          console.log("Cadastro Realizado com Sucesso!");
          toast.success("Cadastro Realizado com Sucesso!!", {
            position: "top-right",
          });
        } else {
          console.error("Não funcionou!");
          toast.error("Não funcionou.", { position: "top-right" });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ToastContainer />
      <div className="bg">
        <div className="form-bg">
          <form onSubmit={handleSubmit}>
            <div className="login-container">
              <span>Cadastro</span>
              <div className="login-row">
                <input
                  type="text"
                  placeholder="nome"
                  className="login-input"
                  name="nome_cliente"
                  onChange={handleChangeValues}
                  required
                />
              </div>
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
                Cadastrar
              </button>
            </div>
            <p className="click-link">
              Já é registrado?<Link to="/">Entrar</Link>
            </p>
          </form>
        </div>
        <div className="login-img">
          <img src={SignImg} alt="login-image" />
        </div>
      </div>
    </>
  );
};

export default Signup;

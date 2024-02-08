import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import axiosInstance from "../../axiosInterceptor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

function Perfil() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("");

  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    axiosInstance.get("http://localhost:3001").then((res) => {
      console.log("Resposta do login:", res.data);
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

  const [file, setFlie] = useState();

  const handleFile = (e) => {
    setFlie(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("imagem", file);

    axiosInstance
      .post("http://localhost:3001/upload", formData)
      .then((res) => {
        if (res.data.Status === "Sucesso") {
          console.log("Feito");
          toast.success("Imagem inserida com sucesso!", {
            position: "top-right",
          });
        } else {
          console.log("Deu errado");
          toast.error("Algo deu errado", { position: "top-right" });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="store-container">
        <div className={`flex ${showSidebar ? "shifted" : ""}`}>
          <Sidebar isOpen={showSidebar} onClose={toggleSidebar} />
          <Navbar />
          <main>
            <div className="perfil">
              {auth ? (
                <div className="auth-content">
                  <span>
                    Seja bem vindo <b>{name}</b>!
                  </span>
                  <div className="auth-box">
                    <div>
                      <span>Nome: {name}</span>
                    </div>
                    <div>
                      <span>E-mail: {email}</span>
                    </div>
                  </div>
                  <div>
                    <input type="file" onChange={handleFile} />
                    <button onClick={handleUpload}>Enviar Imagem</button>
                  </div>
                  <ToastContainer />
                </div>
              ) : (
                <div className="auth-content">
                  <span>{message}</span>
                  <span>Faça login agora</span>
                  <Link to="/login">Fazer Login</Link>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Perfil;

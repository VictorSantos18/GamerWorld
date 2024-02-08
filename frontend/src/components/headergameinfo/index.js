import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Divider from "../../components/divider";
import Axios from "axios";
import PaymentModal from "../PaymentModal";
import axiosInstance from "../../axiosInterceptor";
import FullScreenImageModal from "../fullScreamModal";
import "./style.css";
import GameInfoReview from "../review";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import CommentForm from "../review/commentForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderGameInfo = () => {
  const { id } = useParams();
  const [gameInfo, setGameInfo] = useState({});
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [gameImages, setGameImages] = useState([]);
  const [idclientes, setIdClientes] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(
    Cookies.get(`gameDownloaded_${id}`) ? "success" : "pending"
  );

  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    axiosInstance.get("http://localhost:3001").then((res) => {
      console.log("Resposta do login:", res.data);
      if (res.data.Status === "Tudo Certo!") {
        setAuth(true);
        setEmail(res.data.email_cliente);
      } else {
        setAuth(false);
        navigate("/");
      }
    });
  }, []);
  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const [infoResponse, imagesResponse] = await Promise.all([
          axiosInstance.get(`http://localhost:3001/gameInformation/${id}`),
          axiosInstance.get(`http://localhost:3001/gameImages/${id}`),
        ]);

        setGameInfo(infoResponse.data);
        setGameImages(imagesResponse.data);
        checkDownloadStatus();
      } catch (error) {
        console.error("Erro ao buscar informações do jogo:", error);
      }
    };

    fetchGameInfo();

    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setIdClientes(decodedToken.idclientes);
    }
  }, [id]);

  useEffect(() => {
    checkDownloadStatus();
  }, [id]);

  const checkDownloadStatus = () => {
    const isDownloaded = Cookies.get(`gameDownloaded_${id}`) === "true";
    setDownloadStatus(isDownloaded ? "success" : "pending");
  };

  const handlePayment = () => {};

  const handleDownload = async () => {
    try {
      // Ler o token JWT dos cookies
      const token = Cookies.get("token");
      // Verificar se o token JWT está presente
      if (token) {
        const response = await axiosInstance.post(
          `http://localhost:3001/downloadGame/${id}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data.message);
        toast.success("Compra realizada com sucesso!", {
          position: "top-right",
        });

        // Define um cookie para indicar que o jogo foi baixado
        Cookies.set(`gameDownloaded_${id}`, "true");

        setDownloadStatus("success");
      } else {
        // Se o token JWT não estiver presente, você pode tratar isso aqui
        console.error("Token JWT não encontrado.");
        toast.error("Token JWT não encontrado.", { position: "top-right" });
      }
    } catch (error) {
      console.error("Erro ao Comprar o jogo:", error);
      toast.error("Jogo já está na sua biblioteca", { position: "top-right" });
    }
  };

  const handleViewList = () => {
    navigate("/lista");
  };

  const checkIfGameIsDownloaded = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        const response = await axiosInstance.get(
          `http://localhost:3001/checkGameDownloaded/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // A API deve retornar true se o jogo estiver na lista de jogos baixados e false caso contrário
        return response.data.isDownloaded;
      }
      return false; // Token JWT não encontrado
    } catch (error) {
      console.error(
        "Erro ao verificar se o jogo está na lista de jogos baixados:",
        error
      );
      return false; // Em caso de erro, considere que o jogo não está na lista
    }
  };

  const openFullScreenImage = (imageURL) => {
    setFullScreenImage(imageURL);
  };

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:3001/comentarios/${id}`
      );

      // Assuma que a resposta contém a lista de comentários no formato response.data.comments
      const newComments = response.data.comments || [];

      // Atualize o estado com os novos comentários
      setComments(newComments);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    }
  };

  return (
    <>
      <div className="info-container">
        <div className="img-info">
          <div className="gamebox-img">
            {gameInfo.imagem && (
              <img
                src={`http://localhost:3001/img/${gameInfo.imagem}`}
                alt={gameInfo.name}
                className="gameinfo-image"
              />
            )}
          </div>
          <div className="gamebox-info">
            <div className="gamebox-content">
              <div className="gamebox-nome">
                <span>{gameInfo.name}</span>
              </div>
              <p>{gameInfo.descricao}</p>
            </div>
            <div className="gamebox-content">
              <div className="gamebox-categoria">
                <h2>
                  <span>Categoria:</span> {gameInfo.category}
                </h2>
              </div>
              <div className="gamebox-preco">
                <h2>R$: {gameInfo.cost},00</h2>
                <button
                  className="btn"
                  onClick={() => {
                    if (downloadStatus === "pending") {
                      setIsPaymentModalOpen(true);
                    } else {
                      handleViewList();
                    }
                  }}
                >
                  {downloadStatus === "pending"
                    ? "Comprar"
                    : "Ver na lista de jogos"}
                </button>
                {isPaymentModalOpen && (
                  <PaymentModal
                    handleDownload={handleDownload}
                    closeModal={() => setIsPaymentModalOpen(false)}
                    email={email}
                    gameInfo={gameInfo}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <Divider>
          <hr></hr>
        </Divider>
        <div className="image-box">
          <div className="image-content">
            {gameImages && gameImages.length > 0 ? (
              gameImages.map((image) => (
                <img
                  key={image.id}
                  src={`http://localhost:3001/img/${image.url_da_imagem}`}
                  alt={`Imagem ${image.id}`}
                  onClick={() =>
                    openFullScreenImage(
                      `http://localhost:3001/img/${image.url_da_imagem}`
                    )
                  }
                />
              ))
            ) : (
              <p>Nenhuma imagem disponível.</p>
            )}
          </div>
        </div>
        <Divider>
          <div>Descrição de conteúdo adulto</div>
          <hr></hr>
        </Divider>
        <div className="classification">
          <p>Descrição dos desenvolvedores sobre o conteúdo:</p>
          <p>
            Este jogo pode conter conteúdo não apropriado para todas as idades
            ou para visualização no trabalho: Violência frequente ou detalhada,
            Conteúdo adulto não específico.
          </p>
        </div>
      </div>
      <div className="info-container">
        <Divider>
          <div>Review e Avaliações</div>
          <hr></hr>
        </Divider>
        <div className="gamebox-review">
          <GameInfoReview comments={comments} />
        </div>
      </div>
      <div className="info-container">
        <Divider>
          <div>Deixe seu comentário</div>
          <hr></hr>
        </Divider>
        <div className="gamebox-review">
          {idclientes && (
            <CommentForm
              idclientes={idclientes}
              fetchComments={fetchComments}
            />
          )}
        </div>
      </div>
      {fullScreenImage && (
        <FullScreenImageModal
          imageURL={fullScreenImage}
          onClose={() => setFullScreenImage(null)}
        />
      )}
    </>
  );
};

export default HeaderGameInfo;

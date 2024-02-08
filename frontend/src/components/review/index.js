import React, { useState, useEffect } from "react";
import ReviewImg from "../../assets/RevImg.jpg";
import { FaStar } from "react-icons/fa";
import "./style.css";
import axiosInstance from "../../axiosInterceptor";

const renderStars = (nota) => {
  const starIcons = [];
  const notaInt = parseInt(nota, 10);

  for (let i = 1; i <= 5; i++) {
    if (i <= notaInt) {
      starIcons.push(<FaStar key={i} className="star-pink" />);
    } else {
      starIcons.push(<FaStar key={i} className="star-black" />);
    }
  }

  return starIcons;
};

const GameInfoReview = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idjogo = window.location.pathname.split("/")[2];
        const response = await axiosInstance.get(
          `http://localhost:3001/comentarios/${idjogo}`
        );

        const fetchedComments = response.data.comentarios || [];

        setComments(fetchedComments);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar comentários:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  
  return (
    <div className="comment-list">
      {isLoading ? (
        <p>Carregando comentários...</p>
      ) : comments.length === 0 ? (
        <p>Nenhum comentário disponível ainda.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.idcomentario} className="comment-item">
              <div className="comment-header">
                <div className="imgAndname">
                  <img src={ReviewImg} alt="review image" />
                  <h3>{comment.nome_cliente}</h3>
                </div>
                <div className="nota">{renderStars(comment.nota)}</div>
              </div>
              <div className="comment">
                <p>{comment.comentario}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GameInfoReview;

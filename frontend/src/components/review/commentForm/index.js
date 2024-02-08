import React, { useState } from "react";
import axiosInstance from "../../../axiosInterceptor";
import "./style.css";
import { toast } from "react-toastify";

const CommentForm = ({ idclientes, fetchComments }) => {
  const [comment, setComment] = useState("");
  const [nota, setNota] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtém o ID do jogo da URL
    const idjogo = window.location.pathname.split("/")[2];

    try {
      const response = await axiosInstance.post(
        "http://localhost:3001/enviar-comentario",
        {
          idjogo,
          idclientes,
          comentario: comment,
          nota: nota,
        }
      );

      if (response.status === 201) {
        console.log("Comentário enviado com sucesso!");
        setComment("");
        setNota(0);

        // Chame a função fetchComments após o envio bem-sucedido
        fetchComments();

        toast.success("Comentário enviado com sucesso!", {
          position: "top-right",
        });
        window.location.reload(true);
      } else {
        console.error("Erro ao enviar o comentário.");
      }
    } catch (error) {
      console.error("Erro ao enviar o comentário:", error);
    }
  };
  return (
    <div className="comment-form-container">
      <h3>Deixe seu comentário</h3>
      <form onSubmit={handleSubmit}>
        <div className="comment">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            cols="50"
            className="textarea"
          />
        </div>
        <div className="rate">
          <div>
            <button type="submit" className="btn">
              Enviar Comentário
            </button>
          </div>
          <div>
            <p>Classificação:</p>
            <select value={nota} onChange={(e) => setNota(e.target.value)}>
              <option value="1">1 estrela</option>
              <option value="2">2 estrelas</option>
              <option value="3">3 estrelas</option>
              <option value="4">4 estrelas</option>
              <option value="5">5 estrelas</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;

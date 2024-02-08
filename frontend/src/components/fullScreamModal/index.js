import React from "react";
import { BiX } from "react-icons/bi";
import "./style.css";

const FullScreenImageModal = ({ imageURL, onClose }) => {
  return (
    <div className="full-screen-image-modal">
      <div className="modal-content">
        <div className="header-modal">
          <div></div>
          <BiX className='close-button' onClick={onClose} />
        </div>
        <img src={imageURL} alt="Imagem em tela cheia" />
      </div>
    </div>
  );
};

export default FullScreenImageModal;

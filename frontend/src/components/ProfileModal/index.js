import React from "react";
import "./style.css";
import Divider from "../divider";

const ProfileModal = ({ closeModal, email, name }) => {
  const getToggleButtonIcon = () => {
    return getToggleButtonIcon ? "✕" : "✕";
  };

  return (
    <div className="bg-modal">
      <div className="profile-modal">
        <div className="header-modal">
          <h2>Informações Pessoais</h2>
          <button className="closeModal" onClick={closeModal}>
            {getToggleButtonIcon()}
          </button>
        </div>
        <Divider>
          <hr></hr>
        </Divider>
        <div className="content-modal">
          <div className="input-modal">
            <p>Nome</p>
            <input type="email" placeholder="Email" value={name} disabled />
          </div>
          <div className="input-modal">
            <p>Email</p>
            <input type="email" placeholder="Email" value={email} disabled />
          </div>
        </div>

        <div className="footer-modal"></div>
      </div>
    </div>
  );
};

export default ProfileModal;

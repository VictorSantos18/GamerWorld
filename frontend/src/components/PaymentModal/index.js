import { React, useState } from "react";
import { FaSignOutAlt, FaThList, FaBuffer } from "react-icons/fa";
import "./style.css";

const PaymentModal = ({ handleDownload, closeModal, email, gameInfo }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCVC] = useState("");

  const formatCardNumber = (input) => {
    // Remove espaços em branco e caracteres não numéricos
    let cardDigits = input.replace(/\D/g, "");

    // Limita o comprimento para 16 caracteres (4 grupos de 4)
    if (cardDigits.length > 16) {
      cardDigits = cardDigits.slice(0, 16);
    }
    // Adiciona espaços a cada 4 dígitos
    const formattedCardNumber = cardDigits.replace(/(\d{4})/g, "$1 ");

    return formattedCardNumber;
  };
  const handleCardNumberChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatCardNumber(inputValue);
    setCardNumber(formattedValue);
  };
  const formatExpirationDate = (input) => {
    // Remove caracteres não numéricos
    let formattedInput = input.replace(/\D/g, "");

    // Adiciona uma barra após os primeiros dois dígitos (MM)
    if (formattedInput.length > 2) {
      formattedInput =
        formattedInput.slice(0, 2) + "/" + formattedInput.slice(2);
    }

    // Limita o comprimento para "MM/YY" (5 caracteres)
    if (formattedInput.length > 5) {
      formattedInput = formattedInput.slice(0, 5);
    }

    return formattedInput;
  };

  const formatCVC = (input) => {
    // Remove caracteres não numéricos
    let formattedInput = input.replace(/\D/g, "");

    // Limita o comprimento para 3 dígitos (CVC)
    if (formattedInput.length > 3) {
      formattedInput = formattedInput.slice(0, 3);
    }

    return formattedInput;
  };

  const handleExpirationDateChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatExpirationDate(inputValue);
    setExpirationDate(formattedValue);
  };

  const handleCVCChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatCVC(inputValue);
    setCVC(formattedValue);
  };

  const getToggleButtonIcon = () => {
    return getToggleButtonIcon ? "✕" : "✕";
  };

  return (
    <div className="bg-modal">
      <div className="modal">
        <div className="left-side">
          <div className="items">
            <h2>Item:</h2>
            <h4>{gameInfo.name}</h4>
            <h2>R$: {gameInfo.cost},00</h2>
          </div>
        </div>
        <div className="right-side">
          <div className="header-modal">
            <button className="closeModal" onClick={closeModal}>
              {getToggleButtonIcon()}
            </button>
          </div>
          <div className="content-modal">
            <h2>Efetuar Pagamento</h2>
            <div className="input-modal">
              <input type="email" placeholder="Email" value={email} required />
            </div>
            <div className="input-modal">
              <select className="category" name="category">
                <option value="">Forma de Pagamento</option>
                <option value="1">Crédito</option>
                <option value="2">Débito</option>
              </select>
            </div>
            <div className="input-modal">
              <input
                type="text"
                placeholder="Número do Cartão (XXXX XXXX XXXX XXXX)"
                value={cardNumber}
                onChange={handleCardNumberChange}
                required
              />
            </div>
            <div className="flex-input">
              <div className="input-modal">
                <input
                  type="text"
                  placeholder="MM/YY (MM/AA)"
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                  required
                />
              </div>
              <div className="input-modal">
                <input
                  type="text"
                  placeholder="CVC (XXX)"
                  value={cvc}
                  onChange={handleCVCChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="header-modal">
            <button className="btn" onClick={() => handleDownload()}>
              Comprar {gameInfo.cost},00
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

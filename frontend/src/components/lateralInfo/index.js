import React from "react";
import Plus18 from "../../assets/+18.png";
import DataTable from "./dataTable";
import * as FaIcons from "react-icons/fa";
import "./style.css";

const LateralInformation = () => {
  const getIcon = (iconName) => {
    const IconComponent = FaIcons[iconName];
    if (IconComponent) {
      return <IconComponent />;
    }
    return null;
  };

  return (
    <div className="lateral-info">
      <div className="classificação">
        <div className="top">
          <h2>Classificação indicativa: 18 anos</h2>
        </div>
        <div className="middle">
          <img src={Plus18} alt="Plus 18" />
          <div className="text">
            <p>violência extrema</p>
            <p>lnguagem impoópria</p>
          </div>
        </div>
        <div className="bottom">
          <p>Classificação: Coordenação de Classificação Indicativa</p>
        </div>
      </div>
      <div className="idioma">
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Idiomas:</th>
                <th>Dublagem</th>
                <th>Legenda</th>
              </tr>
            </thead>
            <tbody>
              {DataTable.map((d, i) => (
                <tr key={i}>
                  <td>{d.idioma}</td>
                  <td>{getIcon(d.dublagem)}</td>
                  <td>{getIcon(d.legenda)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LateralInformation;

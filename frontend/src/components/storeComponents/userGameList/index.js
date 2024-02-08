import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../../axiosInterceptor";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import CardList from "../../cadrList";
import "./style.css";

const UserDownloads = () => {
  const [userDownloads, setUserDownloads] = useState([]);
  const [idclientes, setIdClientes] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Verificar se idclientes está disponível no cookie
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setIdClientes(decodedToken.idclientes);
    }
  }, []);

  useEffect(() => {
    if (idclientes) {
      // Consultar a API para obter a lista de jogos baixados pelo usuário
      axiosInstance
        .get(`/userDownloads/${idclientes}`)
        .then((response) => {
          setUserDownloads(response.data);

          // Coletar categorias únicas dos jogos baixados
          const categories = response.data.map((value) => value.category);
          const uniqueCategories = Array.from(new Set(categories));
          setUniqueCategories(uniqueCategories);

          setIsLoading(false); // Indica que os dados foram carregados
        })
        .catch((error) => {
          console.error("Erro ao obter a lista de jogos baixados:", error);
        });
    }
  }, [idclientes]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar jogos com base na categoria selecionada
  const filteredDownloads = userDownloads.filter((value) => {
    return (
      (!selectedCategory || value.category === selectedCategory) &&
      (!searchTerm ||
        value.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div>
      <div className="filter-bar">
        <div className="search-input">
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="category-dropdown">
          <label htmlFor="category">Filtrar por categoria:</label>
          <select
            className="category"
            name="category"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">Todas as categorias</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="downloaded-games-list">
        {isLoading ? (
          <p>Carregando...</p>
        ) : filteredDownloads.length === 0 ? (
          <p>Nenhum jogo disponível para esta categoria.</p>
        ) : (
          filteredDownloads.map((value) => (
            <NavLink
              to={`/gameInformation/${value.idgames}`}
              key={value.idgames}
            >
              <CardList
                key={value.idgames}
                name={value.name}
                cost={value.cost}
                category={value.category}
                imagem_url={`http://localhost:3001/img/${value.imagem}`}
              />
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDownloads;

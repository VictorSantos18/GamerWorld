const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
require("dotenv").config()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST, GET"],
    credentials: true,
  })
);

// --------------------------- Cookie Session --------------------------- //

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "Você não possui um token, providencia-lo!" });
  } else {
    jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Erro de Autenticação" });
      } else {
        req.nome_cliente = decoded.nome_cliente;
        req.idclientes = decoded.idclientes;
        req.email_cliente = decoded.email_cliente;
        next();
      }
    });
  }
};

// --------------------------- VerifyUser Session --------------------------- //

app.get("/", verifyUser, (req, res) => {
  return res.json({
    Status: "Tudo Certo!",
    nome_cliente: req.nome_cliente,
    idclientes: req.idclientes,
    email_cliente: req.email_cliente
  });
});

// --------------------------- Login Session --------------------------- //
app.post("/login", (req, res) => {
  const { email_cliente } = req.body;
  const { password_cliente } = req.body;

  SQL =
    "SELECT * FROM clientes WHERE email_cliente = ? and password_cliente = ?";

  db.query(SQL, [email_cliente, password_cliente], (err, result) => {
    if (err) return res.json({ Message: "Erro ao realizar login" });
    if (result.length > 0) {
      const idclientes = result[0].idclientes;
      const nome_cliente = result[0].nome_cliente;
      const email_cliente = result[0].email_cliente;
      const token = jwt.sign(
        { nome_cliente, email_cliente, idclientes },
        "our-jsonwebtoken-secret-key",
        {
          expiresIn: "1d",
        }
      );

      res.cookie("token", token);
      return res.json({
        Status: "Tudo Certo!",
        token: token,
        nome_cliente: nome_cliente,
        email_cliente: email_cliente,
        idclientes: idclientes,
      });
    } else {
      return res.json({ Message: "Email ou senha inválidos, tente novamente" });
    }
  });
});

// --------------------------- Logout Session --------------------------- //

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Tudo Certo!" });
});

// --------------------------- Sign-Up Session --------------------------- //

app.post("/signup", (req, res) => {
  const { nome_cliente, email_cliente, password_cliente } = req.body;

  const SQL =
    "INSERT INTO clientes (nome_cliente, email_cliente, password_cliente) VALUES (?,?,?)";

  db.query(
    SQL,
    [nome_cliente, email_cliente, password_cliente],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ Status: "Erro", Message: "Erro ao cadastrar" });
      } else {
        console.log("Sucesso!");
        return res.json({ Status: "Sucesso!" });
      }
    }
  );
});

// --------------------------- Cadastro de Jogos Session --------------------------- //

app.post("/cadastro", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;

  const SQL = "INSERT INTO games (name, cost, category) VALUES (?,?,?)";

  db.query(SQL, [name, cost, category], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// --------------------------- cabeçalho de controle de cache --------------------------- //

// app.post("/upload", upload.single("imagem"), (req, res) => {
//   const imagem = req.file.filename;
//   const SQL = "UPDATE games SET imagem = ? WHERE idgames=10";

//   db.query(SQL, [imagem], (err, result) => {
//     if (err) return res.json({ Message: "Erro" });
//     return res.json({ Status: "Sucesso" });
//   });
// });

app.post("/upload", upload.single("imagem"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ Status: "Erro", Message: "Nenhuma imagem recebida." });
  }

  const imagem = req.file.filename;
  const game_id = 18; // Altere para o ID do jogo correto

  const SQL = "INSERT INTO game_images (game_id, url_da_imagem) VALUES (?, ?)";
  db.query(SQL, [game_id, imagem], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ Status: "Erro", Message: "Erro ao inserir a imagem." });
    }
    return res.json({ Status: "Sucesso" });
  });
});
// --------------------------- Lista de Jogos Session --------------------------- //

app.get("/lista", (req, res) => {
  let SQL = "SELECT * from games ";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// --------------------------- Lista de Amigos Session --------------------------- //

app.get("/clienteinfo", (req, res) => {
  let SQL = "SELECT * from clientes ";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// --------------------------- Lista de Jogos por usuario --------------------------- //

app.get("/userDownloads/:idclientes", verifyUser, (req, res) => {
  const userId = req.params.idclientes;

  if (!userId) {
    return res.status(400).json({ error: "ID do usuário não fornecido" });
  }

  // Consulte o banco de dados para obter a lista de jogos baixados pelo usuário com o userId
  const SQL = `
    SELECT games.* 
    FROM games
    INNER JOIN downloads ON games.idgames = downloads.idgames
    WHERE downloads.idclientes = ?;
  `;

  db.query(SQL, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao listar jogos baixados" });
    }

    res.json(results);
  });
});

//----------------------------- get por id de cada jogo ---------------------------//
app.get("/gameInformation/:id", (req, res) => {
  const gameId = req.params.id;

  const SQL = "SELECT * FROM games WHERE idgames = ?";

  db.query(SQL, [gameId], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Erro ao buscar informações do jogo" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Jogo não encontrado" });
    }

    const gameInfo = result[0];
    res.json(gameInfo);
  });
});

//----------------------------- get por id das imagem de cada jogo ---------------------------//

app.get("/gameImages/:gameId", (req, res) => {
  const gameId = req.params.gameId;

  const SQL = "SELECT * FROM game_images WHERE game_id = ?";

  db.query(SQL, [gameId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar imagens do jogo" });
    }

    res.json(result);
  });
});

// --------------------------- Realizando download dos jogos --------------------------- //

app.post("/downloadGame/:idgames", verifyUser, async (req, res) => {
  const gameId = req.params.idgames;
  const userId = req.idclientes; // Use req.idclientes diretamente do middleware verifyUser

  // Verifique se já existe um registro de download para o mesmo usuário (idclientes) e jogo (idgames)
  const checkDownloadSQL =
    "SELECT * FROM downloads WHERE idclientes = ? AND idgames = ?";
  db.query(checkDownloadSQL, [userId, gameId], (checkErr, checkResult) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).json({ error: "Erro ao verificar o download" });
    }

    if (checkResult.length > 0) {
      // O usuário já fez o download deste jogo
      return res.status(400).json({ error: "Você já baixou este jogo antes." });
    }

    // Se não houver registro de download, insira os dados na tabela
    const insertSQL =
      "INSERT INTO downloads (idclientes, idgames) VALUES (?, ?)";
    db.query(insertSQL, [userId, gameId], (insertErr, insertResult) => {
      if (insertErr) {
        console.error(insertErr);
        return res.status(500).json({ error: "Erro ao registrar o download" });
      }
      res.cookie(`gameDownloaded_${gameId}`, "true");
      res.json({ message: "Download registrado com sucesso!" });
    });
  });
});

// ---------------------------  verificar se um jogo foi baixado por um usuário --------------------------- //

app.get("/checkGameDownloaded/:id", verifyUser, async (req, res) => {
  const gameId = req.params.id;
  const userId = req.idclientes; // Use req.idclientes diretamente do middleware verifyUser

  // Consulte o banco de dados para verificar se o jogo foi baixado pelo usuário
  const checkDownloadSQL =
    "SELECT COUNT(*) AS count FROM downloads WHERE idclientes = ? AND idgames = ?";
  db.query(checkDownloadSQL, [userId, gameId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao verificar o download" });
    }
    const isDownloaded = result[0].count > 0;

    if (!isDownloaded) {
      res.clearCookie(`gameDownloaded_${gameId}`);
    }
    res.json({ isDownloaded });
  });
});

// --------------------------- Edit dos Jogos Session --------------------------- //

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;

  let SQL = "UPDATE games SET name= ?, cost= ?, category= ?  WHERE idgames= ?";

  db.query(SQL, [name, cost, category, id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// --------------------------- Envio de Comentarios / Avaliações --------------------------- //

app.post("/enviar-comentario", verifyUser, (req, res) => {
  try {
    // Obtenha os dados do corpo da solicitação
    const { idjogo, idclientes, comentario, nota } = req.body;

    // Realize a inserção na tabela de comentários
    const SQL =
      "INSERT INTO comentarios (idjogo, idclientes, comentario, nota) VALUES (?, ?, ?, ?)";
    db.query(SQL, [idjogo, idclientes, comentario, nota], (err, result) => {
      if (err) {
        console.error("Erro ao inserir o comentário no banco de dados:", err);
        return res
          .status(500)
          .json({ message: "Erro ao inserir o comentário no banco de dados" });
      }

      console.log("Comentário inserido com sucesso");
      res.status(201).json({ message: "Comentário postado com sucesso" });
    });
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// --------------------------- Listar os Comentarios / Avaliações --------------------------- //

app.get("/comentarios/:id", (req, res) => {
  const gameId = req.params.id;

  const SQL = `
  SELECT com.idcomentario, com.idjogo, com.idclientes, com.comentario, com.nota, c.nome_cliente
  FROM comentarios com
  JOIN clientes c ON com.idclientes = c.idclientes
  WHERE com.idjogo = ?;
   `;

  db.query(SQL, [gameId], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Erro ao buscar comentários do jogo" });
    }

    // Verifique se há comentários para o jogo
    if (result.length === 0) {
      return res
        .status(404)
        .json({ error: "Nenhum comentário encontrado para este jogo" });
    }

    // Se houver comentários, envie-os como resposta
    const comentarios = result;
    res.json({ comentarios });
  });
});

// --------------------------- Select de categorias para ao dropdown menu--------------------------- //

app.get("/categories", (req, res) => {
  // Consulte o banco de dados para obter a lista de categorias únicas da tabela "games"
  const SQL = "SELECT DISTINCT category FROM games";
  db.query(SQL, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao obter categorias" });
    }

    const categories = results.map((row) => row.category);
    res.json(categories);
  });
});

// --------------------------- Payment Session --------------------------- //

// --------------------------- Listen Server Session --------------------------- //

app.listen(3001, () => {
  console.log("server rodando");
});

// const imagePath = 'C:\\Users\\vssal\\OneDrive\\Área de Trabalho\\ShadowGambit.jpg';

// const query = 'INSERT INTO games (name, cost, category, game_img) VALUES (?, ?, ?, ?)';

// db.query(query, ['TesteBlob', '10', 'testada', imagePath], (error, results, fields) => {
//   if (error) {
//     console.error(error);
//   }
//   console.log('Registro inserido com sucesso!');
// });

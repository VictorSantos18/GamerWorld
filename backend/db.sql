CREATE DATABASE `crud`;
use `crud`;

CREATE TABLE `games` (
  `idgames` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `cost` varchar(45) NOT NULL,
  `category` varchar(45) NOT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `descricao` longtext,
  PRIMARY KEY (`idgames`)
)

INSERT INTO `games` VALUES
  (1,'Shadow Gambit - the Cursed Crew','10','RPG','imagem_1696189858864.jpg','Bem-vindos ao Caribe Perdido! Nesse enigmático jogo de estratégia e furtividade, alie-se a um espírito e recrute uma tripulação de piratas amaldiçoados. Use poderes sobrenaturais e desafie o ameaçador exército da Inquisição, obstáculo entre você e o misterioso tesouro do lendário Capitão Mordecai.\n'),
  (2,'Elden Ring','229','RPG','imagem_1696190027025.jpg','O NOVO RPG DE AÇÃO E FANTASIA. Levante-se, Maculado, e seja guiado pela graça para portar o poder do Anel Prístino e se tornar um Lorde Prístino nas Terras Intermédias.\n'),
  (3,'Hogwarts Legacy','249','RPG','imagem_1696190127228.webp','Hogwarts Legacy é um RPG de ação imersivo de mundo aberto. Agora você pode assumir o controle da ação e estar no centro de sua própria aventura no mundo bruxo.'),
  (4,'The Witcher - Wild Hunt','38','RPG','imagem_1696190193773.jpg','Você é Geralt de Rívia, mercenário matador de monstros. Você está em um continente devastado pela guerra e infestado de monstros para você explorar à vontade. Sua tarefa é encontrar Ciri, a Criança da Profecia — uma arma viva que pode alterar a forma do mundo.'),
  (5,'Remnant II','38','RPG','imagem_1696190331508.webp','Remnant II é a continuação do grande sucesso de vendas Remnant: From the Ashes. Agora, os sobreviventes da humanidade têm que enfrentar novas e mortais criaturas, além de chefes impossíveis em mundos aterrorizantes.\n'),
  (6,'Payday III','199','RPG','imagem_1696190434963.webp','PAYDAY 3 é a esperada sequência de um dos jogos de tiro cooperativos mais populares de todos os tempos. Desde a versão original, os jogadores de PAYDAY se divertem com a emoção de um assalto perfeitamente planejado e executado.\n'),
  (7,'Lies of P','249','RPG','imagem_1696190500123.jpeg','Lies of P é um soulslike emocionante que pega a história de Pinóquio, vira-a de ponta-cabeça e coloca-a num cenário sombrio e elegante da era belle époque.\n'),
  (8,'V Rising','37','Hack and Slash','imagem_1696645473096.jpg','Acorde como um vampiro após séculos de sono profundo. Evite o sol enquanto você vai atrás de sangue para recuperar sua força. Reconstrua seu castelo e converta humanos em seus servos leais durante a sua missão para criar um império vampiro. Trave uma guerra nesse mundo de conflitos.\n'),
  (9,'Sekiro - Shadow Die Twice','199','Hack and Slash','imagem_1696191888625.jpg','Em Sekiro™: Shadows Die Twice, você é o \'lobo de um braço só\', um guerreiro desfigurado e desgraçado, resgatado da beira da morte. Jurado para proteger um jovem lorde descendente de uma antiga linhagem de sangue, você vira alvo de muitos inimigos perigosos, incluindo o temido clã Ashina. Quando o jovem lorde é capturado, você parte em uma jornada de redenção onde nada impedirá você, nem mesmo a própria morte.'),
  (10,'Nioh 2','149','Hack and Slash','imagem_1696677641432.jpg','Enfrenta hordas de yokai neste RPG de ação de dificuldade extrema. Personaliza a tua personagem e aventura-te por uma panóplia de locais por todo o Japão durante o Período Sengoku. Derrota os mais vorazes yokai com a nova habilidade Transformação em Yokai e enfrenta os Reinos das Trevas criados'),
  (11,'Undecember','0','Hack and Slash','imagem_1696191957985.jpg','UNDECEMBER é um RPG de ação no estilo Hack and Slash, no qual os jogadores podem superar os limites do combate convencional ao utilizar inúmeras combinações de Habilidades e Elos Rúnicos. Torne-se um Caça-Runas e viva a experiência de farmar e evoluir ao máximo!'),
  (12,'God of War','199','Hack and Slash','imagem_1696191992683.jpg','Com a vingança contra os deuses do Olimpo em um passado distante, Kratos agora vive como um mortal no reino dos deuses e monstros nórdicos. É nesse mundo duro e implacável que ele deve lutar para sobreviver... e ensinar seu filho a fazer o mesmo.'),
  (13,'Mortal Shell','56','Hack and Slash','imagem_1696192102744.jpg','\nMortal Shell é um RPG de ação impiedoso que testará sua sanidade e perseverança em um mundo aos pedaços. Enquanto os restos mortais da humanidade apodrecem, adversários implacáveis infestam as ruínas. Eles não demonstram piedade, logo, sua sobrevivência depende de percepção, precisão e instintos elevados. Explore santuários ocultos de seguidores devotos e descubra o seu verdadeiro propósito.'),
  (14,'For Honor','44','Hack and Slash','imagem_1696192204093.jpg','\nDeixe um rastro de destruição num campo de batalha intenso e verossímil em For Honor, um novo e inovador jogo desenvolvido pelo famoso estúdio Ubisoft Montreal em colaboração com outros estúdios da Ubisoft.'),
  (15,'Warhaven','0','Hack and Slash','imagem_1696192285410.jpg','\nWarhaven é um jogo PvP gratuito de guerra medieval e fantasia. Escolha seu soldado, lidere sua tropa em combate e encarne como um poderoso Imortal para mudar o rumo da guerra!'),
  (16,'Scarlet Nexus','0','RPG','imagem_1696191710554.jpg','Escolha entre Yuito e Kasane, psiônicos de elite com um talento para Psicocinese e suas próprias motivações para lutar. Conclua ambas as histórias para revelar todos os mistérios de um futuro Brain Punk envolto em tecnologia e habilidades psíquicas.\n'),
  (17,'Wayfinder','39','RPG','imagem_1696192692776.jpg','Torne-se um Precursor e desbloqueie seus poderes ao trilhar seu caminho e estilo de jogo ao combater uma força hostil que dominou seu mundo. Controle o Caos ao moldar e personalizar diretamente as aventuras que você viverá com seus amigos, pois unidos os Precursores são mais fortes.\n'),
  (18,'Devil May Cry 4','56','Hack and Slash','imagem_1697228087752.jpeg','DMC4, O grande sucesso dos jogos de ação está de volta e melhor do que nunca, com novos personagens e modos de jogo -- Vergil voltou e está melhor do que nunca Trish é fácil de usar e arrasa seus inimigos com combos eletrizantes E Lady é jogável pela primeira vez na série -- Enfrente hordas de inimigos no Legendary Dark Knight Mode -- Curta visuais incríveis em 1080p e 60FPS --');

CREATE TABLE `game_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `game_id` int DEFAULT NULL,
  `url_da_imagem` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `game_images_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`idgames`)
)

INSERT INTO `game_images` VALUES 
(1,9,'imagem_1696502868856.jpg'),
(2,9,'imagem_1696502890356.jpg'),
(3,9,'imagem_1696502894708.jpg'),
(4,9,'imagem_1696502901052.jpg'),
(5,9,'imagem_1696502904707.jpg'),
(6,9,'imagem_1696502909676.jpg'),
(7,12,'imagem_1696505371660.jpg'),
(8,12,'imagem_1696505375347.jpg'),
(9,12,'imagem_1696505379363.webp'),
(10,12,'imagem_1696505383122.jpg'),
(11,12,'imagem_1696505386675.jpg'),
(12,12,'imagem_1696505390908.webp'),
(13,8,'imagem_1696645380836.jpg'),
(14,8,'imagem_1696645387218.webp'),
(15,8,'imagem_1696645390598.jpg'),
(16,8,'imagem_1696645394505.jpg'),
(17,8,'imagem_1696645397646.webp'),
(18,8,'imagem_1696645401010.jpg'),
(19,3,'imagem_1696646042472.jpg'),
(20,3,'imagem_1696646046509.jpg'),
(21,3,'imagem_1696646049985.jpg'),
(22,3,'imagem_1696646053420.jpg'),
(23,3,'imagem_1696646056763.jpg'),
(24,3,'imagem_1696646060277.jpg'),
(25,4,'imagem_1696646405701.jpg'),
(26,4,'imagem_1696646409506.jpg'),
(27,4,'imagem_1696646413004.jpg'),
(28,4,'imagem_1696646416802.jpg'),
(29,4,'imagem_1696646420348.jpg'),
(30,4,'imagem_1696646424442.jpg'),
(31,10,'imagem_1696677798875.jpg'),
(32,10,'imagem_1696677804319.jpg'),
(33,10,'imagem_1696677808284.jpg'),
(34,10,'imagem_1696677812443.jpg'),
(35,10,'imagem_1696677816274.jpg'),
(36,10,'imagem_1696677819923.webp'),
(37,11,'imagem_1696678097234.webp'),
(38,11,'imagem_1696678101360.jpg'),
(39,11,'imagem_1696678105088.jpg'),
(40,11,'imagem_1696678108744.jpg'),
(41,11,'imagem_1696678112427.jpg'),
(42,11,'imagem_1696678115895.jpg'),
(43,13,'imagem_1696678678948.jpg'),
(44,13,'imagem_1696678682615.jpg'),
(45,13,'imagem_1696678686079.jpg'),
(46,13,'imagem_1696678689758.jpg'),
(47,13,'imagem_1696678692640.jpg'),
(48,13,'imagem_1696678696437.jpg'),
(49,14,'imagem_1696678840871.jpg'),
(50,14,'imagem_1696678844080.jpg'),
(51,14,'imagem_1696678847054.jpg'),
(52,14,'imagem_1696678850497.jpg'),
(53,14,'imagem_1696678853784.jpg'),
(54,14,'imagem_1696678856896.jpg'),
(55,15,'imagem_1696679101868.jpg'),
(56,15,'imagem_1696679104766.jpg!d'),
(57,15,'imagem_1696679107742.jpg'),
(58,15,'imagem_1696679110701.jpg'),
(59,15,'imagem_1696679113481.jpg!d'),
(60,15,'imagem_1696679116479.jpg'),
(61,2,'imagem_1696679301388.jpg'),
(62,2,'imagem_1696679304140.jpg'),
(63,2,'imagem_1696679307855.jpg'),
(64,2,'imagem_1696679310854.jpg'),
(65,2,'imagem_1696679314278.jpg'),
(66,2,'imagem_1696679317604.jpg'),
(67,18,'imagem_1697228406195.webp'),
(68,18,'imagem_1697228410756.jpg'),
(69,18,'imagem_1697228414477.jpg'),
(70,18,'imagem_1697228425741.jpg'),
(71,18,'imagem_1697228430092.jpg'),
(72,18,'imagem_1697228459446.jpeg');

CREATE TABLE `comentarios` (
  `idcomentario` int NOT NULL AUTO_INCREMENT,
  `idjogo` int DEFAULT NULL,
  `idclientes` int DEFAULT NULL,
  `comentario` text,
  `nota` int DEFAULT NULL,
  PRIMARY KEY (`idcomentario`),
  KEY `idjogo` (`idjogo`),
  KEY `idclientes` (`idclientes`),
  CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`idjogo`) REFERENCES `games` (`idgames`),
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`idclientes`) REFERENCES `clientes` (`idclientes`)
)

INSERT INTO `comentarios` VALUES 
(1,1,1,'JOGO PERFEITO, INCRIVEL',5),
(2,1,2,'INCRIVEL',5),
(3,1,3,'Que jogo insano, recomendo muito',5),
(4,1,4,'Nunca tinha jogado antes, mas achei bem legal e diferente',4),
(5,1,7,'simplesmente bom demais',5),
(6,2,1,'simplesmente Lindo',5),
(7,2,2,'Os graficos estão fenomenais',5),
(8,2,3,'Chega a travar o meu pc de tão bonito kkkkk',5),
(9,2,5,' magnifico!',5),
(10,9,1,'achei o estilo da gameplay fenomenal!',5),
(11,8,1,'Gosto muito deste estilo de gameplay, muito massa!',5),
(12,10,1,'insano!',5),
(13,8,2,'insanamente insano!!',5),
(14,12,2,'joguei todos os jogos e jogaria novamentte sem problema algum!',5),
(15,18,2,'JOGO INCRIVEL',5),
(16,6,2,'MUITA AÇÃO!!',5),
(17,7,2,'extraordinario',5),
(18,7,2,'muito bom',0),
(19,9,5,'nunca tinha jogado antes, incrivel!',5),
(20,11,5,'jogo muito muito bom!!',5),
(21,8,2,'teste',4),
(22,4,2,'testes teste ',5),
(23,10,2,'muito brabo!!',5),
(24,9,5,'teste teste',3),
(25,9,4,'jogo maravilhoso! um pouco pesado para a minha maquina mas rodou ^^',4),
(26,9,10,'muito dificil, nao gostei',4),
(27,9,1,'jacy passou por aqui',5);



CREATE TABLE `downloads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idclientes` int DEFAULT NULL,
  `idgames` int DEFAULT NULL,
  `download_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idclientes` (`idclientes`),
  KEY `idgames` (`idgames`),
  CONSTRAINT `downloads_ibfk_1` FOREIGN KEY (`idclientes`) REFERENCES `clientes` (`idclientes`),
  CONSTRAINT `downloads_ibfk_2` FOREIGN KEY (`idgames`) REFERENCES `games` (`idgames`)
) 

CREATE TABLE `clientes` (
  `idclientes` int NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(45) NOT NULL,
  `email_cliente` varchar(45) NOT NULL,
  `password_cliente` varchar(45) NOT NULL,
  PRIMARY KEY (`idclientes`)
)

INSERT INTO `clientes` VALUES 
(1,'Victor dos Santos Salles','vitao@gmail.com','12345'),
(2,'Lucas','lucas@gmail.com','12345'),
(3,'gabriel','gabriel@gmail.com','12345'),
(4,'maria','maria@gmail.com','12345'),
(5,'admin','admin@gmail.com','admin'),
(6,'nicole ','nicole@gmail.com','12345'),
(7,'gustavo borges lima','gustavoborges@gmail.com','12345'),
(8,'leandro','leandro@gmail.com','12345')
(9,'valdderi douglas','valdinho@gmail.com','123'),
(10,'Caio Almeida','iscaderato@gmail.com','medealminhas');


const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
require("dotenv").config(); // Pour utiliser les variables d'environnement
const port = 8001;

// Initialiser la base de données
const adapter = new FileSync("./users.json");
const users = low(adapter); // Renommé db en users

// Initialiser l'application Express
const app = express();

// Clé secrète JWT (utilisation de la variable d'environnement ou valeur par défaut)
const jwtSecretKey = process.env.JWT_SECRET_KEY || "default-secret-key";

// Configuration CORS
const corsOptions = {
  origin: "*",  // Autoriser toutes les origines (modifiable pour plus de sécurité)
  methods: ["GET", "POST"],  // Méthodes autorisées
  allowedHeaders: ["Content-Type", "Authorization"],  // En-têtes autorisés
};

app.use(cors(corsOptions)); // Ajouter CORS
app.use(express.json()); // Middleware pour parser le JSON
app.use(express.urlencoded({ extended: true })); // Middleware pour parser les URL encodées

// Route principale
app.get("/", (_req, res) => {
  res.send("Auth API.\nPlease use POST /login & POST /verify for authentication");
});

// Route d'authentification qui permet de se connecter ou de créer un nouvel utilisateur
app.post("/login", (req, res) => { // Mise à jour de /auth en /login
  const { email, password } = req.body;

  // Log pour voir les requêtes
  console.log("Received /login request with email:", email);

  // Recherche de l'utilisateur dans la base de données
  const user = users.get("users").find({ email }).value();

  // Si l'utilisateur existe déjà, on compare les mots de passe
  if (user) {
    bcrypt.compare(password, user.password, function (_err, result) {
      if (!result) {
        return res.status(401).json({ message: "Invalid password" });
      } else {
        const loginData = {
          email,
          signInTime: Date.now(),
        };

        const token = jwt.sign(loginData, jwtSecretKey, { expiresIn: "1h" }); // JWT avec expiration
        res.status(200).json({ message: "success", token });
      }
    });
  } else {
    // Si l'utilisateur n'existe pas, on crée un nouvel utilisateur
    bcrypt.hash(password, 10, function (_err, hash) {
      users.get("users").push({ email, password: hash }).write();

      const loginData = {
        email,
        signInTime: Date.now(),
      };

      const token = jwt.sign(loginData, jwtSecretKey, { expiresIn: "1h" }); // JWT avec expiration
      res.status(200).json({ message: "success", token });
    });
  }
});

// Route pour vérifier si un token JWT est valide
app.post("/verify", (req, res) => {
  const tokenHeaderKey = "jwt-token";
  const authToken = req.headers[tokenHeaderKey];

  console.log("Received /verify request with token:", authToken); // Log du token reçu

  if (!authToken) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    const verified = jwt.verify(authToken, jwtSecretKey); // Vérification du token JWT
    return res.status(200).json({ status: "logged in", message: "success" });
  } catch (error) {
    return res.status(401).json({ status: "invalid auth", message: "error" });
  }
});

// Route pour vérifier si un compte existe déjà avec l'email donné
app.post("/check-account", (req, res) => {
  const { email } = req.body;

  console.log("Checking if account exists for:", email); // Log pour voir la requête

  const user = users.get("users").find({ email }).value(); // Utilisation de .find() pour récupérer un utilisateur

  res.status(200).json({
    status: user ? "User exists" : "User does not exist",
    userExists: Boolean(user),
  });
});

// Lancer le serveur pour écouter sur le port 8001
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});

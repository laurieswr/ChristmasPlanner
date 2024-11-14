import express from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'; // To allow cross-origin requests

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 8001;

app.use(cors({
  origin: process.env.API_URL = "http://localhost:5173", // Allow requests from this origin
  credentials: true // To allow cookies
}));

app.use(express.json()); // Middleware pour parser le JSON dans les requêtes

// Charger les utilisateurs depuis `users.json`
const getUsers = () => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json')));
  return data.users || [];
};

// Sauvegarder les utilisateurs dans `users.json`
const saveUsers = (users) => {
  const data = { users };
  fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(data, null, 2));
};

// Route d'inscription
app.post('api/register', async (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  // Vérifier si l'email est déjà utilisé
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ error: 'Email déjà utilisé' });
  }

  // Hacher le mot de passe avant de l'enregistrer
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ id: Date.now(), email, password: hashedPassword });
  saveUsers(users);

  res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
});

// Route de connexion
app.post('api/login', async (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
  }

  // Vérifier le mot de passe
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
  }

  // Authentification réussie
  res.status(200).json({ message: 'Connexion réussie' });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur d'authentification en écoute sur le port ${PORT}`);
});

import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:8001/api/register', {
        email,
        password,
      });

      if (response.status === 200 && response.data.accessToken) {
        console.log('Inscription réussie');
        navigate('/page2'); // Redirige vers une autre page
      }
    } catch (error) {
      setError('Erreur lors de l\'inscription. Cet email est peut-être déjà utilisé.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Inscription</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Nom :</label>
        <input
          type="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Prénom :</label>
        <input
          type="prenom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Register;

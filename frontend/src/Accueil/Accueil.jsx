import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompteRebours from '../compteRebours/compteRebours';
import './Accueil.css';

const Accueil = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login'); // Redirection vers login si pas de token
    }
  }, [navigate]);

  return (
    <div>
      <div className='compterebours'>
        <CompteRebours />
      </div>
      <div>
          Sur ce site vous pouvez trouver les cadeaux que vous aurez noté pour votre famille ou amis. Vous trouverez aussi des idées de films de Noël.
          Vous n'êtes pas obligé de vous inscrire pour utiliser ce site.
      </div>
    </div>
  );
};

export default Accueil;
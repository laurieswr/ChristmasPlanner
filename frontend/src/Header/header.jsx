import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './header.styles.css'; // Importation du fichier CSS externe

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirige vers la page de login après déconnexion
  };

  return (
    <header className="header">
      <h1 className="title">Christmas Planner🎄</h1>
    </header>
  );
};

export default Header;
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Accueil from './Accueil/Accueil.jsx';
import Login from './login/login.jsx';
import Register from './Registers/registers.jsx';
import Cadeaux from './cadeaux/cadeaux.jsx';
import FilmNoel from './filmNoel/filmNoel.jsx';
import Footer from './Footer/footer.jsx';
import { AuthProvider, AuthContext } from './Header/AuthContext';
import Navbar from './navBar/navbar';
import Menu from './menu/menu';
import Header from './Header/header';
import CompteRebours from './compteRebours/compteRebours';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/cadeaux" element={<Cadeaux />} />
            <Route path="/filmNoel" element={<FilmNoel />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/" element={<Accueil />} />
            <Route path='/menu' element={<Menu />} />
            <Route path="/compteRebours" element={<CompteRebours />} />
          </Routes>
          
          <Navbar />
        </div>
      </Router>
      <Footer />
    </AuthProvider>
  );
}

export default App;


import React, { useState, useEffect } from 'react';
import MoviesData from './listFilmNoël.json'; // Assurez-vous que ce chemin est correct
import './listFilmNoel.css';

const FilmsNoel = () => {
  const [movies, setMovies] = useState([]); // Initialisation avec un tableau vide
  const [openMovieId, setOpenMovieId] = useState(null); // Stocke l'ID du film actuellement ouvert

  useEffect(() => {
    // Charger les films à partir du fichier JSON
    setMovies(MoviesData.films_de_noel); // Accéder à la clé 'films_de_noel'
  }, []); // Le tableau vide [] signifie que useEffect ne sera appelé qu'une seule fois après le premier rendu.

  // Fonction pour ouvrir ou fermer les détails d'un film
  const toggleMovieDetails = (id) => {
    if (openMovieId === id) {
      setOpenMovieId(null); // Fermer si c'est déjà ouvert
    } else {
      setOpenMovieId(id); // Ouvrir sinon
    }
  };

  return (
    <div>
      <h1>Films de Noël</h1>
      <div className="movies-list">
        {movies.length === 0 ? (
          <p>Aucun film trouvé.</p> // Message d'erreur si la liste est vide
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="movie-accordion">
              <div className="movie-summary">
                <p className='movie-title'>{movie.titre} ({movie.annee})</p>
                <button
                  onClick={() => toggleMovieDetails(movie.id)}
                  className="toggle-button"
                >
                  {openMovieId === movie.id ? 'Voir moins' : 'Voir plus'}
                </button>
              </div>
              {openMovieId === movie.id && (
                <div className="movie-details">
                  <p><strong>Titre:</strong> {movie.titre}</p>
                  <p><strong>Année:</strong> {movie.annee}</p>
                  <p><strong>Description:</strong> {movie.description}</p>
                  <p><strong>Durée:</strong> {movie.duree} minutes</p>
                  <p><strong>Genre:</strong> {movie.genre}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FilmsNoel;


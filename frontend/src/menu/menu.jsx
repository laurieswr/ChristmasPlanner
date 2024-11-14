import React, { useState } from 'react';
import entreesData from './entrees.json';
import platsData from './plats.json';
import dessertsData from './desserts.json';
import './menu.css';

const MenuNoel = () => {
  // État pour gérer la catégorie de menu sélectionnée
  const [selectedCategory, setSelectedCategory] = useState('entrées');

  // État pour gérer l'ouverture/fermeture de chaque élément du menu
  const [openItems, setOpenItems] = useState({});

  // Fonction pour changer de catégorie
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setOpenItems({}); // Réinitialise l'état des éléments ouverts lors du changement de catégorie
  };

  // Fonction pour basculer l'ouverture/fermeture d'un élément du menu
  const toggleItem = (itemId) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  // Choisir les données en fonction de la catégorie sélectionnée
  const getMenuItems = (category) => {
    switch (category) {
      case 'entrées':
        return entreesData;
      case 'plats':
        return platsData;
      case 'desserts':
        return dessertsData;
      default:
        return [];
    }
  };

  return (
    <div className="menu-noel">
      <h1>Menu de Noël</h1>
      <div>
        Ceci est une liste de menu de Noël, si vous n'avez pas d'idées.
      </div>

      <div className="categories">
        {/* Boutons pour changer de catégorie */}
        {['entrées', 'plats', 'desserts'].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="menu-items">
        <h2>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h2>
        {getMenuItems(selectedCategory).map((item) => (
          <div key={item.id} className="accordion-item">
            {/* Titre de l'élément, qui peut être cliqué pour ouvrir/fermer l'accordéon */}
            <div 
              className="accordion-header"
              onClick={() => toggleItem(item.id)}
            >
              <strong>{item.name}:</strong> 
              {/* Icône pour indiquer si l'accordéon est ouvert ou fermé */}
              <span>{openItems[item.id] ? 'Voir moins -' : 'Voir plus +'}</span>
            </div>
            
            {/* Contenu de l'élément qui s'affiche seulement si l'accordéon est ouvert */}
            {openItems[item.id] && (
              <div className="accordion-content">
                <div>
                  <strong>Ingrédients:</strong>
                  {/* Affichage des ingrédients sous forme de liste */}
                  <ul>
                    {item.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <strong>Recette:</strong>
                     {/* Affichage des étapes de la recette */}
                   {/* Affichage des étapes sous forme de liste numérotée */}
                <ol>
                  {item.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
                </div>
               
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuNoel;

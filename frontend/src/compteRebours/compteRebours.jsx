import React, { useState, useEffect } from 'react';
import './compterebours.css'

const CompteRebours = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('December 25, 2024 00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Le compte à rebours est terminé
        clearInterval(countdown);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const countdown = setInterval(updateCountdown, 1000);

    return () => clearInterval(countdown); // Nettoyage à la fin
  }, []);

  return (
    <div id="countdown">
      <div>
        <h2>Compte  à rebours jusqu'à Noël 🎄</h2>
        <p>{`${timeLeft.days} jours, ${timeLeft.hours} heures, ${timeLeft.minutes} minutes, ${timeLeft.seconds} secondes`}</p>
      </div>
    </div>
    
  );
};

export default CompteRebours;

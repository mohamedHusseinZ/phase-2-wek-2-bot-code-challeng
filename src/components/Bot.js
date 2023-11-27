// Bot.js
import React from 'react';

const Bot = ({ bot, onClick, buttonText }) => {
  return (
    <div>
      <img src={bot.avatar_url} alt={bot.name} />
      <h3>{bot.name}</h3>
      <p>Class: {bot.bot_class}</p>
      <p>Health: {bot.health}</p>
      <p>Damage: {bot.damage}</p>
      <button onClick={() => onClick(bot)}>{buttonText}</button>
    </div>
  );
};

export default Bot;

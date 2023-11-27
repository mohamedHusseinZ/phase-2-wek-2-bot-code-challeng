
// BotCollection.js
import React from 'react';
import Bot from './Bot';

const BotCollection = ({ bots, addToArmy }) => {
  return (
    <div>
      <h2>Bot Collection</h2>
      {bots.map((bot) => (
        <Bot key={bot.id} bot={bot} onClick={addToArmy} buttonText="Add to Army" />
      ))}
    </div>
  );
};

export default BotCollection;

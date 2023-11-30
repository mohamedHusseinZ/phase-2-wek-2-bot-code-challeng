
import React from 'react';

const BotCollection = ({ bots, addToArmy, dischargeBot }) => {
  const handleEnlistClick = (bot) => {
    addToArmy(bot);
  };

  const handleReleaseClick = (botId) => {
    dischargeBot(botId);
  };

  return (
    <div>
      <h2>Bot Collection</h2>
      {Array.isArray(bots) &&
        bots.map((bot) => (
          <div key={bot.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
            <h3>{bot.name}</h3>
            <p>Class: {bot.bot_class}</p>
            <button onClick={() => handleEnlistClick(bot)}>Enlist</button>
            <button style={{ marginLeft: '10px' }} onClick={() => handleReleaseClick(bot.id)}>
              Discharge
            </button>
          </div>
        ))}
    </div>
  );
};

export default BotCollection;

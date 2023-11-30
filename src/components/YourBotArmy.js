
import React from 'react';

const YourBotArmy = ({ army, releaseFromArmy, dischargeBot }) => {
  const handleReleaseClick = (bot) => {
    releaseFromArmy(bot);
  };

  const handleDischargeClick = (botId) => {
    dischargeBot(botId);
  };

  return (
    <div>
      <h2>Your Bot Army</h2>
      {Array.isArray(army) &&
        army.map((bot) => (
          <div key={bot.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
            <h3>{bot.name}</h3>
            <p>Class: {bot.bot_class}</p>
            <button onClick={() => handleReleaseClick(bot)}>Release</button>
            <button style={{ color: 'red', marginLeft: '20px' }} onClick={() => handleDischargeClick(bot.id)}>
              Discharge Forever (Delete)
            </button>
          </div>
        ))}
    </div>
  );
};

export default YourBotArmy;

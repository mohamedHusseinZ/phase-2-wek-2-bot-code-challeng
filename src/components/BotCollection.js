
// BotCollection.js
import React from 'react';
import PropTypes from 'prop-types';

const BotCollection = ({ bots, addToArmy, dischargeBot }) => {
  return (
    <div>
      <h2>Bot Collection</h2>
      {bots && bots.map((bot) => (
        <div key={bot.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <h3>{bot.name}</h3>
          <p>Class: {bot.bot_class}</p>
          <button onClick={() => addToArmy(bot)}>Enlist</button>
          <button style={{ marginLeft: '10px' }} onClick={() => dischargeBot(bot.id)}>
            Discharge
          </button>
        </div>
      ))}
    </div>
  );
};

BotCollection.propTypes = {
  bots: PropTypes.array.isRequired,
  addToArmy: PropTypes.func.isRequired,
  dischargeBot: PropTypes.func.isRequired,
};

export default BotCollection;






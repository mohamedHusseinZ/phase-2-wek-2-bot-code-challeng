
// YourBotArmy.js
import React from 'react';
import PropTypes from 'prop-types';

const YourBotArmy = ({ army, releaseFromArmy, dischargeBot }) => {
  return (
    <div>
      <h2>Your Bot Army</h2>
      {army.map((bot) => (
        <div key={bot.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <h3>{bot.name}</h3>
          <p>Class: {bot.bot_class}</p>
          <button onClick={() => releaseFromArmy(bot)}>Release</button>
          <button style={{ color: 'red', marginLeft: '10px' }} onClick={() => dischargeBot(bot.id)}>
            Discharge Forever (Delete)
          </button>
        </div>
      ))}
    </div>
  );
};

YourBotArmy.propTypes = {
  army: PropTypes.array.isRequired,
  releaseFromArmy: PropTypes.func.isRequired,
  dischargeBot: PropTypes.func.isRequired,
};

export default YourBotArmy;


// YourBotArmy.js
import React from 'react';
import Bot from './Bot';

const YourBotArmy = ({ army, releaseFromArmy, dischargeBot }) => {
  return (
    <div>
      <h2>Your Bot Army</h2>
      {army.map((bot) => (
        <div key={bot.id}>
          <Bot bot={bot} onClick={releaseFromArmy} buttonText="Release" />
          <button onClick={() => dischargeBot(bot.id)}>Discharge (Delete)</button>
        </div>
      ))}
    </div>
  );
};

export default YourBotArmy;


// App.js
import React, { useState, useEffect } from 'react';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';
import BotSpecs from './components/BotSpecs';
import SortBar from './components/SortBar';
import './App.css';

function App() {
  const [allBots, setAllBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [sortOption, setSortOption] = useState('health');
  const [classFilters, setClassFilters] = useState([]);

  useEffect(() => {
    // Fetch all bots data from the API
    const fetchBots = async () => {
      try {
        const response = await fetch('http://localhost:8001/bots');
        const data = await response.json();
        setAllBots(data);
      } catch (error) {
        console.error('Error fetching bots data:', error);
      }
    };

    fetchBots();
  }, []);

  const addToArmy = (bot) => {
    if (!army.some((b) => b.id === bot.id)) {
      setArmy([...army, bot]);
      removeFromBotCollection(bot.id);
      hideBotSpecs();
    }
  };

  const removeFromBotCollection = (botId) => {
    const updatedBots = allBots.filter((bot) => bot.id !== botId);
    setAllBots(updatedBots);
  };

  const releaseFromArmy = (bot) => {
    const updatedArmy = army.filter((b) => b.id !== bot.id);
    setArmy(updatedArmy);
    addToBotCollection(bot);
  };

  const addToBotCollection = (bot) => {
    setAllBots([...allBots, bot]);
  };

  const dischargeBot = async (botId) => {
    // Simulate deleting the bot from the backend
    console.log(`Bot ${botId} discharged from service (backend operation)`);

    // Remove the bot from the army and bot collection
    const updatedArmy = army.filter((b) => b.id !== botId);
    setArmy(updatedArmy);

    const updatedBots = allBots.filter((bot) => bot.id !== botId);
    setAllBots(updatedBots);

    hideBotSpecs();
  };

  const showBotSpecs = (bot) => {
    setSelectedBot(bot);
  };

  const hideBotSpecs = () => {
    setSelectedBot(null);
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sortedBots = [...allBots].sort((a, b) => b[option] - a[option]);
    setAllBots(sortedBots);
  };

  const handleClassFilter = (selectedClass) => {
    if (classFilters.includes(selectedClass)) {
      setClassFilters(classFilters.filter((filter) => filter !== selectedClass));
    } else {
      setClassFilters([...classFilters, selectedClass]);
    }
  };

  const filteredBots = allBots.filter((bot) => classFilters.length === 0 || classFilters.includes(bot.bot_class));

  return (
    <div>
      <SortBar onSort={handleSort} />
      <div>
        <label>Filter By Class:</label>
        <div>
          <input type="checkbox" onChange={() => handleClassFilter('Support')} /> Support
          <input type="checkbox" onChange={() => handleClassFilter('Medic')} /> Medic
          {/* Add more checkboxes for other classes */}
        </div>
      </div>
      {selectedBot ? (
        <BotSpecs bot={selectedBot} onEnlist={addToArmy} onBack={hideBotSpecs} />
      ) : (
        <div>
          <BotCollection bots={filteredBots} onClick={showBotSpecs} />
          <YourBotArmy army={army} releaseFromArmy={releaseFromArmy} dischargeBot={dischargeBot} />
        </div>
      )}
    </div>
  );
}


export default App;



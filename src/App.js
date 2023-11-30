import React, { useState, useEffect } from 'react';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';
import PropTypes from 'prop-types';

function App() {
  const [allBots, setAllBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bots
        const botsResponse = await fetch('http://localhost:8001/bots');
        const botsData = await botsResponse.json();
        console.log('Fetched Bots Data:', botsData); // Add this line for debugging
        setAllBots(botsData);

        // Fetch posts
        const postsResponse = await fetch('http://localhost:3000/posts');
        const postsData = await postsResponse.json();
        setPosts(postsData);

        // Fetch comments
        const commentsResponse = await fetch('http://localhost:3000/comments');
        const commentsData = await commentsResponse.json();
        setComments(commentsData);

        // Fetch profile
        const profileResponse = await fetch('http://localhost:3000/profile');
        const profileData = await profileResponse.json();
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Functions for adding, releasing, and discharging bots
  const addToArmy = (bot) => {
    if (!army.some((b) => b.id === bot.id)) {
      setArmy([...army, bot]);
    }
  };

  const releaseFromArmy = (bot) => {
    const updatedArmy = army.filter((b) => b.id !== bot.id);
    setArmy(updatedArmy);
  };

  const dischargeBot = async (botId) => {
    try {
      await fetch(`http://localhost:8001/bots/${botId}`, {
        method: 'DELETE',
      });

      // Update the frontend state without fetching again
      const updatedArmy = army.filter((b) => b.id !== botId);
      setArmy(updatedArmy);
    } catch (error) {
      console.error('Error discharging bot:', error);
    }
  };

  return (
    <div>
      <BotCollection bots={allBots} addToArmy={addToArmy} dischargeBot={dischargeBot} />
      <YourBotArmy army={army} releaseFromArmy={releaseFromArmy} />

      {/* Display fetched data from other endpoints */}
      <div>
        <h2>Posts</h2>
        <pre>{JSON.stringify(posts, null, 2)}</pre>
      </div>

      <div>
        <h2>Comments</h2>
        <pre>{JSON.stringify(comments, null, 2)}</pre>
      </div>

      <div>
        <h2>Profile</h2>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;


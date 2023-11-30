
// App.js
import React, { useState, useEffect } from 'react';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';
import './App.css'; // Import your CSS file for styling

function App() {
  const [allBots, setAllBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bots (similar to your existing code)
        // Fetch posts, comments, and profile (similar to your existing code)

        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(false); // Ensure loading is set to false even on error
      }
    };

    fetchData();
  }, []);

  // Functions for adding, releasing, and discharging bots (similar to your existing code)
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

  // Functions for fetching posts, comments, and profile
  const fetchPosts = async () => {
    const response = await fetch('http://localhost:3000/posts');
    const data = await response.json();
    setPosts(data);
  };

  const fetchComments = async () => {
    const response = await fetch('http://localhost:3000/comments');
    const data = await response.json();
    setComments(data);
  };

  const fetchUserProfile = async () => {
    const response = await fetch('http://localhost:3000/profile');
    const data = await response.json();
    setProfile(data);
  };

  // JSX to render the components
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="header">
            <button onClick={fetchPosts}> Posts</button>
            <button onClick={fetchComments}> Comments</button>
            <button onClick={fetchUserProfile}> Profile</button>
          </div>

          <div className="content">
            <BotCollection bots={allBots} addToArmy={addToArmy} dischargeBot={dischargeBot} />
            <YourBotArmy army={army} releaseFromArmy={releaseFromArmy} />
          </div>

          <div className="data-container">
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
        </>
      )}
    </div>
  );
}

export default App;

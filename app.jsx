// App.jsx
import React, { useState, useEffect } from 'react';

function App() {
  const [userId, setUserId] = useState('');
  const [repoUrl, setRepoUrl] = useState('arnold6001/VAMPARINA-V1');
  const [sessionId, setSessionId] = useState('');
  const [bots, setBots] = useState([]);
  const [info, setInfo] = useState({});

  useEffect(() => {
    fetch('/info').then(r => r.json()).then(setInfo);
    fetch('/list').then(r => r.json()).then(setBots);
  }, []);

  const createBot = () => {
    fetch('/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, repoUrl, sessionId })
    })
    .then(res => res.json())
    .then(d => {
      alert(d.message || JSON.stringify(d));
      if (d.bot) setBots(prev => [...prev, d.bot]);
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{info.platform || "VAMPARINA Bot Hosting Net"}</h1>
      <p>Owner: {info.owner} | Email: {info.email}</p>
      <p>No billing, free forever, unlimited resources (conceptual)</p>

      <h2>Create Bot Server</h2>
      <input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
      <input placeholder="Repo URL (e.g. arnold6001/VAMPARINA-V1)" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} />
      <input placeholder="Session ID" value={sessionId} onChange={e => setSessionId(e.target.value)} />
      <button onClick={createBot}>Create Bot Server</button>

      <h2>Active Bot Servers</h2>
      <ul>
        {bots.map((bot, i) => (
          <li key={i}>{bot.botName} — Status: {bot.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
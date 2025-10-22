// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// In-memory store for bots (Use DB for production)
const bots = {};

const OWNER_NAME = "Arnold Chirchir";
const COMPANY_EMAIL = "arnoldkipruto193@gmail.com";

app.get('/info', (req, res) => {
  res.json({
    platform: "VAMPARINA Bot Hosting Net",
    owner: OWNER_NAME,
    email: COMPANY_EMAIL,
    billing: "No billing, servers free forever",
    feature: "Unlimited RAM and storage (conceptual)"
  });
});

// Create a bot hosting server
app.post('/create', (req, res) => {
  const { userId, repoUrl, sessionId } = req.body;
  if (!userId || !repoUrl || !sessionId) {
    return res.status(400).json({ error: "Missing userId, repoUrl or sessionId" });
  }
  if (bots[userId]) {
    return res.json({ message: "Bot server already exists", bot: bots[userId] });
  }

  // Simulated deployment command
  // You'd integrate actual container or process management for hosting bot instances
  const botName = `vamparina_bot_${userId}`;
  const cmd = `pm2 start bot.js --name ${botName} -- session=${sessionId}`;

  exec(cmd, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to create bot server" });
    }

    bots[userId] = {
      botName,
      repoUrl,
      sessionId,
      status: "running"
    };
    res.json({ message: "Bot created successfully", bot: bots[userId] });
  });
});

app.get('/list', (req, res) => {
  res.json(bots);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`VAMPARINA backend running on port ${PORT}`));
const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Client, GatewayIntentBits, Collection } = require("discord.js");

const app = express();
dotenv.config();
app.use(cors());

// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json());

const allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:5001",
  "https://book-recommendation-system-wt3eo.ondigitalocean.app",
];

console.log("allowedOrigins>>", allowedOrigins);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);


app.get("/", (req, res) => {
  res.send("Welcome to the Express Test Application!");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// Initialize the Discord bot client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


// Initialize Discord bot
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const userInput = message.content;
    const commandName = userInput.replace('!', '').split(' ')[0];
    const args = userInput.slice(userInput.indexOf(' ') + 1);

    // Use regex to match key="value" pairs
    const keyValuePairs = {};
    const regex = /(\w+)="([^"]+)"/g;
    let match;
    
    while ((match = regex.exec(args)) !== null) {
      keyValuePairs[match[1]] = match[2];
    }
    
    console.log('keyValuePairs>>>', keyValuePairs);
    console.log('commandName>>>', commandName);

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command.');
    }
});

client.login(process.env.DISCORD_TOKEN);

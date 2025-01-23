import dotenv from "dotenv";
import express from "express";
import { discordClient, InitializeBot } from "./initializeBot";

dotenv.config();

const app = express();

app.use(express.json());

export const listenFor = ["copies", "feet", "feet pics"];

export const responses = ["couldn't be me"];

const PORT = process.env.PORT || 3000;
async function startApp() {
  try {
    app.listen(PORT, () => {
      console.log(`Express server running on port ${PORT}`);
    });

    await discordClient.login(process.env.DISCORD_BOT_TOKEN);
    await InitializeBot();
  } catch (error) {
    console.error("Error starting the application:", error);
    process.exit(1);
  }
}

startApp();

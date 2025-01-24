import { Client, GatewayIntentBits, Events } from "discord.js";
import { responsePairs } from "./responsePairs";
import { reactMentions } from "./reactMentions";
import { noobWelcomer } from "./noobWelcomer";
import { memeResponses } from "./memeResponses";

export const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

export async function InitializeBot() {
  discordClient.on("ready", () => {
    console.log(`Logged in as =====${discordClient.user?.tag}=====`);
  });

  memeResponses();

  noobWelcomer();

  discordClient.on(Events.Error, (error) => {
    console.error("Discord client error:", error);
  });
}

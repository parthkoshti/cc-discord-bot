import { Client, GatewayIntentBits, Events } from "discord.js";

export const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

export async function InitializeBot() {
  await discordClient.on("ready", () => {
    console.log(`Logged in as =====${discordClient.user?.tag}=====`);
  });

  discordClient.on(Events.Error, (error) => {
    console.error("Discord client error:", error);
  });
}

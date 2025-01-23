import { Client, GatewayIntentBits, Events } from "discord.js";
import { responsePairs } from "./responsePairs";

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

  discordClient.on(Events.MessageCreate, async (message) => {
    console.log(
      `Received message from ${message.author.tag}: ${message.content}`
    );

    if (message.author.bot) return;

    const matchedPair = responsePairs.find((pair) =>
      pair.listenFor.some((keyword) =>
        message.content.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    if (matchedPair) {
      const randomResponse =
        matchedPair.responses[
          Math.floor(Math.random() * matchedPair.responses.length)
        ];
      await message.reply(randomResponse);
    }
  });

  discordClient.on(Events.Error, (error) => {
    console.error("Discord client error:", error);
  });
}

import { Events } from "discord.js";
import { discordClient } from "./initializeBot";
import { reactMentions } from "./reactMentions";

export function autoReacts() {
  try {
    discordClient.on(Events.MessageCreate, async (message) => {
      try {
        if (message.author.bot) return;

        const matchedReact = reactMentions.find((pair) =>
          pair.listenFor.some((keyword) =>
            message.content.toLowerCase().includes(keyword.toLowerCase())
          )
        );

        if (matchedReact) {
          const randomReaction =
            matchedReact.reaction[
              Math.floor(Math.random() * matchedReact.reaction.length)
            ];

          await message.react(randomReaction);
        }
      } catch (error) {
        console.error("Error processing auto react:", error);
      }
    });
  } catch (error) {
    console.error("Error initializing autoReacts:", error);
  }
}

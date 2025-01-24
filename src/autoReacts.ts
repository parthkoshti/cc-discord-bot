import { Events } from "discord.js";
import { discordClient } from "./initializeBot";
import { reactMentions } from "./reactMentions";
import { probability } from "./probability";

export function autoReacts() {
  discordClient.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    const react = probability(0.5);
    if (!react) {
      console.log("No meme for you!");
      return;
    }

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
  });
}

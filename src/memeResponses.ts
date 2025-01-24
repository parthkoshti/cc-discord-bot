import { Events } from "discord.js";
import { discordClient } from "./initializeBot";
import { responsePairs } from "./responsePairs";
import { reactMentions } from "./reactMentions";

export async function memeResponses() {
  discordClient.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    const matchedPair = responsePairs.find((pair) =>
      pair.listenFor.some((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "i");
        return regex.test(message.content);
      })
    );

    if (matchedPair) {
      const randomResponse =
        matchedPair.responses[
          Math.floor(Math.random() * matchedPair.responses.length)
        ];
      await message.reply(randomResponse);
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

import { Events } from "discord.js";
import { discordClient } from "./initializeBot";
import { responsePairs } from "./responsePairs";
import { reactMentions } from "./reactMentions";
import { probability } from "./probability";

export async function memeResponses() {
  discordClient.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    const sendMeme = probability(0.5);
    if (!sendMeme) {
      console.log("No meme for you!");
      return;
    }

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
  });
}

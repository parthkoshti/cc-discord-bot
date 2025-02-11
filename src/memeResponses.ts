import { Events } from "discord.js";
import { discordClient } from "./initializeBot";
import { responsePairs } from "./responsePairs";
import { probability } from "./probability";
import { isRateLimited } from "./rateLimit";
import { logResponse } from "./logResponse";

export async function memeResponses() {
  try {
    discordClient.on(Events.MessageCreate, async (message) => {
      try {
        if (message.author.bot) return;

        if (message.content.length > 900) {
          await message.react(":cantread:848578107375091752");
          await message.reply("Bruh ain't no way I'm reading all that");
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

          const sendMeme = probability(matchedPair.probability ?? 0.5);
          if (!sendMeme) {
            console.log("Chance miss!");
            return;
          }

          if (await isRateLimited(3 * 60 * 1000)) {
            return;
          }

          console.log("Chance hit! Keyword: " + matchedPair.listenFor[0]);

          await message.reply(randomResponse);
          await logResponse(randomResponse, matchedPair.listenFor[0]);
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    });
  } catch (error) {
    console.error("Error initializing memeResponses:", error);
  }
}

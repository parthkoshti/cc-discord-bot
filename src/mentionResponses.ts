import { Events } from "discord.js";
import { discordClient } from "./initializeBot";
import { isRateLimited } from "./rateLimit";
import { logResponse } from "./logResponse";
import { mentionResponsePairs } from "./mentionResponsePairs";

export async function mentionResponses() {
  try {
    discordClient.on(Events.MessageCreate, async (message) => {
      try {
        if (message.author.bot) return;

        // Check if the bot was mentioned
        if (message.mentions.has(discordClient.user!)) {
          //   if (await isRateLimited(2 * 60 * 1000)) {
          //     return;
          //   }

          const totalWeight = mentionResponsePairs.reduce(
            (sum, response) => sum + response.weight,
            0
          );
          let random = Math.random() * totalWeight;
          let selectedResponse = mentionResponsePairs[0].text;

          for (const response of mentionResponsePairs) {
            if (random < response.weight) {
              selectedResponse = response.text;
              break;
            }
            random -= response.weight;
          }

          await message.reply(selectedResponse);
          await logResponse(selectedResponse, "bot_mention");
        }
      } catch (error) {
        console.error("Error processing mention message:", error);
      }
    });
  } catch (error) {
    console.error("Error initializing mentionmentionResponsePairs:", error);
  }
}

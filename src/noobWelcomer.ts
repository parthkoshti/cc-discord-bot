import { Events } from "discord.js";
import { discordClient } from "./initializeBot";
import { noobPairs } from "./noobPairs";

export async function noobWelcomer() {
  try {
    discordClient.on(Events.MessageCreate, async (message) => {
      try {
        if (message.author.bot) return;

        const noobPair = noobPairs.find((pair) =>
          pair.listenFor.some((keyword) => {
            const regex = new RegExp(`\\b${keyword}\\b`, "i");
            return regex.test(message.content);
          })
        );

        if (!noobPair) return;

        const user = message.author.id;
        const guild = message.guild;

        const userJoinTime = await guild?.members
          .fetch(user)
          .then((member) => member.joinedAt)
          .catch((err) => {
            console.error("Error fetching user data:", err);
            return null;
          });

        if (!userJoinTime) return;

        console.log(userJoinTime);

        const isNewUser =
          new Date(userJoinTime).getTime() >
          Date.now() - 1000 * 60 * 60 * 24 * 14;

        if (!isNewUser) {
          console.log("User is not new");
          return;
        }

        const randomResponse =
          noobPair.responses[
            Math.floor(Math.random() * noobPair.responses.length)
          ];
        await message.reply(randomResponse);
      } catch (error) {
        console.error("Error processing noobWelcomer message:", error);
      }
    });

    discordClient.on(Events.Error, (error) => {
      console.error("Discord client error:", error);
    });
  } catch (error) {
    console.error("Error initializing noobWelcomer:", error);
  }
}

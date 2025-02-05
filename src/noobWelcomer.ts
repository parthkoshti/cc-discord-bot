import { Events } from "discord.js";
import { discordClient } from "./initializeBot";
import { noobPairs } from "./noobPairs";

export async function noobWelcomer() {
  discordClient.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    const noobPair = noobPairs.find((pair) =>
      pair.listenFor.some((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "i");
        return regex.test(message.content);
      })
    );

    if (!noobPair) {
      console.log("Noob pair not found");
      return;
    }

    const user = message.author.id;
    const guild = message.guild;

    const userJoinTime = await guild?.members.fetch(user).then((member) => {
      return member.joinedAt;
    });

    console.log(userJoinTime);

    const isNewUser =
      new Date(userJoinTime!).getTime() > Date.now() - 1000 * 60 * 60 * 24 * 14;

    if (!isNewUser) {
      console.log("User is not new");
      return;
    }

    const randomResponse =
      noobPair.responses[Math.floor(Math.random() * noobPair.responses.length)];
    await message.reply(randomResponse);

    discordClient.on(Events.Error, (error) => {
      console.error("Discord client error:", error);
    });
  });
}

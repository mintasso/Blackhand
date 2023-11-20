import {
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
  User,
} from "discord.js";
import { Command } from "./command";
import { db } from "../../index";
import { ListedUser } from "../../db/interfaces";
export const Report: Command = {
  name: "report",
  description: "Report user",
  options: [
    {
      type: ApplicationCommandOptionType.User,
      name: "username",
      description: "Username",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "description",
      description: "Provide a description of the offense.",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "proof",
      description: "Provide an image proving your issue.",
      required: true,
    },
  ],
  run: async (client: Client, i: CommandInteraction) => {
    const user = i.options.getUser("username");
    const proof = JSON.stringify(i.options.get("description")?.value);
    const description = JSON.stringify(i.options.get("proof")?.value);
    if (!user) {
      await i.followUp({ ephemeral: false, content: "User does not exist." });
      return;
    }

    if (user.bot) {
      await i.followUp({
        ephemeral: false,
        content: "You can't report a bot.",
      });
      return;
    }

    const alreadyreported = await db.CheckIfUserBlacklisted([user.id]);
    const UserToReport: ListedUser = {
      user_id: user.id,
      proof: proof.replace(/^"|"$/g, ""), // it was going like '"(value)"'
      description: description.replace(/^"|"$/g, ""),
      severity: 1,
    };
    if (alreadyreported.length === 0) {
      db.add_report(UserToReport);
      await i.followUp({
        ephemeral: false,
        content: "Thank you for reporting the user.",
      });
    } else {
      await i.followUp({
        ephemeral: false,
        content: "This user has already been reported.",
      });
    }
  },
};

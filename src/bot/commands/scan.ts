import { Client, CommandInteraction, EmbedBuilder, UserSelectMenuBuilder } from "discord.js"; // Import MessageEmbed from discord.js
import { Command } from "./command";
import { db } from "../../index";

export const Scan: Command = {
  name: "scan",
  description: "Scans the server for listed users.",
  run: async (client: Client, i: CommandInteraction) => {
    const id = i.guildId;
    const members = await i.guild?.members.fetch();
    await i.followUp({
      ephemeral: true,
      content: "Scanning...",
    });

    if (members) {
      const IDsToCheck = members.map((member) => member.id);
      const result = await db.CheckIfUserBlacklisted(IDsToCheck);
      if (result) {
        const serverSettings = await db.get_server_settings(
          "1154857944744210484"
        );
        let foundUsers: number = 0
        let warnedUsers: number = 0
        let bannedUsers: number = 0
        for (const listedUser of result) {
          if (listedUser.severity >= serverSettings.ban_at) {
            if (serverSettings.autoban) {
              i.followUp({
                embeds: [
                  {
                    author: {
                      name: "User name",
                      icon_url: "https://google.com",
                    },
                    title: "Blacklisted user found!",
                    description:
                      "_**Last known usernames**_:\n_**User ID:**_${listedUser.reported_user.userid}\n_**Severity**_: // severity\n_**Description:**_:\n```\ndescription\n```\n<@123>\n\n[Blackhand Page](https://example.com)\n\n_**Proof:**_",
                    image: {
                      url: "https://google.com",
                    },
                    thumbnail: {
                      url: "https://google.com",
                    },
                    // color: "#e32400",
                    footer: {
                      text: "Blackhand",
                      icon_url: "https://google.com",
                    },
                    // timestamp: 1696615776561,
                  },

                ]})
            } else {
              i.followUp({
              embeds: [
                {
                  author: {
                    name: "User name",
                    icon_url: "https://google.com",
                  },
                  title: "Blacklisted user found!",
                  description:
                    "**Last known usernames**:" + // last known usernames +
                    "\n**User ID: **" + listedUser.reported_user.user_id +
                    "\n**Severity: **" + listedUser.severity +
                    "\n**Description: **\n ```" + listedUser.description + "```" + // description in code blocks
                    "\n<@" + listedUser.reported_user.user_id + ">" + // tag the user
                    "\n\n[Blackhand Page](https://example.com)" +
                    "\n\n**Proof: **" + listedUser.proof,
                  image: {
                    url: "https://google.com",
                  },
                  thumbnail: {
                    url: "https://google.com",
                  },
                  // color: "#e32400",
                  footer: {
                    text: "Blackhand",
                    icon_url: "https://google.com",
                  },
                  // timestamp: 1696615776561,
                },
              ]})
            }
            bannedUsers =+ 1
          } else if (listedUser.severity >= serverSettings.warn_at) {
            i.followUp({
              embeds: [
                {
                  author: {
                    name: "User name",
                    icon_url: "https://google.com",
                  },
                  title: "WARNING! User found!",
                  description:
                    "**Last known usernames**:" + // last known usernames +
                    "\n**User ID: **" + listedUser.reported_user.user_id +
                    "\n**Severity: **" + listedUser.severity +
                    "\n**Description: **\n ```" + listedUser.description + "```" + // description in code blocks
                    "\n<@" + listedUser.reported_user.user_id + ">" + // tag the user
                    "\n\n[Blackhand Page](https://example.com)" +
                    "\n\n**Proof: **" + listedUser.proof,
                  image: {
                    url: "https://google.com",
                  },
                  thumbnail: {
                    url: "https://google.com",
                  },
                  // color: "#e32400",
                  footer: {
                    text: "Blackhand",
                    icon_url: "https://google.com",
                  },
                  // timestamp: 1696615776561,
                },
              ]})
            warnedUsers =+ 1
          }
          foundUsers =+ 1
        }
        i.editReply("__**Found " + foundUsers + " users of which " + bannedUsers + " are blacklisted and " + warnedUsers + " are warned against according to server settings.**__")
      }
    }
  },
};

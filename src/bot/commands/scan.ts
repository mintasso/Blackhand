import { Client, CommandInteraction, UserSelectMenuBuilder } from "discord.js";
import { Command } from "./command";
import { db } from "../../index";

export const Scan: Command = {
  name: "scan",
  description: "Scans the server for listed users.",
  run: async (client: Client, i: CommandInteraction) => {
    const guildid = await i.guildId;
    if (guildid) {
      await i.followUp({
        ephemeral: false,
        content: "Scanning...",
      });
      const members = await i.guild?.members.fetch();
      if (members) {
        const IDsToCheck = members.map((member) => member.id);
        const result = await db.CheckIfUserBlacklisted(IDsToCheck);
        if (result) {
          const serverSettings = await db.get_server_settings(guildid);
          let foundUsers: number = 0;
          let warnedUsers: number = 0;
          let bannedUsers: number = 0;
          for (const listedUser of result) {
            if (listedUser.severity >= serverSettings.ban_at) {
              if (serverSettings.autoban) {
                i.followUp({
                  embeds: [
                    {
                      author: {
                        name: `${
                          (await client.users.fetch(listedUser.user_id))
                            .username
                        }`,
                        // icon_url: "https://google.com",
                      },
                      title: "Blacklisted user found! Banning now...",
                      description:
                        "**User ID: **" +
                        listedUser.user_id +
                        "\n**Severity: **" +
                        listedUser.severity +
                        "\n**Description: **\n ```" +
                        listedUser.description +
                        "```" + // description in code blocks
                        "\n<@" +
                        listedUser.user_id +
                        ">" + // tag the user
                        "\n\n[Blackhand Page](https://blackhand.mintasso.xyz)" +
                        "\n\n**Proof: **" +
                        listedUser.proof,
                      // image: {
                      //   url: "https://google.com",
                      // },
                      // thumbnail: {
                      //   url: "https://google.com",
                      // },
                      color: 15548997,
                      footer: {
                        text: "Blackhand",
                        // icon_url: "https://google.com",
                      },
                      // timestamp: 1696615776561,
                    },
                  ],
                });
              } else {
                i.followUp({
                  embeds: [
                    {
                      author: {
                        name: `${
                          (await client.users.fetch(listedUser.user_id))
                            .username
                        }`,
                        // icon_url: "https://google.com",
                      },
                      title: "Blacklisted user found!",
                      description:
                        "**User ID: **" +
                        listedUser.user_id +
                        "\n**Severity: **" +
                        listedUser.severity +
                        "\n**Description: **\n ```" +
                        listedUser.description +
                        "```" + // description in code blocks
                        "\n<@" +
                        listedUser.user_id +
                        ">" + // tag the user
                        "\n\n[Blackhand Page](https://blackhand.mintasso.xyz)" +
                        "\n\n**Proof: **" +
                        listedUser.proof,
                      color: 10038562,
                      footer: {
                        text: "Blackhand",
                        // icon_url: "https://google.com",
                      },
                      // timestamp: 1696615776561,
                    },
                  ],
                });
              }
              bannedUsers = +1;
            } else if (listedUser.severity >= serverSettings.warn_at) {
              i.followUp({
                embeds: [
                  {
                    author: {
                      name: `${
                        (await client.users.fetch(listedUser.user_id)).username
                      }`,
                      // icon_url: "https://google.com",
                    },
                    title: "WARNING! User found!",
                    description:
                      "\n**User ID: **" +
                      listedUser.user_id +
                      "\n**Severity: **" +
                      listedUser.severity +
                      "\n**Description: **\n ```" +
                      listedUser.description +
                      "```" + // description in code blocks
                      "\n<@" +
                      listedUser.user_id +
                      ">" + // tag the user
                      "\n\n[Blackhand Page](https://example.com)" +
                      "\n\n**Proof: **" +
                      listedUser.proof,
                    // image: {
                    //   url: "https://google.com",
                    // },
                    // thumbnail: {
                    //   url: "https://google.com",
                    // },
                    color: 16776960,
                    footer: {
                      text: "Blackhand",
                      // icon_url: "https://google.com",
                    },
                    // timestamp: 1696615776561,
                  },
                ],
              });
              warnedUsers = +1;
            }
            foundUsers = +1;
          }
          i.editReply(
            "__**Found " +
              foundUsers +
              " users of which " +
              bannedUsers +
              " are blacklisted and " +
              warnedUsers +
              " are warned against according to server settings.**__"
          );
        }
      }
    }
  },
};

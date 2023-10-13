import {
    Client,
    CommandInteraction,
    UserSelectMenuBuilder,
  } from "discord.js";
import { Command } from "./command";
import { db } from "../../index";
import { serverSettings } from "../../db/class";


export const Settings: Command = {
    name: "settings",
    description: "get current server settings (TEST)",
    run: async (client: Client, i: CommandInteraction) => {
        const guildid = "1154857944744210484"
        const warn_at = 1
        const ban_at = 3
        const autoban = true
        await i.followUp({
          ephemeral: true,
          content: "Getting current settings...",
        });
        
        let serverSettings = await db.get_server_settings(guildid)

        i.followUp({
            embeds: [
            {
              title: "Current server settings:",
              description:
                "\n**Warn at: **" +
                serverSettings.warn_at +
                "\n**Ban at: **" +
                serverSettings.ban_at +
                "\n**Autoban: **" +
                serverSettings.autoban,
              // color: "#e32400",
              footer: {
                text: "Blackhand",
                icon_url: "https://google.com",
              },
              // timestamp: 1696615776561,
             
            },
          ],
        });
        await db.change_server_settings(guildid, warn_at, ban_at, autoban)
        serverSettings = await db.get_server_settings(guildid)
        i.followUp({
            embeds: [
            {
              title: "New server settings:",
              description:
                "\n**Warn at: **" +
                serverSettings.warn_at +
                "\n**Ban at: **" +
                serverSettings.ban_at +
                "\n**Autoban: **" +
                serverSettings.autoban,
              // color: "#e32400",
              footer: {
                text: "Blackhand",
                icon_url: "https://google.com",
              },
              // timestamp: 1696615776561,
            
            },
          ],
        });

}}
import { CommandInteraction } from "discord.js";
import { Command } from "./command";
import { DB } from "../../db/class";
import { botClient } from "..";

// Scan command
export const Scan: Command = {
    name: "scan",
    description: "Scans the server for blacklisted users.",
    run: async (client = botClient, i: CommandInteraction) => {
        await i.reply("Scanning...")
        const guildId = i.guildId;
        DB.CheckAllUsers(guildId)
    }
}


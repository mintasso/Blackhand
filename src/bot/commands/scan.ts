import { CommandInteraction } from "discord.js";
import { Command } from "./command";
import { db } from "../index";
import { botClient } from "..";

// Scan command
export const Scan: Command = {
    name: "scan",
    description: "Scans the server for blacklisted users.",
    run: async (client = botClient, i: CommandInteraction) => {
        await i.reply("Scanning...");

        // Check if guildId is not null before proceeding
        const guildId = i.guildId;
        if (guildId) {
            db.CheckAllUsers(guildId);
        } else {
            // Handle the case where guildId is null
            console.error("guildId is null");

        }
    }
}



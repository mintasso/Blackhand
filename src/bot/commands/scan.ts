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
            // Handle the case where guildId is null, e.g., log an error or send a message
            console.error("guildId is null");
            // You can also send a response to the user here if needed
        }
    }
}



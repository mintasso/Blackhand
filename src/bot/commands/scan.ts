import { Client, CommandInteraction } from "discord.js";
import { Command } from "./command";


// Scan command
export const Scan: Command = {
    name: "scan",
    description: "Scans channel",
    run: async (client: Client, i: CommandInteraction) => {
        await i.reply("Scanning...")
    }
}


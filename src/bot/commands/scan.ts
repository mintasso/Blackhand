import { Client, CommandInteraction } from "discord.js";
import { Command } from "./command";
import { db } from "../index";

// Scan command
export const Scan: Command = {
    name: "scan",
    description: "Scans the server for blacklisted users.",
    run: async (client: Client, i: CommandInteraction) => {
        await i.followUp({content: "Scanning...", ephemeral: true});

        // Check if guildId is not null before proceeding
        // const guildId = i.guildId;
        // if (guildId) {
        //     db.CheckAllUsers(guildId);
        // } else {
        //     // Handle the case where guildId is null
        //     console.error("guildId is null");

        // }

        const members =  await i.guild?.members.fetch()

        if(members) {
            for (const member of members) {
                if(member[1].user.displayName) i.channel?.send(member[1].user.displayName);
            }
        }
    }
}



import { Client, CommandInteraction } from "discord.js";
import { Command } from "./command";


// Scan command
export const Scan: Command = {
    name: "scan",
    description: "Scans channel",
    run: async (client: Client, i: CommandInteraction) => {

        const id = i.guildId;

        const members = await i.guild?.members.fetch();
        await i.followUp({
            ephemeral: true,
            content: "Scanning..."
        });

        if(members) {
            console.log(members);

            for (const member of members) {
                console.log(member[0]);
                if(member[1].user.displayName !== null) {
                    i.channel?.send(member[1].user.displayName);
                }
            }
        }
    }
}


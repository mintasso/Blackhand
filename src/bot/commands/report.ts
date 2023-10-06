import { ApplicationCommandOptionType, Client, CommandInteraction, MessageCollector } from "discord.js";
import { Command } from "./command";
import { table } from "../stages/current_statement";

export const Report: Command = {
    name: "report",
    description: "Report user",
    options: [{type: ApplicationCommandOptionType.User, name: "username", 
    description: "Username", required: true }],
    run: async (client: Client, i: CommandInteraction) => {
        if(i.user.bot) return;
        const user = i.options.getUser("username")
        if(!user) {console.log("Error"); return}
        if(user.bot) {
            await i.followUp({ephemeral: true, content: "You can't report a bot."});
            return;
        }
        await i.followUp({
            ephemeral: true,
            content: `${i.options.getUser("username")?.username}`,
        })
        table.get_user_statement(i.user.id).current_position = [1, 0];
    }
}

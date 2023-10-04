import { Client, CommandInteraction } from "discord.js";
import { Command } from "./command";
import { table } from "../stages/current_statement";

// Back command
export const Back: Command = {
    name: "back",
    description: "Returnts back, goes out of commands with stages",
    run: async (client: Client, i: CommandInteraction) => {
        table.get_user_statement(i.user.id).current_position = [0, 0];
        
        i.followUp({
            ephemeral: true,
            content: "You have backed to start",
        })
    }
}

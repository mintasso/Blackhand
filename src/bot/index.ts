import { Client, Events, TextChannel } from "discord.js";
import intents from "./intens";
import {Commands} from "./commands"
import { handleSlashCommand } from "./interectionCreate";
import { checks, stages } from "./stages";
import { table } from "./stages/current_statement";
import { Executable, button_collection } from "./buttons";

const client = new Client({intents: intents })

// Adds commands to appliation and message it's online
client.on("ready", async () => {
    if (!client.user || !client.application) {
        return;
    }

    await client.application.commands.set(Commands);

    console.log(`${client.user.username} is online`);

});

// Handles slash commands
client.on(Events.InteractionCreate, async interaction => {
    if(interaction.user.bot) return;
    if(interaction.isCommand() || interaction.isContextMenuCommand()) {
        const position = table.get_user_statement(interaction.user.id).current_position[0]
        if(!checks(position, interaction))  {
            if(table.get_user_statement(interaction.user.id).current_position[0] > 0
            && interaction.commandName !== "back") return;
                return;
        } 
        await handleSlashCommand(client, interaction);
    }
});

// Handles buttons
client.on(Events.InteractionCreate, async interaction => {
    if(interaction.isButton()) {
        const button = button_collection.get(interaction.customId);
        if(!button) return;

        button(client, interaction);
    }
})


stages(client);

export default client;


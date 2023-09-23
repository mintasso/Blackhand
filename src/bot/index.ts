import { Client, Events, TextChannel } from "discord.js";
import intents from "./intents";
import { Commands} from "./commands"
import { handleSlashCommand } from "./interactionCreate";
import { DB } from '../db/class';

export const db = new DB();


export const botClient = new Client({intents: intents })

// Adds commands to appliation and message it's online
botClient.on("ready", async () => {
    if (!botClient.user || !botClient.application) { 
        return;
    }

    await botClient.application.commands.set(Commands);

    console.log(`${botClient}.user.username} is online`);

});

// Handles slash commands
botClient.on(Events.InteractionCreate, async interaction => {
    if(interaction.isCommand() || interaction.isContextMenuCommand()) {
        await handleSlashCommand(botClient, interaction);
    }
});

botClient.login(process.env.DISCORD_TOKEN)


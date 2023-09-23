import { Client, CommandInteraction } from "discord.js";
import { Commands } from "./commands";

// Slash command handler
export const handleSlashCommand = async(client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    // Occurs error if command doesn't exist
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    await interaction.deferReply();
    
    slashCommand.run(client, interaction);
}


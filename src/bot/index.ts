import { Client, Events, TextChannel } from "discord.js";
import intents from "./intents";
import { Commands } from "./commands";
import { handleSlashCommand } from "./interactionCreate";
import { stages } from "./stages";
import { table } from "./stages/current_statement";

const client = new Client({ intents: intents });

// Adds commands to appliation and message it's online
client.on("ready", async () => {
  if (!client.user || !client.application) {
    return;
  }

  await client.application.commands.set(Commands);

  console.log(`${client.user.username} is online`);
});

// Handles slash commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.user.bot) return;
  if (interaction.isCommand() || interaction.isContextMenuCommand()) {
    if (
      table.get_user_statement(interaction.user.id).current_position[0] > 0 &&
      interaction.commandName !== "back"
    )
      return;
    await handleSlashCommand(client, interaction);
  }
});

stages(client);

export default client;

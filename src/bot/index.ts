import { Client, Events, TextChannel } from "discord.js";
import intents from "./intents";
import { Commands } from "./commands";
import { handleSlashCommand } from "./interactionCreate";

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
    await handleSlashCommand(client, interaction);
  }
});

export default client;

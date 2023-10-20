import { ActionRow, ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, Client, CommandInteraction, MessageActionRowComponent, MessageCollector } from "discord.js";
import { Command } from "./command";
import { table } from "../stages/current_statement";
import { send_message_in_pv } from "../helper";

import { settings_row } from "../m";

export const Settings: Command = {
    name: "settings",
    description: "Set up",
    run: async (client: Client, i: CommandInteraction) => {
        console.log("aaaderer")

        await i.followUp({
            content: "Choose option",
            ephemeral: true,
            components: [settings_row]
        });
    }
}

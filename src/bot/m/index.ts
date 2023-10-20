import { ButtonBuilder, ActionRowBuilder, ButtonStyle, Collection } from "discord.js";

const settings_buttons = [
    new ButtonBuilder().setCustomId("warn_at").setLabel("Change warn at").setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId("ban_at").setLabel("Change ban at").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("autoban").setLabel("Change autoban").setStyle(ButtonStyle.Secondary),
]

export const settings_row = new ActionRowBuilder<ButtonBuilder>().addComponents(settings_buttons);


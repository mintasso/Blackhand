import {IntentsBitField} from "discord.js";

// Intents
const intents = [
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,

    // IntentsBitField.Flags.GuildIntegrations,
    // IntentsBitField.Flags.GuildMembers,
    // IntentsBitField.Flags.GuildModeration,
]


export default intents;

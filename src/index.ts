import dotenv from "dotenv";
import path from "path";
import { Client,  IntentsBitField, Events, } from "discord.js";

dotenv.config({path: __dirname})


let itents = [
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildModeration,
]

const bot = new Client({intents: itents })

bot.once(Events.MessageCreate, async c => {
    c.channel.send("Hello")
})


bot.login(process.env.TOKEN)


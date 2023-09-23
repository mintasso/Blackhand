require('dotenv').config()
import { Client,  IntentsBitField, Events } from "discord.js";
import { DB } from './class'
const db = new DB();

const guildId = '1154857944744210484';


let intents = [
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildModeration,
]

export const botClient = new Client({intents: intents })

botClient.on('shardReady', async (shardId) => {
    console.log(`Shard ${shardId} is ready`);
   db.CheckAllUsers(guildId)
    
})

botClient.login(process.env.DISCORD_TOKEN)







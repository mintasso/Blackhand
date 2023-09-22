import * as dotenv from "dotenv";
import * as path from "path";
import { Client,  IntentsBitField, Events, TextChannel } from "discord.js";

dotenv.config({path: path.resolve(__dirname, "..", ".env")})

// console.log(path.resolve(__dirname, "..", ".env"))


let itents = [
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildModeration,
]

const bot = new Client({intents: itents })

bot.once(Events.MessageCreate, async c => {
    if(c.channel.isTextBased()){
        let channel: TextChannel = c.channel;

        channel.send("Hello")
    }
})


bot.login(process.env.TOKEN)


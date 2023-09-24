import * as dotenv from "dotenv";
import * as path from "path";
import bot from "./bot";

dotenv.config();

bot.login(process.env.TOKEN)


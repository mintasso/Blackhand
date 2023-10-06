import * as dotenv from "dotenv";
import bot from "./bot";
import { DB } from "./db/class"
dotenv.config();

export const db = new DB();

bot.login(process.env.TOKEN)


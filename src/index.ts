import * as dotenv from "dotenv";
import * as path from "path";
import bot from "./bot";

dotenv.config({path: path.resolve(__dirname, "..", ".env")});



bot.login(process.env.TOKEN)


import * as dotenv from "dotenv";
import bot from "./bot";
import { DB, client } from "./db/class";
import {connect} from "mongoose";
dotenv.config();

(async () => {
    client.client = await connect("localhost:27017/extreminator");

    bot.login(process.env.TOKEN);
})()
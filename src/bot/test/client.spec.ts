import {assert} from "chai";
import intents from "../intents";
import { Client, Events } from "discord.js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({path: path.resolve(__dirname, "../../../", ".env")});


class MyClient extends Client {
    my_login() {
        this.login(process.env.TOKEN)
    }
}


export function GetClient() {
    const client = new MyClient({intents: intents })




    return client
}
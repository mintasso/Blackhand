import {assert} from "chai";
import intents from "../intents";
import { Client, Events } from "discord.js";

const client = new Client({intents: intents })



describe("Guild members ID pull", () => {
    it("returns members: ", (done) => {

        // Handles slash commands
    client.on(Events.InteractionCreate, async interaction => {
        
    });
    client.login(process.env.TOKEN)
});







})
import {assert} from "chai";
import intents from "../intens";
import { Client, Events } from "discord.js";

const client = new Client({intents: intents })



describe("Channel members guid", () => {
    it("returns members: ", (done) => {

        // Handles slash commands
    client.on(Events.InteractionCreate, async interaction => {
        
    });
    client.login(process.env.TOKEN)
});







})
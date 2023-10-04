import {assert} from "chai";
import intents from "../intens";
import { Client, Events } from "discord.js";
import * as dotenv from "dotenv";
import * as path from "path";
import {GetClient} from "./client.spec";
import client from "..";




    describe("Gets members by channel id", function () {
        this.timeout(10000);

        const client  = GetClient()
        
        it("returns boolean (members)", (done) => {
            client.once("ready", async () => {
                if(process.env.TEST_CHANNEL_ID) {
                    const guild = await client.guilds.fetch(process.env.TEST_CHANNEL_ID);

                    const members = await guild.members.fetch();

                    const usernames = []

                    for(const member of members.values()) {
                        usernames.push(member.user.username)
                    }
                    console.log("\xa0\xa0\xa0\xa0", usernames);
                    assert.isTrue(usernames.length > 0)
                }
                else {
                    assert.throw(() => {throw Error()}, "process.env.TEST_CHANNEL_ID is undefined")
                }
                await client.destroy();
                done()
            })
            client.my_login()
        })
    })





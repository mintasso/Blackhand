import { assert } from "chai";
import intents from "../intents";
import { Client, Events } from "discord.js";
import * as dotenv from "dotenv";
import * as path from "path";
import { GetClient } from "./client.spec";

describe("Getting username by user_id", function () {
  this.timeout(10000);
  const IDtoFetch: string = "1154858064722272277"
  const client = GetClient();
  it("returns the string (user_id): ", (done) => {
    client.once("ready", async () => {
      const user = await client.users.fetch(IDtoFetch);
      const username = user.username;
      
            assert.isString(username);
            await client.destroy();
            done();
          });
          client.my_login();
        });
      });

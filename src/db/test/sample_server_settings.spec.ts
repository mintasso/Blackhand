import { assert } from "chai";
import * as dotenv from "dotenv";
import { DB, ListedUser, client } from "../class";
const db = new DB();
dotenv.config();

describe("MongoDB Guild Settings List Pull Test", () => {
  it("should retrieve sample server settings data from MongoDB", async () => {
    const guild_id = "1154857944744210484";
    var result = await db.get_server_settings(guild_id);
    const expectedData = [
      {
        warn_at: 3,
        ban_at: 7,
        autoban: true,
      },
    ];

    assert.deepEqual(
      JSON.stringify(result),
      JSON.stringify(expectedData),
      "Retrieved data does not match the expected data"
    );
    client.close();
  });
});

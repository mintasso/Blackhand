import { assert } from "chai";
import { DB } from "../class";
export const db = new DB();
describe("JSON Guild Settings List Pull Test", () => {
  it("should retrieve sample server settings data from the settings file", async () => {
    const guild_id = "1154857944744210484";
    const result = await db.get_server_settings(guild_id);
    const expectedData = [
      {
        guildid: guild_id,
        warn_at: 3,
        ban_at: 7,
        autoban: true,
      },
    ];

    assert.deepEqual(
      JSON.stringify([result]),
      JSON.stringify(expectedData),
      "Retrieved data does not match the expected data"
    );
  });
  it("should retrieve sample user data from the blacklist file", async () => {
    const UsersToCheck = ["298190436995039232", "1154858064722272277"];
    const result = await db.CheckIfUserBlacklisted(UsersToCheck);
    const expectedData = [
      [
        {
          user_id: "298190436995039232",
          proof: "1",
          description: "1",
          severity: 1,
        },
        {
          user_id: "1154858064722272277",
          proof: "1",
          description: "1",
          severity: 1,
        },
      ],
    ];

    assert.deepEqual(
      JSON.stringify([result]),
      JSON.stringify(expectedData),
      "Retrieved data does not match the expected data"
    );
  });
});

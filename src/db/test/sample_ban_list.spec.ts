import { assert } from 'chai';
import * as dotenv from 'dotenv';
import { DB, ListedUser, client } from '../class';
const db = new DB();
dotenv.config();

describe('MongoDB Ban List Pull Test', () => {
  it('should retrieve sample listed user data from MongoDB', async () => {
    const IDsToCheck = ["1154858064722272277", "864605650020597770", "1154858064722272277", "1154859541503152318"];
    var result = await db.CheckIfUserBlacklisted(IDsToCheck);
    const expectedData = [
      {
        reported_user: { user_id: '864605650020597770' },
        user_who_reported: { user_id: '1154858064722272277' },
        proof: 'imgur',
        description: 'bro lacking',
        severity: 8,
      },
      {
        reported_user: { user_id: '1154859541503152318' },
        user_who_reported: { user_id: '1154882619494895646' },
        proof: 'punjabi no virus.bruh',
        description: 'bot',
        severity: 1,
      },
    ];

    assert.deepEqual(JSON.stringify(result), JSON.stringify(expectedData), 'Retrieved data does not match the expected data');
    client.close()
  });
});

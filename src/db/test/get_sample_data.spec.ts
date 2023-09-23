import { MongoClient } from 'mongodb';
import { assert } from 'chai';
import * as dotenv from 'dotenv';
dotenv.config();

describe('MongoDB Data Pull Test', () => {
  it('should retrieve sample from MongoDB', async () => {
    const IDsToCheck = ["1154858064722272277", "864605650020597770", "1154858064722272277", "1154859541503152318"];

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      assert.fail('MONGODB_URI not defined');
    } else {
      const client = new MongoClient(uri);
      try {
        await client.connect();

        const database = client.db('ExterminatorDB');
        const collection = database.collection('Blacklist');

        const query = { 'reported_user.userid': { $in: IDsToCheck } };
        const result = await collection.find(query).toArray();
        const listedUsers = result.map((doc) => ({
          reported_user: {
            user_id: doc.reported_user.userid,
          },
          user_who_reported: {
            user_id: doc.user_who_reported.userid,
          },
          proof: doc.proof,
          description: doc.description,
          severity: doc.severity,
        }));

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

          assert.deepEqual(listedUsers, expectedData, 'Retrieved data does not match the expected data');

        // You can add more assertions here to validate the data as needed.

      } catch (error) {
        assert.fail('Error in CheckIfUserBlacklisted: ' + error);
      } finally {
        client.close();
      }
    }
  });
});

import { MongoClient } from 'mongodb';

require('dotenv').config()
interface UserInfo {
  userid: string;
  reason: string;
  proof: string;
  status: number;
}

export class DB {
  public client: MongoClient;
  public uri: string;

  constructor () {
    const uri = (process.env.mongo);
    const client = new MongoClient("mongodb+srv://DiscordBot1:T2j0iKvXuhyijT5U@cluster0.fwwvpop.mongodb.net/?retryWrites=true&w=majority");

    this.uri = uri ? uri : "";
    this.client = client;
  }
  
  async CheckIfUserBlacklisted(givenId: string): Promise<UserInfo | null> {
    // const uri = (process.env.mongo);
    // const client = new MongoClient("mongodb+srv://DiscordBot1:T2j0iKvXuhyijT5U@cluster0.fwwvpop.mongodb.net/?retryWrites=true&w=majority");
    await this.client.connect();
    
    const database = this.client.db('ExterminatorDB');
    const collection = database.collection('Blacklist');
      
    const result = await collection.findOne({ userid: givenId }); // null - none, status 1 - listed, status 2 - banned
    if (result) {
      const userInfo: UserInfo = {
        userid: result.userid,
        reason: result.reason,
        proof: result.proof,
        status: result.status,
      }
      console.log(userInfo)
			return userInfo;
    }
    else {
      return null;
    }
  }
  async CheckAllUsers(membersIDS: string) {
    for (const userId of membersIDS) {
      this.CheckIfUserBlacklisted(userId);
    }
  }
}

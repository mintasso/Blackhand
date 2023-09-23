import { MongoClient } from 'mongodb';
import { botClient } from './index';
require('dotenv').config()
interface UserInfo {
  userid: string;
  reason: string;
  proof: string;
  status: number;
}

export class DB {
    constructor() {

    }
    async CheckIfUserBlacklisted(givenId: string): Promise<UserInfo | null> {
        
      
      const uri = (process.env.mongo);
      const client = new MongoClient("mongodb+srv://DiscordBot1:T2j0iKvXuhyijT5U@cluster0.fwwvpop.mongodb.net/?retryWrites=true&w=majority");
          await client.connect();
    
          const database = client.db('ExterminatorDB');
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
  async CheckAllUsers(guildId: string) {
    const guild = await botClient.guilds.fetch(guildId)
    console.log(guild)
    if (!guild) {
      console.log("Guild not found.")
      return;
    }
    const members = await guild.members.fetch()
    console.log(members)
    members.forEach((member) => {
      const userId = member.user.id;
      this.CheckIfUserBlacklisted(userId);
    });
    


  }
}


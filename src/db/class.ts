import { Client, GatewayIntentBits } from 'discord.js'; // Import the necessary Discord.js modules
import { MongoClient } from 'mongodb'

interface UserInfo {
  nickname: string;
  id: string;
  reason: string;
  proof: string;
  status: number;
}

export class DB {
    constructor() {

    }

    async CheckIfUserBlacklisted(givenId: number): Promise<UserInfo | null> {
        const uri = process.env.mongodb_uri;
        const client = new MongoClient(uri);
      
          await client.connect();
    
          const database = client.db('ExterminatorDB');
          const collection = database.collection('Blacklist');
      
          const result = await collection.findOne({ userid: givenId }); // null - none, status 1 - listed, status 2 - banned
		if (result) {
			const userInfo: UserInfo = {
				nickname: result.nickname,
				id: result.id,
				reason: result.reason,
        proof: result.proof,
				status: result.status,
			  };
			  return userInfo;
		}
		else {
			return null;
		}

  }
      
    // add_user(id: number, nick: string, reason_of_ban: string) {

    // }
    // delete_user_by_id(id: number) {

    // }
    // delete_user_by_nickname(id: number) {

    // }
    // get_black_list(): UserBanInfo { // prints all nicknames of banned peoples and reason
    //     return {
    //         nickname: "",
    //         reason_of_ban: "",
    //     }
    // }
}




// Assuming your bot client is instantiated elsewhere in your code
const botClient = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Enable guild (server) related intents
    GatewayIntentBits.GuildMembers, // Enable guild member intents
  ],
});

// Define the CheckAllUsers function
async function CheckAllUsers(guildId) {
  try {
    const guild = await botClient.guilds.fetch(guildId); // Fetch the guild by its ID

    if (!guild) {
      console.error('Guild not found.');
      return;
    }

    const members = await guild.members.fetch(); // Fetch all members in the guild

    for (const [memberId, member] of members) {
      // Call the CheckIfUserBlacklisted function for each member's ID
      const result = await this.CheckIfUserBlacklisted(member.id);
      
      if (result) {
        // Handle the result as needed
        console.log(`User ${member.user.tag} is blacklisted with reason: ${result.reason}`);
      } else {
        console.log(`User ${member.user.tag} is not blacklisted.`);
      }
    }
  } catch (error) {
    console.error('Error in CheckAllUsers:', error);
  }
}

// Example usage: assuming you have a guildId from your command
const guildId = '';
CheckAllUsers(guildId);

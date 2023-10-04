import { MongoClient } from 'mongodb'
import * as dotenv from "dotenv";
dotenv.config()

interface ListedUser {
  reported_user: {
    user_id: string;
  }
  user_who_reported: {
    user_id: string;
  }
  proof: string[]
  description: string;
  severity: number;
}

interface ServerSettings {
  way_of_communication_with_users_from_blacklist: string; // For example: get message about joining and reason of been blacklisted

}


const uri = process.env.MONGODB_URI
if (!uri) {
  console.error("MONGODB_URI environment variable is not defined.");
  process.exit(1);
}

const client = new MongoClient(uri);
let connectionStatus = false
client.on('connectionReady', () => {
  console.log("Connected to MongoDB.")
  connectionStatus = true
})
client.on('connectionClosed', () => {
  console.log("Disconnected from MongoDB")
  connectionStatus = false
})


export class DB {
    constructor() {

    }


     async CheckIfUserBlacklisted(IDsToCheck: string[]) {
        try {
          if (!connectionStatus) {
            await client.connect()
          } 
        } catch (error) {
            console.error("Error connecting to MongoDB:", error)
            process.exit(1)
          }
     
            const database = client.db("ExterminatorDB")
            const collection = database.collection('Blacklist')

            try {
              const query = { "reported_user.userid": { $in: IDsToCheck } };
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
                return listedUsers
            }
            catch (error) {
              console.error("Error getting results.")
            }
          
          }
        
    

        

  // Adds to separate table id of server
  add_server_guid_id(guild_id: string) {

  }

  add_new_banned_user(info: ListedUser) {

  }

  remove_server_guid_id(guild_id: string) {

  }
  


  // Creates server settings row (object in NOSQL) and adds server_id other values just undefined
  create_server_settings(server_id: string) {

  }
  
  // You should add similar function to it for each key from ServerSettings
  // You can write just one function with if or case handlers
  add_way_of_communication_with_users_from_blacklist(server_id: string, way: string) {
    // For example
    // change_server_setting(server_id, "add_way_of_communication_with_users_from_blacklist", way)
  }

  // change_server_setting(server_id:string, i: string value: string) {
  // f(i) // you are passing i to mongo.update when finding for key name and pass value there
  // Not Actual
  //   switch i {
  //     case "way_of_communication_with_users_from_blacklist":
  //       // code

  //       break;
  //     case "scale":
  //       // code
  //       break
  //       /// ...
  //   }
  // }




      
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

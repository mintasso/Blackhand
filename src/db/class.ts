import { MongoClient, ServerSession } from "mongodb";
import * as dotenv from "dotenv";
import { serverSettings } from "./interfaces";
import * as mongoose from "mongoose";
dotenv.config();


const uri = process.env.MONGODB_URI as string;

if (!uri) {
  console.error("MONGODB_URI environment variable is not defined.");
  process.exit(1);
}



class Client {
  public client : mongoose.Mongoose | undefined;

}

export const client = new Client()


export class DB {
  private client: mongoose.Mongoose; //MongoClient;
  
  constructor() {
    if(client.client === undefined) throw new Error("mongoose connect unsucsesfull");
    this.client = client.client;
  }


  async is_user_blacklisted(user_id: string) {
    
    model.is_user_blacklisted

  }

  // add_new_banned_user(info: ListedUser) {}

  async get_server_settings(guild_id: string): Promise<serverSettings> {

    const database = this.client.db("BlackhandDB");
    const collection = database.collection("ServerSettings");
    const result = await collection.findOne({ guild_id: guild_id });
    try {
      if (!result) {
        console.log("Creating a new document...");
        const serverSettings_:serverSettings = {
          // default values
          warn_at: [7],
          ban_at: [7],
          autoban: true,
        };
        await collection.insertOne(serverSettings_);
        return serverSettings_;
      } else {
        const serverSettings = {
          warn_at: result.warn_at,
          ban_at: result.ban_at,
          autoban: result.autoban,
        };
        return serverSettings;
      }
    } catch (error) {
      console.error("Error in MongoDB.");
      process.exit(1);
    }
  }

  async change_server_settings(
    guild_id: string,
    server_settings: serverSettings
  ) {

    const database = this.client.db("BlackhandDB");
    const collection = database.collection("ServerSettings");
    const query = { guild_id: guild_id };

    const update = {
      $set: server_settings,
    };
    collection.updateOne(query, update)
    // add prompt to verify the changes by showing old and new configs
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

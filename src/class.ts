import { MongoClient } from 'mongodb'

// interface UserBanInfo {
//     nickname: string;
//     reason_of_ban: string;
// }

export class DB {
    constructor() {

    }

     async CheckIfUserBlacklisted(givenId: number): Promise<boolean> {
        const uri = "mongodb+srv://cluster0.fwwvpop.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority";
        const client = new MongoClient(uri);
      
        try {
          await client.connect();
      
          const database = client.db('Blacklist'); // Change this to your database name
          const collection = database.collection('Blacklist'); // Change this to your collection name
      
          // Check if the integer exists in the collection
          const result = await collection.findOne({ userid:givenId });
      
          return !!result; // Returns true if the integer is found, false otherwise
        } finally {
          client.close();
        }
      }
      Example(givenID: number) {
        this.CheckIfUserBlacklisted(givenID)
        .then((exists) => {
            if (exists) {
                console.log("User is blacklisted.")
            }
            else {
                console.log("User is not blacklisted.")
            }
        }
        )

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

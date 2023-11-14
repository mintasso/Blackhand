import {Schema} from "mongoose";
import * as interfaces from "./interfaces";

export const reported_users_shema = new Schema<interfaces.ReportedUser>({
    user_id: {Number, index: true}, // discord user id of reported user
    reported_by_user: Number, // discord user id of the user who reported
    proof: Array, // array of image names
    description: String, // Description of begin listed
}, {
    statics: {
        
    },
    virtuals: {

    }
})

export const listed_user_shema = new Schema({ //interfaces.IListedUser, interfaces.ListedUserModel, interfaces.IListedUserMethods>
    user_id: {Number, index: true},
    reported_by_user: Number,
    proof: Array,
    description: String,
    factors: Array,
}, {
    statics: {
        async is_user_blacklisted(user_id: string) {
            const user = await this.findOne({user_id: user_id}, "user_id");
            if(user === null) return false;

            return true;
        }
    },
    virtuals: {
        
    }
})



import { Model } from "mongoose";

export interface IListedUser {
  user_id: number; // discord user id of reported user
  reported_by_user: number; // discord user id of the user who reported 
  proof: string[]; // array of image names
  description: string; // Description of begin listed
  factors: string[]; // the reasons for which the user were banned, conclusion of admins
}
export interface IListedUserMethods {
  
}

export interface ListedUserModel extends Model<IListedUser, {}, IListedUserMethods> {
  is_user_blacklisted(user_id: string): Promise<boolean>;
}

export interface ReportedUser {
  user_id: number; // discord user id of reported user
  reported_by_user: number; // discord user id of the user who reported
  proof: string[]; // array of image names
  description: string; // Description of begin listed
}
  
  export interface serverSettings {
    warn_at: number[];
    ban_at: number[];
    autoban: boolean;
  }

  
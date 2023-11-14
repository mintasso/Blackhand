import mongoose from "mongoose";
import { listed_user_shema } from "./shemas";

const ListedUser = mongoose.model("ListedUser", listed_user_shema);


export {ListedUser}
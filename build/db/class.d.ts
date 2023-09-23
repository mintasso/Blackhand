interface UserInfo {
    userid: string;
    reason: string;
    proof: string;
    status: number;
}
export declare class DB {
    CheckIfUserBlacklisted(givenId: string): Promise<UserInfo | null>;
    CheckAllUsers(guildId: string): Promise<void>;
}
export {};

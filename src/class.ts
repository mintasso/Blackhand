interface UserBanInfo {
    nickname: string;
    reason_of_ban: string;
}

class DB {
    constructor() {

    }
    find_for_user_by_user_id(id: number): UserBanInfo | boolean { // Checks is there user in black list
        return false
    }
    add_user(id: number, nick: string, reason_of_ban: string) {

    }
    delete_user_by_id(id: number) {

    }
    delete_user_by_nickname(id: number) {

    }
    get_black_list(): UserBanInfo { // prints all nicknames of banned peoples and reason
        return {
            nickname: "",
            reason_of_ban: "",
        }
    }
    
}


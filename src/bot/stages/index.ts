import { Client, CommandInteraction, Events, Interaction, Message, MessageType } from "discord.js";

import { CurrentStatement } from "./current_statement";
import { table } from "./current_statement";
import { report_stage } from "./report";
import { warn_at } from "../buttons/settings";
import { warn_at_stage } from "./settings";


export function checks(position: number, i: Message| CommandInteraction): boolean {
    switch(position) {
        case 1:
            if(i.channel?.isDMBased()) return true;
            else return false
            
            break

    }
    return true
}

export function stages(client: Client) {
    client.on(Events.MessageCreate, async (i: Message) => {
        if(i.author.bot) return;
        const statement = table.get_user_statement(i.author.id);
        if(!checks(statement.current_position[0], i)) return
        
        switch(statement.current_position[0]) {
            case 1:
                report_stage(client, i, statement);
                break;
            // Waits for warn_at file
            case 2:
                warn_at_stage(client, i, statement);
        }
    })
}

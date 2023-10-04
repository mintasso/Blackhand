import { Client, Events, Interaction, Message } from "discord.js";

import { CurrentStatement } from "./current_statement";
import { table } from "./current_statement";
import { report_stage } from "./report";

export function stages(client: Client) {
    client.on(Events.MessageCreate, async (i: Message) => {
        if(i.author.bot) return;
        const statement = table.get_user_statement(i.author.id);
        
        switch(statement.current_position[0]) {
            case 1:
                report_stage(client, i, statement);
                break;
        }
    })
}

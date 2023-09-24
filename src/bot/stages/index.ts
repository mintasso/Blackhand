import { Client, Events, Interaction } from "discord.js";

import { CurrentStatement } from "./current_statement";
import { table } from "./current_statement";
import { report_stage } from "./report";

export function stages(client: Client) {
    client.on(Events.InteractionCreate, async (i: Interaction) => {
        const statement = table.get_user_statement(i.user.id);
        
        switch(statement.current_position[0]) {
            case 1:
                report_stage(client, i, statement);
                break;
        }
    })
}

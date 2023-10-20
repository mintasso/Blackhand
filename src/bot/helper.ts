import { ButtonInteraction, Client, CommandInteraction, Message, MessageCreateOptions, MessagePayload } from "discord.js"


export async function send_message_in_pv(client: Client, interaction: CommandInteraction | Message | ButtonInteraction, options: string | MessagePayload| MessageCreateOptions) {
    let user_id: string;
    if(interaction instanceof CommandInteraction)
        user_id = interaction.user.id;
    else if(interaction instanceof ButtonInteraction)
        user_id = interaction.user.id;
    else //(interaction instanceof Message) 
        user_id = interaction.author.id;

    return await (await client.users.fetch(user_id)).send(options)
}

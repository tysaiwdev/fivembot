import Button from "../../structures/Button.js";
import Match from "../../database/Schemas/Match.js";
import { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
export default class extends Button {
    constructor(client) {
        super(client, {
            id: 'tinder_delete',
        })
    }

    run = async (interaction) => {
        const data = await Match.findOne({ message_id: interaction.message.id }).catch(() => {})
        if(!data) return interaction.deferUpdate()
        const embed_err = new EmbedBuilder().setColor('DarkRed').setDescription("Apenas o autor deste perfil pode fazer isso!")
        if(data.id !== interaction.user.id) return interaction.reply({ embeds: [embed_err], ephemeral: true})

        await interaction.message.delete().catch((er) => { console.log(er)})

        Match.deleteMany({id: interaction.user.id})
    }
}
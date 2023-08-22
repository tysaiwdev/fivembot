import Button from "../../structures/Button.js";

import { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
export default class extends Button {
    constructor(client) {
        super(client, {
            id: 'tinder_delete',
        })
    }

    run = async (interaction) => {

    }
}
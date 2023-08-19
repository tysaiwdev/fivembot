import {  PermissionFlagsBits } from 'discord.js'
import Command from '../../structures/Command.js'

export default class extends Command {
    constructor(client) {
        super(client, {
            name: "embed",
            description: "「Information」Crie embeds e edite embeds em seu servidor!",
            options: [
                {
                    type: 1,
                    name: 'create',
                    description: 'Crie embeds e envie em canais especificos',
                    options: [
                        {
                            type: 7,
                            name: "channel",
                            description: "Canal pra  enviar a embed",
                            required: true,
                            channelTypes: [0, 2, 5, 11]
                        },
                        {
                            type: 3,
                            name: "name",
                            description: "Nome de indentificação da embed (não pode ser duplicado!)",
                            required: true,
                        }
                    ]
                },
                {
                    type: 1,
                    name: 'edit',
                    description: 'Remova pontos de usuários',
                    options: [
                        {
                            type: 3,
                            name: "message_id",
                            description: "Id da mensagem onde está a embed",
                            required: true,
                        }
                    ]
                },
            ]
        })
    }

    async run(interaction) {
        const subcommand = interaction.options.getSubcommand()

       await import(`../../subcommands/embed/${subcommand}.js`).then(async data => {
        await data.default(interaction).catch((er) => {
            interaction.reply({ content: "❌", ephemeral: true})
            console.log(er)
        })
       }).catch((er) => {
        console.log(er)
        interaction.reply({ content: "❌", ephemeral: true})
    })
    }
}


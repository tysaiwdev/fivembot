import Command from "../../structures/Command.js";
import mysql from "../../database/index.js"
import User from '../../database/models/User.js'
import emojis from "../../util/Emojis.js";
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js";
export default class extends Command {
    constructor(client) {
        super(client, {
            name: 'ready',
        })
    }

    run = async () => {
        await this.client.registryCommands()
        await mysql.authenticate().then(async () => { // Connect to database
            User.init(mysql); // Initialize model of database
            User.sync(); // Sync model with database

            const users = await User.findAll()
            console.log(users)
        }).catch((err) => console.log(err)); 

        let ServerName;
        let maxClients;
        let banner;
        let icon;
        const data = {
            players: await getPlayers(),
            info: await getInfo()
        }

        console.log(data)
        this.client?.user?.setPresence({
            status: 'online',
            activities: [{
                type: 0,
                name: `${removeSpecialCharactersEmojisAndNumbers(data?.info?.vars?.sv_projectName)} [${data?.players?.length}/${data?.info?.vars?.sv_maxClients}]`,
               }],
        });

        const channel = this.client.channels.cache.get(process.env.CONNECT_CHANNEL_ID)
        if(!channel) return console.warn("CONNECT_CHANNEL_ID is not defined. (.env file)")
        channel.bulkDelete(99).catch(() => {})
        const embed_connect = new EmbedBuilder().setColor(process.env.EMBED_COLOR)
        let ok;
        if(data.players) {
            ServerName = removeSpecialCharactersEmojisAndNumbers(data?.info?.vars?.sv_projectName)
            maxClients = data?.info?.vars?.sv_maxClients
            banner = data?.info?.vars?.banner_detail
            icon = Buffer.from(data?.info?.icon, 'base64')
            embed_connect.setTitle(removeSpecialCharactersEmojisAndNumbers(data?.info?.vars?.sv_projectName) + ` [${data?.players?.length}/${data?.info?.vars?.sv_maxClients}]`)
            embed_connect.setFields(
                {
                    name: "Status",
                    value: "`ONLINE`"
                },
                {
                    name: "ip",
                    value: `\`${process.env.FIVEM_IP}\``
                }
            )
            embed_connect.setThumbnail('attachment://icon.png')
            embed_connect.setFooter({text: `${emojis.loading} Atualizado a cada ${process.env.CONNECT_UPDATE_PER_MINUTES} minutos!`})

            if(banner) embed_connect.setImage(banner)
        } else {
            embed_connect.setTitle(`${removeSpecialCharactersEmojisAndNumbers(process.env.FIVEM_SERVER_NAME)}`)
            embed_connect.setFields(
                {
                    name: "Status",
                    value: "`OFFLINE`"
                },
                {
                    name: "ip",
                    value: `\`${process.env.FIVEM_IP}\``
                }
            )
            embed_connect.setFooter({text: `${emojis.loading} Atualizado a cada ${process.env.CONNECT_UPDATE_PER_MINUTES} minutos!`})
            if(banner) embed_connect.setImage(banner)

            ok = true
        }

        const btn = new ButtonBuilder().setLabel('Abrir FiveM').setStyle('Link').setURL(process.env.FIVEM_REDIRECT).setEmoji(emojis.fivem_logo)
        const row = new ActionRowBuilder().addComponents(btn)

        
        
        let optionsC = {components: [row], embeds: [embed_connect], files: [{ attachment: icon, name: 'icon.png' }]}
        
        if(ok) optionsC = {components: [row], embeds: [embed_connect]}
        const msg = await channel.send(optionsC)

        setInterval(async () => {

            const data2 = {
                players: await getPlayers()
            }
            const embed_connect2 = new EmbedBuilder().setColor(process.env.EMBED_COLOR)

        if(data2.players) {
            embed_connect2.setTitle(ServerName + ` [${data2?.players?.length}/${maxClients}]`)
            embed_connect.setFooter({text: `${emojis.loading} Atualizado a cada ${process.env.CONNECT_UPDATE_PER_MINUTES} minutos!`})
            embed_connect2.setFields(
                {
                    name: "Status",
                    value: "`ONLINE`"
                },
                {
                    name: "ip",
                    value: `\`${process.env.FIVEM_IP}\``
                }
            )
            embed_connect.setThumbnail('attachment://icon.png')
            if(banner) embed_connect.setImage(banner)
        } else {
            embed_connect2.setTitle(`${process.env.FIVEM_SERVER_NAME}`)
            embed_connect2.setFields(
                {
                    name: "Status",
                    value: "`OFFLINE`"
                },
                {
                    name: "ip",
                    value: `\`${process.env.FIVEM_IP}\``
                }
            )
            embed_connect.setThumbnail('attachment://icon.png')
            if(banner) embed_connect.setImage(banner)
        }
            msg.edit({embeds: [embed_connect], files: [{ attachment: icon, name: 'icon.png' }]}).catch(() => {})
        }, Number(process.env.CONNECT_UPDATE_PER_MINUTES) * 60000)
    }
}

async function getPlayers() {
    const res = await fetch(`http://${process.env.FIVEM_IP}/players.json`).catch(() => {})
    const array = await res?.json().catch(() => {})
    if(!array) return undefined
    return array
}

async function getInfo() {
    const res = await fetch(`http://${process.env.FIVEM_IP}/info.json`).catch(() => {})
    const array = await res?.json().catch(() =>{})
    if(!array) return undefined
    return array
}

function removeSpecialCharactersEmojisAndNumbers(inputString) {
    // Remove caracteres especiais, emojis e números
    const stringWithoutSpecialCharsEmojisAndNumbers = inputString?.replace(/[^\w\s]|[\d]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
  
    return stringWithoutSpecialCharsEmojisAndNumbers;
  }
import JujubaClient from './structures/Client.js'
import { config } from 'dotenv'
config()
const client = new JujubaClient({
    intents: [899]
})

client.login(process.env.TOKEN)


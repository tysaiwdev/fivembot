import { connect } from 'mongoose'
import c from 'colors'

connect(process.env.MONGO_URI).then(() => {
    console.log(c.green('[ SYSTEM ] (DATABASE) - Conectado ao mongoDB!'))
})
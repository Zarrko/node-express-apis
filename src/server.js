/* eslint-disable prettier/prettier */
import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { connect } from './utils/db'
import itemRouter from './resources/item/item.router'
import listRouter from './resources/list/list.router'
import { signup, signin, protect } from './utils/auth'


export const app = express()

app.disable('x-powered-by')

// Middleware
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api', protect)


app.post('/signup', signup)
app.post('/signin', signin)
app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)

export const start = async () => {
    try {
        await connect()
        app.listen(config.port, () => {
            console.log(`REST API on http://localhost:${config.port}/api`)
        })
    } catch (e) {
        console.error(e)
    }
}

/* eslint-disable prettier/prettier */
import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

// Middleware
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const router = express.Router()

const log = (req, res, next) => {
    console.log('Logging')
    next()
}

router.get('/me', (req, res) => {
    router.send({ message: 'me' })
})

app.use('/api', router)

app.get('/', log, (req, res) => {
    res.send({ message: 'hello' })
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.send({ message: 'ok' })
})
export const start = () => {
    app.listen(4000, () => {
        console.log('Server is on 4000')
    })
}

// router.route('/cat')
//  .get()
//  .post()
// router.route('/cat/:id)
//   .put()
//   .delete()
//   .get()

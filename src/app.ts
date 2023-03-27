import 'dotenv/config'
import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import indexRoutes from './v1/routes/index.routes'
import { createRoles } from './libs/initialSetup'

const app: Application = express()
createRoles()

app.set('port', process.env.PORT || 4000)

app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', indexRoutes)

export default app

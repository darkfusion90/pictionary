import express from 'express'
import { Server as HttpServer } from 'http'
import cors from 'cors'

import initSocketServer from './socket.io'

const app = express()

const http = new HttpServer(app)
initSocketServer(http)

const port = process.env.PORT || 8000
http.listen(process.env.PORT || 8000, () => console.log(`Listening on port: ${port}`))
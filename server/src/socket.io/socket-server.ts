import { Server as SocketServer, Socket } from "socket.io"
import { Server as HttpServer } from 'http'

interface IPosition {
    x: number
    y: number
}

type ITool = 'brush' | 'eraser'

interface IDrawArgs {
    mousePos: IPosition
    prevMousePos: IPosition
    tool: ITool
    strokeStyle: string
    lineWidth: number
}

const socketLogger = (socket: Socket) => (msg: any, ...args: any[]) => {
    console.log(`\x1b[1;33m[socket.io ${socket.id}]\x1b[0m `, msg, ...args)
}

const socketServer = (http: HttpServer): SocketServer => {
    const io = new SocketServer(http, { cors: { origin: '*' } })

    io.on('connection', (socket: Socket) => {
        const log = socketLogger(socket)

        log('New socket.io connection')
        socket.on('draw', (atRoom: string, args: IDrawArgs) => {
            log(`draw at ${atRoom}`)
            socket.broadcast.to(atRoom).emit('draw', atRoom, args)
        })

        socket.on('join', (roomName) => {
            log('join: ', roomName)
            socket.join(roomName)
        })
    })

    return io
}

export default socketServer
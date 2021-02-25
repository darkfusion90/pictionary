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

const socketServer = (http: HttpServer): SocketServer => {
    const io = new SocketServer(http, { cors: { origin: '*' } })

    io.on('connection', (socket: Socket) => {
        console.log('New socket.io connection: ', socket.id)
        socket.on('draw', (args: IDrawArgs) => {
            console.log('draw: ', args)
            socket.broadcast.emit('draw', args)
        })
    })

    return io
}

export default socketServer
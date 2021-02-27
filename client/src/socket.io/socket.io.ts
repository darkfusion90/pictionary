import { io, Socket } from "socket.io-client"
import DrawingConfig from "../@types/DrawingConfig"

export var socket: Socket = io('/', { autoConnect: false })

const initSocketIo = (): Promise<void> => {
    socket.connect()

    return new Promise<void>((resolve, reject) => {
        socket.on('connect', () => {
            resolve()
        })

        socket.on('error', () => {
            reject()
        })
    })
}

export const notifyDrawingChange = (atRoom: string, drawConfig: DrawingConfig) => {
    socket.emit('draw', atRoom, drawConfig)
}

export const listenForDrawingChange = (atRoom: string, callback: ValueCallback<DrawingConfig>) => {
    socket.on('draw', (roomName: string, args: DrawingConfig) => {
        if (roomName === atRoom) {
            callback(args)
        }
    })
}

export const joinRoom = (roomName: string) => socket.emit('join', roomName)

export default initSocketIo
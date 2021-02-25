import { io, Socket } from "socket.io-client"
import DrawingConfig from "../@types/DrawingConfig"

export var socket: Socket | undefined

const initSocketIo = () => {
    socket = io('/')
    if (socket) {
        socket.on('connect', () => {
            console.log('Connect')
        })
    }
}

export const notifyDrawingChange = (drawConfig: DrawingConfig) => {
    if (socket) {
        socket.emit('draw', drawConfig)
    }
}

export const listenForDrawingChange = (callback: ValueCallback<DrawingConfig>) => {
    if (socket) {
        socket.on('draw', callback)
    }
}

export default initSocketIo
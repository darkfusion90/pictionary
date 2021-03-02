import { socket } from "./socket.io";

const startGame = (roomName: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        socket.emit('start-game', roomName, (joinStatus: 'success' | 'error') => {
            if (joinStatus === 'success') {
                resolve()
            } else {
                reject()
            }
        })
    })
}
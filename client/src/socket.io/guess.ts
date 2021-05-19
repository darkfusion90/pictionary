import { IGuess } from "../store/states/room-state/RoomState"
import { socket } from "./socket.io"

export const makeGuess = (atRoom: string, guess: string): Promise<string> => {
    return new Promise<string>((resolve, _) => {
        socket.emit('make-guess', atRoom, guess, (guessId: string) => resolve(guessId))
    })
}

export const acceptGuess = (atRoom: string, guessId: string) => {
    socket.emit('accept-guess', atRoom, guessId)
}

export const rejectGuess = (atRoom: string, guessId: string) => {
    socket.emit('reject-guess', atRoom, guessId)
}

export const onNewGuess = (atRoom: string, callback: ValueCallback<IGuess>) => {
    socket.on('new-guess', (guessedAtRoom: string, guess: Omit<IGuess, 'atRoom'>) => {
        if (guessedAtRoom === atRoom) {
            callback({ ...guess, atRoom })
        }
    })
}

export const onGuessAccepted = (callback: ValueCallback<string>) => {
    socket.on('guess-accepted', (guessId: string) => {
        callback(guessId)
    })
}

export const onGuessRejected = (callback: ValueCallback<string>) => {
    socket.on('guess-rejected', (guessId: string) => {
        callback(guessId)
    })
}
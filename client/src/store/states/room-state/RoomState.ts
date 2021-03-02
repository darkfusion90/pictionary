export type IGameStatus = 'uninitiated' | 'lobby' | 'started' | 'ended'

interface RoomState {
    roomName?: string
    gameStatus: IGameStatus
}

export default RoomState
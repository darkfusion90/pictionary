import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

import { IPeerNotfyCaseReducerWithPrepare, prepareWithNotifyPeersMeta } from "../../utils/notifyPeers-meta-builder";
import RoomState, { IGameStatus } from "./RoomState";

const initialState: RoomState = {
    gameStatus: 'uninitiated'
}

type IRoomStateCaseReducer<P extends any = any> = IPeerNotfyCaseReducerWithPrepare<RoomState, P>

interface IRoomStateSliceCaseReducer extends SliceCaseReducers<RoomState> {
    setRoomName: IRoomStateCaseReducer<string>
    setGameStatus: IRoomStateCaseReducer<IGameStatus>
}

const roomSlice = createSlice<RoomState, IRoomStateSliceCaseReducer>({
    name: 'roomSlice',
    initialState,
    reducers: {
        setRoomName: {
            reducer: (state, action) => {
                state.roomName = action.payload
            },
            prepare: prepareWithNotifyPeersMeta
        },
        setGameStatus: {
            reducer: (state, action) => {
                state.gameStatus = action.payload
            },
            prepare: prepareWithNotifyPeersMeta
        }
    }
})

export const { reducer, actions } = roomSlice
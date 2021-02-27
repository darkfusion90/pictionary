import { CaseReducer, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import RoomState from "./RoomState";

interface IRoomStateSliceCaseReducer extends SliceCaseReducers<RoomState> {
    setRoomName: CaseReducer<RoomState, PayloadAction<string>>
}

const roomSlice = createSlice<RoomState, IRoomStateSliceCaseReducer>({
    name: 'roomSlice',
    initialState: {},
    reducers: {
        setRoomName: (_, action) => ({ roomName: action.payload })
    }
})

export const { reducer, actions } = roomSlice
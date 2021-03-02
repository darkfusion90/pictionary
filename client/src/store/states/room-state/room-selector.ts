import { createSelector, Selector } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import RoomState, { IGameStatus } from "./RoomState";

export const selectRoomState: Selector<RootState, RoomState> = (state) => state.room

export const selectRoomName = createSelector<RootState, RoomState, string | undefined>(
    selectRoomState,
    (roomState) => roomState.roomName
)

export const gameStatusSelector = createSelector<RootState, RoomState, IGameStatus>(
    selectRoomState,
    (roomState) => roomState.gameStatus
)
import { createSelector, Selector } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import RoomState from "./RoomState";

export const selectRoomState: Selector<RootState, RoomState> = (state) => state.room

export const selectRoomName = createSelector<RootState, RoomState, string | undefined>(
    selectRoomState,
    (roomState) => roomState.roomName
)
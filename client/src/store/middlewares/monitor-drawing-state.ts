import { isAllOf, PayloadAction } from "@reduxjs/toolkit";
import DrawingConfig from "../../@types/DrawingConfig";
import { ThunkMiddleware } from "../../@types/ThunkMiddleware";
import { notifyDrawingChange } from "../../socket.io";
import { actions } from "../states/drawing-state/drawing-slice";
import { selectRoomName } from "../states/room-state/room-selector";

const isLocalUpdate = isAllOf(actions.setDrawingState)

const monitorDrawingState: ThunkMiddleware = (api) => (next) => (action: PayloadAction<DrawingConfig>) => {
    if (isLocalUpdate(action)) {
        const roomName = selectRoomName(api.getState())
        if (roomName) {
            notifyDrawingChange(roomName, action.payload)
        }
    }

    next(action)
}

export default monitorDrawingState
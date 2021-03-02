import { isAllOf } from "@reduxjs/toolkit";

import DrawingConfig from "../../@types/DrawingConfig";
import { ThunkMiddleware } from "../../@types/ThunkMiddleware";

import { IPayloadActionWithPeerNotifyMeta, shouldNotifyPeers } from "../utils/notifyPeers-meta-builder";
import { notifyDrawingChange } from "../../socket.io";
import { actions } from "../states/drawing-state/drawing-slice";
import { selectRoomName } from "../states/room-state/room-selector";

const isDrawingStateAction = isAllOf(actions.setDrawingState)

const monitorDrawingState: ThunkMiddleware = (api) => (next) => (action: IPayloadActionWithPeerNotifyMeta<DrawingConfig>) => {
    if(shouldNotifyPeers(action) && isDrawingStateAction(action)){
        const roomName = selectRoomName(api.getState())
        if (roomName) {
            notifyDrawingChange(roomName, action.payload)
        }
    }

    next(action)
}

export default monitorDrawingState
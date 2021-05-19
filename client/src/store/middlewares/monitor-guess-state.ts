import { isAnyOf } from "@reduxjs/toolkit";
import { ThunkMiddleware } from "../../@types/ThunkMiddleware";

import { acceptGuess, rejectGuess } from "../../socket.io/guess";
import { selectRoomName } from "../states/room-state/room-selector";
import { actions } from "../states/room-state/room-slice";
import { shouldNotifyPeers } from "../utils/notifyPeers-meta-builder";

const isRejectGuess = isAnyOf(actions.rejectGuess)
const isAcceptGuess = isAnyOf(actions.acceptGuess)

const monitorGuessState: ThunkMiddleware = (api) => (next) => (action) => {
    const roomName = selectRoomName(api.getState())

    if (shouldNotifyPeers(action) && roomName) {
        if (isAcceptGuess(action)) {
            acceptGuess(roomName, action.payload)
        }

        if (isRejectGuess(action)) {
            rejectGuess(roomName, action.payload)
        }
    }

    next(action)
}

export default monitorGuessState
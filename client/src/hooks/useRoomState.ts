import { useSelector } from "react-redux"
import { useAppDispatch } from "../store"
import { selectRoomState } from "../store/states/room-state/room-selector"
import { actions } from "../store/states/room-state/room-slice"
import RoomState from "../store/states/room-state/RoomState"

type IUseRoomStateMeta = RoomState

interface IUseRoomStateActions {
    setRoomName: ValueCallback<string>
}

const useRoomState = (): Hook<IUseRoomStateMeta, IUseRoomStateActions> => {
    const roomState = useSelector(selectRoomState)
    const dispatch = useAppDispatch()

    return [
        roomState,
        { setRoomName: roomName => dispatch(actions.setRoomName(roomName)) }
    ]
}

export default useRoomState
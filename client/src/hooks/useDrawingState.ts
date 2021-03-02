import { useSelector } from "react-redux"
import { useAppDispatch } from "../store"
import { selectDrawingState } from "../store/states/drawing-state/drawing-selectors"
import { actions } from "../store/states/drawing-state/drawing-slice"
import DrawingState from "../store/states/drawing-state/DrawingState"
import { IHookActionWithPeerNotify } from "./utils"

type IUseDrawingStateMeta = DrawingState
interface IUseDrawingStateActions {
    updateDrawingState: IHookActionWithPeerNotify<DrawingState>
}

const useDrawingState = (): Hook<IUseDrawingStateMeta, IUseDrawingStateActions> => {
    const dispatch = useAppDispatch()

    return [
        useSelector(selectDrawingState),
        {
            updateDrawingState: (meta) => (drawingState) => dispatch(actions.setDrawingState(drawingState, meta)),
        }
    ]
}

export default useDrawingState
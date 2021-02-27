import { useSelector } from "react-redux"
import { useAppDispatch } from "../store"
import { selectDrawingState } from "../store/states/drawing-state/drawing-selectors"
import { actions } from "../store/states/drawing-state/drawing-slice"
import DrawingState from "../store/states/drawing-state/DrawingState"

type IUseDrawingStateMeta = DrawingState
interface IUseDrawingStateActions {
    updateDrawingState: ValueCallback<DrawingState>
    remoteUpdateDrawingState: ValueCallback<DrawingState>
}

const useDrawingState = (): Hook<IUseDrawingStateMeta, IUseDrawingStateActions> => {
    const dispatch = useAppDispatch()

    return [
        useSelector(selectDrawingState),
        {
            updateDrawingState: (drawingState) => dispatch(actions.setDrawingState(drawingState)),
            remoteUpdateDrawingState: (drawingState)=>dispatch(actions.setRemoteDrawingState(drawingState))
        }
    ]
}

export default useDrawingState
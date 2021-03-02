import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { IPeerNotfyCaseReducerWithPrepare, prepareWithNotifyPeersMeta } from "../../utils/notifyPeers-meta-builder";
import DrawingState from "./DrawingState";

const initialDrawingState: DrawingState = {
    mousePos: { x: 0, y: 0 },
    prevMousePos: { x: 0, y: 0 },
    strokeStyle: 'black',
    lineWidth: 3,
    tool: 'brush',
    isDrawing: false
}

type IDrawingStateCaseReducer<P> = IPeerNotfyCaseReducerWithPrepare<DrawingState, P>

interface IDrawingStateSliceCaseReducers extends SliceCaseReducers<DrawingState> {
    setDrawingState: IDrawingStateCaseReducer<DrawingState>
}

const drawingSlice = createSlice<DrawingState, IDrawingStateSliceCaseReducers>({
    name: 'drawingSlice',
    initialState: initialDrawingState,
    reducers: {
        setDrawingState: {
            reducer: (_, action) => action.payload,
            prepare: prepareWithNotifyPeersMeta
        }
    }
})

export const { reducer, actions } = drawingSlice

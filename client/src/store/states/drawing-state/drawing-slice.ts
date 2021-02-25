import { CaseReducer, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import DrawingState from "./DrawingState";

const initialDrawingState: DrawingState = {
    mousePos: { x: 0, y: 0 },
    prevMousePos: { x: 0, y: 0 },
    strokeStyle: 'black',
    lineWidth: 3,
    tool: 'brush',
    isDrawing: false
}

interface IDrawingStateSliceCaseReducers extends SliceCaseReducers<DrawingState> {
    setDrawingState: CaseReducer<DrawingState, PayloadAction<DrawingState>>
}

const drawingSlice = createSlice<DrawingState, IDrawingStateSliceCaseReducers>({
    name: 'drawingSlice',
    initialState: initialDrawingState,
    reducers: {
        setDrawingState: (_, action: PayloadAction<DrawingState>) => action.payload
    }
})

export const { reducer, actions } = drawingSlice
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer as drawingStateReducer } from "./states/drawing-state/drawing-slice";
import { useDispatch } from 'react-redux'

const store = configureStore({
    reducer: {
        drawingState: drawingStateReducer
    },
    middleware: getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = any
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export default store

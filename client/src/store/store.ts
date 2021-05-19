import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import middlewares from "./middlewares";

import { reducer as drawingStateReducer } from "./states/drawing-state/drawing-slice";
import { reducer as guessStateReducer } from "./states/guess-state/guess-state-slice";
import { reducer as roomStateReducer } from "./states/room-state/room-slice";

const store = configureStore({
    reducer: {
        drawingState: drawingStateReducer,
        room: roomStateReducer,
        guesses: guessStateReducer
    },
    middleware: getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(middlewares)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = any
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export default store

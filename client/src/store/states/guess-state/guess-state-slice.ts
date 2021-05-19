import { CaseReducer, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { IPeerNotfyCaseReducerWithPrepare, prepareWithNotifyPeersMeta } from "../../utils/notifyPeers-meta-builder";
import { makeGuess } from "./actions";

import IGuessState, { guessStateAdapter, IGuess } from "./GuessState";

const addGuessToState = (state: IGuessState, { payload }: PayloadAction<IGuess>) => {
    guessStateAdapter.addOne(state, { ...payload, resultNotifiedToUser: false })
}

const updateGuessStatus = (newStatus: IGuess['status']) => (state: IGuessState, { payload: guessId }: PayloadAction<string>) => {
    guessStateAdapter.updateOne(state, { id: guessId, changes: { status: newStatus } })
}

type IGuessStateCaseReducerWithNotifyPeersMeta<P = any, M = {}> = IPeerNotfyCaseReducerWithPrepare<IGuessState, P, M>

interface IGuessStateSliceCaseReducers extends SliceCaseReducers<IGuessState> {
    addGuess: CaseReducer<IGuessState, PayloadAction<IGuess>>
    acceptGuess: IGuessStateCaseReducerWithNotifyPeersMeta<string>
    rejectGuess: IGuessStateCaseReducerWithNotifyPeersMeta<string>
    markGuessResultNotified: CaseReducer<IGuessState, PayloadAction<string>>
}

const guessSlice = createSlice<IGuessState, IGuessStateSliceCaseReducers>({
    name: 'guess-slice',
    initialState: guessStateAdapter.getInitialState(),
    reducers: {
        addGuess: addGuessToState,
        acceptGuess: {
            reducer: updateGuessStatus('accepted'),
            prepare: prepareWithNotifyPeersMeta
        },
        rejectGuess: {
            reducer: updateGuessStatus('rejected'),
            prepare: prepareWithNotifyPeersMeta
        },
        markGuessResultNotified: (state, { payload: guessId }) => {
            guessStateAdapter.updateOne(state, { id: guessId, changes: { resultNotifiedToUser: true } })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(makeGuess.fulfilled, addGuessToState)
    }
})

export const { reducer, actions } = guessSlice
export { makeGuess }
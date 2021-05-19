import { createEntityAdapter } from "@reduxjs/toolkit";

export type IGuessStatus = 'accepted' | 'rejected' | 'waiting'

export type IGuess = {
    id: string
    guess: string
    status: IGuessStatus
    atRoom: string
}

export const guessStateAdapter = createEntityAdapter<IGuess & {
    resultNotifiedToUser: boolean
}>()

type IGuessState = ReturnType<typeof guessStateAdapter.getInitialState>

export default IGuessState
import { createAsyncThunk } from "@reduxjs/toolkit";

import { makeGuess as socketMakeGuess } from '../../../socket.io/guess'
import { IGuess } from "./GuessState";

export const makeGuess = createAsyncThunk<IGuess, { guess: string, atRoom: string }>(
    'make-guess',
    async ({ guess, atRoom }) => {
        try {
            const guessId = await socketMakeGuess(atRoom, guess)
            return {
                guess,
                atRoom,
                id: guessId,
                status: 'waiting'
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }
)
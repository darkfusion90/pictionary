import { createAsyncThunk } from "@reduxjs/toolkit";

import { IGuess } from "./RoomState";
import { makeGuess as socketMakeGuess } from '../../../socket.io/guess'

export const makeGuess = createAsyncThunk<IGuess, { guess: string, atRoom: string }>(
    'make-guess',
    async ({ guess, atRoom }) => {
        try {
            const guessId = await socketMakeGuess(atRoom, guess)
            return {
                guess,
                id: guessId,
                status: 'waiting'
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }
)
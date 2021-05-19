import { RootState } from "../../store";
import { guessStateAdapter } from "./GuessState";

const guessStateSelectors = guessStateAdapter.getSelectors<RootState>((state) => state.guesses)

export const selectAllUnnotifiedGuessesAtRoom = (atRoom?: string) => (state: RootState) => {
    if (!atRoom) {
        return []
    }

    return guessStateSelectors.selectAll(state).filter(guess => {
        if (guess.resultNotifiedToUser || guess.status === 'waiting') {
            return false
        }

        return guess.atRoom === atRoom
    })
}
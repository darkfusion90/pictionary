import { Button, TextField, Typography } from '@material-ui/core'
import React from 'react'
import Center from '../../../components/Center'
import useRoomState from '../../../hooks/useRoomState'
import { onGuessAccepted, onGuessRejected, onNewGuess } from '../../../socket.io/guess'
import { useAppDispatch } from '../../../store'
import { makeGuess } from '../../../store/states/room-state/actions'
import { actions } from '../../../store/states/guess-state/guess-state-slice'
import { useSelector } from 'react-redux'
import { selectAllUnnotifiedGuessesAtRoom } from '../../../store/states/guess-state/guess-selectors'

const GuessSection = () => {
    const dispatch = useAppDispatch()
    const [{ roomName }] = useRoomState()
    const unnotifiedGuesses = useSelector(selectAllUnnotifiedGuessesAtRoom(roomName))

    React.useEffect(() => {
        const meta = { notifyPeers: false }
        if (roomName) {
            onNewGuess(roomName, (guess) => dispatch(actions.addGuess(guess)))
        }

        onGuessAccepted((guessId) => dispatch(actions.acceptGuess(guessId, meta)))
        onGuessRejected((guessId) => dispatch(actions.rejectGuess(guessId, meta)))
    }, [roomName, dispatch])

    const [guessFieldValue, setGuessFieldValue] = React.useState<string | undefined>()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuessFieldValue(e.target.value)
    }

    const submitGuess = () => {
        if (guessFieldValue && roomName) {
            dispatch(makeGuess({ guess: guessFieldValue, atRoom: roomName }))
        }
    }

    

    return (
        <Center fullHeight fullWidth>
            <Typography variant='h4' color='textSecondary'>
                Guess
            </Typography>

            <Center fullWidth>
                <TextField label='Enter Guess' variant='outlined' value={guessFieldValue} onChange={handleChange} />
                <Button color='primary' onClick={submitGuess}>Submit Guess</Button>
            </Center>
        </Center>
    )
}

export default GuessSection

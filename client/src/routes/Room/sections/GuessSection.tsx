import { Button, TextField, Typography } from '@material-ui/core'
import React from 'react'
import Center from '../../../components/Center'

const GuessSection = () => {
    return (
        <Center fullHeight fullWidth>
            <Typography variant='h4' color='textSecondary'>
                Guess
            </Typography>

            <Center fullWidth>
                <TextField label='Enter Guess' variant='outlined' />
                <Button color='primary'>Submit Guess</Button>
            </Center>
        </Center>
    )
}

export default GuessSection

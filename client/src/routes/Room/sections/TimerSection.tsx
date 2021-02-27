import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import TimerIcon from '@material-ui/icons/Timer'

import Center from '../../../components/Center'

const TimerSection = () => {
    return (
        <Center fullWidth fullHeight direction='column'>
            <Grid item>
                <TimerIcon fontSize='large' />
            </Grid>
            <Grid item>
                <Typography variant='h2'>00:00</Typography>
            </Grid>
        </Center>
    )
}

export default TimerSection

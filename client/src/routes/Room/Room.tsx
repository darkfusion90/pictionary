import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import useCommonStyles from '../../styles/common-styles'
import DrawingSection from './components/DrawingSection'
import TimerSection from './sections/TimerSection'
import { joinRoom, listenForDrawingChange } from '../../socket.io'
import useDrawingState from '../../hooks/useDrawingState'
import useRoomState from '../../hooks/useRoomState'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => createStyles({
    root: {
        height: '100%',
        padding: theme.spacing(4)
    }
}))

const RoomView: React.FC = () => {
    const { roomName } = useParams<{ roomName: string }>()
    const [{ roomName: roomNameInState }, { setRoomName }] = useRoomState()

    const { remoteUpdateDrawingState } = useDrawingState()[1]

    const { fullHeight } = useCommonStyles()
    const classes = useStyles()

    React.useEffect(() => {
        if (roomName !== roomNameInState) {
            joinRoom(roomName)
            setRoomName(roomName)
        }

        listenForDrawingChange(roomName, remoteUpdateDrawingState)
    }, [roomName, roomNameInState, setRoomName, remoteUpdateDrawingState])

    return (
        <Grid container className={classes.root}>
            <Grid item xs={8} className={fullHeight}>
                <DrawingSection />
            </Grid>
            <Grid item xs={4} className={fullHeight}>
                <TimerSection />
            </Grid>
        </Grid>
    )
}

export default RoomView

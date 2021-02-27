import React from 'react'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import initSocketIo from './socket.io'
import RouteProvider from './routes'

const useStyles = makeStyles((theme) => createStyles({
    root: {
        height: '100%'
    },
    drawingBoard: {
        width: '40vw',
        height: '40vh',
        border: '1px solid red',
        cursor: 'crosshair'
    }
}))

const App = () => {
    const [socketConnected, setSocketConnected] = React.useState(false)

    React.useEffect(() => {
        if (!socketConnected) {
            initSocketIo()
                .then(() => setSocketConnected(true))
                .catch(() => setSocketConnected(false))
        }
    }, [socketConnected])

    /* 
            const [drawingState, { updateDrawingState }] = useDrawingState()
    const classes = useStyles()

    listenForDrawingChange(updateDrawingState)

    const onUpdateDrawingConfig = (drawConfig: DrawingConfig) => {
        notifyDrawingChange(drawConfig)
        updateDrawingState(drawConfig)
    }

    return (
        <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
            className={classes.root}
        >
            <DrawingBoard
                className={classes.drawingBoard}
                drawConfig={drawingState}
                updateDrawConfig={onUpdateDrawingConfig}
            />
            <Button onClick={() => onUpdateDrawingConfig({ ...drawingState, tool: 'eraser' })}>
                Eraser
            </Button>
            <Button onClick={() => onUpdateDrawingConfig({ ...drawingState, tool: 'brush' })}>
                Brush
            </Button>
        </Grid>
    ) */

    if (!socketConnected) {
        return <div>Connecting to server...</div>
    }

    return <RouteProvider />
}

export default App

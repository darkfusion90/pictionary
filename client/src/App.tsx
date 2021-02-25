import React from 'react'
import DrawingBoard from './components/DrawingBoard'
import useDrawingState from './hooks/useDrawingState'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Button, Grid } from '@material-ui/core'
import initSocketIo, { listenForDrawingChange, notifyDrawingChange } from './socket.io'
import DrawingConfig from './@types/DrawingConfig'

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
    React.useEffect(() => {
        initSocketIo()
    }, [])

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
    )
}

export default App

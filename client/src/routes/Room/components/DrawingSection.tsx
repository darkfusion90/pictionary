import React from 'react'
import { Grid, Theme } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import DrawingBoard from './DrawingBoard'
import DrawingToolkit from './DrawingToolkit'
import useDrawingState from '../../../hooks/useDrawingState'
import DrawingConfig from '../../../@types/DrawingConfig'
import useCommonStyles from '../../../styles/common-styles'

interface IDrawingSectionStyleProps {
    tool: DrawingConfig['tool']
}

const useStyles = makeStyles<Theme, IDrawingSectionStyleProps>((theme) => createStyles({
    drawingBoard: {
        width: '100%',
        height: '100%',
        border: '1px solid red',
        cursor: ({ tool }) => tool === 'brush' ? 'crosshair' : `not-allowed`
    },
    drawingBoardContainer: {
        height: '80%',
        width: '100%'
    },
    drawingToolkitContainer: {
        height: '20%',
        width: '100%'
    }
}))

const DrawingSection: React.FC = () => {
    const [drawConfig, { updateDrawingState }] = useDrawingState()
    const classes = useStyles({ tool: drawConfig.tool })
    const { fullHeight } = useCommonStyles()
    
    return (
        <Grid
            container
            direction='column'
            spacing={2}
            className={fullHeight}
        >
            <Grid item className={classes.drawingBoardContainer}>
                <DrawingBoard className={classes.drawingBoard} drawConfig={drawConfig} updateDrawConfig={updateDrawingState} />
            </Grid>
            <Grid item className={classes.drawingToolkitContainer}>
                <DrawingToolkit />
            </Grid>
        </Grid>
    )
}

export default DrawingSection

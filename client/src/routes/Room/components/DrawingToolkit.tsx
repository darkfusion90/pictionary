import React from 'react'
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography, TypographyProps } from '@material-ui/core'

import useDrawingState from '../../../hooks/useDrawingState'

const Subtitle: React.FC<TypographyProps> = (props) => <Typography {...props} variant='subtitle1' />

const DrawingToolkit: React.FC = () => {
    const [{ tool, ...drawingState }, { updateDrawingState }] = useDrawingState()

    const handleOnToolChange = ({ target }: React.ChangeEvent) => {
        const changedTool = (target as HTMLInputElement).value
        updateDrawingState({ ...drawingState, tool: changedTool as any })
    }

    return (
        <Grid
            container
            direction='row'
            justify='space-between'
            wrap='nowrap'
        >
            <Grid item>
                <FormControl size='small'>
                    { /* Disabling focus on label to avoid turning blue which doesn't look good with our design*/ }
                    <FormLabel focused={false}>Tool: </FormLabel>
                    <RadioGroup row name='tool' value={tool} onChange={handleOnToolChange}>
                        <FormControlLabel name='tool' value='brush' control={<Radio />} label='Brush' />
                        <FormControlLabel name='tool' value='eraser' control={<Radio />} label='Eraser' />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item>
                <Subtitle>Color: </Subtitle>
            </Grid>
        </Grid>
    )
}

export default DrawingToolkit

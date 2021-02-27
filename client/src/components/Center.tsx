import React from 'react'
import { Grid, GridProps, StandardProps } from '@material-ui/core'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(() => createStyles({
    fullWidth: {
        width: '100%'
    },
    fullHeight: {
        height: '100%'
    }
}))

interface ICenterProps {
    fullWidth?: boolean
    fullHeight?: boolean
    component?: React.ElementType
}

const Center: React.FC<ICenterProps & StandardProps<any, any, any> & GridProps> = ({ className, fullWidth, fullHeight, ...props }) => {
    const classes = useStyles()
    if (fullHeight) {
        className = clsx(className, classes.fullHeight)
    }

    if (fullWidth) {
        className = clsx(className, classes.fullWidth)
    }

    return (
        <Grid
            container
            justify='center'
            alignItems='center'
            className={className}
            {...props}
        />
    )
}

export default Center

import { createStyles, makeStyles } from "@material-ui/core"

const useCommonStyles = makeStyles(() => createStyles({
    fullWidth: {
        width: '100%'
    },
    fullHeight: {
        height: '100%'
    }
}))

export default useCommonStyles
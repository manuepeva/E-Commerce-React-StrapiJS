import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    toolbar: {

    },
    content: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    },
    root: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 30rem',
        gridGap: '2rem'
    }
}))
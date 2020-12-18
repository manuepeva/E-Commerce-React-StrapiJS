import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    formContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 69rem)',
        width: '50%'
    },
}))
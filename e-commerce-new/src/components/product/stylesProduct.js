import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    // maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    paddingTop: '2em',
    marginTop: '2em'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));


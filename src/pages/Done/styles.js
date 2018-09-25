import dimensions from '../../helpers/dimensions';

const { height } = dimensions();

const styles = (theme) => ({
  root   : {
    display         : 'flex',
    flexWrap        : 'wrap',
    justifyContent  : 'center',
    alignItems      : 'center',
    flexDirection   : 'column',
    backgroundColor : theme.palette.background.paper,
    height          : `${height - 96}px`,
    padding         : 20,
  },
  paper  : {
    ...theme.mixins.gutters(),
    paddingTop     : theme.spacing.unit * 2,
    paddingBottom  : theme.spacing.unit * 2,
    display        : 'flex',
    position       : 'relative',
    alignItems     : 'center',
    flexDirection  : 'column',
    height         : '100%',
  },
  imgCont: {
    paddingTop: 20,
  },
  button : {
    position : 'absolute',
    bottom   : 20,
    width    : `calc(100% - ${theme.spacing.unit * 2 * 2}px)`
  },
});

export default styles

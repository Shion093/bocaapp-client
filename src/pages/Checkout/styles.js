import dimensions from '../../helpers/dimensions';

const { height } = dimensions();

const processButtonHeight = 70;

const styles = (theme) => ({
  root               : {
    display         : 'flex',
    flexWrap        : 'wrap',
    justifyContent  : 'space-around',
    overflowX       : 'hidden',
    backgroundColor : theme.palette.background.paper,
    // height: `${window.innerHeight}px - 56px`,
  },
  gridList           : {
    height    : height - 54 - processButtonHeight,
    overflowY : 'auto',
    margin    : 0,
  },
  buttonContainer    : {
    display        : 'flex',
    justifyContent : 'space-around',
    width          : '100%',
    '& button'     : {
      width : '48%'
    }
  },
  titleCont          : {
    display        : 'flex',
    justifyContent : 'space-between'
  },
  checkoutButtonCont : {
    position : 'absolute',
    height   : processButtonHeight,
    width    : '100%',
    bottom   : 0,
  },
  checkoutButtonPaper : {
    padding : 10,
    height   : processButtonHeight,
    width    : '100%',
  },
});

export default styles

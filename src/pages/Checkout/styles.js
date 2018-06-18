import dimensions from '../../helpers/dimensions';

const { height } = dimensions();

const processButtonHeight = 70;

const styles = (theme) => ({
  root                : {
    display         : 'flex',
    flexWrap        : 'wrap',
    overflowX       : 'hidden',
    backgroundColor : theme.palette.background.paper,
  },
  gridList            : {
    height       : height - 54 - processButtonHeight,
    overflowY    : 'auto',
    margin       : 0,
    alignContent : 'flex-start',
  },
  gridItem : {
    margin : [10, 0],
  },
  buttonContainer     : {
    display        : 'flex',
    justifyContent : 'space-around',
    width          : '100%',
    '& button'     : {
      width : '48%'
    }
  },
  titleCont           : {
    display        : 'flex',
    justifyContent : 'space-between'
  },
  checkoutButtonCont  : {
    position : 'absolute',
    height   : processButtonHeight,
    width    : '100%',
    bottom   : 0,
  },
  checkoutButtonPaper : {
    padding : 10,
    height  : processButtonHeight,
  },
});

export default styles

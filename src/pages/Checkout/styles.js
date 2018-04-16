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
  media              : {
    height : 200,
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
  }
  // icon     : {
  //   color : 'rgba(255, 255, 255, 0.54)',
  // },
  // image : {
  //   width : '100%',
  // },
  // overlay : {
  //   width: '100%',
  //   height: '60%',
  //   backgroundColor: 'rgba(0, 0, 0, 0.54)',
  //   position : 'absolute',
  //   bottom : 0,
  //   left : 0,
  // },
  // textContainer : {
  //   position : 'absolute',
  //   bottom : 10,
  //   left : 10,
  // },
  // text : {
  //   color : 'white',
  // }
});

export default styles

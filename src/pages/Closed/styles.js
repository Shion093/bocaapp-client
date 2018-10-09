const styles = (theme) => ({
  root          : {
    overflowX       : 'hidden',
    backgroundColor : theme.palette.background.paper,
    height          : window.innerHeight - 56,
  },
  icon          : {
    color : 'rgba(255, 255, 255, 0.54)',
  },
  image         : {
    width : '100%',
  },
  overlay       : {
    width           : '100%',
    height          : '40%',
    backgroundColor : 'rgba(0, 0, 0, 0.54)',
    position        : 'absolute',
    bottom          : 0,
    left            : 0,
  },
  textContainer : {
    position : 'absolute',
    bottom   : 10,
    left     : 10,
  },
  text          : {
    color : 'white',
  },
  textTitle     : {
    color : 'black',
  }
});

export default styles

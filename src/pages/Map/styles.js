const styles = theme => ({
  root            : {
    display       : 'flex',
    flexDirection : 'column',
    width         : '100%',
    height        : window.innerHeight - 52,
  },
  map             : {
    width  : '100%',
    height : window.innerHeight - 52,
  },
  buttonContainer : {
    position        : 'absolute',
    bottom          : 0,
    backgroundColor : '#FFF',
    zIndex          : 10,
    padding         : 20,
  },
  button          : {
    marginTop : 10,
  },
  marker2         : {
    width   : 40,
    height  : 45,
    '& img' : {
      width  : '100%',
      height : '100%',
    },
  },
  marker          : {
    position       : 'absolute',
    background     : 'url(https://s3.amazonaws.com/lo-que-sea/assets/logo.png) no-repeat',
    backgroundSize : 'contain',
    top            : '50%',
    left           : '50%',
    marginTop      : -40,
    marginLeft     : -18,
    height         : 40,
    width          : 40,
  }
});

export default styles;


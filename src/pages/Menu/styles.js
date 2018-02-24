const styles = (theme) => ({
  root     : {
    display         : 'flex',
    flexWrap        : 'wrap',
    justifyContent  : 'space-around',
    overflowX       : 'hidden',
    backgroundColor : theme.palette.background.paper,
   // height: `${window.innerHeight}px - 56px`,
  },
  gridList : {
    height: window.innerHeight - 52,
  },
  icon     : {
    color : 'rgba(255, 255, 255, 0.54)',
  },
  image : {
    width : '100%',
  },
  overlay : {
    width: '100%',
    height: '60%',
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
    position : 'absolute',
    bottom : 0,
    left : 0,
  },
  textContainer : {
    position : 'absolute',
    bottom : 10,
    left : 10,
  },
  text : {
    color : 'white',
  }
});

export default styles

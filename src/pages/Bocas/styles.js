const styles = (theme) => ({
  root     : {
    display         : 'flex',
    flexWrap        : 'wrap',
    justifyContent  : 'space-around',
    overflowX       : 'hidden',
    backgroundColor : theme.palette.background.paper,
    paddingTop : 10,
  },
  gridList : {
    height: window.innerHeight - 52,
  },
  media: {
    height: 200,
  },
  buttonContainer : {
    display: 'flex',
    justifyContent: 'space-around',
    width : '100%',
  },
  titleCont : {
    display : 'flex',
    justifyContent : 'space-between'
  }
});

export default styles

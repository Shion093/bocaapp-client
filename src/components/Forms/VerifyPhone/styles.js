const styles = theme => ({
  container : {
    display       : 'flex',
    flexWrap      : 'wrap',
    flexDirection : 'column',
  },
  form      : {
    width : '100%',
    padding: 20,
  },
  buttonCont: {
    width: 'calc(100% - 40px)',
    position: 'absolute',
    bottom: 20,
  }
});

export default styles;
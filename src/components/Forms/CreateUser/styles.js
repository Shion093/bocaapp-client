const styles = theme => ({
  container  : {
    display       : 'flex',
    flexWrap      : 'wrap',
    flexDirection : 'column',
  },
  textField: {
    marginBottom: 12,
  },
  form       : {
    padding : 20,
    width   : '100%'
  },
  buttonCont : {
    width    : 'calc(100% - 40px)',
    position : 'absolute',
    bottom   : 20,
  },
  error: {
    position: 'absolute',
    bottom: -15,
  }
});

export default styles;
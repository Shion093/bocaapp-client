const styles = theme => ({
  container : {
    display       : 'flex',
    flexWrap      : 'wrap',
    flexDirection : 'column',
  },
  textField : {
    marginLeft  : theme.spacing.unit,
    marginRight : theme.spacing.unit,
    width       : 200,
  },
  form      : {
    width : '100%',
    padding: 40,
  },
  buttonCont: {
    width: 'calc(100% - 40px)',
    position: 'absolute',
    bottom: 20,
  }
});

export default styles;
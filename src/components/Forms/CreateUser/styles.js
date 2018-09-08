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
  form: {
    width : '93%',
  },
  menu      : {
    width : 200,
  },
});

export default styles;
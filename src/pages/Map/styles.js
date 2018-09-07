const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  map: {
    width: '100%',
    height: window.innerHeight - 52,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFF',
    zIndex: 10,
    padding: 20,
  },
  button : {
    marginTop: 10,
  },
});

export default styles;


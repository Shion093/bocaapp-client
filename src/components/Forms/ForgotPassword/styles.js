import dimensions from '../../../helpers/dimensions';

const { height } = dimensions();

export default {
  root       : {
    display       : 'flex',
    flexDirection : 'column',
    minWidth      : 300,
    width         : '100%',
    height,
  },
  form       : {
    width : '100%'
  },
  buttonCont : {
    bottom : 20,
    position : 'absolute',
    width: 'calc(100% - 40px)'
  },
  error      : {
    position : 'absolute',
    bottom   : -15,
  },
  stepCont   : {
   // width   : '100%',
    padding : 20,
  }
};

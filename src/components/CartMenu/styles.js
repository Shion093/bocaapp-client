import dimensions from '../../helpers/dimensions';

const { height } = dimensions();

const totalsHeight = 170;

export default {
  paper        : {
    height : '100%',
  },
  list         : {
    width : 310,
  },
  card         : {
    marginTop    : 5,
    marginBottom : 5,
  },
  actions      : {
    display : 'flex',
  },
  remove       : {
    marginLeft : 'auto',
  },
  title        : {
    fontSize : '20px',
  },
  cartList     : {
    overflowY : 'auto',
    height    : height - totalsHeight,
  },
  totals       : {
    position : 'absolute',
    height   : totalsHeight,
    bottom   : 0,
    right    : 0,
  },
  totalDetails : {
    height : totalsHeight,
    width  : 310,
  },
  pricesCont   : {
    display        : 'flex',
    justifyContent : 'space-between',
    padding        : '10px 20px',
    '& p'          : {
      marginBottom : 5,
      marginTop    : 5,
    },
  },
  buttonCont   : {
    padding : '0px 10px',
  },
  noItems      : {
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    flexDirection  : 'column',
    height         : '100%',
    padding        : 20,
  },
  imgCont      : {
    marginBottom : 20,
    '& img'      : {
      width : 100,
    }
  }
};
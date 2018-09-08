import dimensions from '../../helpers/dimensions';

const { height } = dimensions();

const styles = (theme) => ({
  root             : {
    flexGrow  : 1,
    overflowY : 'auto',
  },
  orderCont        : {
    height        : height - 60,
    paddingTop    : 10,
    paddingBottom : 10,
  },
  heading          : {
    fontSize : theme.typography.pxToRem(15),
  },
  secondaryHeading : {
    fontSize : theme.typography.pxToRem(15),
    color    : theme.palette.text.secondary,
  },
  icon             : {
    verticalAlign : 'bottom',
    height        : 20,
    width         : 20,
  },
  columnPanel : {
    flexBasis: '80%',
  },
  details          : {
    alignItems    : 'center',
    display       : 'flex',
    flexDirection : 'column',
  },
  products         : {
    width : '100%',
  },
  total            : {
    width          : '100%',
    display        : 'flex',
    justifyContent : 'space-between',
  },
  helper           : {
    borderLeft : `2px solid ${theme.palette.divider}`,
    padding    : `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link             : {
    color          : theme.palette.primary.main,
    textDecoration : 'none',
    '&:hover'      : {
      textDecoration : 'underline',
    },
  },
});

export default styles

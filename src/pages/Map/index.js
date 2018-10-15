import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import scriptLoader from 'react-async-script-loader'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { polygon, point } from '@turf/helpers';


// Material UI
import Button from '@material-ui/core/Button';
import LocationIcon from '@material-ui/icons/LocationSearching';
import withStyles from '@material-ui/core/styles/withStyles';

// Reducers
import { setOrderLocation } from '../../reducers/orders';
import { setTopBarTitle } from '../../reducers/drawers';

import styles from './styles';

// const google = window.google;

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setOrderLocation,
      setTopBarTitle,
      changePage : () => push('/direccion')
    }, dispatch),
  };
}

class Map extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.marker = null;
    this.geoLocation = null;
    this.delivery = null;
    this.mapContainer = React.createRef();
    this.map = React.createRef();
    this.markerCont = React.createRef();

    this.state = {
      marker       : null,
      geoLocation  : null,
      outside      : false,
      deliveryArea : {},
    }
  }

  componentWillMount() {
    this.props.actions.setTopBarTitle('Dirección');
  }

  initMap = () => {
    const center = { lng : -83.667257, lat : 9.323398 };
    this.map = new window.google.maps.Map(this.mapContainer.current, {
      zoom : 12,
      center,
    });
    console.log(this.map.getCenter());
    const marker = new window.google.maps.Marker({ position : center, map : this.map });
    this.setState({ marker });
    this.mapContainer.current.appendChild(this.markerCont.current);
    this.delivery = new window.google.maps.Circle({
      strokeColor   : '#FF0000',
      strokeOpacity : 0.8,
      strokeWeight  : 2,
      fillColor     : '#FF0000',
      fillOpacity   : 0.35,
      map           : this.map,
      center,
      radius        : 10000,
    });
    this.map.addListener('center_changed', (e) => {
      console.log(e);
      const lat = this.map.getCenter().lat();
      const lng = this.map.getCenter().lng();
      const delivery = new window.google.maps.LatLng(lat, lng);
      const radious = this.delivery.getRadius();
      const center2 = this.delivery.getCenter();
      const circleBounds2 = (window.google.maps.geometry.spherical.computeDistanceBetween(delivery, center2) <= radious);
      console.log(circleBounds2)
      this.state.marker.setPosition(this.map.getCenter());
    })
  };

  componentDidUpdate(prevProps, prevState) {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded !== prevProps.isScriptLoaded
      && isScriptLoadSucceed !== prevProps.isScriptLoadSucceed
      && isScriptLoaded && isScriptLoaded) {
      this.initMap();
    }
  }

  createMarker = () => {
    const { classes } = this.props;
    return (
      <div className={classes.marker}>
        <img src="https://s3.amazonaws.com/lo-que-sea/assets/logo.png" alt="marker"/>
      </div>
    )
  };

  setMarker = () => {
    const lat = this.map.getCenter().lat();
    const lng = this.map.getCenter().lng();
    // this.props.actions.changePage();
    this.props.actions.setOrderLocation({ lat, lng });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.map} ref={this.mapContainer}/>
        <div className={classes.marker} ref={this.markerCont}/>
        <div className={classes.buttonContainer}>
          <Button variant='raised' color='default' onClick={this.getLocation} fullWidth={true}>
            <LocationIcon/>
            Compartir mi ubicacion
          </Button>
          <Button {...{
            className : classes.button,
            disabled  : this.state.outside,
            variant   : 'raised',
            color     : 'primary',
            onClick   : this.setMarker,
            fullWidth : true,
          }}>
            Continuar
          </Button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(scriptLoader(
  ['https://maps.googleapis.com/maps/api/js?key=AIzaSyAhoSvicMOklSaRCKyUsgGD9HwMLRyWSZc']
)(Map)));




import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

// Reducers
import { withStyles } from '@material-ui/core';
import styles from './styles';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      changePage : () => push('/menu')
    }, dispatch),
  };
}

class Map extends Component {
  constructor (props) {
    super(props);

    this.map = null;
    this.geoLocation = null;
    this.mapContainer = React.createRef();

    this.state = {
      marker: null,
    }
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-83.667257, 9.323398],
      zoom: 8,
    });

    this.geoLocation = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: false,
      showUserLocation: false,
    });

    this.geoCoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    });

    this.map.addControl(this.geoLocation);

    this.map.addControl(this.geoCoder);

    this.map.on('click', this.addMarker);
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log(props);
  // }

  getLocation = () => {
    this.geoLocation.trigger();
  };

  coordinateFeature = (lngLat) => {
    return {
      center: lngLat,
      geometry: {
        type: "Point",
        coordinates: lngLat,
      },
      place_name: 'Lat: ' + lngLat.lat + ', Lng: ' + lngLat.lng, // eslint-disable-line camelcase
      place_type: ['coordinate'], // eslint-disable-line camelcase
      properties: {},
      type: 'Feature'
    };
  }

  addMarker = (e) => {
    console.log(e)

    console.log(this.geoCoder)

    this.geoCoder.mapboxClient
      .reverseGeocode({
        query: [-95.4431142, 33.6875431],
        limit: 2
      })
      .send()
      .then(response => {
        // match is a GeoJSON document with geocoding matches
        const match = response.body;
        console.log(response);
      });

    const { lngLat } = e;

    if (this.state.marker) {
      this.state.marker.setLngLat([lngLat.lng, lngLat.lat])
    } else {
      const marker = new mapboxgl.Marker()
        .setLngLat([lngLat.lng, lngLat.lat])
        .addTo(this.map);
      this.setState({ marker });
    }
  };

  render () {
    const { classes, reducers : { restaurant } } = this.props;
    return (
      <div className={ classes.root }>
        <div ref={this.mapContainer} className={classes.map} />
        <button onClick={this.getLocation}>Mi Direccion</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Map))




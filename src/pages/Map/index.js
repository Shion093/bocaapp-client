import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

// Material UI
import Button from '@material-ui/core/Button';
import LocationIcon from '@material-ui/icons/LocationSearching';

// Reducers
import { withStyles } from '@material-ui/core';
import styles from './styles';
import markerImg from './marker.png';

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
      marker      : null,
      geoLocation : null,
    }
  }

  componentDidMount () {
    this.map = new mapboxgl.Map({
      container : this.mapContainer.current,
      style     : 'mapbox://styles/mapbox/streets-v9',
      center    : [-83.667257, 9.323398],
      zoom      : 8,
    });

    const geoLocation = new mapboxgl.GeolocateControl({
      positionOptions   : {
        enableHighAccuracy : true
      },
      trackUserLocation : false,
      showUserLocation  : false,
    });

    geoLocation.on('geolocate', (e) => {
      console.log(e);
      const lng = e.coords.longitude;
      const lat = e.coords.latitude;
      this.addMarker({ lngLat : { lng, lat } })
    });


    this.map.on('load', () => {
      this.map.addSource('polygon', this.createGeoJSONCircle([-83.667257, 9.323398], 10));

      this.map.addLayer({
        id     : 'polygon',
        type   : 'fill',
        source : 'polygon',
        layout : {},
        paint  : {
          'fill-color'   : 'blue',
          'fill-opacity' : 0.1
        }
      });

      // this.geoCoder = new MapboxGeocoder({
      //   accessToken: mapboxgl.accessToken
      // });

      // this.map.addControl(this.geoCoder);

      this.map.on('click', 'polygon', this.addMarker);
      this.map.on('mouseleave', 'polygon', this.outsideCircle);
      this.map.on('click', this.handleMapClick);

      this.map.addControl(geoLocation);

      this.setState({ geoLocation });
    })
  }

  outsideCircle = () => {
    this.setState({ outside : true });
  }

  getLocation = () => {
    this.state.geoLocation.trigger();
  };

  handleMapClick = () => {
    if (this.state.outside) {
      console.log('outside delivery zone')
    }
  }

  createGeoJSONCircle = (center, radiusInKm, points) => {
    if (!points) points = 64;

    const coords = {
      latitude  : center[1],
      longitude : center[0]
    };

    const km = radiusInKm;

    const ret = [];
    const distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
    const distanceY = km / 110.574;

    let theta, x, y;
    for (let i = 0; i < points; i++) {
      theta = (i / points) * (2 * Math.PI);
      x = distanceX * Math.cos(theta);
      y = distanceY * Math.sin(theta);

      ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);

    return {
      type : 'geojson',
      data : {
        type     : 'FeatureCollection',
        features : [{
          type     : 'Feature',
          geometry : {
            type        : 'Polygon',
            coordinates : [ret]
          }
        }]
      }
    };
  };

  addMarker = (e) => {
    const { lngLat } = e;
    if (this.state.marker) {
      this.state.marker.setLngLat([lngLat.lng, lngLat.lat]);
      this.setState({ outside : false });
    } else {
      const marker = new mapboxgl.Marker()
        .setLngLat([lngLat.lng, lngLat.lat])
        .addTo(this.map);
      this.setState({ marker, outside : false });
    }
  };

  render () {
    const { classes, reducers } = this.props;
    return (
      <div className={ classes.root }>
        <div ref={ this.mapContainer } className={ classes.map }/>
        <Button variant='raised' color='primary' onClick={ this.getLocation } fullWidth={ true }>
          <LocationIcon/>
          Compartir mi ubicacion
        </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Map))




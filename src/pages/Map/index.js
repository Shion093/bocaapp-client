import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

// Material UI
import Button from '@material-ui/core/Button';
import LocationIcon from '@material-ui/icons/LocationSearching';
import { withStyles } from '@material-ui/core';

// Reducers
import { setOrderLocation } from '../../reducers/orders';

import styles from './styles';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      setOrderLocation,
      changePage : () => push('/direccion')
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

  setMarker = () => {
    this.props.actions.changePage();
    this.props.actions.setOrderLocation(this.state.marker._lngLat);
  };

  render () {
    const { classes } = this.props;
    return (
      <div className={ classes.root }>
        <div ref={ this.mapContainer } className={ classes.map }/>
        <div className={classes.buttonContainer}>
          <Button variant='raised' color='default' onClick={ this.getLocation } fullWidth={ true }>
            <LocationIcon/>
            Compartir mi ubicacion
          </Button>
          <Button { ...{
            className : classes.button,
            disabled  : !this.state.marker,
            variant   : 'raised',
            color     : 'primary',
            onClick   : this.setMarker,
            fullWidth : true,
          } }>
            Continuar
          </Button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Map))



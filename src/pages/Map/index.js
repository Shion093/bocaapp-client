import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { polygon, point } from '@turf/helpers';

// Material UI
import Button from '@material-ui/core/Button';
import LocationIcon from '@material-ui/icons/LocationSearching';
import withStyles from '@material-ui/core/styles/withStyles';

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
      marker       : null,
      geoLocation  : null,
      outside      : false,
      deliveryArea : {},
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

      const center = this.map.getCenter();

      this.addMarker({ lngLat : { lng : center.lng, lat : center.lat } });

      this.map.on('drag', () => {
        const { lng, lat } = this.map.getCenter();
        this.addMarker({ lngLat : { lng, lat } });
      });

      this.map.on('zoom', () => {
        const { lng, lat } = this.map.getCenter();
        this.addMarker({ lngLat : { lng, lat } });
      });

      this.map.addControl(geoLocation);

      this.setState({ geoLocation });
    })
  }

  getLocation = () => {
    this.state.geoLocation.trigger();
  };

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

    this.setState({
      deliveryArea : polygon([ret]),
    });

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
        .setLngLat([-83.667257, 9.323398])
        .addTo(this.map);
      this.setState({ marker, outside : false });
    }

    const currentPoint = point([lngLat.lng, lngLat.lat]);
    if (booleanPointInPolygon(currentPoint, this.state.deliveryArea)) {
      this.setState({ outside : false });
    } else {
      this.setState({ outside : true });
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
        <div className={ classes.buttonContainer }>
          <Button variant='raised' color='default' onClick={ this.getLocation } fullWidth={ true }>
            <LocationIcon/>
            Compartir mi ubicacion
          </Button>
          <Button { ...{
            className : classes.button,
            disabled  : this.state.outside,
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




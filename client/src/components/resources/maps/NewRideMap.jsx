import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Marker from './Marker.jsx';
import BasicMap from './BasicMap.jsx';
import AutoComplete from './AutoComplete.jsx';


class SearchMap extends Component {

  static propTypes = {
    handlePositions: PropTypes.func.isRequired

  };

  state = {
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    places: [],
    defaultCenter: [34.0522, -118.2437],
    position: []
  };

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };

  addPlace = place => {
    this.setState({ places: [place] });

    const { address_components } = place;
    const ac = address_components;
    const address = {
      street: ac[0].short_name + ' ' + ac[1].short_name,
      city: ac[3].short_name,
      state: ac[5].short_name,
      zip: ac[7].short_name,
    };

    const { lat, lng } = place.geometry.location;
    const destination = [lat(), lng()];

    this.props.handlePositions({
      address,
      destination,
      origin: this.state.position
    });
  };

  componentDidMount() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        this.setState({ position: [latitude, longitude] });
      });
    }
  }



  render() {
    const { places, mapApiLoaded, mapInstance, mapApi, defaultCenter, position } = this.state;
    return (
      <Fragment>
        {!!mapApiLoaded && (
          <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
        )}
        <BasicMap
          defaultZoom={10}
          center={position}
          defaultCenter={defaultCenter}
          bootstrapURLKeys={{
            key: process.env.GOOGLE_MAPS_KEY,
            libraries: ['places', 'geometry'],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          {(!!places) &&
            places.map(place => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.geometry.location.lat()}
                lng={place.geometry.location.lng()}
              />

            ))}
        </BasicMap>
      </Fragment>
    );
  }
}

export default SearchMap;

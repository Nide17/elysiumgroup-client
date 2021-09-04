import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import React from 'react';

const mapStyles = {
  width: '98.5%',
  height: '96%',
};

const MapContainer = (props) => {

  return (
    <Map
      google={props.google}
      zoom={8}
      style={mapStyles}
      initialCenter={{ lat: -1.9739975, lng: 30.1280828 }}>
      <Marker position={{ lat: -1.9739975, lng: 30.1280828 }} />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAuhqQ9VOsgbn3FrydS5H7DyBgPO07dWwg'
})(MapContainer);
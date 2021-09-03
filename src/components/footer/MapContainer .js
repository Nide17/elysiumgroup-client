import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import React from 'react';

const mapStyles = {
  width: '90%',
  height: '90%',
};

const MapContainer = (props) => {

  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   }
  // }

  // render() {

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
// }

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAuhqQ9VOsgbn3FrydS5H7DyBgPO07dWwg'
})(MapContainer);
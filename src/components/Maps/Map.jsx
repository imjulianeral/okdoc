import React, { useState, useEffect } from 'react'
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  InfoWindow,
  Marker,
} from 'react-google-maps'
import Geocode from 'react-geocode'

import mapStyles from './mapStyles'

Geocode.setApiKey(process.env.GATSBY_GOOGLE_MAPS)
Geocode.setLanguage('es')
Geocode.enableDebug()

function Map({ mapPosition }) {
  return (
    <GoogleMap
      defaultZoom={15}
      defaultOptions={{ styles: mapStyles }}
      center={{ lat: mapPosition.lat, lng: mapPosition.lng }}
    >
      <Marker position={{ lat: mapPosition.lat, lng: mapPosition.lng }} />
    </GoogleMap>
  )
}

export default withScriptjs(withGoogleMap(Map))

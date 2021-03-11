import config from '../config';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const PLACE_API_KEY = config['REACT_NATIVE_GOOGLE_API_KEY'];

const MapInput = ({ updateLocation, renderPlacePreview }) => {
  return (
    <GooglePlacesAutocomplete
      styles={{
        textInput: {
          height: 50,
          backgroundColor: '#FFFEF2',
          borderRadius: 25,
          fontSize: 20,
          fontFamily: 'Lato_400Regular',
          color: '#0d525f',
        },
        textInputContainer: {
          width: '90%',
          alignSelf: 'flex-end',
          justifyContent: 'center',
        },
        listView: {
          borderRadius: 25,
        },
        description: {
          fontFamily: 'Lato_400Regular',
          color: '#0d525f',
        },
        row: {
          backgroundColor: '#FFFEF2',
        },
        poweredContainer: {
          backgroundColor: '#FFFEF2',
        },
      }}
      placeholder={'Search'}
      autoFocus={true}
      fetchDetails={true}
      onPress={(data, details = null) => {
        updateLocation(details.geometry.location);
        renderPlacePreview(details);
      }}
      onFail={(error) => console.error(error)}
      query={{
        key: PLACE_API_KEY,
        language: 'en',
      }}
      debounce={200}
    />
  );
};

export default MapInput;

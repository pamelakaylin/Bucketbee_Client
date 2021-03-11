import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const MyMapView = ({ small, region }) => {
  return (
    <MapView
      style={small ? styles.smallMap : styles.map}
      provider={PROVIDER_GOOGLE}
      region={region}
      showsUserLocation={true}
    >
      {region && <MapView.Marker coordinate={region} />}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  smallMap: {
    height: 200,
    width: '100%',
    borderRadius: 7,
  },
});
export default MyMapView;

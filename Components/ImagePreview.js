import React, { useState } from 'react';
import DotLoading from '../Components/dotLoading';
import CameraModal from '../Components/CameraModal';
import AddModal from '../Components/AddModal';
import { uploadToCloud } from '../Operations/Upload';
import * as MediaLibrary from 'expo-media-library';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../styles/theme.style';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

const ImagePreview = ({ photo, discardPhoto }) => {
  const [cmVisible, setCMVisible] = useState(false);
  const [amVisible, setAMVisible] = useState(false);
  const [place, setPlace] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleModalChange = async (name, notes, region) => {
    setCMVisible(false);
    setTimeout(() => {
      setIsLoading(true);
    }, 500);
    let longitude;
    let latitude;
    if (region) {
      longitude = region.longitude;
      latitude = region.latitude;
    }
    const cloudURL = await uploadToCloud(photo);
    const imgArr = [cloudURL];
    const placeObj = { latitude, longitude, name, notes, imgArr };
    setPlace(placeObj);
    setIsLoading(false);
    setAMVisible(true);
  };

  const handleDownload = async () => {
    setDownloading(true);
    const saved = MediaLibrary.createAssetAsync(photo.uri);
    if (saved) {
      setDownloading(false);
      setDownloaded(true);
    }
  };

  return (
    <View style={[styles.container]}>
      <Spinner color={theme.PRIMARY_COLOR_XLITE} visible={isLoading} />
      <AntDesign
        style={styles.discardBtn}
        name="close"
        size={38}
        color={theme.PRIMARY_COLOR_XLITE}
        onPress={discardPhoto}
      />
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={[{ flex: 1 }, photo.flip && styles.flip]}
      />
      <View style={styles.optionContainer}>
        <TouchableOpacity activeOpacity={0.7} onPress={handleDownload}>
          <View style={styles.saveBtn}>
            {downloading && (
              <ActivityIndicator size="small" color={theme.PRIMARY_COLOR} />
            )}
            {!downloading && !downloaded && (
              <Feather name="download" size={20} color={theme.PRIMARY_COLOR} />
            )}
            {downloaded && (
              <Feather name="check" size={20} color={theme.PRIMARY_COLOR} />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setCMVisible(true)}
        >
          <View style={styles.saveBtn}>
            <Text style={styles.text}>Save to bucket</Text>
            <MaterialCommunityIcons
              name="bucket-outline"
              size={20}
              color={theme.PRIMARY_COLOR}
            />
          </View>
        </TouchableOpacity>
      </View>
      <CameraModal
        cmVisible={cmVisible}
        setCMVisible={setCMVisible}
        setAMVisible={setAMVisible}
        handleModalChange={handleModalChange}
      />
      <AddModal
        place={place}
        isVisible={amVisible}
        handleClose={() => setAMVisible(false)}
        onlyAdd={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  flip: { transform: [{ scaleX: -1 }] },
  discardBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  optionContainer: {
    width: '100%',
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 20,
  },
  saveBtn: {
    backgroundColor: theme.PRIMARY_COLOR_XLITE,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  text: {
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
    color: theme.PRIMARY_COLOR,
    marginRight: 4,
  },
});

export default ImagePreview;

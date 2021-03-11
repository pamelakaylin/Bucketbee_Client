import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import ImagePreview from '../Components/ImagePreview';
import theme from '../styles/theme.style';

import { Camera } from 'expo-camera';

import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';

const CameraPage = () => {
  let camera;

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({ base64: true, quality: 0.1 });
    setPreviewVisible(true);
    if (type === 'front') photo.flip = true;
    else photo.flip = false;
    setCapturedImage(photo);
  };

  const discardPhoto = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    takePicture();
  };

  return previewVisible && capturedImage ? (
    <ImagePreview photo={capturedImage} discardPhoto={discardPhoto} />
  ) : (
    <Camera
      style={{ flex: 1, width: '100%' }}
      ref={(r) => {
        camera = r;
      }}
      type={type}
    >
      <View style={styles.backdrop} />
      <Ionicons
        style={styles.flashBtn}
        name="ios-flash-off-outline"
        size={38}
        color={theme.PRIMARY_COLOR_XLITE}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={takePicture}>
          <View style={styles.circle}>
            <View style={styles.smallCircle}></View>
          </View>
        </TouchableOpacity>
      </View>
      <Ionicons
        style={styles.reverseBtn}
        name="camera-reverse-outline"
        size={40}
        color={theme.PRIMARY_COLOR_XLITE}
        onPress={() =>
          setType((current) => (current === 'back' ? 'front' : 'back'))
        }
      />
    </Camera>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  backdrop: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 120,
    flex: 0.2,
    backgroundColor: 'black',
    opacity: 0,
  },
  reverseBtn: {
    position: 'absolute',
    bottom: 40,
    right: 30,
  },
  flashBtn: {
    position: 'absolute',
    bottom: 40,
    left: 30,
  },
  circle: {
    borderRadius: 100,
    backgroundColor: 'transparent',
    opacity: 0.9,
    borderWidth: 4,
    borderColor: theme.PRIMARY_COLOR_XLITE,
    height: 80,
    width: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallCircle: {
    height: 68,
    width: 68,
    backgroundColor: theme.PRIMARY_COLOR_XLITE,
    borderRadius: 100,
  },
});

export default CameraPage;

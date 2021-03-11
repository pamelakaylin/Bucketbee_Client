import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import { uploadToCloud } from '../Operations/Upload';
import * as ImagePicker from 'expo-image-picker';
import theme from '../styles/theme.style';
import { AntDesign } from '@expo/vector-icons';

const ImageUpload = ({ photo, setPhoto }) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      base64: true,
      // quality: 1,
    });

    if (result.cancelled) return;

    const cloudURL = await uploadToCloud(result);
    setPhoto(cloudURL);
  };

  return (
    <View style={{ height: 30, flexDirection: 'row', alignItems: 'center' }}>
      <Pressable onPress={pickImage}>
        <Text style={styles.text}>Upload from camera roll</Text>
      </Pressable>
      {photo && (
        <AntDesign
          name="checkcircle"
          size={24}
          color={theme.PRIMARY_COLOR_LITE}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: theme.PRIMARY_COLOR_LITE,
    fontSize: 20,
    fontFamily: 'Poppins_500Medium',
    textDecorationLine: 'underline',
    marginRight: 15,
  },
});

export default ImageUpload;

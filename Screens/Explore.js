import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Asset } from 'expo-asset';
import { Camera } from 'expo-camera';
import { GET_USER_BY_ID } from '../Services/Users/UsersQuery';
import { useLazyQuery } from '@apollo/client';

import theme from '../styles/theme.style';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import LoadingAnimation from '../Components/LoadingAnimation';

import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';

const Explore = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [getUserById] = useLazyQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      if (data && data.getUserById) {
        setUser(data.getUserById);
      }
    },
    pollInterval: 500,
  });

  const retrieveUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@userData');
      let userData;
      if (value) userData = JSON.parse(value);
      if (userData) {
        getUserById({ variables: { userId: userData.id } });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadImages = async () => {
    let res;
    let vibe = user.vibe.toLowerCase();
    if (vibe === 'city')
      res = await Asset.loadAsync(require(`../assets/city.png`));
    else if (!vibe || vibe === 'mountains')
      res = await Asset.loadAsync(require(`../assets/mountain.png`));
    else if (vibe === 'beach')
      res = await Asset.loadAsync(require(`../assets/beach.png`));

    if (res && res.length) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 2000);
    }
  };
  useEffect(() => {
    if (user) loadImages();
  }, [user]);

  useEffect(() => {
    retrieveUser();
  }, []);

  const startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === 'granted') {
      navigation.navigate('Camera');
    } else {
      Alert.alert('Camera access denied');
    }
  };

  if (user && isLoaded) {
    let icon;
    let vibe = user.vibe.toLowerCase();
    if (!vibe || vibe === 'mountains') icon = require(`../assets/mountain.png`);
    else if (vibe === 'city') icon = require(`../assets/city.png`);
    else if (vibe === 'beach') icon = require(`../assets/beach.png`);
    return (
      <View style={styles.centered}>
        <ImageBackground source={icon} style={styles.backgroundImage}>
          <View style={styles.container}>
            <Text style={styles.title}>Hello, </Text>
            <Text style={styles.title}>{user.firstName}</Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Map')}
            >
              <View style={styles.input}>
                <EvilIcons name="search" size={24} color="white" />
                <Text style={styles.smallText}>
                  &nbsp; Where do you want to go?
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.cameraContainer}>
            <TouchableOpacity onPress={startCamera}>
              <View style={styles.cameraBtn}>
                <FontAwesome
                  name="camera"
                  size={26}
                  color={theme.WHITE_COLOR}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
  return <LoadingAnimation />;
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 0,
    borderRadius: 25,
    paddingRight: 35,
    paddingLeft: 15,
    paddingVertical: 20,
    marginVertical: 20,
    backgroundColor: theme.PRIMARY_COLOR_LITE,
  },
  title: {
    color: theme.WHITE_COLOR,
    fontSize: 60,
    fontFamily: 'Poppins_400Regular',
  },
  smallText: {
    color: 'white',
    fontSize: theme.FONT_SIZE_MEDIUM,
    justifyContent: 'center',
    fontFamily: 'Lato_400Regular',
  },
  container: {
    flex: 0.8,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 25,
    paddingRight: 65,
    paddingBottom: 100,
  },
  cameraContainer: {
    flex: 0.2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 12,
    paddingRight: 12,
  },
  cameraBtn: {
    width: 70,
    height: 70,
    backgroundColor: theme.PRIMARY_COLOR_LITE,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    margin: 10,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
});

export default Explore;

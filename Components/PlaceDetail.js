/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import theme from '../styles/theme.style';
import { FAB, Portal, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import DotLoading from '../Components/dotLoading';

import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  Linking,
  ScrollView,
  Modal,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const PlaceDetail = ({ place, onPress, pdVisible, onAdd }) => {
  return (
    <Modal transparent={true} visible={pdVisible} animationType="slide">
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <FlatList
              style={styles.imageContainer}
              horizontal={true}
              data={place.imgArr}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                return (
                  <Image
                    style={styles.image}
                    source={{
                      uri: item,
                    }}
                  />
                );
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{place.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {place.rating ? (
                <Text style={{ fontFamily: 'Lato_700Bold', color: '#0d525f' }}>
                  {place.rating} ({place.user_ratings_total}) &nbsp;&nbsp;
                  <FontAwesome
                    name="star"
                    size={16}
                    color={theme.SPECIAL_COLOR}
                  />
                  &nbsp;&nbsp;
                </Text>
              ) : null}
              {place.open_now !== undefined ? (
                place.open_now ? (
                  <Text
                    style={{
                      color: 'green',
                      fontFamily: 'Lato_400Regular',
                      paddingRight: 5,
                    }}
                  >
                    Open Now
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: 'red',
                      fontFamily: 'Lato_400Regular',
                      paddingRight: 5,
                    }}
                  >
                    Closed
                  </Text>
                )
              ) : null}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL(place.url)}
              >
                Open in Google Maps
              </Text>
            </View>
            <Text>{''}</Text>
            <Text style={[styles.text, { textTransform: 'capitalize' }]}>
              {place.description}
            </Text>
            <Text style={styles.text}>{place.formatted_address}</Text>
            <Text style={styles.text}>{place.international_phone_number}</Text>
            <Text>{''}</Text>
            <FlatList
              data={place.weekday_text}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                return <Text style={styles.text}>{item}</Text>;
              }}
            />
            {place.review ? (
              <>
                <Text>{''}</Text>
                <Text
                  style={[
                    styles.text,
                    { fontFamily: 'Lato_400Regular_Italic' },
                  ]}
                >
                  "{place.review}"
                </Text>
                <Text>{''}</Text>
              </>
            ) : null}
            <Pressable style={styles.button} onPress={onPress}>
              <AntDesign
                name="downcircle"
                size={55}
                color={theme.PRIMARY_COLOR}
              />
            </Pressable>
            {/* <Provider>
              <Portal>
                <FAB.Group
                  open={openFAB}
                  style={{ paddingTop: 40 }}
                  fabStyle={{
                    backgroundColor: theme.PRIMARY_COLOR,
                    shadowRadius: 0,
                    shadowOffset: { width: 0, height: 0 },
                  }}
                  color={theme.WHITE_COLOR}
                  icon={openFAB ? 'close' : 'plus'}
                  actions={[
                    {
                      color: theme.PRIMARY_COLOR,
                      icon: 'send-outline',
                      small: false,
                      onPress: () => {},
                    },
                    {
                      color: theme.PRIMARY_COLOR,
                      icon: 'heart-outline',
                      onPress: onAdd,
                      small: false,
                    },
                  ]}
                  onStateChange={() => {}}
                  onPress={() => {
                    openFAB ? setOpenFab(false) : setOpenFab(true);
                  }}
                />
              </Portal>
            </Provider> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  container: {
    borderRadius: 25,
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  imageContainer: {
    overflow: 'scroll',
    width: '100%',
    height: 400,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  textContainer: {
    padding: 15,
    backgroundColor: '#fffef8',
  },
  image: {
    width: 300,
    height: 400,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Poppins_600SemiBold',
    color: '#0d525f',
    paddingBottom: 10,
  },
  text: {
    fontFamily: 'Lato_400Regular',
    color: '#0d525f',
    paddingTop: 2,
  },
  link: {
    fontFamily: 'Lato_400Regular',
    color: theme.PRIMARY_COLOR_LITE,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
  },
  button: {
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 5,
    width: 100,
  },
  modal: {
    flex: 1,
    backgroundColor: '#00000000',
  },
});

export default PlaceDetail;

/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import theme from '../styles/theme.style';
import { FAB, Portal, Provider } from 'react-native-paper';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PlacePreview = ({ place, onPress, onAdd }) => {
  const [openFAB, setOpenFab] = useState(false);

  return (
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
      <Pressable style={styles.textContainer} onPress={onPress}>
        <Text style={styles.title}>{place.name}</Text>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          {place.rating ? (
            <Text style={{ fontFamily: 'Lato_700Bold', color: '#0d525f' }}>
              {place.rating} ({place.user_ratings_total}) &nbsp;&nbsp;
              <FontAwesome name="star" size={16} color={theme.SPECIAL_COLOR} />
              &nbsp;&nbsp;
            </Text>
          ) : null}
          {place.open_now !== undefined ? (
            place.open_now ? (
              <Text style={{ color: 'green', fontFamily: 'Lato_400Regular' }}>
                Open Now
              </Text>
            ) : (
              <Text style={{ color: 'red', fontFamily: 'Lato_400Regular' }}>
                Closed
              </Text>
            )
          ) : null}
        </View>
        <View style={styles.addInfo}>
          {place.formatted_address ? (
            <Text style={styles.text}>
              {place.formatted_address}
              {place.international_phone_number ? (
                <Text style={styles.text}>
                  &nbsp;&nbsp; || &nbsp; {place.international_phone_number}
                </Text>
              ) : null}
            </Text>
          ) : null}
        </View>
      </Pressable>
      <Provider>
        <Portal>
          <FAB.Group
            open={openFAB}
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
                onPress: () => {},
                small: false,
              },
              {
                color: theme.PRIMARY_COLOR,
                icon: 'heart-outline',
                onPress: () => {
                  onAdd();
                  setOpenFab(false);
                },
                small: false,
              },
            ]}
            onStateChange={() => {}}
            onPress={() => {
              openFAB ? setOpenFab(false) : setOpenFab(true);
            }}
          />
        </Portal>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.35,
    backgroundColor: '#fffef8',
    margin: 10,
    width: '90%',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  imageContainer: {
    overflow: 'scroll',
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  image: {
    height: 150,
    width: 300,
  },
  textContainer: {
    height: '50%',
    paddingLeft: 20,
    paddingRight: 60,
    paddingVertical: 10,
  },
  addInfo: { marginTop: 10, flexDirection: 'row' },
  title: {
    fontWeight: '500',
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#0d525f',
  },
  saveIcon: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  text: {
    fontFamily: 'Lato_400Regular',
    color: '#0d525f',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
export default PlacePreview;

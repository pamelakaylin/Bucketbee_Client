/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import theme from '../styles/theme.style';
import { FAB, IconButton } from 'react-native-paper';

import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  Linking,
  ScrollView,
  StatusBar,
} from 'react-native';

import AddNotes from '../Components/AddNotes';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Place = ({ route, navigation }) => {
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const place = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: theme.WHITE_COLOR }}>
      <View style={styles.icon}>
        <Ionicons
          name="chevron-back"
          size={35}
          color={theme.PRIMARY_COLOR}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
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
              {place.url && (
                <Text
                  style={styles.link}
                  onPress={() => Linking.openURL(place.url)}
                >
                  Open in Google Maps
                </Text>
              )}
            </View>
            <Text>{''}</Text>
            {place.description && (
              <Text style={[styles.text, { textTransform: 'capitalize' }]}>
                {place.description}
              </Text>
            )}
            {place.formatted_address && (
              <Text style={styles.text}>{place.formatted_address}</Text>
            )}
            {place.international_phone_number && (
              <Text style={styles.text}>
                {place.international_phone_number}
              </Text>
            )}
            <Text>{''}</Text>
            {place.weekday_text && (
              <FlatList
                data={place.weekday_text}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                  return <Text style={styles.text}>{item}</Text>;
                }}
              />
            )}
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
            <View style={styles.notesContainer}>
              <View style={styles.noteText}>
                <Text style={styles.text}>Notes:</Text>
                <MaterialIcons
                  name="edit"
                  size={24}
                  color={theme.PRIMARY_COLOR}
                  onPress={() => setNoteModalVisible(true)}
                />
              </View>
              <View style={styles.notes}>
                {place.notes ? (
                  <Text style={styles.text}>{place.notes}</Text>
                ) : (
                  <Text style={styles.text}>Add a note</Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <AddNotes
          noteModalVisible={noteModalVisible}
          setNoteModalVisible={setNoteModalVisible}
          place={place}
        />
      </ScrollView>
      <View style={styles.sendBtn}>
        <FAB icon="send" color={theme.PRIMARY_COLOR} onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SAV: { flex: 1, paddingTop: StatusBar.currentHeight },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  imageContainer: {
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  textContainer: {
    padding: 15,
    backgroundColor: '#fffef8',
  },
  notesContainer: {
    minHeight: 200,
  },
  image: {
    width: 415,
    height: 460,
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
    fontSize: 15,
  },
  link: {
    fontFamily: 'Lato_400Regular',
    color: theme.PRIMARY_COLOR_LITE,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    fontSize: 19,
  },
  button: {
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 5,
  },
  sendBtn: {
    position: 'absolute',
    right: 22,
    bottom: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  notes: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#eee',
    backgroundColor: '#eee',
    marginVertical: 5,
    flex: 1,
    padding: 10,
  },
  noteText: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    position: 'absolute',
    backgroundColor: theme.PRIMARY_COLOR_LITE,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    borderRadius: 7,
    height: 50,
    width: 50,
    left: 15,
    top: 45,
    zIndex: 1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
export default Place;

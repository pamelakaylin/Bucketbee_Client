import React, { useState } from 'react';
import Modal from 'react-native-modal';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button, FAB } from 'react-native-paper';
import { useQuery, useMutation, gql } from '@apollo/client';
import { EDIT_PLACE_NOTES } from '../Services/Places/PlacesMutation';
import { PLACE_ARRAY_FRAGMENT } from '../Services/Places/PlacesFragment';
import { AntDesign } from '@expo/vector-icons';
import theme from '../styles/theme.style';

const AddNotes = ({ place, noteModalVisible, setNoteModalVisible }) => {
  const navigation = useNavigation();

  if (!place.notes) place.notes = '';
  const [notes, setNotes] = useState(place.notes);
  const [editPlaceNotes] = useMutation(EDIT_PLACE_NOTES);

  const handleEdit = () => {
    const { bucketId, catId, id } = place;
    const placeId = id;
    editPlaceNotes({
      variables: { bucketId, catId, placeId, notes },
      update(cache, { data }) {
        const category = cache.readFragment({
          id: `Category:${catId}`,
          fragment: PLACE_ARRAY_FRAGMENT,
        });
        const newPlaces = category.places.map((p) => {
          if (p.id === placeId) p = data?.editPlaceNotes;
          return p;
        });
        cache.writeFragment({
          id: `Category:${catId}`,
          fragment: PLACE_ARRAY_FRAGMENT,
          data: {
            places: newPlaces,
          },
        });
      },
    });
    setNotes('');
    setNoteModalVisible(false);
    setTimeout(() => {
      navigation.navigate('Categories');
    }, 500);
  };

  return (
    <Modal
      isVisible={noteModalVisible}
      onSwipeComplete={() => setNoteModalVisible(false)}
      swipeDirection="down"
    >
      <KeyboardAvoidingView
        behavior={'padding'}
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View style={styles.smallModal}>
          <Pressable
            style={styles.addBtn}
            onPress={() => setNoteModalVisible(false)}
          >
            <AntDesign name="close" size={35} color={theme.PRIMARY_COLOR} />
          </Pressable>
          <Text style={styles.text}>Edit notes</Text>
          <TextInput
            multiline={true}
            theme={{
              colors: {
                placeholder: theme.PRIMARY_COLOR,
                text: theme.PRIMARY_COLOR_LITE,
                primary: theme.PRIMARY_COLOR_LITE,
              },
            }}
            style={{
              marginVertical: 20,
            }}
            mode="outlined"
            label="Notes"
            value={notes}
            onChangeText={(val) => {
              setNotes(val);
            }}
          />

          <Button
            mode="contained"
            onPress={handleEdit}
            style={{ padding: 8 }}
            labelStyle={{ color: theme.WHITE_COLOR }}
            theme={{
              colors: {
                primary: theme.PRIMARY_COLOR,
              },
            }}
          >
            SAVE
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  smallModal: {
    borderRadius: 25,
    backgroundColor: theme.WHITE_COLOR,
    padding: 20,
    margin: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  text: {
    fontFamily: 'Lato_700Bold',
    color: '#0d525f',
    fontSize: theme.FONT_SIZE_LARGE,
    textAlign: 'center',
  },
  addBtn: {
    position: 'absolute',
    left: 18,
    top: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});
export default AddNotes;

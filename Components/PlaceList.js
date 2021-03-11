import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';

import { useQuery, useMutation } from '@apollo/client';
import { DELETE_PLACE } from '../Services/Places/PlacesMutation';
import { PLACE_ARRAY_FRAGMENT } from '../Services/Places/PlacesFragment';
import DeleteDialog from '../Components/DeleteDialog';
import theme from '../styles/theme.style';

const PlaceList = ({ places, catId, bucketId }) => {
  const navigation = useNavigation();
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [placeId, setPlaceId] = useState(null);
  const [deletePlace] = useMutation(DELETE_PLACE);

  const handleDelete = () => {
    try {
      deletePlace({
        variables: { bucketId, catId, placeId },
        update(cache) {
          const category = cache.readFragment({
            id: `Category:${catId}`,
            fragment: PLACE_ARRAY_FRAGMENT,
          });
          const newPlaces = category.places.filter((p) => p.id !== placeId);
          cache.writeFragment({
            id: `Category:${catId}`,
            fragment: PLACE_ARRAY_FRAGMENT,
            data: {
              places: newPlaces,
            },
          });
        },
      });
      setDeleteVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (places.length) {
    return (
      <>
        <FlatList
          horizontal={true}
          data={places}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity
                  onLongPress={() => {
                    setPlaceId(item.id);
                    Haptics.impactAsync('heavy');
                    setDeleteVisible(true);
                  }}
                  onPress={() => {
                    const place = { ...item, catId, bucketId };
                    navigation.navigate('Place', place);
                  }}
                  activeOpacity={0.6}
                >
                  <View style={styles.placeContainer}>
                    <Image
                      style={styles.image}
                      source={{ uri: item.imgArr[0] }}
                    />
                    <Text style={styles.placeName}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <DeleteDialog
          deleteVisible={deleteVisible}
          setDeleteVisible={setDeleteVisible}
          handleDelete={handleDelete}
          typeOf="place"
        />
      </>
    );
  } else {
    return (
      <View style={styles.noneContainer}>
        <Text style={styles.noText}>
          Nothing saved yet, add a place by searching the map or take a photo
          and create your own!
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  placeContainer: {
    height: 200,
    width: 300,
    backgroundColor: '#fffef8',
    borderRadius: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 25,
  },
  noneContainer: {
    height: 180,
    width: 300,
    borderColor: theme.PRIMARY_COLOR_XLITE,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noText: {
    color: theme.PRIMARY_COLOR_XLITE,
    fontSize: 15,
    fontFamily: 'Raleway_400Regular',
    paddingBottom: 8,
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  placeName: {
    color: theme.PRIMARY_COLOR,
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 20,
    padding: 10,
  },
});

export default PlaceList;

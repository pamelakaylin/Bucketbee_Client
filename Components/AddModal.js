import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from '@apollo/client';
import Modal from 'react-native-modal';
import { List } from 'react-native-paper';

import BucketAddModal from '../Components/BucketAddModal';
import { GET_BUCKETS } from '../Services/Buckets/BucketsQuery';
import { ADD_PLACE } from '../Services/Places/PlacesMutation';
import { PLACE_ARRAY_FRAGMENT } from '../Services/Places/PlacesFragment';
import theme from '../styles/theme.style';

var openModal = false;

const AddModal = ({ place, isVisible, handleClose, onlyAdd }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [expanded, setExpanded] = useState(-50);
  const [userId, setUserId] = useState(null);

  const retrieveUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@userData');
      let userData;
      if (value) userData = JSON.parse(value);
      if (userData) setUserId(userData.id);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    retrieveUser();
  }, []);

  const { error, data } = useQuery(GET_BUCKETS, {
    variables: { userId },
    pollInterval: 500,
  });
  if (error) console.log(`Error! ${error.message}`);
  const buckets = data?.getBuckets;

  const [addPlace] = useMutation(ADD_PLACE);

  const handlePress = (idx) => setExpanded(idx);

  const handleModalChange = () => {
    openModal = true;
    handleClose();
  };

  const handleAdd = (catId) => {
    addPlace({
      variables: { catId: catId, input: place },
      update(cache, { data }) {
        const category = cache.readFragment({
          id: `Category:${catId}`, // The value of the to-do item's unique identifier
          fragment: PLACE_ARRAY_FRAGMENT,
        });
        cache.writeFragment({
          id: `Category:${catId}`,
          fragment: PLACE_ARRAY_FRAGMENT,
          data: {
            places: category.places.concat(data.addPlace),
          },
        });
      },
    });
    handleClose();
  };

  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={handleClose}
        onSwipeComplete={handleClose}
        swipeDirection="down"
        onModalHide={() => {
          if (openModal) setModalVisible(true);
          openModal = false;
        }}
        style={{ justifyContent: 'flex-end', flex: 1 }}
      >
        <View style={styles.modal}>
          <Text style={styles.text}>Add to Bucket</Text>

          <List.Section style={{ alignSelf: 'stretch' }}>
            <FlatList
              data={buckets}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                console.log(index);
                return (
                  <List.Accordion
                    titleStyle={styles.text}
                    title={item.title}
                    expanded={expanded === index ? true : false}
                    onPress={() => handlePress(index)}
                  >
                    <FlatList
                      data={item.categories}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => {
                        return (
                          <List.Item
                            titleStyle={styles.subtext}
                            title={item.label}
                            onPress={() => handleAdd(item.id)}
                          />
                        );
                      }}
                    />
                  </List.Accordion>
                );
              }}
            />
          </List.Section>
          <Pressable style={{ marginTop: 'auto' }} onPress={handleModalChange}>
            <Text style={styles.link}>Create new bucket</Text>
          </Pressable>
        </View>
      </Modal>
      <BucketAddModal
        userId={userId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        place={place}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  modal: {
    borderRadius: 25,
    minHeight: 200,
    backgroundColor: theme.WHITE_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Lato_700Bold',
    color: theme.PRIMARY_COLOR,
    fontSize: theme.FONT_SIZE_LARGE,
  },
  subtext: {
    fontFamily: 'Lato_400Regular',
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.PRIMARY_COLOR,
  },
  link: {
    fontFamily: 'Lato_700Bold',
    color: theme.SPECIAL_COLOR,
    fontSize: theme.FONT_SIZE_LARGE,
    textDecorationLine: 'underline',
  },
});

export default AddModal;

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
import { TextInput, Button, FAB } from 'react-native-paper';

import { useQuery, useMutation } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';

import { GET_BUCKETS } from '../Services/Buckets/BucketsQuery';
import { CREATE_BUCKET } from '../Services/Buckets/BucketsMutation';
import theme from '../styles/theme.style';

const BucketAddModal = ({ userId, modalVisible, setModalVisible, place }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');

  const [createBucket] = useMutation(CREATE_BUCKET);

  const handlePress = () => {
    if (title === '' || category === '') {
      Alert.alert('Please add a bucket & category!');
    } else {
      createBucket({
        variables: { input: { title, notes, category }, place, userId },

        update(cache, { data }) {
          const newBucket = data?.createBucket;
          const existingBuckets = cache.readQuery({
            query: GET_BUCKETS,
            variables: {
              userId,
            },
          });

          let getBuckets;
          if (!existingBuckets) {
            getBuckets = [];
          } else {
            getBuckets = existingBuckets.getBuckets;
          }
          cache.writeQuery({
            query: GET_BUCKETS,
            variables: {
              userId,
            },
            data: {
              getBuckets: [...getBuckets, newBucket],
            },
          });
        },
      });
      setTitle('');
      setCategory('');
      setNotes('');
      setModalVisible(false);
    }
  };

  return (
    <Modal
      isVisible={modalVisible}
      onSwipeComplete={() => setModalVisible(false)}
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
            onPress={() => setModalVisible(false)}
          >
            <AntDesign name="close" size={35} color={theme.PRIMARY_COLOR} />
          </Pressable>
          <Text style={styles.text}>Create New Bucket</Text>
          <TextInput
            theme={{
              colors: {
                placeholder: theme.PRIMARY_COLOR,
                text: theme.PRIMARY_COLOR_LITE,
                primary: theme.PRIMARY_COLOR_LITE,
              },
            }}
            style={styles.input}
            mode="outlined"
            label="Bucket name"
            value={title}
            onChangeText={(val) => {
              setTitle(val);
            }}
          />
          <TextInput
            theme={{
              colors: {
                placeholder: theme.PRIMARY_COLOR,
                text: theme.PRIMARY_COLOR_LITE,
                primary: theme.PRIMARY_COLOR_LITE,
              },
            }}
            style={styles.input}
            mode="outlined"
            label="Category name"
            value={category}
            onChangeText={(val) => {
              setCategory(val);
            }}
          />

          <TextInput
            style={styles.input}
            theme={{
              colors: {
                placeholder: theme.PRIMARY_COLOR,
                text: theme.PRIMARY_COLOR_LITE,
                primary: theme.PRIMARY_COLOR_LITE,
              },
            }}
            mode="outlined"
            label="Notes"
            multiline={true}
            value={notes}
            onChangeText={(val) => {
              setNotes(val);
            }}
          />
          <Button
            mode="contained"
            onPress={handlePress}
            style={{ padding: 8 }}
            labelStyle={{ color: theme.WHITE_COLOR }}
            theme={{
              colors: {
                primary: theme.PRIMARY_COLOR,
              },
            }}
          >
            Create
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  smallModal: {
    borderRadius: 25,
    minHeight: 400,
    backgroundColor: theme.WHITE_COLOR,
    padding: 20,
    margin: 30,
    justifyContent: 'space-around',
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
export default BucketAddModal;

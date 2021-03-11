import React, { useState } from 'react';
import Modal from 'react-native-modal';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { useMutation } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';

import { ADD_CATEGORY } from '../Services/Categories/CatMutation';
import { CAT_ARRAY_FRAGMENT } from '../Services/Categories/CatFragment';
import theme from '../styles/theme.style';

const CategoryAddModal = ({ bucketId, modalVisible, setModalVisible }) => {
  const [label, setLabel] = useState('');

  const [addCategory] = useMutation(ADD_CATEGORY);

  const handlePress = () => {
    if (label !== '') {
      addCategory({
        variables: { bucketId: bucketId, label: label },
        update(cache, { data }) {
          const bucket = cache.readFragment({
            id: `Bucket:${bucketId}`,
            fragment: CAT_ARRAY_FRAGMENT,
          });
          cache.writeFragment({
            id: `Bucket:${bucketId}`,
            fragment: CAT_ARRAY_FRAGMENT,
            data: {
              categories: bucket.categories.concat(data.addCategory),
            },
          });
        },
      });
      setLabel('');
      setModalVisible(false);
    } else {
      Alert.alert('Please add a category!');
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
          <Text style={styles.text}>Add New Category</Text>
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
            value={label}
            onChangeText={(val) => {
              setLabel(val);
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
    minHeight: 250,
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
export default CategoryAddModal;

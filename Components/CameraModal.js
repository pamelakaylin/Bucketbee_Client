import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import CreatePlace from '../Components/CreatePlace';
import CloseKeyboard from '../Operations/CloseKeyboard';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import theme from '../styles/theme.style';

const CameraModal = ({ cmVisible, setCMVisible, handleModalChange }) => {
  return (
    <Modal
      isVisible={cmVisible}
      style={{ justifyContent: 'flex-end', flex: 1, margin: 0 }}
    >
      <CloseKeyboard>
        <View style={styles.modal}>
          <CreatePlace
            handleModalChange={handleModalChange}
            setCMVisible={setCMVisible}
          />
        </View>
      </CloseKeyboard>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 0.8,
    backgroundColor: theme.WHITE_COLOR, //'#116979',
    borderRadius: 20,
    paddingTop: 30,
    paddingHorizontal: 30,
    paddingBottom: 45,
  },
  container: {
    flex: 1,
  },
  editContainer: {
    flex: 0.23,
    paddingTop: 10,
  },
  friendContainer: {
    flex: 0.57,
  },
  deleteContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', //change to flexend
  },
  title: {
    color: theme.PRIMARY_COLOR, //theme.WHITE_COLOR,
    fontWeight: 'bold',
    fontSize: 25,
    fontFamily: 'Poppins_600SemiBold',
    textDecorationLine: 'underline',
  },
  subtext: {
    color: theme.PRIMARY_COLOR_LITE,
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    textDecorationLine: 'underline',
  },
  input: {
    backgroundColor: theme.WHITE_COLOR,
    borderColor: theme.PRIMARY_COLOR,
    borderWidth: 1,
    borderRadius: 7,
    height: 55,
    marginTop: 30,
    padding: 10,
    fontSize: 20,
    fontFamily: 'Lato_400Regular',
    color: theme.PRIMARY_COLOR,
  },
});

export default CameraModal;

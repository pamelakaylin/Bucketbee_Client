import React, { useState } from 'react';
import Modal from 'react-native-modal';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

import theme from '../styles/theme.style';

const FriendAddModal = ({
  faModalVisible,
  setFaModalVisible,
  handleAddFriend,
}) => {
  const [username, setUsername] = useState('');

  return (
    <Modal
      isVisible={faModalVisible}
      onSwipeComplete={() => setFaModalVisible(false)}
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
            onPress={() => setFaModalVisible(false)}
          >
            <AntDesign name="close" size={35} color={theme.PRIMARY_COLOR} />
          </Pressable>
          <Text style={styles.text}>Add Friend</Text>
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
            label="Friend username"
            value={username}
            onChangeText={(val) => {
              setUsername(val);
            }}
          />

          <Button
            mode="contained"
            onPress={() => handleAddFriend(username)}
            style={{ padding: 8 }}
            labelStyle={{ color: theme.WHITE_COLOR }}
            theme={{
              colors: {
                primary: theme.PRIMARY_COLOR,
              },
            }}
          >
            ADD
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
export default FriendAddModal;

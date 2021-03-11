import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import ImageUpload from '../Components/ImageUpload';
import theme from '../styles/theme.style';

const ChatActionsModal = ({
  currentAction,
  caModalVisible,
  setCaModalVisible,
  handleSend,
  handlePostcard,
  user,
}) => {
  const [textContent, setTextContent] = useState('');
  const [value, setValue] = useState('');
  const [friendList, setFriendList] = useState([]);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    currentAction === 'location' && setTextContent("Hey, I'm in currently in");
    currentAction === 'love' && setTextContent('Thinking of you <3');
    currentAction === 'call' && setTextContent("Let's call and catch up?");
    currentAction === 'postcard' && setTextContent('');
  }, [caModalVisible]);

  const handleAdd = (id) => {
    setFriendList((friends) => [...friends, id]);
  };

  const handleRemove = (id) => {
    setFriendList((friends) => friends.filter((f) => f !== id));
  };

  const handleSubmit = () => {
    if (currentAction !== 'postcard') {
      let body = textContent;
      if (currentAction === 'location' || 'call') {
        body = textContent + ' ' + value;
      }
      handleSend(currentAction, body, friendList);
      setFriendList([]);
      setValue('');
      setCaModalVisible(false);
    } else {
      if (!photo || !value.replace(/\s/g, '').length)
        Alert.alert('Please upload a photo and write a note!');
      else {
        handlePostcard(photo, value, friendList);
        setPhoto(null);
        setFriendList([]);
        setValue('');
        setCaModalVisible(false);
      }
    }
  };

  if (user) {
    return (
      <Modal
        isVisible={caModalVisible}
        style={{ justifyContent: 'flex-end', flex: 1, margin: 0 }}
      >
        <View style={styles.modal}>
          <View style={styles.container}>
            <View style={styles.editContainer}>
              <Text style={styles.title}>{textContent}</Text>
              {currentAction === 'postcard' ? (
                <>
                  <ImageUpload photo={photo} setPhoto={setPhoto} />
                  <TextInput
                    style={styles.postcardInput}
                    value={value}
                    multiline={true}
                    onChangeText={(val) => setValue(val)}
                    placeholderTextColor={theme.PRIMARY_COLOR}
                    placeholder="Write your notes here"
                  />
                </>
              ) : null}
              {currentAction === 'location' || currentAction === 'call' ? (
                <TextInput
                  style={styles.input}
                  value={value}
                  multiline={true}
                  onChangeText={(val) => setValue(val)}
                />
              ) : null}
            </View>
            <View style={styles.friendContainer}>
              <Text style={styles.title}>Send to friends</Text>
              <View style={styles.friendWrapper}>
                <FlatList
                  data={user.friends}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.friendBlock}>
                        <View style={styles.friendName}>
                          <Text style={styles.friendText}>
                            {item.firstName} {item.lastName}
                          </Text>
                          <Text style={styles.friendSubText}>
                            {item.username}
                          </Text>
                        </View>
                        <BouncyCheckbox
                          isChecked={false}
                          fillColor={theme.WHITE_COLOR}
                          borderColor={theme.PRIMARY_COLOR}
                          borderWidth={2}
                          size={30}
                          disableText={true}
                          onPress={(checked) => {
                            checked
                              ? handleAdd(item.id)
                              : handleRemove(item.id);
                          }}
                          iconStyle={{ backgroundColor: theme.PRIMARY_COLOR }}
                        />
                      </View>
                    );
                  }}
                />
              </View>
            </View>
            <View style={styles.deleteContainer}>
              <Pressable onPress={() => setCaModalVisible(false)}>
                <Text style={styles.subtext}>Back</Text>
              </Pressable>
              {friendList.length ? (
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.btn}
                  labelStyle={{ color: theme.WHITE_COLOR }}
                  theme={{
                    colors: {
                      primary: theme.PRIMARY_COLOR,
                    },
                  }}
                >
                  <Text>{currentAction === 'postcard' ? 'View' : 'Send'}</Text>
                </Button>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  modal: {
    flex: 0.85,
    backgroundColor: theme.WHITE_COLOR, //'#116979',
    borderRadius: 20,
    paddingTop: 7,
    paddingHorizontal: 30,
    paddingBottom: 45,
  },
  container: {
    flex: 1,
  },
  editContainer: {
    minHeight: 70,
    marginVertical: 20,
  },
  friendContainer: {
    height: 445,
  },
  friendWrapper: {
    backgroundColor: '#eee',
    borderRadius: 7,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  friendBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  friendName: {
    marginVertical: 15,
  },
  deleteContainer: {
    position: 'absolute',
    bottom: 5,
    minHeight: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end', //change to flexend
    width: '100%',
  },
  title: {
    color: theme.PRIMARY_COLOR, //theme.WHITE_COLOR,
    fontSize: 25,
    fontFamily: 'Poppins_600SemiBold',
  },
  subtext: {
    color: theme.PRIMARY_COLOR_LITE,
    fontSize: 23,
    fontFamily: 'Poppins_500Medium',
    textDecorationLine: 'underline',
  },
  friendText: {
    color: theme.PRIMARY_COLOR, //theme.WHITE_COLOR,
    fontSize: 18,
    fontFamily: 'Lato_400Regular',
  },
  friendSubText: {
    color: theme.PRIMARY_COLOR, //theme.WHITE_COLOR,
    fontSize: 13,
    fontFamily: 'Lato_400Regular',
  },
  input: {
    backgroundColor: theme.WHITE_COLOR,
    borderColor: theme.PRIMARY_COLOR,
    borderBottomWidth: 2,
    borderRadius: 7,
    marginVertical: 10,
    height: 60,
    padding: 3,
    fontSize: 22,
    fontFamily: 'Lato_400Regular',
    color: theme.PRIMARY_COLOR,
  },
  postcardInput: {
    backgroundColor: '#eee',
    borderRadius: 7,
    minHeight: 80,
    paddingHorizontal: 10,
    paddingBottom: 5,
    marginTop: 20,
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
    color: theme.PRIMARY_COLOR,
  },
  btn: {
    padding: 6,
    borderRadius: 7,
    minWidth: 100,
    height: 50,
  },
});

export default ChatActionsModal;

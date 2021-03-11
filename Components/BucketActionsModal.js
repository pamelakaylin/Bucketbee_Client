import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import { GET_USER_BY_ID } from '../Services/Users/UsersQuery';
import { DELETE_BUCKET } from '../Services/Buckets/BucketsMutation';
import { GET_BUCKETS } from '../Services/Buckets/BucketsQuery';
import { CHANGE_BUCKET_NAME } from '../Services/Buckets/BucketsMutation';
import { GET_CHATS } from '../Services/Chats/ChatsQuery';
import { POST_MESSAGE_TO_CHAT } from '../Services/Chats/ChatsMutation';
import DeleteDialog from '../Components/DeleteDialog';
import theme from '../styles/theme.style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { AntDesign } from '@expo/vector-icons';

const BucketActionsModal = ({
  baModalVisible,
  setBaModalVisible,
  bucketId,
  bucketTitle,
  setGoBack,
}) => {
  const [title, setTitle] = useState('');
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [friendList, setFriendList] = useState([]);

  const [getUserById] = useLazyQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      if (data && data.getUserById) {
        setUser(data.getUserById);
      }
    },
    pollInterval: 500,
  });

  const retrieveUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@userData');
      let userData;
      if (value) userData = JSON.parse(value);
      if (userData) {
        getUserById({ variables: { userId: userData.id } });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    retrieveUser();
  }, []);

  const [getChats] = useLazyQuery(GET_CHATS, {
    onCompleted: (data) => {
      const description = 'bucket';
      const input = {
        description,
        author: user.id,
        content: bucketTitle,
        photo: bucketId,
      };
      let currentChats = [];
      if (data && data.getChats) currentChats = data.getChats;
      friendList.forEach((id) => {
        let existingChat = currentChats.filter((c) => {
          let memberIDS = c.members.map((m) => m.id);
          return memberIDS.includes(id) && c.members.length === 2;
        });
        if (existingChat.length) {
          const chatId = existingChat[0].id;
          postMessageToChat({
            variables: { chatId, input },
          });
        }
      });
      setFriendList([]);
      setBaModalVisible(false);
    },
  });

  const [deleteBucket] = useMutation(DELETE_BUCKET);
  const [changeBucketName] = useMutation(CHANGE_BUCKET_NAME);
  const [postMessageToChat] = useMutation(POST_MESSAGE_TO_CHAT);

  const handleDelete = () => {
    deleteBucket({
      variables: { bucketId },
      update(cache) {
        const existingBuckets = cache.readQuery({
          query: GET_BUCKETS,
          variables: {
            userId: user.id,
          },
        });
        const newBuckets = existingBuckets.getBuckets.filter(
          (b) => b.id !== bucketId,
        );
        cache.writeQuery({
          query: GET_BUCKETS,
          variables: {
            userId: user.id,
          },
          data: {
            getBuckets: newBuckets,
          },
        });
      },
    });
    setGoBack(true);
    setBaModalVisible(false);
  };

  const handleEdit = () => {
    if (!title.replace(/\s/g, '').length) return;
    changeBucketName({
      variables: { bucketId, title },
      update(cache, { data }) {
        const existingBuckets = cache.readQuery({
          query: GET_BUCKETS,
          variables: { userId: user.id },
        });
        const newBuckets = existingBuckets?.getBuckets.map((b) => {
          if (b.id === bucketId) b = data?.changeBucketName;
          return b;
        });
        cache.writeQuery({
          query: GET_BUCKETS,
          variables: { userId: user.id },
          data: {
            getBuckets: newBuckets,
          },
        });
      },
    });
    setTitle('');
    setBaModalVisible(false);
  };

  const handleSend = () => {
    if (bucketId) {
      if (user) getChats({ variables: { userId: user.id } });
    }
  };

  const handleAdd = (id) => {
    setFriendList((friends) => [...friends, id]);
  };

  const handleRemove = (id) => {
    setFriendList((friends) => friends.filter((f) => f !== id));
  };

  if (user) {
    return (
      <Modal
        isVisible={baModalVisible}
        style={{ justifyContent: 'flex-end', flex: 1, margin: 0 }}
      >
        <View style={styles.modal}>
          <View style={styles.container}>
            <View style={styles.editContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.title}>Edit name</Text>
                <AntDesign
                  name="close"
                  size={35}
                  color={theme.PRIMARY_COLOR}
                  onPress={() => setBaModalVisible(false)}
                />
              </View>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={(val) => setTitle(val)}
                placeholder="Bucket name"
              />
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
              <Pressable onPress={() => setDeleteVisible(true)}>
                <Text style={styles.subtext}>Delete this bucket</Text>
              </Pressable>
              <Button
                mode="contained"
                onPress={() => {
                  handleEdit();
                  handleSend();
                }}
                style={styles.btn}
                labelStyle={{ color: theme.WHITE_COLOR }}
                theme={{
                  colors: {
                    primary: theme.PRIMARY_COLOR,
                  },
                }}
              >
                {friendList.length ? 'Send' : 'Save'}
              </Button>
            </View>
          </View>
          <DeleteDialog
            deleteVisible={deleteVisible}
            setDeleteVisible={setDeleteVisible}
            handleDelete={handleDelete}
            typeOf="bucket"
          />
        </View>
      </Modal>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  modal: {
    flex: 0.8,
    backgroundColor: theme.WHITE_COLOR, //'#116979',
    borderRadius: 20,
    paddingTop: 20,
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
  friendWrapper: {
    backgroundColor: '#eee',
    borderRadius: 7,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  friendBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  friendName: {
    marginVertical: 15,
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
  btn: {
    padding: 6,
    borderRadius: 7,
    width: '30%',
    height: 50,
  },
});

export default BucketActionsModal;

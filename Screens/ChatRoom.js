import React, { useState, useEffect } from 'react';
import theme from '../styles/theme.style';
import { useQuery, useMutation } from '@apollo/client';
import DotLoading from '../Components/dotLoading';
import { Asset } from 'expo-asset';
import { GET_CHAT_BY_ID } from '../Services/Chats/ChatsQuery';
import { POST_MESSAGE_TO_CHAT } from '../Services/Chats/ChatsMutation';
import { MESSAGE_SENT_SUBSCRIPTION } from '../Services/Chats/ChatsSubscription';
import { ADD_USER_TO_BUCKET } from '../Services/Buckets/BucketsMutation';
import AcceptBucketDialog from '../Components/AcceptBucketDialog';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

//attempt to animate message sending in chat room
// ref={ref => this.flatList = ref}
// onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
// onLayout={() => this.flatList.scrollToEnd({animated: true})}

const ChatRoom = ({ route, navigation }) => {
  const { chat, userId } = route.params;
  const chatId = chat.id;

  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');
  const [acceptDialogVisible, setAcceptDialogVisible] = useState(false);
  const [selectedBucket, setSelectedBucket] = useState(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    const res = await Asset.loadAsync(require('../assets/chat2.jpg'));
    if (res.length) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 2000);
    }
  };

  const { loading, error, data, subscribeToMore } = useQuery(GET_CHAT_BY_ID, {
    variables: { chatId },
  });
  if (error) console.log(`Error! ${error.message}`);
  const currentChat = data?.getChatById;

  const [postMessageToChat] = useMutation(POST_MESSAGE_TO_CHAT);
  const [addUserToBucket] = useMutation(ADD_USER_TO_BUCKET);

  useEffect(() => {
    if (data && !loading && subscribeToMore) {
      subscribeToMore({
        document: MESSAGE_SENT_SUBSCRIPTION,
        variables: { author: userId, chatId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.messageSent;
          return Object.assign({}, prev, {
            getChatById: {
              ...prev.getChatById,
              messages:
                prev.getChatById.messages.filter((m) => m.id === newMessage.id)
                  .length === 0
                  ? [...prev.getChatById.messages, newMessage]
                  : prev.getChatById.messages,
            },
          });
        },
      });
    }
  }, [subscribeToMore]);

  const handleSend = () => {
    if (!message.replace(/\s/g, '').length) return;
    const input = { description: 'message', author: userId, content: message };
    try {
      postMessageToChat({
        variables: { chatId, input },
        update(cache, { data }) {
          cache.writeQuery({
            query: GET_CHAT_BY_ID,
            variables: { chatId },
            data: { getChatById: data?.postMessageToChat },
          });
        },
      });
    } catch (e) {
      console.log(e);
    }

    setMessage('');
  };

  const handleBucketAdd = () => {
    addUserToBucket({
      variables: { bucketId: selectedBucket, userId },
    });
    setAcceptDialogVisible(false);
  };

  if (currentChat && isLoaded) {
    const reversed = [...currentChat.messages].reverse();
    const friendUser = currentChat.members.filter((m) => m.id !== userId)[0];
    const chatName = friendUser.firstName;
    return (
      <ImageBackground
        source={require('../assets/chat2.jpg')}
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
          }}
        >
          <View style={styles.header}>
            <Ionicons
              style={{ marginRight: 10 }}
              name="chevron-back"
              size={30}
              color={theme.WHITE_COLOR}
              onPress={() => navigation.navigate('Inbox')}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('FriendProfile', { friendUser })
              }
            >
              <Text style={styles.title}>{chatName}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <FlatList
              data={reversed}
              keyExtractor={(item) => item.id}
              inverted={-1}
              renderItem={({ item }) => {
                return (
                  <View
                    style={[
                      styles.messageBubble,
                      item.author === userId && styles.mine,
                    ]}
                  >
                    {item.description === 'postcard' ? (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          const photo = item.photo;
                          const value = item.content;
                          navigation.navigate('Postcard', { photo, value });
                        }}
                      >
                        <Text style={styles.text}>
                          Here's a postcard for you:
                        </Text>
                        <View style={styles.photo}>
                          <Image
                            source={{ uri: item.photo }}
                            style={styles.photo}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <>
                        {item.description === 'bucket' ? (
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedBucket(item.photo);
                              setAcceptDialogVisible(true);
                            }}
                          >
                            <View>
                              <Text style={styles.text}>
                                Here's my
                                <Text style={styles.boldText}>
                                  {' '}
                                  {item.content}{' '}
                                </Text>
                                bucket!
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <Text style={styles.text}>{item.content}</Text>
                        )}
                      </>
                    )}
                    <Text style={styles.subtext}>
                      {moment(item.createdAt).format('LT')}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.footer}>
            <TextInput
              style={styles.input}
              onChangeText={(val) => setMessage(val)}
              value={message}
              multiline={true}
            />
            <TouchableOpacity onPress={handleSend}>
              <MaterialCommunityIcons
                name="send-circle"
                size={45}
                color={theme.PRIMARY_COLOR_LITE}
              />
            </TouchableOpacity>
          </View>
          <AcceptBucketDialog
            acceptDialogVisible={acceptDialogVisible}
            setAcceptDialogVisible={setAcceptDialogVisible}
            handleBucketAdd={handleBucketAdd}
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
  return <DotLoading />;
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: theme.PRIMARY_COLOR,
  },
  container: { flex: 1, paddingHorizontal: 5 },
  header: {
    backgroundColor: theme.PRIMARY_COLOR,
    flexDirection: 'row',
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  title: {
    color: theme.WHITE_COLOR,
    fontSize: 22,
    fontFamily: 'Lato_400Regular',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    minHeight: 70,
    width: '100%',
    backgroundColor: theme.PRIMARY_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '85%',
    minHeight: 35,
    borderRadius: 25,
    backgroundColor: '#14788b',
    padding: 10,
    fontSize: 18,
    color: theme.WHITE_COLOR,
    fontFamily: 'Lato_400Regular',
    paddingBottom: 0,
    marginBottom: 0,
  },
  messageBubble: {
    backgroundColor: '#3f4647',
    margin: 10,
    borderRadius: 9,
    maxWidth: '75%',
    padding: 10,
  },
  mine: {
    alignSelf: 'flex-end',
    backgroundColor: '#118787',
  },
  text: {
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
    color: theme.WHITE_COLOR,
  },
  boldText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: theme.WHITE_COLOR,
  },
  subtext: {
    fontFamily: 'Lato_300Light',
    fontSize: 12,
    color: theme.WHITE_COLOR,
    textAlign: 'right',
    marginTop: 5,
  },
  photo: {
    marginVertical: 10,
    borderRadius: 9,
    height: 200,
    width: 250,
  },
});

export default ChatRoom;

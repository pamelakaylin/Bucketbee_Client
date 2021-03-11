import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingAnimation from '../Components/LoadingAnimation';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { GET_CHATS } from '../Services/Chats/ChatsQuery';
import { MESSAGE_SENT_SUBSCRIPTION } from '../Services/Chats/ChatsSubscription';
import { POST_MESSAGE_TO_CHAT } from '../Services/Chats/ChatsMutation';
import { GET_USER_BY_ID } from '../Services/Users/UsersQuery';
import ChatActionsModal from '../Components/ChatActionsModal';
import { FAB, Portal, Provider } from 'react-native-paper';
import theme from '../styles/theme.style';

import moment from 'moment';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

const Inbox = ({ navigation }) => {
  const [openFAB, setOpenFab] = useState(false);
  const [caModalVisible, setCaModalVisible] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const currentChats = {};

  const [postMessageToChat] = useMutation(POST_MESSAGE_TO_CHAT);
  let userId;
  if (user) userId = user.id;

  const { loading, error, data, subscribeToMore } = useQuery(GET_CHATS, {
    variables: { userId },
    pollInterval: 500,
  });

  if (error) console.log(`Error! ${error.message}`);
  const chats = data?.getChats;

  useEffect(() => {
    if (data && subscribeToMore) {
      subscribeToMore({
        document: MESSAGE_SENT_SUBSCRIPTION,
        variables: { author: userId, chatId: null },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { chatId } = subscriptionData.data.messageSent;
          const existingChats = prev.getChats.map((c) => Object.assign({}, c));
          let changedChat;
          let index;
          existingChats.map((c, idx) => {
            if (c.id === chatId) {
              changedChat = c;
              index = idx;
            }
          });
          let newChat = JSON.parse(JSON.stringify(changedChat));
          newChat.messages.push(subscriptionData.data.messageSent);
          existingChats.splice(index, 1, newChat);
          return Object.assign({}, prev, {
            getChats: existingChats,
          });
        },
      });
    }
  }, [subscribeToMore]);

  const handleSend = (description, body, friendList) => {
    let input = {};
    input = { description, author: userId };

    if (
      description === 'location' ||
      description === 'love' ||
      description === 'call'
    )
      input.content = body;
    else if (description === 'postcard') {
      input.content = body.value;
      input.photo = body.photo;
    }

    if (input.content) {
      friendList.forEach((id) => {
        if (Object.keys(currentChats).includes(id)) {
          const chatId = currentChats[id];
          postMessageToChat({
            variables: { chatId, input },
          });
        }
      });
    }
  };

  const handlePostcard = (photo, value, friendList) => {
    navigation.navigate('Postcard', {
      photo,
      value,
      friendList,
      handleSend: handleSend.bind(this),
    });
  };

  let chatsCopy = [];
  if (chats) {
    chatsCopy = [...chats];
    chatsCopy.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }

  if (user && isLoaded) {
    return (
      <SafeAreaView style={styles.centered}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Chats</Text>
            <Entypo
              name="new-message"
              size={32}
              color={theme.PRIMARY_COLOR_XLITE}
              onPress={() => navigation.navigate('Friends', { user })}
            />
          </View>
          {chatsCopy.length ? (
            <FlatList
              data={chatsCopy}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const members = item.members.filter((m) => m.id !== userId);
                const memberIds = members.map((m) => m.id);
                currentChats[memberIds[0]] = item.id;

                const friend_profile_pic = user.friends.filter(
                  (f) => f.id === memberIds[0],
                )[0].profile_pic;
                let lastMessage = '';
                let noMessage = 'No messages yet';
                if (item.messages.length) {
                  lastMessage = item.messages[item.messages.length - 1];
                  if (lastMessage.description === 'postcard')
                    lastMessage = "Here's a postcard for you:";
                  else if (lastMessage.description === 'bucket')
                    lastMessage = "Here's a bucket for you:";
                  else lastMessage = lastMessage.content;
                }
                const chatName = item.members.filter((m) => m.id !== userId)[0]
                  .firstName;

                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ChatRoom', {
                        chat: item,
                        userId: user.id,
                      });
                    }}
                  >
                    <View style={styles.chatContainer}>
                      <Image
                        style={styles.circle}
                        source={{ uri: friend_profile_pic }}
                      />
                      <View style={styles.messagePreview}>
                        <Text style={styles.text}>{chatName}</Text>
                        <View style={styles.messageWrap}>
                          <Text style={styles.subtext}>
                            {lastMessage !== '' ? lastMessage : noMessage}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.timeStamp}>
                        {moment(item.updatedAt).format('LT')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.title}>No chats yet!</Text>
            </View>
          )}
          <ChatActionsModal
            user={user}
            currentAction={currentAction}
            caModalVisible={caModalVisible}
            setCaModalVisible={setCaModalVisible}
            handleSend={handleSend}
            handlePostcard={handlePostcard}
          />
        </View>
        <Provider>
          <Portal>
            <FAB.Group
              open={openFAB}
              color={theme.PRIMARY_COLOR}
              icon={openFAB ? 'close' : 'plus'}
              actions={[
                {
                  color: theme.PRIMARY_COLOR,
                  icon: 'image-multiple',
                  label: 'Send postcard',
                  onPress: () => {
                    setCurrentAction('postcard');
                    setOpenFab(false);
                    setCaModalVisible(true);
                  },
                  small: false,
                },
                {
                  color: theme.PRIMARY_COLOR,
                  icon: 'phone-classic',
                  label: 'Schedule call',
                  onPress: () => {
                    setCurrentAction('call');
                    setOpenFab(false);
                    setCaModalVisible(true);
                  },
                  small: false,
                },
                {
                  color: theme.PRIMARY_COLOR,
                  icon: 'hand-heart',
                  label: 'Send love',
                  onPress: () => {
                    setCurrentAction('love');
                    setOpenFab(false);
                    setCaModalVisible(true);
                  },
                  small: false,
                },
                {
                  color: theme.PRIMARY_COLOR,
                  icon: 'map-marker-radius',
                  label: 'Location',
                  onPress: () => {
                    setCurrentAction('location');
                    setOpenFab(false);
                    setCaModalVisible(true);
                  },
                  small: false,
                },
              ]}
              onStateChange={() => {}}
              onPress={() => {
                openFAB ? setOpenFab(false) : setOpenFab(true);
              }}
            />
          </Portal>
        </Provider>
      </SafeAreaView>
    );
  }
  return <LoadingAnimation />;
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: theme.PRIMARY_COLOR,
  },
  container: { height: '100%', paddingHorizontal: 20, paddingTop: 10 },
  title: {
    color: theme.PRIMARY_COLOR_XLITE,
    fontSize: 35,
    fontFamily: 'Poppins_400Regular',
  },
  header: {
    flexDirection: 'row',
    height: 65,
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 10,
  },
  chatContainer: {
    marginTop: 5,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    paddingVertical: 8,
  },
  text: {
    fontFamily: 'Lato_700Bold',
    color: theme.PRIMARY_COLOR_XLITE,
    paddingTop: 2,
    fontSize: 22,
  },
  subtext: {
    fontFamily: 'Lato_400Regular',
    color: '#eee',
    paddingTop: 5,
    fontSize: 16,
  },
  messageWrap: {
    overflow: 'hidden',
    height: 50,
    width: '80%',
  },
  timeStamp: {
    justifyContent: 'flex-start',
    height: '100%',
    fontFamily: 'Lato_400Regular',
    color: theme.PRIMARY_COLOR_XLITE,
    paddingTop: 2,
    fontSize: 15,
    marginLeft: 'auto',
  },
  messagePreview: {
    justifyContent: 'flex-start',
    height: '100%',
    width: '90%',
    paddingBottom: 20,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.PRIMARY_COLOR_XLITE,
    marginRight: 15,
    marginBottom: 15,
  },
});

export default Inbox;

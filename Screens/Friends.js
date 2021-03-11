import React, { useState } from 'react';
import theme from '../styles/theme.style';
import { useMutation } from '@apollo/client';
import { CREATE_CHAT } from '../Services/Chats/ChatsMutation';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Button } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Ionicons } from '@expo/vector-icons';
import { GET_CHATS } from '../Services/Chats/ChatsQuery';

const Friends = ({ navigation, route }) => {
  const { user } = route.params;
  const [friendList, setFriendList] = useState([]);

  const [createChat] = useMutation(CREATE_CHAT, {
    onCompleted(newChat) {
      navigation.navigate('ChatRoom', {
        chat: newChat?.createChat,
        userId: user.id,
      });
    },
  });

  const handleAdd = (id) => {
    setFriendList((friends) => [...friends, id]);
  };

  const handleRemove = (id) => {
    setFriendList((friends) => friends.filter((f) => f.id !== id));
  };

  const handleSubmit = () => {
    let input = {};
    if (friendList.length === 1) {
      input.name = friendList[0].firstName;
    }
    const friendIDs = friendList.map((f) => f.id);
    const userId = user.id;
    input.members = [userId, ...friendIDs];

    createChat({
      variables: { input },
      update(cache, { data }) {
        const existingChats = cache.readQuery({
          query: GET_CHATS,
          variables: { userId },
        });
        const newChats = [...existingChats?.getChats, data?.createChat];
        cache.writeQuery({
          query: GET_CHATS,
          variables: { userId },
          data: {
            getChats: newChats,
          },
        });
      },
    });
  };

  if (user) {
    return (
      <SafeAreaView style={styles.centered}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Ionicons
              style={{ position: 'absolute', left: 0 }}
              name="chevron-back"
              size={30}
              color={theme.PRIMARY_COLOR_XLITE}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.title}>New Chat</Text>
          </View>
          <FlatList
            style={{ marginTop: 7 }}
            data={user.friends}
            keyExtractor={(item) => item.username}
            renderItem={({ item }) => {
              let lastName;
              if (!item.lastName) lastName = '';
              else lastName = item.lastName;
              return (
                <View style={styles.friendContainer}>
                  <View>
                    <Text style={styles.text}>
                      {item.firstName + ' ' + lastName}
                    </Text>
                    <Text style={styles.subtext}>{item.username}</Text>
                  </View>
                  <BouncyCheckbox
                    isChecked={false}
                    fillColor={theme.PRIMARY_COLOR}
                    borderColor={theme.PRIMARY_COLOR_XLITE}
                    size={30}
                    disableText={true}
                    onPress={(checked) => {
                      checked
                        ? handleAdd({ id: item.id, firstName: item.firstName })
                        : handleRemove(item.id);
                    }}
                    iconStyle={{ backgroundColor: theme.PRIMARY_COLOR }}
                  />
                </View>
              );
            }}
          />
          <View style={styles.footer}>
            {friendList.length ? (
              <TouchableOpacity onPress={handleSubmit}>
                <Button
                  mode="contained"
                  style={{ padding: 8, width: '100%', borderRadius: 25 }}
                  labelStyle={{
                    color: theme.PRIMARY_COLOR,
                    fontFamily: 'Poppins_600SemiBold',
                  }}
                  theme={{
                    colors: {
                      primary: theme.PRIMARY_COLOR_XLITE,
                    },
                  }}
                >
                  Chat
                </Button>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#0d525f',
  },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  title: {
    color: theme.PRIMARY_COLOR_XLITE,
    fontSize: 25,
    fontFamily: 'Poppins_400Regular',
  },
  friendContainer: {
    marginTop: 5,
    height: 85,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  text: {
    fontFamily: 'Lato_400Regular',
    color: theme.PRIMARY_COLOR_XLITE,
    paddingTop: 2,
    fontSize: 19,
  },
  subtext: {
    fontFamily: 'Lato_400Regular',
    color: theme.WHITE_COLOR,
    paddingTop: 2,
    fontSize: 17,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    paddingBottom: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: theme.PRIMARY_COLOR_XLITE,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 15,
    height: 100,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Friends;

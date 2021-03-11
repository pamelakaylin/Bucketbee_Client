import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import { uploadToCloud } from '../Operations/Upload';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ADD_PROFILE_PIC_TO_USER } from '../Services/Users/UsersMutation';
import { ADD_FRIEND_TO_USER } from '../Services/Users/UsersMutation';
import { GET_USER_BY_USERNAME } from '../Services/Users/UsersQuery';
import { GET_USER_BY_ID } from '../Services/Users/UsersQuery';
import FriendAddModal from '../Components/FriendAddModal';
import LoadingAnimation from '../Components/LoadingAnimation';
import * as ImagePicker from 'expo-image-picker';
import { FAB, Portal, Provider } from 'react-native-paper';
import theme from '../styles/theme.style';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const Profile = ({ navigation }) => {
  const [openFAB, setOpenFab] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [faModalVisible, setFaModalVisible] = useState(false);

  const [addProfilePicToUser] = useMutation(ADD_PROFILE_PIC_TO_USER, {
    onCompleted(userData) {
      const updateUserState = async (data) => {
        if (data.addProfilePicToUser) {
          setUser((oldUser) => {
            return {
              ...oldUser,
              profile_pic: data.addProfilePicToUser.profile_pic,
            };
          });
          const jsonData = JSON.stringify(data.addProfilePicToUser);
          await AsyncStorage.setItem('@userData', jsonData);
        }
      };
      updateUserState(userData);
    },
  });

  const [getUserByUsername] = useLazyQuery(GET_USER_BY_USERNAME, {
    onCompleted(data) {
      if (data && data.getUserByUsername) {
        const friendId = data.getUserByUsername.id;
        const userId = user.id;
        addFriendToUser({
          variables: { userId, friendId },
          update(cache, { data }) {
            const existingUser = cache.readQuery({
              query: GET_USER_BY_ID,
              variables: { userId },
            });
            const newFriends = existingUser.getUserById.friends.push(
              data?.addFriendToUser[1],
            );
            const newUser = {
              ...existingUser.getUserById,
              friends: newFriends,
            };
            cache.writeQuery({
              query: GET_USER_BY_ID,
              variables: { userId },
              data: {
                getUserById: newUser,
              },
            });
          },
        });
      }
    },
  });
  const [addFriendToUser] = useMutation(ADD_FRIEND_TO_USER, {
    onCompleted(data) {
      const updateUserState = async () => {
        const newFriend = data.addFriendToUser[1];
        const currentUser = await AsyncStorage.getItem('@userData');
        const userCopy = { ...JSON.parse(currentUser) };
        const newFriends = userCopy.friends.push(newFriend);
        await AsyncStorage.setItem('@userData', {
          ...userCopy,
          friends: newFriends,
        });
      };
      if (data && data.addFriendToUser) updateUserState();
    },
  });

  const retrieveUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@userData');
      let userData;
      if (value) userData = JSON.parse(value);
      if (userData) {
        setUser(userData);
        setTimeout(() => {
          setIsLoaded(true);
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    retrieveUser();
  }, []);

  const handlePhotoUpload = () => {
    setOpenFab(false);
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        } else {
          (async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 4],
              base64: true,
            });
            if (result.cancelled) return;
            const cloudURL = await uploadToCloud(result);
            updateUserState(cloudURL);
          })();
        }
      }
    })();
  };

  const updateUserState = (cloudURL) => {
    addProfilePicToUser({
      variables: { userId: user.id, profile_pic: cloudURL },
    });
  };

  const handleAddFriend = (username) => {
    getUserByUsername({ variables: { username } });
    setFaModalVisible(false);
  };

  if (user && isLoaded) {
    return (
      <SafeAreaView style={styles.centered}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Ionicons
            name="settings-outline"
            size={35}
            color={theme.PRIMARY_COLOR_XLITE}
            onPress={() => navigation.navigate('Logout')}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.circle}>
            <Image style={styles.circle} source={{ uri: user.profile_pic }} />
          </View>
          <Text style={styles.text}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.username}>@{user.username}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.subText}>
              Local time: {moment().format('h:mm a')}
            </Text>
            <Text style={styles.subText}>
              Currently based in: {user.location}
            </Text>
            <Text style={styles.subText}>
              Beach, mountains or city: {user.vibe}
            </Text>
            <Text style={styles.subText}>
              My personality in 3 emojis: {user.emojis}
            </Text>
          </View>
          <FriendAddModal
            faModalVisible={faModalVisible}
            setFaModalVisible={setFaModalVisible}
            handleAddFriend={handleAddFriend}
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
                  icon: 'camera-enhance',
                  label: 'Change profile pic',
                  onPress: handlePhotoUpload,
                  small: false,
                },
                {
                  color: theme.PRIMARY_COLOR,
                  icon: 'pencil-outline',
                  label: 'Edit information',
                  onPress: () => {},
                  small: false,
                },
                {
                  color: theme.PRIMARY_COLOR,
                  icon: 'account-plus',
                  label: 'Add Friend',
                  onPress: () => {
                    setFaModalVisible(true);
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 150,
    flex: 1,
  },
  infoContainer: {
    margin: 20,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomColor: theme.PRIMARY_COLOR_XLITE,
    borderBottomWidth: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    color: theme.PRIMARY_COLOR_XLITE,
    fontWeight: 'bold',
    fontSize: 35,
    fontFamily: 'Poppins_400Regular',
  },
  circle: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: theme.PRIMARY_COLOR_XLITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.PRIMARY_COLOR_XLITE,
    fontSize: 30,
    fontFamily: 'Raleway_600SemiBold',
    marginTop: 20,
  },
  subText: {
    color: theme.PRIMARY_COLOR_XLITE,
    fontSize: 20,
    fontFamily: 'Lato_300Light',
    marginBottom: 5,
  },
  username: {
    fontSize: 20,
    marginBottom: 5,
    color: theme.WHITE_COLOR,
    fontFamily: 'Lato_400Regular',
  },
});

export default Profile;

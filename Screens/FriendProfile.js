import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import LoadingAnimation from '../Components/LoadingAnimation';
import theme from '../styles/theme.style';
import moment from 'moment';

const FriendProfile = ({ route }) => {
  const { friendUser } = route.params;

  if (friendUser) {
    return (
      <SafeAreaView style={styles.centered}>
        <View style={styles.header}>
          <Text style={styles.title}>{friendUser.firstName}'s Profile</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.circle}>
            <Image
              style={styles.circle}
              source={{ uri: friendUser.profile_pic }}
            />
          </View>
          <Text style={styles.text}>
            {friendUser.firstName} {friendUser.lastName}
          </Text>
          <Text style={styles.username}>@{friendUser.username}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.subText}>
              Local time: {moment().format('h:mm a')}
            </Text>
            <Text style={styles.subText}>
              Currently based in: {friendUser.location}
            </Text>
            <Text style={styles.subText}>
              Beach, mountains or city: {friendUser.vibe}
            </Text>
            <Text style={styles.subText}>
              My personality in 3 emojis: {friendUser.emojis}
            </Text>
          </View>
        </View>
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
    fontFamily: 'Poppins_600SemiBold',
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

export default FriendProfile;

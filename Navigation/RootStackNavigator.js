import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavi from './TabNavigator';
import CameraPage from '../Screens/Camera';
import ChatRoom from '../Screens/ChatRoom';
import FriendProfile from '../Screens/FriendProfile';

// imports for notification feature, see bottom of page
// import { MESSAGE_SENT_SUBSCRIPTION } from '../Services/Chats/ChatsSubscription';
// import { useQuery, useSubscription } from '@apollo/client';
// import { Notifier, Easing } from 'react-native-notifier';

const RootStack = createStackNavigator();

const RootStackNavi = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="TabStack"
        component={BottomTabNavi}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Camera"
        component={CameraPage}
        options={{
          headerShown: false,
          gestureDirection: 'horizontal-inverted',
        }}
      />
      <RootStack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="FriendProfile"
        component={FriendProfile}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavi;

//tried to add in app notifications
//for some reason, didn't work with useSubscription hook

// const showNotification = () => {
//   Notifier.showNotification({
//     title: 'John Doe',
//     description: 'Hello! Can you help me with notifications?',
//     duration: 1000,
//     // showAnimationDuration: 800,
//     // showEasing: Easing.bounce,
//     onHidden: () => console.log('Hidden'),
//     onPress: () => console.log('Press'),
//     hideOnPress: false,
//   });
// };

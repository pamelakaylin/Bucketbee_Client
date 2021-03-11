import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Explore from '../Screens/Explore';
import Map from '../Screens/Map';
import Buckets from '../Screens/Buckets';
import Categories from '../Screens/Categories';
import Place from '../Screens/Place';
import Inbox from '../Screens/Inbox';
import Friends from '../Screens/Friends';
import Postcard from '../Screens/Postcard';
import Profile from '../Screens/Profile';

const Stack = createStackNavigator();

const ExploreStackNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Explore"
        component={Explore}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const BucketStackNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Buckets"
        component={Buckets}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Place"
        component={Place}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const InboxStackNavi = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Inbox"
        component={Inbox}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Friends"
        component={Friends}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Postcard"
        component={Postcard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ProfileStackNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export { ExploreStackNavi, BucketStackNavi, InboxStackNavi, ProfileStackNavi };

import React from 'react';
import theme from '../styles/theme.style';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  ExploreStackNavi,
  BucketStackNavi,
  InboxStackNavi,
  ProfileStackNavi,
} from './StackNavigator';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavi = () => {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      labeled={true}
      activeColor={theme.PRIMARY_COLOR_XLITE}
      inactiveColor="#fffef8"
      barStyle={{
        backgroundColor: theme.PRIMARY_COLOR,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreStackNavi}
        options={{
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="search" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Buckets"
        component={BucketStackNavi}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons
                name="bucket-outline"
                size={24}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxStackNavi}
        options={{
          tabBarIcon: ({ color }) => {
            return <Feather name="mail" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavi}
        options={{
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="user-o" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavi;

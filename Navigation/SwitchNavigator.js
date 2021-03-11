import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../Operations/Store';

import RootStackNavi from './RootStackNavigator';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Logout from '../Screens/Logout';
import AnimatedFormView from '../Components/AnimatedFormView';

const SwitchStack = createStackNavigator();

const SwitchStackNavi = () => {
  const { state, dispatch } = useContext(AuthContext);

  const checkSession = async () => {
    try {
      const value = await AsyncStorage.getItem('@userData');
      if (value) dispatch({ type: 'CONTINUE' });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <SwitchStack.Navigator>
      {!state.signedIn ? (
        <>
          <SwitchStack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <SwitchStack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          {!state.fillForm ? (
            <>
              <SwitchStack.Screen
                name="RootStack"
                component={RootStackNavi}
                options={{ headerShown: false }}
              />
              <SwitchStack.Screen
                name="Logout"
                component={Logout}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <SwitchStack.Screen
              name="AnimatedFormView"
              component={AnimatedFormView}
              options={{
                headerShown: false,
              }}
            />
          )}
        </>
      )}
    </SwitchStack.Navigator>
  );
};

export default SwitchStackNavi;

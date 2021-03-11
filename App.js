import React from 'react';
import { AppRegistry } from 'react-native';
import { Store } from './Operations/Store';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
  ApolloLink,
} from '@apollo/client';

import { NotifierWrapper } from 'react-native-notifier';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { NavigationContainer } from '@react-navigation/native';
import SwitchStackNavi from './Navigation/SwitchNavigator';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';
import {
  Lato_100Thin,
  Lato_300Light,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
} from '@expo-google-fonts/lato';
import {
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
} from '@expo-google-fonts/raleway';

//this disables all warnings from expo
console.disableYellowBox = true;

//for all queries/mutations
const httpLink = new HttpLink({
  uri: 'http://192.168.1.115:4000/graphql',
});

//for all subscriptions
const wsLink = new WebSocketLink({
  uri: 'ws://192.168.1.115:4000/graphql',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const link = ApolloLink.from([splitLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const App = () => {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
    Lato_100Thin,
    Lato_300Light,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_800ExtraBold,
    Raleway_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ApolloProvider client={client}>
      <NotifierWrapper>
        <Store>
          <NavigationContainer>
            <SwitchStackNavi />
          </NavigationContainer>
        </Store>
      </NotifierWrapper>
    </ApolloProvider>
  );
};

AppRegistry.registerComponent('bucket-RD-RN', () => App);

export default App;

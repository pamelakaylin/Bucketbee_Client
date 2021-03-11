import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InitialStep from './Steps/InitialStep';
import FormStep1 from './Steps/FormStep1';
import FormStep2 from './Steps/FormStep2';
import FormStep3 from './Steps/FormStep3';
import { ADD_INFO_TO_USER } from '../Services/Users/UsersMutation';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../Operations/Store';

const AnimatedFormView = () => {
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState('');
  const [vibe, setVibe] = useState('');
  const [emojis, setEmojis] = useState('');
  const { dispatch } = useContext(AuthContext);

  const [addInfoToUser] = useMutation(ADD_INFO_TO_USER, {
    onCompleted(userData) {
      if (userData.addInfoToUser) {
        const jsonData = JSON.stringify(userData.addInfoToUser);
        dispatch({ type: 'ENDFORM', data: jsonData });
      }
    },
  });

  const retrieveUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@userData');
      let userData;
      if (value) {
        userData = JSON.parse(value);
      }
      if (userData) {
        return userData.id;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    const userId = await retrieveUser();
    if (userId) {
      addInfoToUser({ variables: { userId, location, vibe, emojis } });
    }
  };

  if (count === 0) return <InitialStep setCount={setCount} />;
  else if (count === 1)
    return (
      <FormStep1
        setCount={setCount}
        location={location}
        setLocation={setLocation}
      />
    );
  else if (count === 2)
    return <FormStep2 vibe={vibe} setVibe={setVibe} setCount={setCount} />;
  else if (count === 3)
    return (
      <FormStep3
        emojis={emojis}
        setEmojis={setEmojis}
        handleSubmit={handleSubmit}
      />
    );
};

export default AnimatedFormView;

/* eslint-disable no-fallthrough */
import AsyncStorage from '@react-native-async-storage/async-storage';

const setLogin = async (userData) => {
  try {
    await AsyncStorage.setItem('@userData', userData);
  } catch (e) {
    console.log(e);
  }
};

const setLogout = async () => {
  try {
    await AsyncStorage.removeItem('@userData');
  } catch (e) {
    console.log(e);
  }
};

const Reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      if (action.data) {
        setLogin(action.data);
        return { ...state, signedIn: true, fillForm: false };
      }
    case 'REGISTER':
      if (action.data) {
        setLogin(action.data);
        return { ...state, signedIn: true, fillForm: true };
      }

    case 'ENDFORM':
      if (action.data) {
        setLogin(action.data);
      }
      return { ...state, fillForm: false };

    case 'CONTINUE':
      return { ...state, signedIn: true, fillForm: false };

    case 'LOGOUT':
      setLogout();
      return { ...state, signedIn: false, fillForm: false };

    default:
      return state;
  }
};

export default Reducer;

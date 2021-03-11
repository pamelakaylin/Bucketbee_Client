import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { AuthContext } from '../Operations/Store';
import theme from '../styles/theme.style';

const Logout = () => {
  const { dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      dispatch({ type: 'LOGOUT' });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.centered}>
      <TouchableOpacity activeOpacity={0.6} onPress={handleLogout}>
        <View style={styles.btn}>
          <Text style={styles.text}>LOGOUT</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#0d525f',
  },
  title: {
    color: theme.PRIMARY_COLOR_XLITE,
    fontSize: 34,
    fontFamily: 'Poppins_300Light',
    paddingTop: 20,
  },
  btn: {
    backgroundColor: theme.PRIMARY_COLOR_XLITE,
    width: 220,
    height: 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: theme.PRIMARY_COLOR,
  },
});

export default Logout;

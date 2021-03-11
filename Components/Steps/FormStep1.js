import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native-paper';
import theme from '../../styles/theme.style';

const FormStep1 = ({ setCount, location, setLocation }) => {
  const handleChange = () => {
    setCount((val) => val + 1);
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUpBig" style={styles.wrapper}>
        <Text style={styles.text}>Where are you currently based?</Text>
        <TextInput
          value={location}
          onChangeText={(val) => setLocation(val)}
          placeholder="Location goes here"
          style={styles.input}
          placeholderTextColor={theme.PRIMARY_COLOR_XLITE}
        />
        <Button
          style={styles.button}
          labelStyle={{ color: theme.PRIMARY_COLOR }}
          onPress={handleChange}
        >
          NEXT
        </Button>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.PRIMARY_COLOR,
  },
  wrapper: {
    height: 200,
    width: 300,
    justifyContent: 'center',
  },
  input: {
    width: 280,
    height: 50,
    borderBottomColor: theme.PRIMARY_COLOR_XLITE,
    borderBottomWidth: 2,
    color: theme.PRIMARY_COLOR_XLITE,
    fontSize: 22,
    fontFamily: 'Lato_300Light',
  },
  button: {
    backgroundColor: theme.PRIMARY_COLOR_XLITE,
    marginVertical: 20,
    color: theme.PRIMARY_COLOR,
    height: 50,
    width: 100,
    justifyContent: 'center',
  },
  text: {
    color: theme.PRIMARY_COLOR_XLITE,
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
    paddingBottom: 8,
  },
});

export default FormStep1;

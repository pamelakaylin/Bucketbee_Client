import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native-paper';
import theme from '../../styles/theme.style';

const FormStep3 = ({ emojis, setEmojis, handleSubmit }) => {
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUpBig" style={styles.wrapper}>
        <Text style={styles.text}>Describe yourself in 3 emojis:</Text>
        <TextInput
          value={emojis}
          onChangeText={(val) => setEmojis(val)}
          placeholder="Emojis go here"
          style={styles.input}
          placeholderTextColor={theme.PRIMARY_COLOR_XLITE}
        />
        <Button
          labelStyle={{ color: theme.PRIMARY_COLOR }}
          style={styles.button}
          onPress={handleSubmit}
        >
          SUBMIT
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

export default FormStep3;

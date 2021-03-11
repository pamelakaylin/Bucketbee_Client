import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native-paper';
import RadioGroup from 'react-native-radio-buttons-group';
import theme from '../../styles/theme.style';

const radioButtonsData = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Beach',
    value: 'option1',
    labelStyle: {
      color: theme.PRIMARY_COLOR_XLITE,
      fontSize: 20,
      fontFamily: 'Lato_300Light',
    },
    color: theme.PRIMARY_COLOR_XLITE,
    size: 20,
    containerStyle: {
      alignSelf: 'flex-start',
    },
  },
  {
    id: '2',
    label: 'Mountains',
    value: 'option2',
    color: theme.PRIMARY_COLOR_XLITE,
    labelStyle: {
      color: theme.PRIMARY_COLOR_XLITE,
      fontSize: 20,
      fontFamily: 'Lato_300Light',
    },
    size: 20,
  },
  {
    id: '3',
    label: 'City',
    value: 'option3',
    color: theme.PRIMARY_COLOR_XLITE,
    size: 20,
    labelStyle: {
      color: theme.PRIMARY_COLOR_XLITE,
      fontSize: 20,
      fontFamily: 'Lato_300Light',
    },
  },
];

const FormStep2 = ({ setCount, setVibe }) => {
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  const onPressRadioButton = (radioButtonsArray) => {
    setRadioButtons(radioButtonsArray);
  };

  const handleSubmit = () => {
    const selected = radioButtons.filter((b) => b.selected === true);
    if (selected[0]) {
      setVibe(selected[0].label);
    }
    setCount((val) => val + 1);
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUpBig" style={styles.wrapper}>
        <Text style={styles.text}>Beach / mountain / city?</Text>
        <RadioGroup
          layout="row"
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
        />
        <Button
          style={styles.button}
          labelStyle={{ color: theme.PRIMARY_COLOR }}
          onPress={handleSubmit}
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
    height: 240,
    width: 300,
    justifyContent: 'space-around',
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
    paddingBottom: 15,
  },
});

export default FormStep2;

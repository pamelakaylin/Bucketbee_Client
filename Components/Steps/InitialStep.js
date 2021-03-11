import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../Operations/Store';
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native-paper';
import theme from '../../styles/theme.style';

const InitialStep = ({ setCount }) => {
  const { dispatch } = useContext(AuthContext);

  const handleConfirm = () => {
    setCount((val) => val + 1);
  };

  const handleSkip = () => {
    dispatch({ type: 'ENDFORM' });
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUpBig" style={styles.wrapper}>
        <Text style={styles.text}>Welcome to Bucketbee!</Text>
        <Text style={styles.subtext}>Tell me a bit about yourself?</Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity activeOpacity={0.7} onPress={handleSkip}>
            <Button
              style={styles.button}
              labelStyle={{ color: theme.PRIMARY_COLOR }}
            >
              MAYBE LATER
            </Button>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={handleConfirm}>
            <Button
              style={styles.button}
              labelStyle={{ color: theme.PRIMARY_COLOR }}
            >
              SURE!
            </Button>
          </TouchableOpacity>
        </View>
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
  button: {
    backgroundColor: theme.PRIMARY_COLOR_XLITE,
    marginVertical: 50,
    marginRight: 40,
    paddingVertical: 8,
    color: theme.PRIMARY_COLOR,
    minWidth: 100,
    justifyContent: 'center',
  },
  text: {
    color: theme.PRIMARY_COLOR_XLITE,
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
    paddingBottom: 8,
  },
  subtext: {
    color: theme.PRIMARY_COLOR_XLITE,
    fontSize: 22,
    fontFamily: 'Lato_300Light',
  },
});

export default InitialStep;

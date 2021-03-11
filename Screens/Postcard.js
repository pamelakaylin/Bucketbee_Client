import React, { useState, useRef } from 'react';
import theme from '../styles/theme.style';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  SafeAreaView,
  Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Postcard = ({ route, navigation }) => {
  const { photo, value, friendList, handleSend } = route.params;
  const animate = useRef(new Animated.Value(0));
  const [flipped, setFlipped] = useState(false);

  const interpolateFront = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const interpolateBack = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const handleFlip = () => {
    Animated.timing(animate.current, {
      duration: 500,
      toValue: flipped ? 0 : 180,
      useNativeDriver: true,
    }).start(() => {
      setFlipped(!flipped);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Postcard</Text>
      <View style={{ margin: 20 }}>
        <TouchableWithoutFeedback onPress={handleFlip}>
          <Animated.View
            style={[
              { transform: [{ rotateY: interpolateFront }] },
              styles.hidden,
            ]}
          >
            <View style={styles.card}>
              <Image source={{ uri: photo }} style={styles.card} />
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleFlip}>
          <Animated.View
            style={[
              styles.back,
              styles.hidden,
              { transform: [{ rotateY: interpolateBack }] },
            ]}
          >
            <View style={styles.card}>
              <View style={styles.textContainer}>
                <View style={styles.messageContainer}>
                  <Text style={styles.text}>{value}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Image
                    style={styles.stamp}
                    source={require('../assets/stamp2.png')}
                  />
                  <View>
                    <Text style={styles.bigText}>From:</Text>
                    <Text style={styles.bigText}>Pamela C.</Text>
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
      {handleSend ? (
        <Button
          mode="contained"
          onPress={() => {
            handleSend('postcard', { photo, value }, friendList);
            navigation.navigate('Inbox');
          }}
          style={styles.sendBtn}
          labelStyle={{ color: theme.PRIMARY_COLOR }}
          theme={{
            colors: {
              primary: theme.PRIMARY_COLOR_XLITE,
            },
          }}
        >
          <Text>SEND</Text>
        </Button>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.PRIMARY_COLOR,
  },
  hidden: {
    backfaceVisibility: 'hidden',
  },
  back: {
    position: 'absolute',
    top: 0,
  },
  card: {
    borderRadius: 15,
    height: 370,
    width: 370,
    backgroundColor: theme.WHITE_COLOR,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    color: theme.PRIMARY_COLOR_XLITE,
    fontSize: 35,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 20,
  },
  sendBtn: {
    marginVertical: 20,
    padding: 6,
    borderRadius: 15,
    width: 150,
    height: 50,
  },
  textContainer: {
    borderRadius: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flex: 0.6,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 60,
  },
  infoContainer: {
    flexDirection: 'row',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopWidth: 2,
    borderTopColor: theme.PRIMARY_COLOR,
    flex: 0.4,
    width: '80%',
    alignItems: 'center',
  },
  text: {
    color: theme.PRIMARY_COLOR,
    fontSize: 19,
    fontFamily: 'Lato_400Regular',
  },
  bigText: {
    color: theme.PRIMARY_COLOR,
    fontSize: 25,
    fontFamily: 'Raleway_600SemiBold',
  },
  stamp: {
    height: 70,
    width: 70,
    marginRight: 20,
  },
});

export default Postcard;

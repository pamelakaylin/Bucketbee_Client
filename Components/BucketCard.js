import React from 'react';
import theme from '../styles/theme.style';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import moment from 'moment';

const BucketCard = ({ bucket, onPress }) => {
  return (
    <TouchableHighlight
      style={{ borderRadius: 25, marginVertical: 18 }}
      onPress={onPress}
    >
      <View style={styles.outercard}>
        <View style={styles.card}>
          <Text style={styles.text}>{bucket.title}</Text>
          <Text style={styles.subtext}>
            {moment(bucket.date_created).format('MMM Do, YYYY')}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  outercard: {
    backgroundColor: theme.PRIMARY_COLOR_XLITE,
    borderRadius: 25,
    height: 202,
  },
  card: {
    height: 200,
    width: '100%',
    padding: 20,
    borderRadius: 25,
    marginVertical: 5,
    backgroundColor: '#fffef8',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  text: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 30,
    color: theme.PRIMARY_COLOR,
    paddingVertical: 5,
  },
  subtext: {
    fontFamily: 'Poppins_300Light',
    color: theme.PRIMARY_COLOR,
  },
});

export default BucketCard;

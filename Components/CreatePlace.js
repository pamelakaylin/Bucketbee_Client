import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-paper';
import MapView from '../Components/MapView';
import theme from '../styles/theme.style';

const CreatePlace = ({ setCMVisible, handleModalChange }) => {
  const [region, setRegion] = useState(null);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const latitudeDelta = 0.04;
  const longitudeDelta = 0.05;

  const getCurrentLoc = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setRegion({ latitude, longitude, latitudeDelta, longitudeDelta });
      },
      (err) => Alert.alert(err),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Place</Text>
      <TextInput
        style={styles.input}
        placeholder="Place name"
        value={name}
        onChangeText={(val) => setName(val)}
      />

      <TextInput
        style={styles.notes}
        value={notes}
        multiline={true}
        onChangeText={(val) => setNotes(val)}
        placeholderTextColor={theme.PRIMARY_COLOR}
        placeholder="Write your notes here"
      />
      <TouchableOpacity
        style={{ width: '60%' }}
        onPress={() => {
          getCurrentLoc();
        }}
      >
        <Text style={styles.subtext}>Get current location</Text>
      </TouchableOpacity>
      <MapView region={region} small={true} />

      <View style={styles.deleteContainer}>
        <TouchableOpacity onPress={() => setCMVisible(false)}>
          <Text style={styles.subtext}>Back</Text>
        </TouchableOpacity>
        <Button
          mode="contained"
          onPress={() => {
            if (!name.replace(/\s/g, '').length)
              Alert.alert('Please enter a place name');
            else {
              handleModalChange(name, notes, region);
            }
          }}
          style={{
            padding: 6,
            borderRadius: 7,
            minWidth: 100,
            height: 50,
          }}
          labelStyle={{ color: theme.WHITE_COLOR }}
          theme={{
            colors: {
              primary: theme.PRIMARY_COLOR,
            },
          }}
        >
          <Text>ADD</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  smallModal: {
    borderRadius: 25,
    minHeight: 400,
    backgroundColor: theme.WHITE_COLOR,
    padding: 20,
    margin: 30,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  text: {
    fontFamily: 'Lato_700Bold',
    color: '#0d525f',
    fontSize: theme.FONT_SIZE_LARGE,
    textAlign: 'center',
  },
  addBtn: {
    position: 'absolute',
    left: 18,
    top: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  deleteContainer: {
    position: 'absolute',
    bottom: 5,
    minHeight: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end', //change to flexend
    width: '100%',
  },
  title: {
    color: theme.PRIMARY_COLOR, //theme.WHITE_COLOR,
    fontSize: 25,
    fontFamily: 'Poppins_600SemiBold',
  },
  subtext: {
    color: theme.PRIMARY_COLOR_LITE,
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  notes: {
    backgroundColor: '#eee',
    borderRadius: 7,
    minHeight: 140,
    paddingHorizontal: 10,
    paddingBottom: 5,
    marginTop: 10,
    marginBottom: 25,
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
    color: theme.PRIMARY_COLOR,
  },
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: theme.PRIMARY_COLOR,
    fontFamily: 'Lato_400Regular',
    fontSize: 20,
    color: theme.PRIMARY_COLOR,
    marginHorizontal: 5,
    marginTop: 15,
    marginBottom: 25,
  },
});

export default CreatePlace;

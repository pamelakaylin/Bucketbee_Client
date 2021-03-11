import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import LoadingAnimation from '../Components/LoadingAnimation';
import { useQuery } from '@apollo/client';
import { GET_BUCKETS } from '../Services/Buckets/BucketsQuery';
import BucketCard from '../Components/BucketCard';
import BucketAddModal from '../Components/BucketAddModal';
import { FAB } from 'react-native-paper';
import theme from '../styles/theme.style';

const Buckets = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@userData');
      let userData;
      if (value) userData = JSON.parse(value);
      if (userData) setUserId(userData.id);
    } catch (e) {
      console.log(e);
    }
  };

  const { loading, error, data } = useQuery(GET_BUCKETS, {
    variables: { userId },
    pollInterval: 500,
  });

  if (error) console.log(`Error! ${error.message}`);

  const buckets = data?.getBuckets;
  if (buckets) {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }

  if (userId && isLoaded) {
    return (
      <SafeAreaView style={styles.centered}>
        <View style={styles.container}>
          <Text style={styles.title}>My Buckets</Text>
          {buckets && buckets.length ? (
            <FlatList
              data={buckets}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <BucketCard
                    bucket={item}
                    onPress={() => navigation.navigate('Categories', item)}
                  />
                );
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.title}>No buckets yet!</Text>
            </View>
          )}
        </View>
        <BucketAddModal
          userId={userId}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          place={null}
        />
        <View style={styles.addBtn}>
          <FAB
            icon="plus"
            color={theme.PRIMARY_COLOR}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </SafeAreaView>
    );
  }
  return <LoadingAnimation />;
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#0d525f',
  },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  title: {
    color: theme.PRIMARY_COLOR_XLITE,
    fontWeight: 'bold',
    fontSize: 35,
    fontFamily: 'Poppins_400Regular',
    paddingBottom: 8,
  },
  addBtn: {
    position: 'absolute',
    right: 18,
    bottom: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});

export default Buckets;

import React, { useState, useEffect } from 'react';
import DotLoading from '../Components/dotLoading';
import theme from '../styles/theme.style';
import { Ionicons } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';
import { useQuery, useMutation } from '@apollo/client';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import { GET_BUCKET_BY_ID } from '../Services/Buckets/BucketsQuery';
import { DELETE_CATEGORY } from '../Services/Categories/CatMutation';
import CategoryAddModal from '../Components/CategoryAddModal';
import BucketActionsModal from '../Components/BucketActionsModal';
import PlaceList from '../Components/PlaceList';
import DeleteDialog from '../Components/DeleteDialog';
import { CAT_ARRAY_FRAGMENT } from '../Services/Categories/CatFragment';

const Categories = ({ route, navigation }) => {
  const { id } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [baModalVisible, setBaModalVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [catId, setCatId] = useState(null);
  const [goBack, setGoBack] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (goBack) navigation.navigate('Buckets');
  }, [goBack]);

  const { loading, error, data } = useQuery(GET_BUCKET_BY_ID, {
    variables: { bucketId: id },
    pollInterval: 500,
  });
  let categories = [];
  let title = '';
  if (data) {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }
  if (data?.getBucketById) {
    categories = data?.getBucketById.categories;
    title = data?.getBucketById.title;
  }

  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const handleDelete = () => {
    deleteCategory({
      variables: { bucketId: id, catId },
      update(cache) {
        const bucket = cache.readFragment({
          id: `Bucket:${id}`,
          fragment: CAT_ARRAY_FRAGMENT,
        });
        const newCategories = bucket.categories.filter((c) => c.id !== catId);
        cache.writeFragment({
          id: `Bucket:${id}`,
          fragment: CAT_ARRAY_FRAGMENT,
          data: {
            categories: newCategories,
          },
        });
      },
    });
    setDeleteVisible(false);
    setCatId(null);
  };

  if (isLoaded) {
    return (
      <SafeAreaView style={styles.centered}>
        <View style={styles.header}>
          <Ionicons
            name="chevron-back"
            size={30}
            color={theme.PRIMARY_COLOR_XLITE}
            onPress={() => navigation.navigate('Buckets')}
          />
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableWithoutFeedback onPress={() => setBaModalVisible(true)}>
            <View>
              <Ionicons
                name="ellipsis-horizontal"
                size={40}
                color={theme.PRIMARY_COLOR_XLITE}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.container}>
          {categories.length ? (
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <>
                    <View style={styles.titleHeader}>
                      <Text style={styles.title}>{item.label}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setCatId(item.id);
                          setDeleteVisible(true);
                        }}
                      >
                        <View>
                          <Ionicons
                            name="remove-circle-outline"
                            size={30}
                            color={theme.PRIMARY_COLOR_XLITE}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <PlaceList
                      places={item.places}
                      catId={item.id}
                      bucketId={id}
                    />
                  </>
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
              <Text style={styles.title}>No categories yet!</Text>
            </View>
          )}
        </View>
        <DeleteDialog
          deleteVisible={deleteVisible}
          setDeleteVisible={setDeleteVisible}
          handleDelete={handleDelete}
          typeOf="category"
        />
        <BucketActionsModal
          baModalVisible={baModalVisible}
          setBaModalVisible={setBaModalVisible}
          bucketId={id}
          bucketTitle={title}
          setGoBack={setGoBack}
        />
        <CategoryAddModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          bucketId={id}
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
  return <DotLoading />;
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#0d525f',
  },
  headerTitle: {
    color: theme.PRIMARY_COLOR_XLITE,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    paddingBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    flex: 1,
  },
  titleHeader: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: theme.PRIMARY_COLOR_XLITE,
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Poppins_400Regular',
  },
  addBtn: {
    position: 'absolute',
    right: 18,
    bottom: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bookmark: {
    position: 'absolute',
    zIndex: 1,
    right: 15,
    top: -4,
  },
});

export default Categories;

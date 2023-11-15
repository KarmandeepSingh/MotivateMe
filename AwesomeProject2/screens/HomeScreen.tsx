import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import AlbumCategory from "../components/AlbumCategory";
import { LinearGradient } from 'expo-linear-gradient';
import { API, graphqlOperation } from 'aws-amplify';
import { listAlbumCategorys } from '../src/graphql/queries';
import { AppContext } from '../AppContext'; // Import your context
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  
  // Use useFocusEffect to add a focus listener
  useFocusEffect(
    React.useCallback(() => {
      const fetchAlbumCategories = async () => {
        try {
          const data = await API.graphql(graphqlOperation(listAlbumCategorys));
          setCategories(data.data.listAlbumCategorys.items);
          
        } catch (e) {
          console.log(e);
        }
      }

      fetchAlbumCategories();
    }, []) // Empty dependency array to run only on initial mount
  );

  return (
    <LinearGradient colors={['#c97a00', 'darkblue']} style={styles.gradient}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#c97a00" />
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <AlbumCategory
              title={item.title}
              albums={item.albums.items}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 40
  },
  gradient: {
    flex: 1,
  }
});

export default HomeScreen;

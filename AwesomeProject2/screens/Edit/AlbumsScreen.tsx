import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import AlbumComponent from "./components/AlbumComponent";
import { LinearGradient } from "expo-linear-gradient";
import CreateAlbumScreen from "./SubScreens/CreateAlbumScreen";
import EditAlbumScreen from "./SubScreens/EditAlbumScreen";
import { API, graphqlOperation } from "aws-amplify";
import { deleteAlbum } from '../../src/graphql/mutations';
const AlbumsScreen = ({ navigation }) => {
  const route = useRoute(); // Get the route object

  // Access the category data from the route parameters
  const category = route.params.category;

  const createAlbum = () => {
    
    navigation.navigate("CreateAlbumScreen", { category });
  };
  const handleEditAlbum = (album) =>{
    navigation.navigate("EditAlbumScreen", { album });
}
  const onAlbumLongPress = (album) => {
    Alert.alert(
      "Edit Album",
      "Choose an action:",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Edit",
          onPress: () => handleEditAlbum(album),
        },
        {
          text: "Delete",
          onPress: () => {
            Alert.alert(
              "Delete Album",
              "Are you sure you want to delete this album?",
              [
                {
                  text: "No",
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: async () => {
                    try {
                      // Use the deleteAlbumCategory mutation to delete the category
                      await API.graphql(
                        graphqlOperation(deleteAlbum, {
                          input: { id: album.id },
                        })
                      );
  
                      // Refresh the list of album categories after successful deletion
                      //refreshAlbumCategories();
                    } catch (error) {
                      console.error("Error deleting album", error);
                    }
                  },
                },
              ],
              { cancelable: true }
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Updated renderItem method
  const renderItem = ({ item }) => (
    <View style={styles.albumContainer}>
      <AlbumComponent album={item} onAlbumLongPress={onAlbumLongPress}/>
    </View>
  );

  const renderCreateAlbumButton = () => (
    <TouchableOpacity
      style={styles.addAlbumButton}
      onPress={createAlbum}
    >
      <Text style={styles.addAlbumButtonText}>+</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#c97a00', 'darkblue']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.categoryTitle}>Category Name: {category.title}</Text>
        <Text style={styles.albumsTitle}>Albums:</Text>
        <FlatList
          style={{ width: '100%' }}
          data={category.albums.items}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false} 
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderCreateAlbumButton} // Display the button at the end
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    padding: 16,
    alignItems: "center",
    
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  albumsTitle: {
    color: "white",
    fontSize: 16,
    marginTop: 16,
  },
  albumContainer: {
    
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    width: "100%",
    alignItems: "center", // Center the content horizontally
  },
  albumName: {
    fontSize: 16,
    width: "100%",
  },
  addAlbumButton: {
    backgroundColor: "#211554",
    opacity:0.8,
    borderRadius: 25,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 16,
    width: 100,
    marginBottom: 100,
  },
  addAlbumButtonText: {
    color: "white",
    fontSize: 32,
  },
  // You can add more styles for album properties if needed
});

export default AlbumsScreen;

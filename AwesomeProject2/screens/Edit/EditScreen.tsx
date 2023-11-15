import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import { listAlbumCategorys } from '../../src/graphql/queries';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import navigation hook
import EditCategoryScreen from "./SubScreens/EditCategoryScreen";
import CreateCategoryScreen from "./SubScreens/CreateCategoryScreen";
import { deleteAlbumCategory } from '../../src/graphql/mutations';
import AlbumsScreen from "./AlbumsScreen"; 
import { LinearGradient } from "expo-linear-gradient";
const EditScreen = () => {
    const [albumCategories, setAlbumCategories] = useState([]);
    const navigation = useNavigation(); // Get navigation object

    useEffect(() => {
      fetchAlbumCategories();
    }, []);
  
    const fetchAlbumCategories = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listAlbumCategorys));
        const categories = response.data.listAlbumCategorys.items;
        setAlbumCategories(categories);
        
      } catch (error) {
        console.error("Error fetching album categories", error);
      }

      
    };
  
    const handleEditCategory = (category) => {
        // Navigate to the edit page with the category data
        navigation.navigate("EditCategoryScreen", { category });
    };
  
    const handleLongPress = (category) => {
      Alert.alert(
        "Edit Category",
        "Choose an action:",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Edit",
            onPress: () => handleEditCategory(category),
          },
          {
            text: "Delete",
            onPress: () => {
              Alert.alert(
                "Delete Category",
                "Are you sure you want to delete this category?",
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
                          graphqlOperation(deleteAlbumCategory, {
                            input: { id: category.id },
                          })
                        );
    
                        // Refresh the list of album categories after successful deletion
                        refreshAlbumCategories();
                      } catch (error) {
                        console.error("Error deleting category", error);
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

    const navigateToAlbumsScreen = (category) => {
     
      navigation.navigate("AlbumsScreen", { category });
    };
    const createCategory = () => {
        navigation.navigate("CreateCategoryScreen");
    };

    const refreshAlbumCategories = () => {
        // Manually trigger a refresh by calling the fetchAlbumCategories function
        fetchAlbumCategories();
    };

    // Add the useFocusEffect hook to refresh data when the screen is focused
    useFocusEffect(
      React.useCallback(() => {
        refreshAlbumCategories(); // Refresh data when the screen is focused
      }, [])
    );

    return (
      <LinearGradient colors={['#c97a00', 'darkblue']} style={{flex:1}}>
      <View style={styles.container}>
        
        <ScrollView
        style={{ width: "100%" }} // Set width to 100%
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >
          {albumCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryContainer}
              onPress={() => navigateToAlbumsScreen(category)}
              onLongPress={() => handleLongPress(category)} // Pass the category ID
            >
              <Text style={styles.categoryText}>{category.title}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.addCategoryButton}
            onPress={createCategory}
          >
            <Text style={styles.addCategoryButtonText}>+</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      </LinearGradient>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
    alignItems: "center",
  },
  
  categoryContainer: {
    alignSelf: "center", // Center the category container
    backgroundColor: "#211554",
    opacity:0.8,
    borderRadius: 20,
    padding: 12,
    justifyContent: "center",
    marginBottom: 8,
    width: 300,
    height: 100, // You can set a fixed height for the category container
  },
  categoryText: {
      textAlign: "center",
      color: "white",
      textAlignVertical: "center",
  },
  addCategoryButton: {
    backgroundColor: "#211554",
    opacity:0.8,
    borderRadius: 25,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 16,
    width:100,
  },
  addCategoryButtonText: {
    color: "white",
    fontSize: 32,
  },
});

export default EditScreen;

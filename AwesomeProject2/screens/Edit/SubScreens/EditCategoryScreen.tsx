import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

const EditCategoryScreen = () => {
  const route = useRoute(); // Get the route object

  // Access the category data from the route parameters
  const category = route.params.category;

  return (
    <View>
      <Text>Edit Category Screen</Text>
      <Text>Category Name: {category.title}</Text>
      {/* Display other category properties here */}
    </View>
  );
};

export default EditCategoryScreen;

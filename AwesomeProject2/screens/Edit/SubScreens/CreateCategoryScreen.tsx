import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { createAlbumCategory } from '../../../src/graphql/mutations';
import { listAlbums } from '../../../src/graphql/queries';
import RNPickerSelect from 'react-native-picker-select';
import albumCategories from '../../../data/albumCategories';

const CreateCategoryScreen = () => {
  const [title, setTitle] = useState('');
  const [selectedAlbums, setSelectedAlbums] = useState([]); // Initialize as an empty array
  const [albumOptions, setAlbumOptions] = useState([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await API.graphql(graphqlOperation(listAlbums));
      const albums = response.data.listAlbums.items;
      const albumOptions = albums.map((album) => ({
        label: album.name,
        value: album.id,
      }));
      setAlbumOptions(albumOptions);
    } catch (error) {
      console.error('Error fetching albums', error);
    }
  };

  const createCategory = async () => {
    try {
      const input = {
        title,
        // albums: selectedAlbums, // Make sure selectedAlbums is an array of album IDs
      };
      await API.graphql(graphqlOperation(createAlbumCategory, { input }));
       // After successful creation, refetch the album categories
    fetchAlbums();

    // Clear the input field
    setTitle('');
    } catch (error) {
      console.error('Error creating category', error);
    }

//     console.log(title);
//     console.log(albumCategories);
//   try {
//     const response = await API.graphql(
//       graphqlOperation(createAlbumCategory, {
//         input: {
//           title: title,
//         },
//       })
//     );
//     console.log("Response: \n");
//     console.log(response);
//   } catch (e) {
//     console.log(e.message);
//   }
//   console.log("After API call");
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category Title:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setTitle(text)}
        value={title}
      />

      

      <Button
        title="Create Category"
        onPress={createCategory}
        //disabled={!title || selectedAlbums.length === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50, 
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
});

export default CreateCategoryScreen;

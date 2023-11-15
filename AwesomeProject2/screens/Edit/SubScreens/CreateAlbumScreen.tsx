import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { Album } from "../../../types"; // Import the Album type
import { useRoute } from "@react-navigation/native";
import { Storage, API, graphqlOperation } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../src/aws-exports';
import { createAlbum } from '../../../src/graphql/mutations';
import { ScrollView } from "react-native-gesture-handler";
Amplify.configure(awsconfig);

export default function CreateAlbumScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const route = useRoute();
  const category = route.params.category;

  const uploadFile = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const randomNumber = Math.floor(Math.random() * 1000);
      const fileExtension = uri.split('.').pop();
      const imageName = `album/images/album-image-filename${randomNumber}.${fileExtension}`;
      console.log("image name: " + imageName);
      
  
      const uploadParams = {
        Key: imageName,
        Body: blob,
        ACL: 'public-read', // Set the ACL to make the object publicly accessible
        ContentType: 'image/jpeg', // Adjust content type if needed
        progressCallback: (progress) => {
          console.log(`Progress: ${progress.loaded}/${progress.total}`);
        },
      };
  
      const imageResponse = await Storage.put(imageName, blob, uploadParams);
      const uploadedImageKey = imageResponse.key;
  
      return uploadedImageKey; // Return the S3 key of the uploaded image
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardIsVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardIsVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleImageSelection = async () => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickerResult.canceled) {
        console.log("picker result: ", pickerResult);
        setSelectedImage(pickerResult.assets[0].uri);
        // const uploadedImageKey = await uploadFile(pickerResult.assets[0].uri);
        // const signedURL = await Storage.get(uploadedImageKey);
        
        // setSelectedImage(signedURL); // Set the S3 key of the uploaded image
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const [album, setAlbum] = useState<Album>({
    id: "",
    name: "",
    by: "",
    numberOfLikes: 0,
    imageUri: "", // To store the S3 URI for the uploaded image
    artistsHeadline: "",
  });

  const handleCreateAlbum = async () => {

try {
    
        const uploadedImageKey = await uploadFile(selectedImage);
        //const signedURL = await Storage.get(uploadedImageKey, { level: 'public' });

        const baseS3URL = 'https://albumimg192826-dev.s3.ca-central-1.amazonaws.com/public'; // Replace with your S3 bucket base URL
        const imageURL = `${baseS3URL}/${uploadedImageKey}`;
        setAlbum({ ...album, imageUri: imageURL });

      const newAlbum = {
        name: album.name,
        by: album.by,
        numberOfLikes: album.numberOfLikes,
        imageUri: imageURL, // Use the S3 URI of the selected image
        artistsHeadline: album.artistsHeadline,
        albumCategoryId: category.id
      };

      const createAlbumMutation = createAlbum;
      const createdAlbum = await API.graphql(graphqlOperation(createAlbumMutation, { input: newAlbum }));

      console.log('Album created:', createdAlbum);

      setAlbum({ // Clear the form fields by resetting the album object
        id: "",
        name: "",
        by: "",
        numberOfLikes: 0,
        imageUri: "",
        artistsHeadline: "",
      });
    } catch (error) {
      console.error('Error creating album:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      
    >
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={album.name}
        onChangeText={(text) => setAlbum({ ...album, name: text })}
      />

      <Text style={styles.label}>By:</Text>
      <TextInput
        style={styles.input}
        value={album.by}
        onChangeText={(text) => setAlbum({ ...album, by: text })}
      />

      <Text style={styles.label}>Number of Likes:</Text>
      <TextInput
        style={styles.input}
        value={album.numberOfLikes}
        onChangeText={(text) =>
          setAlbum({ ...album, numberOfLikes: parseInt(text) })
        }
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={handleImageSelection} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>

      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
      ) : (
        <Text style={styles.label}>No image selected</Text>
      )}

      <Text style={styles.label}>Artists Headline:</Text>
      <TextInput
        style={styles.input}
        value={album.artistsHeadline}
        onChangeText={(text) =>
          setAlbum({ ...album, artistsHeadline: text })
        }
      />

      <Button title="Create Album" onPress={handleCreateAlbum} />
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
    borderColor: 'black',
    borderWidth: 1,
  },
  button: {
    backgroundColor: 'blue',
    padding: 5,
    margin: 20,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

//export default CreateAlbumForm;

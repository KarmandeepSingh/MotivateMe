import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { Song } from "../../../types"; // Import the Album type
import { useRoute } from "@react-navigation/native";
import { Storage, API, graphqlOperation } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../src/aws-exports';
import { createSong } from '../../../src/graphql/mutations';
import * as DocumentPicker from 'expo-document-picker';
import { ScrollView } from "react-native-gesture-handler";
import { Video } from "expo-av";
Amplify.configure(awsconfig);

export default function CreateSongScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const route = useRoute();
  const album = route.params.album;

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
  const uploadFile = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const randomNumber = Math.floor(Math.random() * 1000);
      const fileExtension = imageUri.split('.').pop();
      const imageName = `songs/images/song-image-filename${randomNumber}.${fileExtension}`;
  
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
  const uploadVideo = async (videoUri) => {
    try {
      const response = await fetch(videoUri);
      const blob = await response.blob();
      const randomNumber = Math.floor(Math.random() * 1000);
      const fileExtension = videoUri.split('.').pop();
      const videoName = `songs/videos/song-video-filename${randomNumber}.${fileExtension}`;
  
      const uploadParams = {
        Key: videoName,
        Body: blob,
        ACL: 'public-read',
        ContentType: 'video/mp4',
        progressCallback: (progress) => {
          console.log(`Progress: ${progress.loaded}/${progress.total}`);
        },
      };
  
      const videoResponse = await Storage.put(videoName, blob, uploadParams);
      const uploadedVideoKey = videoResponse.key;
  
      return uploadedVideoKey;
    } catch (error) {
      console.error('Error uploading video:', error);
      return null;
    }
  };
  const handleVideoSelection = async () => {
    try {
      const videoResult = await DocumentPicker.getDocumentAsync({ type: "video/*" });
      if (videoResult.type === "success") {
        setVideoUri(videoResult.uri);
        setSelectedVideo(videoResult.uri);
      }
    } catch (error) {
      console.error('Error selecting video:', error);
    }
  };

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

  const [song, setSong] = useState<Song>({
    id: "",
    uri:"",
    imageUri: "",
    title: "",
    artist: "",
  });

  const handleCreateSong = async () => {
    try {
      const uploadedImageKey = await uploadFile(selectedImage);
      const uploadedVideoKey = await uploadVideo(selectedVideo);
      const baseS3URL = 'https://albumimg192826-dev.s3.ca-central-1.amazonaws.com/public';
      const imageURL = `${baseS3URL}/${uploadedImageKey}`;
      const videoURL = `${baseS3URL}/${uploadedVideoKey}`;
      setSong({ ...song, imageUri: imageURL, uri: videoURL });

      const newSong = {
        imageUri: imageURL,
        uri: videoURL,
        title: song.title,
        artist: song.artist,
        albumId: album.id
      };

      const createSongMutation = createSong;
      const createdSong = await API.graphql(graphqlOperation(createSongMutation, { input: newSong }));

      console.log('Song created:', createdSong);

      setSong({
        id: "",
        uri: "",
        imageUri: "",
        title: "",
        artist: "",
      });
    } catch (error) {
      console.error('Error creating song:', error);
    }
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
   
  >
    <ScrollView>

    

<View style={styles.container}>
   <TouchableOpacity onPress={handleImageSelection} style={styles.button}>
      <Text style={styles.buttonText}>Pick a photo</Text>
   </TouchableOpacity>

       {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
      ) : (
        <Text style={styles.label}>No image selected</Text>
      )}

<TouchableOpacity onPress={handleVideoSelection} style={styles.button}>
        <Text style={styles.buttonText}>Pick a video</Text>
      </TouchableOpacity>

      {selectedVideo ? (
            <Video
              source={{ uri: videoUri }}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.label}>No video selected</Text>
          )}
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={song.title}
        onChangeText={(text) => setSong({ ...song, title: text })}
      />

      <Text style={styles.label}>Artist:</Text>
      <TextInput
        style={styles.input}
        value={song.artist}
        onChangeText={(text) => setSong({ ...song, artist: text })}
      />

      

      <Button title="Create Song" onPress={handleCreateSong} />
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 50,
    marginBottom:200,
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
  video: {
    width: 300,
    height: 200,
    marginBottom: 16,
    borderColor: 'black',
    borderWidth: 1,
  },
});

//export default CreateAlbumForm;

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {Album} from "../../../types";
import styles from './albumHeaderStyles';
import Ionic from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CreateSongScreen from '../SubScreens/CreateSongScreen';

export type AlbumHeaderProps = {
  album: Album;
}

const AlbumHeader = (props: AlbumHeaderProps) => {
  const { album } = props;
  const navigation = useNavigation(); // Get navigation object
  const createSong = () => {
    navigation.navigate("CreateSongScreen",{album});
};
  
  return (
      <View style={styles.container}>
      <Image source={{ uri: album.imageUri}} style={styles.image} />
      <Text style={styles.name}>{album.name}</Text>
      <View style={styles.creatorContainer}>
        <Text style={styles.creator}>By {album.by}</Text>
        <Text style={styles.likes}>{album.numberOfLikes} Likes</Text>
      </View>
      <TouchableOpacity
      onPress={createSong}
      >
        <View style={styles.button}>
          {/* <Text style={styles.buttonText}>PLAY</Text> */}
          <Ionic name='add' size={30} color='white' />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default AlbumHeader;
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import albumDetails from "../data/albumDetails";
import SongListItem from "../components/SongListItem";
import AlbumHeader from "../components/AlbumHeader";
import { LinearGradient } from "expo-linear-gradient";
import {API, graphqlOperation} from 'aws-amplify';
import {getAlbum} from '../src/graphql/queries';

const AlbumScreen = () => {
  const route = useRoute();
  const albumId = route.params.id;

  const [album, setAlbum] = useState(null)

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const data = await API.graphql(graphqlOperation(getAlbum, { id: albumId }))
        setAlbum(data.data.getAlbum)
        console.log(data.data.getAlbum);
      } catch (e) {
        console.log(e);
      }
    }

    fetchAlbumDetails();
  }, [])

  if (!album) {
    return <Text>Loading...</Text>
  }

  return (
    <LinearGradient colors={['#c97a00', 'darkblue']} style={styles.container}>
      
      <View style={styles.home}>


        <FlatList
        data={album.songs.items}
        renderItem={({ item }) => <SongListItem song={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <AlbumHeader album={album} />}
      />

      </View>
    </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
  },
  home:{
    marginTop: 40,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AlbumScreen;

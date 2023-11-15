import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import SongListItem from "./components/songListItem";
import AlbumHeader from "./components/albumHeader";


import {View, Text, FlatList, StyleSheet} from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { getAlbum } from "../../src/graphql/queries";

const SongsScreen = () => {
    const route = useRoute();
    const albumId = route.params.id;
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        const fetchAlbumDetails = async () => {
            try {
                const data = await API.graphql(graphqlOperation(getAlbum, { id: albumId }));
                setAlbum(data.data.getAlbum);
            } catch (e) {
                console.log(e);
            }
        };

        fetchAlbumDetails();
    }, [albumId]); // Fetch data whenever albumId changes

    if (!album) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#c97a00', 'darkblue']} style={styles.container}>
                <View style={styles.home}>
                    <FlatList
                        data={album.songs.items}
                        renderItem={({ item }) => <SongListItem song={item} />}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={() => <AlbumHeader album={album} />}
                        showsVerticalScrollIndicator = {false}
                    />
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      
    },
    home:{
      marginTop: 50,
    },
    text: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
    },
  });

export default SongsScreen;
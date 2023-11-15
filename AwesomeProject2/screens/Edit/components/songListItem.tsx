import React, { useContext } from "react";

import {Text, View, Image, TouchableOpacity, Alert } from "react-native";
import {Song} from "../../../types";
import styles from "./songlistItemStyles";
import { API, graphqlOperation } from "aws-amplify";
import { deleteSong } from '../../../src/graphql/mutations';
export type SongListItemProps = {
song: Song
};

const SongListItem = (props: SongListItemProps) => {
    const {song} = props;
    const handleEditSong = () =>{
        
    }
    //const { setSongId } = useContext(AppContext);
    const onPlay = () => {
        //setSongId(song.id);
      }
      const longPress = () => {
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
                onPress: () => handleEditSong(song),
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
                              graphqlOperation(deleteSong, {
                                input: { id: song.id },
                              })
                            );
        
                            // Refresh the list of album categories after successful deletion
                            //refreshAlbumCategories();
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
    
    return (
        <TouchableOpacity onPress={onPlay} onLongPress={longPress}>

        
        <View style={styles.container}>
            <Image source={{uri: song.imageUri}} style={styles.image}/>
            <View style={styles.rightContainer}>
            <Text style={styles.title}>{song.title}</Text>
            <Text style={styles.artist}>{song.artist}</Text>
            </View>
            
        </View>
        </TouchableOpacity>
    
    );
}

export default SongListItem;
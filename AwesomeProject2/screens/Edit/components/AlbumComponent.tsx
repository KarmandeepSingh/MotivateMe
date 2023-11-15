import React from "react";

import { View , Image, Text, TouchableWithoutFeedback,} from "react-native";
import styles from '../../../components/Album/styles';
import {Album} from '../../../types';
import { useNavigation } from "@react-navigation/native";
import SongsScreen from '../SongsScreen';

export type AlbumProps = {
    album: Album,
    onAlbumLongPress: (album: Album) => void; // Callback function for long press
};

const AlbumComponent = (props: AlbumProps) =>{
    const navigation = useNavigation();
    const onPress = () => {
        
        navigation.navigate('SongsScreen' , {id: props.album.id});
    };
    const onLongPress = () => {
        props.onAlbumLongPress(props.album); // Execute the provided long press callback
    };
    return (
        <TouchableWithoutFeedback 
        //onPress={onPress(props.album)} 
        onPress={() => onPress()}
        onLongPress={onLongPress}>
    <View style={styles.container}>

        

        <Image source={{uri: props.album.imageUri}}   style={styles.image} />
        <Text style={styles.text}>{props.album.artistsHeadline}</Text>

        
        


    </View>
    </TouchableWithoutFeedback>
    )
}

export default AlbumComponent;

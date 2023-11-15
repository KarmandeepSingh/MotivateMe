import React, { useContext, useEffect, useRef, useState } from "react";

import { Text, View, Image, TouchableOpacity, Pressable } from "react-native";
import { Song } from "../../types";
import styles from "./styles";
import Ionicicon from "@expo/vector-icons/Ionicons";
import { Audio, Video } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { BottomModal, ModalContent } from "react-native-modals";
import { AntDesign, Entypo, Ionicons, Feather } from '@expo/vector-icons';
import { AppContext } from '../../AppContext';
import {getSong} from "../../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";


// const song = {
//     id: '1',
//     imageUri: 'https://images-na.ssl-images-amazon.com/images/I/61F66QURFyL.jpg',
//     uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     title: 'High on You',
//     artist: 'Helen',


// }



const PlayerWidget = () => {
    const [song, setSong] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [duraion, setDuration] = useState<number | null>(null);
    const [posittion, setPosition] = useState<number | null>(null);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);


    const [sound, setSound] = useState<Sound | null>(null);
    const circleSize = 12;
    const [currentTime, setCurrentTime] = useState<number | null>(null);
    const [totalDuration, setTotalDuration] = useState<number | null>(null);
    const bottomModalRef = useRef(null);

    const { songId } = useContext(AppContext);
    useEffect(() => {
        const fetchSong = async () => {
          try {
            const data = await API.graphql(graphqlOperation(getSong, { id: songId }))
            
            setSong(data.data.getSong);
          } catch (e) {
            console.log(e);
          }
        }
    
        fetchSong();
      }, [songId])
    const onPlayBackStatusUpdate = async (status) => {


        setIsPlaying(status.isPlaying);
        setDuration(status.durationMillis);
        setPosition(status.positionMillis);

        setCurrentTime(status.positionMillis);
        setTotalDuration(status.durationMillis);




    }

    const playCurrentSong = async () => {
        if (sound) {
            await sound.unloadAsync();
          }
      
          const { sound: newSound } = await Sound.createAsync(
            { uri: song.uri },
            { shouldPlay: isPlaying },
            onPlayBackStatusUpdate
          )
      
          setSound(newSound)
    }
    
    useEffect(() => {
        if(song){
            playCurrentSong();
        }
        

    }, [song])

    const onPlayPausePress = async () => {
        if (!sound) {
            return;
        }
        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();

        }
    }

    const getProgress = () => {
        if (sound === null || duraion === null || posittion === null) {
            return 0;
        }

        return (posittion / duraion) * 100;
    }

    const onContainerPress = () => {
        setModalVisible(!modalVisible);
    }
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}  `
    }

    if(!song){
        return null;
    }
    return (
        <View>
            {modalVisible ? (
                <BottomModal
                    ref={bottomModalRef}
                    visible={modalVisible}
                    onHardwareBackPress={() => setModalVisible(false)}
                    onSwipeOut={() => setModalVisible(false)}
                    swipeDirection={["up", "down"]}
                    swipeThreshold={200}
                >
                    <ModalContent style={{ height: "100%", width: "100%", backgroundColor: "#1f3d56" }}>
                        <View style={{ height: "100%", width: "100%", marginTop: 40 }}>
                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <AntDesign onPress={() => setModalVisible(!modalVisible)} name="down" size={24} color="white" />
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>{song?.title}</Text>
                                <Entypo name="dots-three-horizontal" size={24} color="white" />
                            </TouchableOpacity>
                            <View style={{ padding: 10 }}>


                                

                                <Video
                                    source={{ uri: song.uri }}
                                    style={{ width: "100%", height: 330, borderRadius: 4, marginTop: 70 }} // You might need to adjust the style based on your layout
                                    isMuted={true}
                                    resizeMode="cover"
                                    shouldPlay={isPlaying}
                                    isLooping={true}
                                    
                                />


                                <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
                                    <View>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>{song?.title}</Text>
                                        <Text style={{ color: "#D3D3D3", marginTop: 4 }}>{song?.artist}</Text>
                                    </View>
                                    <Ionicicon name='heart-outline' size={30} color={'white'} />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <View style={{ width: "100%", marginTop: 10, height: 3, backgroundColor: "gray", borderRadius: 5 }}>
                                        <View style={[styles.mainProgressBar, { width: `${getProgress()}%` }]} />
                                        <View style={[
                                            {
                                                position: "absolute",
                                                top: -5,
                                                width: circleSize,
                                                height: circleSize,
                                                borderRadius: circleSize / 2,
                                                backgroundColor: "white",
                                            },
                                            {
                                                left: `${getProgress()}%`,
                                                marginLeft: -circleSize / 2,
                                            }
                                        ]} />
                                    </View>
                                    <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ color: "#D3D3D3", fontSize: 15 }}>{formatTime(currentTime)}</Text>
                                        <Text style={{ color: "#D3D3D3", fontSize: 15 }}>{formatTime(totalDuration)}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 17 }}>

                                    <Pressable>
                                        <Entypo name="shuffle" size={30} color="white" />
                                    </Pressable>
                                    <Pressable>
                                        <AntDesign name="stepbackward" size={30} color="white" />
                                    </Pressable>

                                    <TouchableOpacity onPress={onPlayPausePress}>
                                        <Ionicicon name={isPlaying ? 'pause' : 'play'} size={60} color={'white'} />
                                    </TouchableOpacity>

                                    <Pressable>
                                        <Ionicons name="play-skip-forward" size={30} color="white" />
                                    </Pressable>
                                    <Pressable>
                                        <Feather name="repeat" size={30} color="white" />
                                    </Pressable>
                                </View>
                            </View>

                        </View>


                    </ModalContent>
                </BottomModal>
            ) : (
                <Pressable onPress={onContainerPress}>
                    <View style={styles.container}>
                        <View style={[styles.progress, { width: `${getProgress()}%` }]} />
                        <View style={styles.row}>
                            <Image source={{ uri: song.imageUri }} style={styles.image} />
                            <View style={styles.rightContainer}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.title}>{song.title}</Text>
                                    <Text style={styles.artist}>{song.artist}</Text>
                                </View>
                                <View style={styles.iconsContainer}>
                                    <Ionicicon name='heart-outline' size={30} color={'white'} />
                                    <TouchableOpacity onPress={onPlayPausePress}>
                                        <Ionicicon name={isPlaying ? 'pause' : 'play'} size={30} color={'white'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Pressable>
            )}
        </View>
    );
}

export default PlayerWidget;
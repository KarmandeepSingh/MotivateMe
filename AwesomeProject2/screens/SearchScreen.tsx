import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView, TextInput, Pressable, Dimensions, ImageBackground, Image } from 'react-native';
import React, {useState} from "react"
import {LinearGradient} from "expo-linear-gradient"
import { EvilIcons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
//import { BottomModal } from "react-native-modals";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchScreen = () => {
  const navigation = useNavigation();

//  const handlePremiumPress = () => {
//    navigation.navigate('Premium');
//  };

  const [searchText, setSearchText] = useState('');
  const [placeholder, setPlaceholder] = useState('Title, narrrator, artist or topic');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    // Handle search logic here
    console.log('Searching for:', searchText);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setPlaceholder('Title, narrrator, artist or topic');
    setIsFocused(false);
  };

  return (
    <ImageBackground source={require('../assets/Backgroung_Image.jpg')} style={{flex:1 , width: windowWidth, height: windowHeight }}>
    <LinearGradient colors={["rgba(244,67,54,0.5)", "rgba(255,235,59,0.5)"]} style={{flex:1}}>
    <SafeAreaView>  
      <View style={{marginTop:25}}>

        <Text style={{fontSize:22, fontWeight:"bold", textAlign:"center", color:"white"}}>Discover</Text>

        <View style={{ marginTop:30, marginLeft: 20, marginRight: 20, flexDirection: 'row', alignItems: 'center' }}>
        <LinearGradient colors={["rgba(255,235,59,0.5)", "rgba(244,67,54,0.5)"]} style={{flex:1}}>
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 15,
              borderColor:'white',
              color: 'white',
            }}
            placeholder="Title, narrrator, artist or topic"
            placeholderTextColor="white"
            onFocus={onFocus}
           onBlur={onBlur}
            onChangeText={text => setSearchText(text)}
            value={searchText}
          />
          {isFocused && (
            <Button
              title=""
              onPress={handleSearch}
              icon={<EvilIcons name="search" size={40} color="black" />}
            />
          )}
          </LinearGradient>
        </View>


     <ScrollView style={{marginTop:10
            }}>


         <Text style={{ color:"white", fontWeight:"bold", fontSize:18, marginHorizontal:20, marginTop:20,}}>Today's Dailies</Text>
         <ScrollView  
          horizontal contentContainerStyle={{ paddingHorizontal: 20, paddingVertical:18 }} 
          //showsHorizontalScrollIndicator={false}   //hides scroll bar, useful for in android and ios but useless in web
          style={{
            marginHorizontal: 12,
            marginVertical: 8,
            flexDirection: "row",
            gap: 10,
           }}>
           <View>
           <Image style={{width:130, height:130, borderRadius:5}} source={require('../assets/DailyCalm.png')}></Image>
           <Text style={{fontSize:14, color:"white", marginTop:10}}>Daily Calm</Text>
           </View>
         </ScrollView>


        <ScrollView  
          horizontal contentContainerStyle={{ paddingHorizontal: 20, paddingVertical:18 }} 
          //showsHorizontalScrollIndicator={false}   //hides scroll bar, useful for in android and ios but useless in web
          style={{
            marginHorizontal: 12,
            marginVertical: 8,
            flexDirection: "row",
            gap: 10,
        }}>
          <Pressable style={styles.button}>
            <Text style={{color:"white"}}>Sleep</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={{color:"white"}}>Dailies</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={{color:"white"}}>Music</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={{color:"white"}}>For Work</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={{color:"white"}}>Wisdom</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={{color:"white"}}>Kids</Text>
          </Pressable>
        </ScrollView>
      
       <Pressable style={{backgroundColor: "white",padding: 10, borderRadius: 30, marginLeft:20, marginRight:20, marginTop:20, flex:1}} >
            <Text style={{fontSize:16, textAlign:"center"}}>Unlock MotivateMe Premium</Text>
       </Pressable>
      
        <Text style={{ color:"white", fontWeight:"bold", fontSize:18, marginHorizontal:20, marginTop:20}}>Browse Meditation by time</Text>
         <ScrollView  
          horizontal contentContainerStyle={{ paddingHorizontal: 20, paddingVertical:18 }} 
          //showsHorizontalScrollIndicator={false}   //hides scroll bar, useful for in android and ios but useless in web
          style={{
            marginHorizontal: 12,
            marginVertical: 8,
            flexDirection: "row",
            gap: 10,
        }}>
          <Pressable style={styles.button}>
            <Text style={{color:"white"}}>3 min</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={{color:"white"}}>5 min</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={{color:"white"}}>10 min</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={{color:"white"}}>15 min</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={{color:"white"}}>30 min</Text>
          </Pressable>
        </ScrollView>
         
         
    </ScrollView>
    </View>
    </SafeAreaView>  
    </LinearGradient>
  </ImageBackground>
  )
}

export default SearchScreen;

const styles=StyleSheet.create({
   button: {
    backgroundColor: "#e91e63",
    padding: 10,
    borderRadius: 30,
    marginRight: 10,
  },
})
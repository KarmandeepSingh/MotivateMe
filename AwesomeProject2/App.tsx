import React, { useState } from 'react';
import { Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Ionic from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import LibraryScreen from './screens/LibraryScreen';
import AlbumScreen from './screens/AlbumScreen';
import PlayerWidget from './components/PlayerWidget';
import EditScreen from './screens/Edit/EditScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { ModalPortal } from 'react-native-modals';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);
import {AppContext} from './AppContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import EditCategoryScreen from "./screens/Edit/SubScreens/EditCategoryScreen";
import CreateCategoryScreen from './screens/Edit/SubScreens/CreateCategoryScreen';
import AlbumsScreen from './screens/Edit/AlbumsScreen';
import CreateAlbumScreen from './screens/Edit/SubScreens/CreateAlbumScreen';
import SongsScreen from './screens/Edit/SongsScreen';
import EditAlbumScreen from './screens/Edit/SubScreens/EditAlbumScreen';
import { withAuthenticator } from '@aws-amplify/ui-react-native';
import CreateSongScreen from './screens/Edit/./SubScreens/CreateSongScreen';





const App = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const [songId, setSongId] = useState<string|null>(null);
  const HomeStack = () => (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS, // Change the transition preset here
        cardStyle: {
          backgroundColor: 'transparent',
        },
        headerStyle: {
          backgroundColor: 'transparent', // Set header background color to black
        },
        headerTitleStyle: {
          color: 'transparent', // Set header text color to white
          borderBottomWidth: 0,
          
        },
        
       
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AlbumScreen" component={AlbumScreen} options={{ headerShown: false }} />
      
    </Stack.Navigator>
  );
  const EditStack = () => (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS, // Change the transition preset here
        cardStyle: {
          backgroundColor: 'transparent',
        },
        headerStyle: {
          backgroundColor: 'transparent', // Set header background color to black
        },
        headerTitleStyle: {
          color: 'transparent', // Set header text color to white
          borderBottomWidth: 0,
          
        },
        
       
      }}
    >
    
      <Stack.Screen name="EditScreen" component={EditScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="EditCategoryScreen" component={EditCategoryScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateCategoryScreen" component={CreateCategoryScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="AlbumsScreen" component={AlbumsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateAlbumScreen" component={CreateAlbumScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SongsScreen" component={SongsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="EditAlbumScreen" component={EditAlbumScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateSongScreen" component={CreateSongScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );

  return (
    <SafeAreaProvider>
      <AppContext.Provider value={{
          songId,
          setSongId: (id: string) => setSongId(id),
        }}>
    
    <View style={{ flex: 1 }}>

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = '';
              if (route.name === 'Home') {
                iconName = focused ? 'ios-home' : 'ios-home-outline';
              } else if (route.name === 'Search') {
                iconName = focused ? 'search-sharp' : 'search-outline';
              } else if (route.name === 'Library') {
                iconName = focused ? 'ios-book' : 'ios-book-outline';
              }else if (route.name === 'Edit') {
                iconName = focused ? 'build' : 'build-outline';
              }
              size= 35;
              return <Ionic name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'white',
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 90,
              backgroundColor: '#000a4a',
              borderColor: '#231e6a',
              borderTopWidth: 0,
              
            },
            
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Library" component={LibraryScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Edit" component={EditStack} options={{ headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>


      
      
      
      
      <ModalPortal/>
      <View>
        <PlayerWidget />
      </View> 
      
      
      
      
     



    </View>

    </AppContext.Provider>
    </SafeAreaProvider>
  );
};

export default withAuthenticator(App);

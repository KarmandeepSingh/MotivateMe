import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 90,
        
        backgroundColor: '#1f3d56',
        width: '100%',
        borderWidth: 1,
        borderColor: '#000e40',
        borderRadius: 20,
        //borderBottomEndRadius:0,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
                margin:0,

        
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
                
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 70,
        justifyContent: 'space-around',
    },
   
    image: {
        width: 75,
        height: 75,
        marginRight: 5,
        marginTop: 0,
        borderRadius:20,
        marginLeft: 2,

    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 5,

    },
    artist: {
        color: 'lightgray',
        fontSize: 18,
    },
    progress: {
        height: 3,
        backgroundColor: '#bcbcbc',
        
        
               
    },
    row:{
        flexDirection: 'row',

    },
    mainProgressBar:{
        height: "100%",
        backgroundColor: "white",
    },

});

export default styles;
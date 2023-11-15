import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 10,
        borderRadius:30,
    
    },
    name:{
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
                
    },
    creatorContainer:{
        flexDirection: 'row',
        margin: 10,
    },
    creator: {
        color: 'lightgray',
        margin: 5,
        fontSize: 20,

    },
    likes: {
        color: 'lightgray',
        margin: 5,
        fontSize: 20,
    },
    button: {
        backgroundColor:'#231e6a',
        height: 80,
        width: 80,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        
        
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

});
export default styles;
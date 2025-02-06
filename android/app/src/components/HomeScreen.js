import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

const HomeScreen = ({ user, onLogout, navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: user.photoURL }} style={styles.image} />
            <Text>Welcome, {user.displayName}</Text>            
            <Button title="Go to Orders" onPress={() => navigation.navigate("Orders")} />
            <Button title="Logout" onPress={onLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    image : {
        width:100, 
        height: 100,
        borderRadius:50,
        marginBottom : 10,
    },
});

export default HomeScreen;

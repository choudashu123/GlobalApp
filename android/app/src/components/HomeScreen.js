import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const HomeScreen = ({ user, onLogout, navigation }) => {
    return (
        <View style={styles.container}>
            {/* User Profile Card */}
            <View style={styles.profileCard}>
                <Image source={{ uri: user.photoURL }} style={styles.image} />
                <Text style={styles.welcomeText}>Welcome,</Text>
                <Text style={styles.userName}>{user.displayName}</Text>
            </View>

            {/* Buttons Section */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate("Orders")}>
                    <Text style={styles.buttonText}>📦 Go to Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSecondary} onPress={onLogout}>
                    <Text style={styles.buttonText}>🚪 Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },

    profileCard: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
        marginBottom: 30,
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 3,
        borderColor: "#4CAF50",
    },

    welcomeText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#666",
    },

    userName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginTop: 5,
    },

    buttonContainer: {
        width: "100%",
        alignItems: "center",
    },

    buttonPrimary: {
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        width: "90%",
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    buttonSecondary: {
        backgroundColor: "#D32F2F",
        paddingVertical: 12,
        width: "90%",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default HomeScreen;

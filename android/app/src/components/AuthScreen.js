import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, ActivityIndicator, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: "276232887200-b92mka3f9dhm2qk2ddrgvkbsq3822lqf.apps.googleusercontent.com", // 🔹 Replace with your actual Firebase Web Client ID
});

const AuthScreen = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
  
      // Ensure Google Play Services are available
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  
      // 🔹 Sign out first to prompt account selection
      await GoogleSignin.signOut();
  
      // Now, prompt the user to select an account
      const signInResult = await GoogleSignin.signIn();
      let idToken = signInResult?.idToken;
  
      if (!idToken) {
        idToken = signInResult.data?.idToken;
      }
  
      if (!idToken) {
        throw new Error("No ID token found");
      }
  
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
      // Sign in user with Firebase
      const userCredential = await auth().signInWithCredential(googleCredential);
  
      // Pass user data to parent component
      onLogin(userCredential.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.title}>Sign in with Google</Text>
          <Button title="Login with Google" onPress={signInWithGoogle} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
});

export default AuthScreen;
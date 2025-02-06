// import React, { useEffect, useState } from "react";
// import { View, Text, Button, Image, ActivityIndicator, StyleSheet } from "react-native";
// import auth from "@react-native-firebase/auth";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

// // Configure Google Sign-In
// GoogleSignin.configure({
//   webClientId: "276232887200-b92mka3f9dhm2qk2ddrgvkbsq3822lqf.apps.googleusercontent.com", // 🔹 Replace with your Firebase Web Client ID
// });

// async function onGoogleButtonPress() {
//   try {
//     // Check if the device supports Google Play services
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

//     // Sign in the user with Google
//     const signInResult = await GoogleSignin.signIn();

//     // Try the new style of google-sign-in result, from v13+ of that module
    
//     let idToken = signInResult?.idToken;

//     // If using older versions of google-signin, try the old style result
//     if (!idToken) {
//       idToken = signInResult.data?.idToken;
//     }

//     if (!idToken) {
//       throw new Error("No ID token found");
//     }

//     // Create a Google credential with the token
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//     // Sign in the user with the credential
//     return auth().signInWithCredential(googleCredential);
//   } catch (error) {
//     console.error("Google Sign-In Error:", error);
//   }
// }

// const App = () => {
//   const [user, setUser] = useState<null | any>(null);
//   const [loading, setLoading] = useState(true);

//   // Listen for authentication state changes
//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged((user) => {
//       setUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   // Function to handle Logout
//   const handleLogout = async () => {
//     await auth().signOut();
//     await GoogleSignin.revokeAccess();
//     setUser(null);
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {user ? (
//         <>
//           <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
//           <Text style={styles.profileName}>{user.displayName}</Text>
//           <Text>{user.email}</Text>
//           <Button title="Logout" onPress={handleLogout} />
//         </>
//       ) : (
//         <>
//           <Text style={styles.title}>Welcome! Sign in with Google</Text>
//           <Button title="Sign in with Google" onPress={onGoogleButtonPress} />
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
//   profileImage: { width: 50, height: 50, borderRadius: 25, marginBottom: 10 },
//   profileName: { fontSize: 18, fontWeight: "bold" },
// });

// export default App;

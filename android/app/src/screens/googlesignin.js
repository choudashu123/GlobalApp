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
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import generateRandomOrders from "../utils/generateOrders";
import OrderCard from "./OrderCard";
import SearchBar from "./SearchBar";

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 20; // Show 20 orders per page
  const [searchQuery, setSearchQuery] = useState("");

  // Generate 2,000 random orders when the component mounts
  useEffect(() => {
    setOrders(generateRandomOrders(2000));
  }, []);

  // Handle search query change
  const handleSearch = (text) => {
    setSearchQuery(text);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Get the orders for the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={handleSearch} />
      
      <FlatList
        data={currentOrders} // Show only the paginated orders
        keyExtractor={(item) => item.orderId}
        renderItem={({ item }) => (
          <View style={styles.orderCardContainer}>
            <OrderCard order={item} />
          </View>
        )}
      />

      {/* Pagination Controls */}
      <View style={styles.paginationContainer}>
        <Button 
          title="Previous" 
          onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))} 
          disabled={currentPage === 1} 
        />
        <Text style={styles.pageNumber}>
          Page {currentPage} of {totalPages}
        </Text>
        <Button 
          title="Next" 
          onPress={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} 
          disabled={currentPage >= totalPages} 
        />
      </View>

      {/* New Order Button */}
      <Button
        title="New Order"
        onPress={() =>
          navigation.navigate("OrderForm", {
            orderData: null, // Pass null for new order
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  orderCardContainer: { marginBottom: 10 },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  pageNumber: { marginHorizontal: 10, fontSize: 16 },
});

export default OrdersScreen;

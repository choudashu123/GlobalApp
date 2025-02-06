// import React, { useState, useEffect } from "react";
// import { View, Text, FlatList, StyleSheet, Image } from "react-native";
// import generateRandomOrders from "../utils/generateOrders";
// import { auth } from "../firebaseConfig";

// const OrdersScreen = () => {
//   const [orders, setOrders] = useState([]);
//   const user = auth().currentUser; // Get logged-in user details

//   useEffect(() => {
//     const generatedOrders = generateRandomOrders(); // Create 2k orders
//     setOrders(generatedOrders);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* User Profile Section */}
//       <View style={styles.profileContainer}>
//         {user?.photoURL && <Image source={{ uri: user.photoURL }} style={styles.profileImage} />}
//         <Text>{user?.displayName}</Text>
//         <Text>{user?.email}</Text>
//       </View>

//       {/* Orders List */}
//       <FlatList
//         data={orders}
//         keyExtractor={(item) => item.orderId}
//         renderItem={({ item }) => (
//           <View style={styles.orderCard}>
//             <Text>Order ID: {item.orderId}</Text>
//             <Text>Customer: {item.customerName}</Text>
//             <Text>Email: {item.customerEmail}</Text>
//             <Text>Product: {item.product}</Text>
//             <Text>Quantity: {item.quantity}</Text>
//             <Text>Total: ${item.orderValue}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   profileContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
//   profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
//   orderCard: { padding: 15, marginVertical: 5, backgroundColor: "#f9f9f9", borderRadius: 10 },
// });

// export default OrdersScreen;
// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, StyleSheet, Button } from "react-native";
// import generateRandomOrders from "../utils/generateOrders";

// const OrdersScreen = () => {
//   const [orders, setOrders] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ordersPerPage] = useState(20); // Show 20 orders per page

//   // Generate 2,000 random orders (can be replaced with actual data)
//   useEffect(() => {
//     setOrders(generateRandomOrders(2000));
//   }, []);

//   // Get the orders for the current page
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

//   // Handle next and previous page buttons
//   const nextPage = () => {
//     if (currentPage < Math.ceil(orders.length / ordersPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Orders List</Text>

//       {/* Orders List */}
//       <FlatList
//         data={currentOrders}
//         keyExtractor={(item) => item.orderId}
//         renderItem={({ item }) => (
//           <View style={styles.orderCard}>
//             <Text>Order ID: {item.orderId}</Text>
//             <Text>Customer: {item.customerName}</Text>
//             <Text>Email: {item.customerEmail}</Text>
//             <Text>Product: {item.product}</Text>
//             <Text>Quantity: {item.quantity}</Text>
//             <Text>Total: ${item.orderValue}</Text>
//           </View>
//         )}
//       />

//       {/* Pagination Controls */}
//       <View style={styles.paginationContainer}>
//         <Button title="Previous" onPress={prevPage} disabled={currentPage === 1} />
//         <Text style={styles.pageNumber}>
//           Page {currentPage} of {Math.ceil(orders.length / ordersPerPage)}
//         </Text>
//         <Button
//           title="Next"
//           onPress={nextPage}
//           disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
//   orderCard: { padding: 15, marginVertical: 5, backgroundColor: "#f9f9f9", borderRadius: 10 },
//   paginationContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 },
//   pageNumber: { marginHorizontal: 10 },
// });

// export default OrdersScreen;
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import generateRandomOrders from "../utils/generateOrders";
import OrderCard from "../components/OrderCard";
import OrderForm from "../components/OrderForm";
import SearchBar from "../components/SearchBar";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(20); // Show 20 orders per page
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Generate 2,000 random orders (can be replaced with actual data)
  useEffect(() => {
    setOrders(generateRandomOrders(2000));
  }, []);

  // Get the orders for the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Handle next and previous page buttons
  const nextPage = () => {
    if (currentPage < Math.ceil(orders.length / ordersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle search query change
  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  // Filter orders based on search query
  const filteredOrders = currentOrders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle editing of an order
  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsEditing(true);
  };

  // Handle saving a new or updated order
  const handleSaveOrder = (newOrder) => {
    if (selectedOrder) {
      // Update order if editing
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === selectedOrder.orderId ? { ...order, ...newOrder } : order
        )
      );
    } else {
      // Add new order
      setOrders((prevOrders) => [
        ...prevOrders,
        { ...newOrder, orderId: `ORD-${orders.length + 1}` },
      ]);
    }
    setIsEditing(false);
    setSelectedOrder(null);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <OrderForm orderData={selectedOrder} onSave={handleSaveOrder} />
      ) : (
        <>
          <SearchBar value={searchQuery} onChangeText={handleSearch} />
          <FlatList
            data={filteredOrders}
            keyExtractor={(item) => item.orderId}
            renderItem={({ item }) => (
              <View style={styles.orderCardContainer}>
                <OrderCard order={item} />
                <Button title="Edit" onPress={() => handleEditOrder(item)} />
              </View>
            )}
          />
        </>
      )}

      {/* Pagination Controls */}
      <View style={styles.paginationContainer}>
        <Button title="Previous" onPress={prevPage} disabled={currentPage === 1} />
        <Text style={styles.pageNumber}>
          Page {currentPage} of {Math.ceil(orders.length / ordersPerPage)}
        </Text>
        <Button
          title="Next"
          onPress={nextPage}
          disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  orderCardContainer: {
    marginBottom: 20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  pageNumber: {
    marginHorizontal: 10,
  },
});

export default OrdersScreen;


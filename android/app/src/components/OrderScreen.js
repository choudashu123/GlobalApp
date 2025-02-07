import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import RNFS from "react-native-fs"; // Import react-native-fs for file system operations
import generateRandomOrders from "../utils/generateOrdersJson";
import OrderCard from "./OrderCard";
import SearchBar from "./SearchBar";

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]); // Stores all orders
  const [filteredOrders, setFilteredOrders] = useState([]); // Stores orders after filtering
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 20; // Show 20 orders per page
  const [searchQuery, setSearchQuery] = useState("");

  const ordersFilePath = RNFS.DocumentDirectoryPath + "/orders.json"; // Path to store orders.json
  console.log("orders.json path:", ordersFilePath); // Log the path for debugging

  // Function to load orders from the file
  const loadOrders = async () => {
    try {
      const fileExists = await RNFS.exists(ordersFilePath);
      console.log("File exists:", fileExists); // Log if the file exists

      let loadedOrders = [];

      if (fileExists) {
        // If the file exists, read the file
        const fileContent = await RNFS.readFile(ordersFilePath, "utf8");
        loadedOrders = JSON.parse(fileContent);
        console.log("Loaded orders from file:", loadedOrders);
      } else {
        // If the file doesn't exist, generate random orders and save them
        console.log("File does not exist. Generating new orders...");
        loadedOrders = generateRandomOrders(2000);
        await RNFS.writeFile(ordersFilePath, JSON.stringify(loadedOrders, null, 2), "utf8");
        console.log("Generated and saved new orders.");
      }

      setOrders(loadedOrders); // Set the orders to the state
      setFilteredOrders(loadedOrders); // Update filtered orders as well
    } catch (error) {
      console.error("Error loading orders from file", error);
    }
  };

  // Load orders when the component mounts
  useEffect(() => {
    loadOrders(); // Load orders from file
  }, []); // Empty dependency array, so this effect runs only once

  // Handle search query change
  const handleSearch = (text) => {
    setSearchQuery(text);
    setCurrentPage(1); // Reset to the first page when searching

    if (text.trim() === "") {
      setFilteredOrders(orders); // Reset to full order list if search is empty
    } else {
      setFilteredOrders(
        orders.filter(
          (order) =>
            order.customerName.toLowerCase().includes(text.toLowerCase()) ||
            order.product.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Get the orders for the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Handle adding a new order
  const handleSaveOrder = (newOrder) => {
    const updatedOrders = [newOrder, ...orders]; // Add new order at the top
    setOrders(updatedOrders); // Update full order list
    setFilteredOrders(updatedOrders); // Update filtered list
  };

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
            onSave: handleSaveOrder, // Pass save function to update state
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

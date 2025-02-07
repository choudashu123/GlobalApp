import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button, Alert } from "react-native";
import RNFS from "react-native-fs";
import generateRandomOrders from "../utils/generateOrdersJson";
import OrderCard from "./OrderCard";
import SearchBar from "./SearchBar";

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]); 
  const [filteredOrders, setFilteredOrders] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 20;
  const [searchQuery, setSearchQuery] = useState("");

  const ordersFilePath = RNFS.DocumentDirectoryPath + "/orders.json";

  const loadOrders = async () => {
    try {
      const fileExists = await RNFS.exists(ordersFilePath);
      let loadedOrders = [];

      if (fileExists) {
        const fileContent = await RNFS.readFile(ordersFilePath, "utf8");
        loadedOrders = JSON.parse(fileContent);
      } else {
        loadedOrders = generateRandomOrders(2000);
        await RNFS.writeFile(ordersFilePath, JSON.stringify(loadedOrders, null, 2), "utf8");
      }

      setOrders(loadedOrders);
      setFilteredOrders(loadedOrders);
    } catch (error) {
      console.error("Error loading orders from file", error);
    }
  };

  const saveOrdersToFile = async (updatedOrders) => {
    try {
      await RNFS.writeFile(ordersFilePath, JSON.stringify(updatedOrders, null, 2), "utf8");
    } catch (error) {
      console.error("Error updating orders file", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this order?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: async () => {
        const updatedOrders = orders.filter(order => order.orderId !== orderId);
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        await saveOrdersToFile(updatedOrders);
      }, style: "destructive" }
    ]);
  };

  const handleEditOrder = (order) => {
    navigation.navigate("OrderForm", {
      orderData: order,
      onSave: handleSaveOrder,
    });
  };

  const handleSaveOrder = async (newOrder) => {
    let updatedOrders;
    const orderIndex = orders.findIndex(order => order.orderId === newOrder.orderId);

    if (orderIndex !== -1) {
      updatedOrders = [...orders];
      updatedOrders[orderIndex] = newOrder;
    } else {
      updatedOrders = [newOrder, ...orders];
    }

    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    await saveOrdersToFile(updatedOrders);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    setCurrentPage(1);

    if (text.trim() === "") {
      setFilteredOrders(orders);
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

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const formatLargeNumber = (num) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(2) + "K";
    return num;
  };

  const totalOrderValue = formatLargeNumber(
    filteredOrders.reduce((sum, order) => sum + order.orderValue, 0)
  );

  return (
    <View style={styles.container}>
      <View style={styles.totalValueContainer}>
        <Text style={styles.totalValueText}>Total Order Value: ${totalOrderValue}</Text>
      </View>

      <SearchBar value={searchQuery} onChangeText={handleSearch} />

      <FlatList
        data={currentOrders}
        keyExtractor={(item) => item.orderId}
        renderItem={({ item }) => (
          <View style={styles.orderCardContainer}>
            <OrderCard 
              order={item} 
              onDelete={handleDeleteOrder} 
              onEdit={handleEditOrder} 
            />
          </View>
        )}
      />

      <View style={styles.paginationContainer}>
        <Button title="Previous" onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1} />
        <Text style={styles.pageNumber}>Page {currentPage} of {totalPages}</Text>
        <Button title="Next" onPress={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} disabled={currentPage >= totalPages} />
      </View>

      {/* New Order Button with marginTop */}
      <View style={styles.newOrderButtonContainer}>
        <Button
          title="New Order"
          onPress={() =>
            navigation.navigate("OrderForm", {
              orderData: null,
              onSave: handleSaveOrder,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  
  totalValueContainer: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  totalValueText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  orderCardContainer: { marginBottom: 10 },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  pageNumber: { marginHorizontal: 10, fontSize: 16 },

  newOrderButtonContainer: {
    marginTop: 20, // Add margin to separate from pagination buttons
  },
});

export default OrdersScreen;

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderCard = ({ order }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Order ID: {order.orderId}</Text>
      <Text>Customer: {order.customerName}</Text>
      <Text>Email: {order.customerEmail}</Text>
      <Text>Product: {order.product}</Text>
      <Text>Quantity: {order.quantity}</Text>
      <Text>Total: ${order.orderValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
  },
});

export default OrderCard;

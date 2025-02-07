import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const OrderCard = ({ order, onDelete, onEdit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Order ID: {order.orderId}</Text>
      <Text>Customer: {order.customerName}</Text>
      <Text>Email: {order.customerEmail}</Text>
      <Text>Product: {order.product}</Text>
      <Text>Quantity: {order.quantity}</Text>
      <Text>Total: ${order.orderValue}</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => onEdit(order)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => onDelete(order.orderId)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    flex: 1, // Each button takes 50% width
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#4CAF50", // Green for edit
    marginRight: 5, // Add space between buttons
  },
  deleteButton: {
    backgroundColor: "#D32F2F", // Red for delete
    marginLeft: 5,
  },
  buttonText: {
    color: "white", // White text for buttons
    fontWeight: "bold",
  },
});

export default OrderCard;

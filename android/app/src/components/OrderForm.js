import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const OrderForm = ({ orderData, onSave }) => {
  const [customerName, setCustomerName] = useState(orderData?.customerName || "");
  const [customerEmail, setCustomerEmail] = useState(orderData?.customerEmail || "");
  const [product, setProduct] = useState(orderData?.product || "Product 1");
  const [quantity, setQuantity] = useState(orderData?.quantity || 1);

  const handleSave = () => {
    if (!customerName || !customerEmail || !quantity) {
      alert("All fields are required.");
      return;
    }

    const orderValue = product === "Product 1" ? 29 : product === "Product 2" ? 49 : 149;
    onSave({ customerName, customerEmail, product, quantity, orderValue: orderValue * quantity });
  };

  return (
    <View style={styles.form}>
      <Text>Customer Name</Text>
      <TextInput
        style={styles.input}
        value={customerName}
        onChangeText={setCustomerName}
      />
      <Text>Customer Email</Text>
      <TextInput
        style={styles.input}
        value={customerEmail}
        onChangeText={setCustomerEmail}
        keyboardType="email-address"
      />
      <Text>Product</Text>
      <TextInput
        style={styles.input}
        value={product}
        onChangeText={setProduct}
      />
      <Text>Quantity</Text>
      <TextInput
        style={styles.input}
        value={String(quantity)}
        onChangeText={(text) => setQuantity(Number(text))}
        keyboardType="numeric"
      />
      <Button title="Save Order" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
  },
});

export default OrderForm;

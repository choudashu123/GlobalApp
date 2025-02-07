import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import RNFS from "react-native-fs"; // Import react-native-fs

// Define the route props type
type OrderFormRouteProp = RouteProp<any, "OrderForm">;
type OrderFormProps = {
  route: OrderFormRouteProp;
  navigation: StackNavigationProp<any>;
};

// Define Order type
interface Order {
  orderId: string;
  customerName: string;
  customerEmail: string;
  product: string;
  quantity: number;
  orderValue: number;
}

const ordersFilePath = RNFS.DocumentDirectoryPath + "/orders.json"; // Path to store orders

const OrderForm: React.FC<OrderFormProps> = ({ route, navigation }) => {
  const orderData = route.params?.orderData || null;
  const onSave = route.params?.onSave || (() => {});

  const [customerName, setCustomerName] = useState(orderData?.customerName || "");
  const [customerEmail, setCustomerEmail] = useState(orderData?.customerEmail || "");
  const [product, setProduct] = useState(orderData?.product || "Product 1");
  const [quantity, setQuantity] = useState(orderData?.quantity || 1);

  // Function to generate a unique order ID
  const generateUniqueOrderId = async () => {
    const currentTimestamp = Date.now(); // Use timestamp for uniqueness
    let uniqueOrderId = `ORD-${currentTimestamp}`;

    try {
      const fileExists = await RNFS.exists(ordersFilePath);
      if (fileExists) {
        const fileContent = await RNFS.readFile(ordersFilePath, "utf8");
        const orders = JSON.parse(fileContent);
        
        // Check if the generated orderId exists in the current orders
        const existingOrder = orders.find((order: Order) => order.orderId === uniqueOrderId);

        if (existingOrder) {
          console.log("Duplicate orderId found, generating a new one.");
          uniqueOrderId = `ORD-${currentTimestamp + Math.floor(Math.random() * 100)}`;
        }
      }
    } catch (error) {
      console.error("Error reading the orders file:", error);
    }

    return uniqueOrderId;
  };

  // Function to save order to JSON file
  const saveOrderToFile = async (newOrder: Order) => {
    try {
      let orders: Order[] = [];
      const fileExists = await RNFS.exists(ordersFilePath);

      if (fileExists) {
        const fileContent = await RNFS.readFile(ordersFilePath, "utf8");
        orders = JSON.parse(fileContent);
      }

      // Append the new order
      orders.push(newOrder);

      // Write the updated data back to the file
      await RNFS.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), "utf8");
      console.log("✅ Order saved successfully!");
    } catch (error) {
      console.error("❌ Error saving order:", error);
    }
  };

  const handleSave = async () => {
    if (!customerName || !customerEmail || !quantity) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    const orderValue = product === "Product 1" ? 29 : product === "Product 2" ? 49 : 149;
    
    // Generate a unique orderId
    const uniqueOrderId = await generateUniqueOrderId();

    const newOrder: Order = {
      orderId: uniqueOrderId, // Use the unique orderId
      customerName,
      customerEmail,
      product,
      quantity,
      orderValue: orderValue * quantity,
    };

    await saveOrderToFile(newOrder); // Save order to JSON file
    onSave(newOrder); // Update state in OrdersScreen
    navigation.goBack(); // Navigate back to OrdersScreen
  };

  return (
    <View style={styles.form}>
      <Text>Customer Name</Text>
      <TextInput style={styles.input} value={customerName} onChangeText={setCustomerName} placeholder="Enter customer name" />

      <Text>Customer Email</Text>
      <TextInput style={styles.input} value={customerEmail} onChangeText={setCustomerEmail} keyboardType="email-address" placeholder="Enter customer email" />

      <Text>Product</Text>
      <TextInput style={styles.input} value={product} onChangeText={setProduct} placeholder="Enter product name" />

      <Text>Quantity</Text>
      <TextInput style={styles.input} value={String(quantity)} onChangeText={(text) => setQuantity(Number(text))} keyboardType="numeric" placeholder="Enter quantity" />

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
    borderRadius: 5,
  },
});

export default OrderForm;

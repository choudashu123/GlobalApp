// Importing react-native-fs for file operations
const RNFS = require("react-native-fs");

// Function to generate a random order ID
const generateOrderId = (index) => `ORD-${index + 1}`;

// Function to generate a random customer name
const generateCustomerName = () => {
  const firstNames = ["John", "Jane", "Alice", "Bob", "Chris", "Emma", "Liam", "Sophia"];
  const lastNames = ["Doe", "Smith", "Brown", "Taylor", "Anderson", "Wilson"];
  return (
    firstNames[Math.floor(Math.random() * firstNames.length)] +
    " " +
    lastNames[Math.floor(Math.random() * lastNames.length)]
  );
};

// Function to generate a random email
const generateCustomerEmail = (name) => {
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "company.com"];
  const email = name.split(" ").join(".").toLowerCase() + "@" + domains[Math.floor(Math.random() * domains.length)];
  return email;
};

// Function to generate a random product
const generateProduct = () => {
  const products = ["Product 1", "Product 2", "Product 3"];
  return products[Math.floor(Math.random() * products.length)];
};

// Function to generate a random quantity
const generateQuantity = () => Math.floor(Math.random() * 10) + 1; // Between 1 and 10

// Function to calculate order value based on product price
const calculateOrderValue = (product, quantity) => {
  const prices = {
    "Product 1": 29,
    "Product 2": 49,
    "Product 3": 149,
  };
  return prices[product] * quantity;
};

// Function to generate 2000 random orders
const generateOrders = (count = 2000) => {
  const orders = [];

  for (let i = 0; i < count; i++) {
    const customerName = generateCustomerName();
    const product = generateProduct();
    const quantity = generateQuantity();

    const order = {
      orderId: generateOrderId(i),
      customerName: customerName,
      customerEmail: generateCustomerEmail(customerName),
      product: product,
      quantity: quantity,
      orderValue: calculateOrderValue(product, quantity),
    };

    orders.push(order);
  }

  return orders;
};

// Path to store orders.json (using RNFS.DocumentDirectoryPath for internal storage)
const ordersFilePath = RNFS.DocumentDirectoryPath + "/orders.json";

// Generate 2,000 orders and save them to orders.json
const generateAndSaveOrders = async () => {
  try {
    const fileExists = await RNFS.exists(ordersFilePath);

    if (fileExists) {
      // If file exists, log it and do not overwrite
      console.log("File already exists. No need to overwrite.");
    } else {
      // If file doesn't exist, generate random orders and save them
      console.log("File does not exist. Generating new orders...");
      const orders = generateOrders(2000);

      // Write the generated orders to the file
      await RNFS.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), "utf8");
      console.log("✅ Successfully generated orders.json with 2,000 random orders!");
    }
  } catch (error) {
    console.error("❌ Error saving orders:", error);
  }
};

// Run the function to generate and save orders
generateAndSaveOrders();

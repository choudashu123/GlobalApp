const generateRandomOrders = (count = 2000) => {
    const products = [
      { name: "Product 1", price: 29 },
      { name: "Product 2", price: 49 },
      { name: "Product 3", price: 149 },
    ];
  
    const orders = [];
  
    for (let i = 1; i <= count; i++) {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 10) + 1; // Random quantity (1-10)
      const orderValue = quantity * randomProduct.price;
  
      orders.push({
        orderId: `ORD-${i}`, // Unique Order ID
        customerName: `Customer ${i}`, // Fake Customer Name
        customerEmail: `customer${i}@example.com`, // Fake Email
        product: randomProduct.name,
        quantity,
        orderValue,
      });
    }
  
    return orders;
  };
  
  export default generateRandomOrders;
  
// import { EventEmitter } from "node:events";

// class MyEmmiter extends EventEmitter {}

// const mockProducts = [
//   {
//     id: 1,
//     name: "Product 1",
//     stock: 50,
//     price: 300,
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     stock: 35,
//     price: 260,
//   },
//   {
//     id: 3,
//     name: "Product 3",
//     stock: 295,
//     price: 100,
//   },
//   {
//     id: 4,
//     name: "Product 4",
//     stock: 400,
//     price: 30,
//   },
//   {
//     id: 5,
//     name: "Product 5",
//     stock: 20,
//     price: 1945,
//   },
// ];

// class ProductService extends EventEmitter {
//   updateProductQuantity(productId, stockReduction) {
//     mockProducts.map((product) => {
//       if (product.id === productId) {
//         product.stock = product.stock - stockReduction;
//       }
//     });
//   }
// }

// const productService = new ProductService();

// class OrderService extends EventEmitter {
//   createOrder(orderData) {
//     console.log(`Order with id ${orderData.id} created`);

//     this.emit("submitOrder", orderData);
//   }
// }

// const orderService = new OrderService();

// orderService.on("submitOrder", (orderData) => {
//   orderData.items.forEach((item) => {
//     productService.updateProductQuantity(item.id, item.quantity);
//   });
//   console.log(mockProducts);
// });

// orderService.createOrder({
//   items: [
//     { id: 2, quantity: 4 },
//     { id: 3, quantity: 20 },
//   ],
// });

import { EventEmitter } from "events";

const myEmitter = new EventEmitter();

myEmitter.on("message", (data) => {
  console.log(`event message " ${data}`);
});

myEmitter.emit("message", "this is emit data");

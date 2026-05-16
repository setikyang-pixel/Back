import exp from "express";
import file from "node:fs";
import path from "node:path";

const us = exp();
const PORT = 3001;

us.use(exp.json());

us.get("/api/products", (req, res) => {
  let products = JSON.parse(
    file.readFileSync(path.resolve("./JSON/products.json")),
  );
  res.status(200).json(products);
});
us.get("/api/products/:id", (req, res) => {
  try {
    let products = JSON.parse(
      file.readFileSync(path.resolve("./JSON/products.json")),
    );
    let par = req.params.id;
    for (let i of products) {
      if (i.id === +par || i.name === par) {
        par = i;
      }
    }
    res.status(200).json(par);
  } catch {
    res.status(404).json("Data not found");
  }
});

us.post("/api/products/:id", (req, res) => {
  let products = JSON.parse(
    file.readFileSync(path.resolve("./JSON/products.json")),
  );
  let users = JSON.parse(file.readFileSync(path.resolve("./JSON/users.json")));
  let userID = +req.params.id;
  let product = req.body;
  let indexUser = users.findIndex((i) => i.id === userID);
  if (indexUser == -1)
    return res.status(404).json({ message: "That user was not found" });
  if (users[indexUser].role !== "admin") {
    return res.status(403).send("No permission.");
  }
  product = { id: Date.now(), ...product };
  products = [...products, product];
  file.writeFileSync(
    path.resolve("./JSON/products.json"),
    JSON.stringify(products),
  );
  res.status(201).json({ message: product });
});

us.put("/api/products/:id", (req, res) => {
  let products = JSON.parse(
    file.readFileSync(path.resolve("./JSON/products.json")),
  );
  let users = JSON.parse(file.readFileSync(path.resolve("./JSON/users.json")));
  let userID = +req.params.id;
  let productID = +req.headers.id;
  let RenderProduct = req.body;
  let indexUser = users.findIndex((i) => i.id === userID);
  if (indexUser == -1)
    return res.status(404).json({ message: "That user was not found" });
  if (users[indexUser].role !== "admin") {
    return res.status(403).send("No permission.");
  }
  let indexProduct = products.findIndex((i) => i.id === productID);
  let product = { ...products[indexProduct], ...RenderProduct };
  console.log(product);
  products[indexProduct] = product;
  file.writeFileSync(
    path.resolve("./JSON/products.json"),
    JSON.stringify(products),
  );
  res.status(201).json({ message: "hooo" });
});

us.delete("/api/products/:id", (req, res) => {
  let products = JSON.parse(
    file.readFileSync(path.resolve("./JSON/products.json")),
  );
  let users = JSON.parse(file.readFileSync("./JSON/users.json", "utf-8"));
  let id_user = +req.params.id;
  let DelProduct = +req.headers.id;
  let findDel = users.findIndex((i) => i.id === id_user);
  if (users[findDel].role !== "admin") {
    return res.status(403).send("No permission.");
  }
  products = products.filter((i) => i.id != DelProduct);
  file.writeFileSync(
    path.resolve("./JSON/products.json"),
    JSON.stringify(products),
  );
  res.status(201).json({ message: "Good" });
});

us.post("/api/users/register", (req, res) => {
  let users = JSON.parse(file.readFileSync(path.resolve("./JSON/users.json")));
  let user = req.body;
  for (const i of users) {
    if (i.username == user.username && i.password == user.password) {
      return res.status(409).json({ message: "User already exists." });
    }
  }
  users = [...users, (user = { id: Date.now(), ...user })];
  file.writeFileSync(path.resolve("./JSON/users.json"), JSON.stringify(users));
  res.status(201).json({ message: user });
});

us.post("/api/users/login", (req, res) => {
  let users = JSON.parse(
    file.readFileSync(path.resolve("./JSON/users.json"), "utf-8"),
  );
  let user = req.body;
  for (const i of users) {
    if (i.username == user.username && i.password == user.password) {
      return res.status(200).json({ id: i.id });
    }
  }
  res.status(409).json({ message: "The given user was not found.." });
});

us.get("/api/cart/:user_id", (req, res) => {
  try {
    const carts = JSON.parse(
      file.readFileSync(path.resolve("./JSON/cart.json"), "utf-8"),
    );
    const userId = +req.params.user_id;
    const userCart = carts.find((cart) => cart.user_id === userId);
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found." });
    }
    res.status(200).json(userCart);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

us.post("/api/cart/:user_id", (req, res) => {
  let carts = JSON.parse(
    file.readFileSync(path.resolve("./JSON/cart.json"), "utf-8"),
  );
  let userID = +req.params.user_id;
  let cartIndex = carts.findIndex((i) => i.user_id == userID);
  if (cartIndex !== -1) {
    let RenCart = {
      ...carts[cartIndex],
      ...req.body,
    };
    carts[cartIndex] = RenCart;
    file.writeFileSync(path.resolve("./JSON/cart.json"), JSON.stringify(carts));
    return res.status(200).json(RenCart);
  }
  let NewCart = {
    id: Date.now(),
    user_id: userID,
    ...req.body,
  };
  carts = [...carts, NewCart];
  file.writeFileSync(path.resolve("./JSON/cart.json"), JSON.stringify(carts));
  res.status(200).json(NewCart);
});

us.delete("/api/cart/:user_id/items/:product_id", (req, res) => {
  let carts = JSON.parse(
    file.readFileSync(path.resolve("./JSON/cart.json"), "utf-8"),
  );
  let userID = +req.params.user_id;
  let productID = +req.params.product_id;
  let cartIndex = carts.findIndex((i) => i.user_id == userID);
  let item = carts[cartIndex].items;
  item = item.filter((i) => i.product_id != productID);
  carts[cartIndex].items = item;
  file.writeFileSync(path.resolve("./JSON/cart.json"), JSON.stringify(carts));
  res.status(200).json(carts[cartIndex]);
});
us.delete("/api/cart/:user_id", (req, res) => {
  let carts = JSON.parse(
    file.readFileSync(path.resolve("./JSON/cart.json"), "utf-8"),
  );
  let userID = +req.params.user_id;
  let NewCart = carts.filter((i) => i.user_id !== userID);
  file.writeFileSync(path.resolve("./JSON/cart.json"), JSON.stringify(NewCart));
  res.status(200).json(carts);
});

us.post("/api/orders/:user_id", (req, res) => {
  let carts = JSON.parse(
    file.readFileSync(path.resolve("./JSON/cart.json"), "utf-8"),
  );
  let products = JSON.parse(
    file.readFileSync(path.resolve("./JSON/products.json"), "utf-8"),
  );
  let orders = JSON.parse(
    file.readFileSync(path.resolve("./JSON/orders.json"), "utf-8"),
  );
  let productPrice = products;
  let par = req.params.user_id;
  let index = carts.findIndex((i) => i.user_id == par);
  let UserCart = carts[index].items;
  let obj = {
    id: Date.now(),
    user_id: carts[index].id,
    order_date: new Date(),
    total_amount: 0,
    status: "pending",
    items: [],
  };
  let NewObj = { total_amount: 0, items: [] };
  for (let i of UserCart) {
    let arr = products.find((prod) => prod.id == i.product_id);
    if (i.quantity > arr.quantity)
      return res.send(400).json("Insufficient data");
    NewObj.total_amount += i.quantity * arr.price;
    NewObj.items.push({ ...i, price: arr.price });
    arr.quantity -= i.quantity;
  }
  obj = { ...obj, ...NewObj };
  carts[index].items = [];
  file.writeFileSync(
    path.resolve("./JSON/orders.json"),
    JSON.stringify([...orders, obj]),
  );
  file.writeFileSync(
    path.resolve("./JSON/orders.json"),
    JSON.stringify([carts]),
  );
  res.status(200).json("Is a very Great");
});

us.get("/api/orders/:id", (req, res) => {
  const id = +req.params.id;
  const orders = JSON.parse(file.readFileSync("./JSON/orders.json", "utf-8"));
  const found = orders.find((i) => i.id == id);
  if (found) {
    return res.status(200).json(found);
  }
  res.status(404).json("User is nothing");
});

us.get("/api/orders/:user_id/items", (req, res) => {
  const user_id = +req.params.user_id;
  const orders = JSON.parse(file.readFileSync("./JSON/orders.json", "utf-8"));
  const found = orders.find((i) => i.user_id == user_id);
  if (found) {
    return res.status(200).json(found.items);
  }
  res.status(404).json("User is nothing");
});

us.put("/api/orders/:user_id/status", (req, res) => {
  let users = JSON.parse(
    file.readFileSync(path.resolve("./JSON/users.json"), "utf-8"),
  );
  let orders = JSON.parse(
    file.readFileSync(path.resolve("./JSON/orders.json"), "utf-8"),
  );
  let { id, status } = req.body;
  let par = +req.params.user_id;
  let user = users.find((i) => i.id === par);
  if (user.role !== "admin") {
    return res.status(404).send("No permission.");
  }
  let arr = orders.findIndex((i) => i.id === id);
  console.log(arr);
  orders[0].status = status;
  console.log(orders);
  
  file.writeFileSync(
    path.resolve("./JSON/orders.json"),
    JSON.stringify([...orders]),
  );
  return res.status(200).json("ddddd");
});

us.listen(PORT, () => {
  console.log("Server in running...");
});

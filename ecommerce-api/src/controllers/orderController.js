export const getAllOrders = (req, res) => {
  res.json({ message: "getAllOrders" });
};

export const getOrderById = (req, res) => {
  res.json({ message: "getOrderById", id: req.params.id });
};

export const createOrder = (req, res) => {
  res.status(201).json({ message: "createOrder", data: req.body });
};

export const updateOrder = (req, res) => {
  res.json({ message: "updateOrder", id: req.params.id, data: req.body });
};

export const deleteOrder = (req, res) => {
  res.status(204).send();
};

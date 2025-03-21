import express from "express";
const router = express.Router();

let cart: { id: number; name: string; quantity: number; category: string }[] = [];

router.get("/", (req, res) => {
  res.json(cart);
});

router.post("/", (req, res) => {
  const { id, name, quantity, category } = req.body;
  if (!id || !name || !quantity) {
    return res.status(400).json({ error: "All fields are required" });
  }
  cart.push({ id, name, quantity, category });
  res.json(cart);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  cart = cart.filter((item) => item.id !== parseInt(id));
  res.json(cart);
});

router.delete("/", (req, res) => {
  cart = [];
  res.json({ message: "Cart cleared" });
});

export default router;

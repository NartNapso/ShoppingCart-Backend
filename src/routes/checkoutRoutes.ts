import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { fullName, address, email, cart } = req.body;

  if (!fullName || !address || !email || !cart || typeof cart !== "object") {
    return res.status(400).json({ error: "All fields are required" });
  }

  let extractedItems: { id: number; name: string; quantity: number; category?: string }[] = [];

  Object.entries(cart).forEach(([category, items]: [string, any]) => {
    if (Array.isArray(items)) {
      extractedItems = [...extractedItems, ...items.map(item => ({ ...item, category }))];
    }
  });

  if (extractedItems.length === 0) {
    return res.status(400).json({ error: "Cart cannot be empty" });
  }

  res.json({ message: "Checkout successful", cart: extractedItems });
});

export default router;

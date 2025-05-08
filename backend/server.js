const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./User');
const Product = require('./product');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const SECRET = 'your_jwt_secret';

// ✅ חיבור ל־MongoDB עם dbName
mongoose.connect('mongodb+srv://amos:test1234@cluster0.b5jc2.mongodb.net/?retryWrites=true&w=majority&dbName=basic-catalog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB error:', err.message);
  process.exit(1);
});



// 🔐 Register
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({ username, password: hashed, role });
    await newUser.save();
    res.send({ message: 'User registered' });
  } catch (err) {
    res.status(400).send({ error: 'User already exists or bad data' });
  }
});

// 🔐 Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).send({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send({ error: 'Invalid password' });

  const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '2h' });
  res.send({ message: 'Login success', token, role: user.role, username: user.username });
});

// 🔐 Middleware לאימות אדמין
function verifyAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).send({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, SECRET);
    if (decoded.role !== 'admin') return res.status(403).send({ error: 'Access denied' });
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).send({ error: 'Invalid token' });
  }
}

// 📥 Get all users
app.get('/users', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).send({ error: 'Server error' });
  }
});

app.delete('/users/:id', verifyAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: 'User deleted' });
  } catch (err) {
    res.status(500).send({ error: 'Server error' });
  }
});

// ➕ Add new product
app.post('/products', async (req, res) => {
  try {
    const catNum = Math.floor(100000 + Math.random() * 900000).toString();
    const product = new Product({ ...req.body, catNum });
    await product.save();
    res.send({ message: 'Product added', product });
  } catch (err) {
    res.status(400).send({ error: 'Invalid data' });
  }
});

// 📤 Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.send(products);
  } catch (err) {
    console.error('❌ Product fetch error:', err.message);
    res.status(500).send({ error: 'Server error', details: err.message });
  }
});

// ❌ Delete product by ID (admin only)
app.delete('/products/:id', verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).send({ error: 'Delete failed' });
  }
});

// 🔍 Search products
app.get('/products/search', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).send({ error: 'Missing query' });

  try {
    const regex = new RegExp(query, 'i');
    const results = await Product.find({
      $or: [
        { name: regex },
        { catNum: regex }
      ]
    });
    res.send(results);
  } catch (err) {
    res.status(500).send({ error: 'Search failed' });
  }
});

// ✏️ Update product
app.put('/products/:id', verifyAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).send({ error: 'Product not found' });
    res.send({ message: 'Product updated', product: updated });
  } catch (err) {
    res.status(500).send({ error: 'Update failed' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

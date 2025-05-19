
// Amazon Admin Dashboard Backend
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample Data
const products = [
  { 
    id: 1, 
    name: 'Wireless Headphones', 
    price: 99.99, 
    stock: 45, 
    category: 'Electronics', 
    rating: 4.5, 
    sales: 128 
  },
  { 
    id: 2, 
    name: 'Smart Watch', 
    price: 199.99, 
    stock: 32, 
    category: 'Electronics', 
    rating: 4.2, 
    sales: 97 
  },
  { 
    id: 3, 
    name: 'Running Shoes', 
    price: 79.99, 
    stock: 65, 
    category: 'Clothing', 
    rating: 4.7, 
    sales: 215 
  },
  { 
    id: 4, 
    name: 'Coffee Maker', 
    price: 59.99, 
    stock: 28, 
    category: 'Home', 
    rating: 4.3, 
    sales: 76 
  },
  { 
    id: 5, 
    name: 'Yoga Mat', 
    price: 24.99, 
    stock: 82, 
    category: 'Sports', 
    rating: 4.8, 
    sales: 143 
  }
];

const orders = [
  { 
    id: 1001, 
    customer: 'John Smith', 
    date: '2025-05-15', 
    status: 'Delivered', 
    total: 99.99 
  },
  { 
    id: 1002, 
    customer: 'Sarah Johnson', 
    date: '2025-05-16', 
    status: 'Processing', 
    total: 259.97 
  },
  { 
    id: 1003, 
    customer: 'Mike Brown', 
    date: '2025-05-17', 
    status: 'Shipped', 
    total: 79.99 
  },
  { 
    id: 1004, 
    customer: 'Emma Wilson', 
    date: '2025-05-18', 
    status: 'Processing', 
    total: 149.98 
  },
  { 
    id: 1005, 
    customer: 'Alex Taylor', 
    date: '2025-05-18', 
    status: 'Pending', 
    total: 24.99 
  }
];

const users = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john@example.com', 
    role: 'Customer', 
    orders: 5 
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    email: 'sarah@example.com', 
    role: 'Customer', 
    orders: 8 
  },
  { 
    id: 3, 
    name: 'Admin User', 
    email: 'admin@example.com', 
    role: 'Admin', 
    orders: 0 
  },
  { 
    id: 4, 
    name: 'Mike Brown', 
    email: 'mike@example.com', 
    role: 'Customer', 
    orders: 3 
  },
  { 
    id: 5, 
    name: 'Emma Wilson', 
    email: 'emma@example.com', 
    role: 'Customer', 
    orders: 12 
  }
];

// Metrics for dashboard
const metrics = {
  totalSales: 34582.75,
  totalOrders: 587,
  totalCustomers: 312,
  averageOrderValue: 58.91,
  monthlyRevenue: [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 4800 },
    { month: 'Mar', revenue: 5100 },
    { month: 'Apr', revenue: 4900 },
    { month: 'May', revenue: 5300 },
    { month: 'Jun', revenue: 5800 }
  ],
  categoryDistribution: [
    { name: 'Electronics', value: 42 },
    { name: 'Clothing', value: 28 },
    { name: 'Home', value: 15 },
    { name: 'Sports', value: 10 },
    { name: 'Books', value: 5 }
  ]
};

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
    rating: req.body.rating,
    sales: 0
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/metrics', (req, res) => {
  res.json(metrics);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

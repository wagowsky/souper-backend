const express = require('express');
const dotenv = require('dotenv');
// const rateLimit = require('express-rate-limit');
const cors = require('cors');
// const hpp = require('hpp');
const data = require('./assets/data');
const userRoute=require("./routes/userRoute")
dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/db');
connectDB();

const app = express();

// const rateLimiter = rateLimit({
//   windowMs: 10 * 60 * 1000,
//   max: 100,
// });

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes

app.use("/api/users",userRoute)
app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  const product = data.products.find((product) => product._id === id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: 'Product not found' });
  }
});
app.get('/api/products', (req, res) => {
  res.send(data.products);
});


// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT || '5000', () =>
  console.log(`Server is running on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
// const multer = require('multer')
// const upload = multer()
require("dotenv").config();

/// custom import
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const brainTreeRoutes = require("./routes/payment_config");
const orderRoutes = require('./routes/order')

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
// app.use(upload.array());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    serverSelectionTimeoutMS: 10000, // Timeout after 5s instead of 30s
  })
  .catch((err) => console.log(err.reason));

const db = mongoose.connection;
db.once("open", () => {
  console.log("database connection success");
});
db.once("close", () => {
  console.log("database connection lost");
});

app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/braintree", brainTreeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

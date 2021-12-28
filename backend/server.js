// const express = require("express");
// const data = require('./data.js');
// const cors = require('cors');

import express from "express";
import data from "./data.js";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config.js";
import userRouter from "./routers/userRouter.js";
import bodyParser from "body-parser";
import orderRouter from "./routers/orderRouter.js";
import productRouter from "./routers/productRouter.js";
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';

const __dirname = path.resolve();

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb.");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use('/api/uploads', uploadRouter);
app.use('/uploads', express.static(path.join(__dirname, '/../uploads.js')));
app.use(express.static(path.join(__dirname, '/../frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/index.html'));
});

app.get("/api/paypal/clientId", (req, res) => {
  res.send({ clientId: config.PAYPAL_CLIENT_ID });
});

app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});

app.listen(3000, () => {
  console.log("===========================");
  console.log("serve at http://localhost:3000");
  console.log("===========================");
});

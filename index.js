import http from "http";
import express from "express";

import { userRouter } from './users/index.js';

const port = 8000;
const app = express();

app.get("/ping", (req, res) => {
  res.send("Pong!");
});

app.use('/users', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on host: http://localhost:${port}`);
});

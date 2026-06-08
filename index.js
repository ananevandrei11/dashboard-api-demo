import http from "http";
import express from "express";

const port = 8000;
const app = express();

app.get("/ping", (req, res) => {
  res.send("Pong!");
});

app.listen(port, () => {
  console.log(`Example app listening on host: http://localhost:${port}`);
});

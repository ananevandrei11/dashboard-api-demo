import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

import { userRouter } from "./users/index.ts";

const PORT = 8000;
const app = express();

app.get("/ping", (req, res) => {
  res.set({ "Content-Type": "application/json" });
  res.send({ success: true });
});

app.use("/users", userRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error.message);
  res.status(401).send(error.message);
});

app.listen(PORT, () => {
  console.log(`Example app listening on host: http://localhost:${PORT}`);
});

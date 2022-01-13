import express, {Request,Response,Application, NextFunction} from 'express';
import cors from "cors";
import { config } from "dotenv";
import "./db";
import v1Router from "./routes";
import log from './logger';

config();

const app:Application = express();

const port = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/v1", (req:Request, res:Response) =>
  res
    .status(200)
    .json({ status: "success", message: "Welcome to InBillo API" })
);
app.use("/api/v1", v1Router);

app.use((req:Request, res:Response, next:NextFunction) => {
  const err = new Error("No endpoint found");
  res.status(404);
  next(err);
});

app.use((err, req:Request, res:Response) => {
  res.status(500).json({
    status: "error",
    error: {
      message: "Internal Server Error",
    },
  });
});

//server
app.listen(port, () => {
  log.info(`Server running at port ${port} on ${process.env.NODE_ENV}`);
});


export default app;

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import companyRoutes from "./routes/companyRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Resume2Role API" });
});

app.use("/api/company", companyRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

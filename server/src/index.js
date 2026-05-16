import dotenv from "dotenv";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDatabase().finally(() => {
  app.listen(PORT, () => {
    console.log(`Resume2Role API running on port ${PORT}`);
  });
});

import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

import connectDB from "./db/index.js";

connectDB()
  .then(() => {
    // app.on("error", (err) => {
    //   console.log("Error:", err);
    //   throw err;
    // });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`app is listening at port ${process.env.PORT}`);
    });
  }) // this is an async method , after completing it always returns a promise.
  .catch((err) => {
    console.log("MongoDB connection failed", err.message);
  });

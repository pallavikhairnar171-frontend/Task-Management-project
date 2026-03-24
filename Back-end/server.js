import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectToDB from "./config/mongodb.js";
import authRouter from "./routes/auth.rout.js";
import themeRouter from  "./routes/theme.route.js";
import projectRout from "./routes/project.rout.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

const swaggerOutput = JSON.parse(
  fs.readFileSync(new URL("./swagger-output.json", import.meta.url))
);
import notificationRout from "./routes/notification.rout.js";
const app = express();

const port = process.env.PORT ;
connectToDB()

// Middlewares important
app.use(morgan());
app.use(express.json());
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerOutput))
app.use(express.urlencoded())
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
    );
    next();
  });
}


// Routes
app.get("/", (req, res) => {
  console.log("Server GET request received");
  res.send("API is working fine");
});
app.use('/api/auth',authRouter);
app.use('/api/user/theme',themeRouter);
app.use('/api/project',projectRout);
app.use('/api/update',notificationRout)

// Start server
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});

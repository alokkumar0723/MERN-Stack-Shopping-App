import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

//configure env
dotenv.config();

//database config
connectDB();

//ES Module Fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();


//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './client/build')))

//routes
app.use('/api/vi/auth', authRoutes);
app.use('/api/vi/category', categoryRoutes);
app.use('/api/vi/product', productRoutes);



//rest api
// app.get("/", (req, res) => {
//     res.send("Welcome to Ecommerce App</h1>");
// });

app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
});


//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});

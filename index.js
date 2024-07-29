import express  from"express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import carRoute  from "./routes/carRoute.js";
import makeRoutes  from "./routes/makeRoute.js";
import transmissionRoutes from "./routes/transmissionRoutes.js";
import engineRoutes from "./routes/engineRoute.js";
import fuelTypeRoutes from "./routes/fuelTypeRoute.js";
import modelRoutes from "./routes/modelRoutes.js";
import cors from "cors";
//configure env
dotenv.config();

//databasse config


connectDB();
//rest object
const app = express();

//middlewares   
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/car", carRoute);
app.use("/api/v1/make",makeRoutes);
app.use("/api/v1/engine",engineRoutes);
app.use("/api/v1/transmission",transmissionRoutes);
app.use("/api/v1/fuelType",fuelTypeRoutes);
app.use("/api/v1/model",modelRoutes)

//rest api
app.get('/', (req,res) => {
    res.send(
   '<h1>Welcome to expedition Motors</h1>'
    );
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
}); 
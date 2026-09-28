import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js'
import remediesRoute from './routes/remediesRoute.js'
import authRoute from './routes/authRoute.js'
import doctorRoute from './routes/doctorRoute.js'
import buySellRoute from './routes/buySellRoute.js'
import articleRoute from "./routes/articleRoute.js";
import diseaseRoute from "./routes/diseaseRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js"
import insuranceRoute from "./routes/insuranceRoute.js"
import path from 'path';
import { fileURLToPath } from 'url';
const app = express()
const port = process.env.PORT || 4000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });
connectDB()       //config file

// Middleware
app.use(cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend.vercel.app"
    ]
  }))
app.use(express.json())

//chatbot
app.use('/api',remediesRoute)
app.use('/auth',authRoute)
console.log("in server.js")
app.use('/doctor',doctorRoute)
app.use('/buysell',buySellRoute)
app.use("/api",articleRoute);
app.use("/api",diseaseRoute);
app.use("/feedback",feedbackRoute);
app.use("/api",insuranceRoute);
// Serve the React frontend

app.use(express.static(path.resolve(__dirname, '../dist')));

// Handle React frontend routes
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

// Start server
app.listen(port, () => {
    console.log("Server Started", port);
});

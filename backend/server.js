import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import remediesRoute from './routes/remediesRoute.js'
import authRoute from './routes/authRoute.js'
import doctorRoute from './routes/doctorRoute.js'
import buySellRoute from './routes/buySellRoute.js'
import articleRoute from "./routes/articleRoute.js";
import diseaseRoute from "./routes/diseaseRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js"
import insuranceRoute from "./routes/insuranceRoute.js"
const app = express()
const port = process.env.PORT || 4000
connectDB()       //config file

// Middleware
app.use(cors())
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
app.listen(port, ()=> console.log("Server Started",port))
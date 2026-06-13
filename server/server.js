import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import dns from "dns";
import clerWebhooks from "./controllers/clerkWebhooks.js";

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);

connectDB()

const app = express()
app.use(cors()) //Enable Cross-Origin Resource Sharing

//Middleware
app.use(express.json())
app.use(clerkMiddleware())

//API to listen to Clerk Webhook
app.post("/api/clerk", clerWebhooks);

app.get('/', (req, res)=> res.send("API is working"))

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

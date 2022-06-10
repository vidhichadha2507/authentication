import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import router from './routes/auth.js';


import express from 'express';
import connectDB from './config/db.js';
connectDB();
import errorHandler from './middleware/error.js';
import { getPrivateData } from './controllers/private.js';
const app= express();

app.use(express.json());

app.use("/api/auth", router);
app.use("/api/private", router,getPrivateData);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;


const server= app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});

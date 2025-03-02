const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();

const connectDB = require("./Config/db");
const router = require("./Router/index");

const app = express();
app.use(cors({
  origin:[process.env.FRONTEND_URL,"https://ecommerce-website-1-pn90.onrender.com"],
  credentials:true
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cookieParser())
app.use('/api',router)
const PORT = 8080 || process.env.PORT;
connectDB().then(() => {
  console.log("connted to DB");
});
app.listen(PORT, () => {
  console.log("Server is running", PORT);
});

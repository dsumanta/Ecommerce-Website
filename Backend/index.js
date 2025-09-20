const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();

const connectDB = require("./Config/db");
const router = require("./Router/index");

const app = express();
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://www.flebix.store');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });
// Add this middleware at the very top of your routes
app.set('strict routing', true);
app.set('case sensitive routing', true);

const corsOptions = {
  // 
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};

app.use(cors(corsOptions));

app.options('*', (req, res) => {
  console.log('OPTIONS request received for:', req.url, 'from:', req.get('origin'));
  res.header('Access-Control-Allow-Origin', req.get('origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.sendStatus(200);
});

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url} from ${req.get('origin')}`);
  next();
});

// 4. LAST - Your routes
app.get('/', (req, res) => {
  console.log('HIT THE ROOT ROUTE!', req.get('origin'));
  res.json({ count: 5 });
});

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

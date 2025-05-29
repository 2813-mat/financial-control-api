require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const connectMongoDB = require('../config/mongo');
const logRequests = require('./middlewares/logsMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

connectMongoDB()

app.use(cors());
app.use(express.json());
app.use(logRequests);

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

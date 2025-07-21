require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const connectMongoDB = require('../config/mongo');
const logRequests = require('./middlewares/logsMiddleware');
const setupSwagger = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

connectMongoDB()
setupSwagger(app);

app.use(cors());
app.use(express.json());
app.use(logRequests);

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});

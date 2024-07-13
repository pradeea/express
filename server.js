import express from 'express';
import cors from 'cors'
import apiRoouter from './router/api.js'
// const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json())

// const apiRoouter = require('./router/api');
app.use('/api',apiRoouter);
app.listen(9000);

export default app;
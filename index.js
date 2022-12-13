import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/routes/ANDMeasureRoutes';

const app = express();
const PORT = 8080;
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: '*'
}));

routes(app);

app.get('/', (req, res) => {
  res.send(`Node and express server is running on port: ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});

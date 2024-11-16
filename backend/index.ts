import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from "cors"
import routes from './routes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.use("/", routes);

app.get('/', (req: Request, res: Response) => {
  res.send(new Date());
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


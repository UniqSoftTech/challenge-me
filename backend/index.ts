import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from "cors"
import db from './models/_index';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript and Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.post('/post', async (req: Request, res: Response) => {
  try {

    await db.Users.create(req.body);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

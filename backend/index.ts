import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript and Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

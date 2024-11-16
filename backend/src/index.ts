import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from "cors"
import routes from './routes';
import http from 'http';
import sequelize from './configs/db.config';


const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use("/", routes);
app.use((_: any, res: any) => { res.status(404).json({ message: "not found" }) });
app.use((err: any, req: any, res: any, next: any) => { res.status(500).json({ message: err.message }) });
app.get('/', (req: Request, res: Response) => { res.send(new Date()); });

if (process.env.NODE_ENV !== 'production') {
  const server = http.createServer(app);
  server.listen(3000, async () => {
    console.log("🚀 Server running on http://localhost:3000");
  });
}

(async () => {
  try {
    await sequelize.authenticate();
    console.log("🚀🚀🚀 DB CONNECTION: SUCCESSFULLY");
  } catch (err) {
    console.error("🚫🚫🚫 DB CONNECTION:", err);
  }
})();

export default app
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
const app: Application = express();
const PORT = 4000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on('connection', (socket) => {
  console.log('New client is connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('client-message', (msg) => {
    console.log('message: ' + msg);
  });
});

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  io.emit('message', 'Hello World!');
  return res.status(200).send({
    message: 'Hello World! from server',
  });
});

try {
  server.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}

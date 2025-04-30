import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

interface DrawData {
  x: number;
  y: number;
  color: string;
  lineWidth: number;
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('draw-start', (data: DrawData) => {
    socket.broadcast.emit('draw-start', data);
  });

  socket.on('draw-move', (data: DrawData) => {
    socket.broadcast.emit('draw-move', data);
  });

  socket.on('draw-end', () => {
    socket.broadcast.emit('draw-end');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: "*" },
  path: "/socket"
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer()
  server: Server;

  private users = new Map<string, { username: string, room: string }>();

  handleConnection(socket: Socket) {
    console.log(`User connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    const user = this.users.get(socket.id);
    if (user) {
      socket.leave(user.room);
      this.server.to(user.room).emit('user-left', { username: user.username });
    }
    this.users.delete(socket.id);
    console.log(`User disconnected: ${socket.id}`);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(socket: Socket, { username, room }: { username: string, room: string }) {
    if (!username || !room) return;
    
    socket.join(room);
    this.users.set(socket.id, { username, room });

    console.log(`${username} joined room ${room}`);
    this.server.to(room).emit('user-joined', { username });
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(socket: Socket) {
    const user = this.users.get(socket.id);
    if (!user) return;

    socket.leave(user.room);
    this.server.to(user.room).emit('user-left', { username: user.username });
    
    this.users.delete(socket.id);
    console.log(`${user.username} left room ${user.room}`);
  }

  @SubscribeMessage('chat-room')
  handleRoomMessage(socket: Socket, { username, room, message }: { username: string, room: string, message: string }) {
    if (!username || !room || !message) return;
    
    this.server.to(room).emit('room-message', { username, message });
  }
}

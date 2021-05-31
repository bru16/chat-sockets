import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import * as userService from './users';
const PORT = process.env.PORT || 5050;
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: ['http://localhost:3000'] } });

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('chat-message', ({ username, message, channel }) => {
        console.log(username);
        console.log(message);
        io.to(channel).emit('chat-message', { username, message });
    });

    socket.on('join-chat', ({ username, channel }) => {
        socket.join(channel);
        const user = userService.addUser({ id: socket.id, name: username, channel });
        socket.broadcast.to(channel).emit('welcome-message', { username: 'ADMIN', message: `${user.name} has connected` });
        socket.emit('welcome-notification');  // send notification to only the NEW socket.
        io.to(channel).emit('totalUsersOnChannel', userService.totalUsersConnected[channel]); // for displaying users connected
    });

    socket.on('disconnecting', () => {
        let channels = socket.rooms;
        const iterator = channels.values();
        let channel = iterator.next().value;    // socket.rooms returns a Set. The first value is the socket.id and the following
        channel = iterator.next().value;        // is the actual channel that the socket is suscribed. (the socket is always suscribed to one channel at a time).

        const user = userService.removeUser({ id: socket.id, channel });
        io.to(channel).emit('chat-message', { username: 'ADMIN', message: `${user.name} has disconnected.` });
        io.to(channel).emit('totalUsersOnChannel', userService.totalUsersConnected[channel]);
    });

    socket.on('disconnect', (reason) => {
        console.log(reason);
    });
});

server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

export default server;
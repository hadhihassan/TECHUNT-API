// const socketIo = require('socket.io');
// const { updateUserLastSeen } = require('../../application/updateUserLastSeen');

// const initSocket = (server) => {
//     const io = socketIo(server);

//     io.on('connection', (socket) => {
//         console.log('User connected');

//         socket.on('disconnect', async () => {
//             console.log('User disconnected');
//             await updateUserLastSeen(socket.username);
//         });

//         // Handle other socket events
//     });
// };

// module.exports = initSocket;

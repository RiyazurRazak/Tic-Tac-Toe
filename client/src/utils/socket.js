import socket from 'socket.io-client'


export const io = socket("https://tic-tac-toe-ws-backend.herokuapp.com")
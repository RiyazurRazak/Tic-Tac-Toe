import dotenv from 'dotenv'
dotenv.config()


import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import winston from 'winston'


//middlewares
import compression from 'compression'
import helmet from 'helmet'
import cookieparser from 'cookie-parser'
import session from 'express-session'
import cors from 'cors'
import passport from 'passport'


//REST routes

import v1 from './routes/v1/index.js'

//socket routes
import createrooms from './routes/socket/createroom.js'
import joinrooms from './routes/socket/joinroom.js'
import terminaterooms from './routes/socket/terminateroom.js'
import updateboard from './routes/socket/updateboard.js'
import restartgame from './routes/socket/restartgame.js'

const app = express()
const httpserver = http.createServer(app)
const io = new Server(httpserver, { cors: { origin: '*' } })


//constants

const PORT = process.env.PORT || 8000

//wrap

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);


//middlewares

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(helmet())
app.use(cookieparser())
app.use(session({
    secret: 'rngregnerk7#$#(*&@adligher',
    proxy : true,
    cookie : {
        sameSite : "none",
        secure : "auto",
    }
}));
app.use(compression())
app.use(cors({
    origin: 'https://tic-tac-toe-frontend-riyazurrazak.vercel.app',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}))
app.use(passport.initialize())
app.use(passport.session())

io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));


//logger

const logger = winston.createLogger({
    level: "info",
    format : winston.format.json,
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
})



app.use("/v1",v1)


app.get("*", (req,res)=>{
    res.status(404).send("404 not found")
})



io.on("connection", (socket)=>{
    
    
    createrooms(io, socket);
    joinrooms(io, socket);
    terminaterooms(io, socket);
    updateboard(io, socket);
    restartgame(io, socket);

   
    socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnected`);
    });
})


httpserver.listen(PORT, ()=>{
    console.log(`Server Running on Port : ${PORT}`)
})


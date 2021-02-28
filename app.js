const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./database/connection");
const { authRoutes } = require("./routes/auth");
const { postRoutes } = require("./routes/post");
const verifyToken = require("./middleware/verify-token");
const {
    createNotification 
} = require("./controllers/notification");
const { decodeToken } = require("./library/token-generation");

const port = 3000;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });

app.use(cors());
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.status(200).send("Welcome to Winku API server");
});

app.use("/auth", authRoutes);
app.use(express.static("uploads"));
app.use(verifyToken);
app.use("/post", postRoutes);

io.on('connection', async (socket) => {
    socket.on('create-like', async (params) => {
        const result = await createNotification(params.postUserId, "Liked your post");
        socket.broadcast.emit('notify-like', result);
    });
});

http.listen(port, async function(){
    try{
        await sequelize.authenticate();
        console.log("Server started on port: "+port);
    }
    catch(error){
        console.log("error"+error);
    }
});
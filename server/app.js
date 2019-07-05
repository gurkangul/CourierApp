var express = require('express');
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server);

const port=process.env.port || 3000
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res){

  res.sendFile(__dirname + '/index.html');
 });


 var users=[]
 var chats=[]
var i=0
io.on('connection', function (socket) {
  
  console.log('a user connected');
  socket.on("userId",(gelen)=>{  var data={name:gelen,socketId:socket.id}
  users.push(data)
  console.log(socket.id,"sssssss",users)  })
 
  socket.on('Message', (data) => socket.emit('Message', data));
  socket.on('missionCourier', (data) => socket.emit('missionCourier', data));
  socket.on('missionUser', (data) => socket.emit('missionUser', data));



  socket.on('chat message', function(msg){
    chats.push(msg)
    const recSocket=users.name[44].socketId
    console.log(recSocket,"recccc")
    io.to(recSocket).emit('chat message', chats);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('chat message', 'some user disconnected');
    
  });
 });
 server.listen(port, ()=>{
   console.log("connected port" + port)
 });



 function isUser(userList,username){
   return username in userList
 }

 function removeUser(userList,username){
   let newlist=Object.assign({},userList)
   delete newlist[username]
   return newlist
 }

 function addUser(userList,user){
  let newlist=Object.assign({},userList)
  newlist[user.name]=user
  return newlist
 }

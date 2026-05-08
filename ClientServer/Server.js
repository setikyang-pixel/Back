const net = require("node:net");
let map = new Map();

const ser = net.createServer((socket) => {
  if (map.size > 5){
    socket.write("Dear user, our server is full!!!")
    return;
  }
  let user = {
    num: 1,
    name: null,
    chatUser: null,
  };
  socket.write("Write your name:\n");
  socket.on("data", (d) => {
    let us = d.toString().trim();
    if (!us) return;
    if (user.num == 1) {
      const val = us.toLowerCase();
      if (map.has(user.name)) {
        socket.write("This name is already taken. Choose another:\n");
        return;
      }
      user.name = val;
      map.set(user.name, socket);
      user.num = 2;
      socket.write("Who do you want to start a conversation with?\n");
    } else if (user.num == 2) {
      const tar = us.toLowerCase();
      if (map.has(tar)) {
        user.chatUser = tar;
        user.num = 3;
        socket.write("Write your letter`\n");
      } else {
        socket.write("That user was not found!!!");
      }
    } else if (user.num == 3) {
      let idSoc = map.get(user.chatUser);
      idSoc.write(`[${user.name}]:${us}`);
    }
  });
});

ser.listen(3001, () => console.log("Server is a runing"));

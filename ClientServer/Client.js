const net = require("node:net");

const client = net.createConnection({ port: 3001 }, () => {
  console.log("Connected to server!");
});
client.on("data", (data) => {
  process.stdout.write(data.toString());
});
process.stdin.on("data", (data) => {
  client.write(data);
});

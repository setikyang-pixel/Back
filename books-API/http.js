const http = require("node:http");
const { json } = require("node:stream/consumers");

let users = [
  { id: 1, title: "Clean Code", author: "Robert Martin", year: 2008 },
  { id: 2, title: "The Pragmatic Programmer", author: "Andy Hunt", year: 1999 },
];

let ser = http.createServer((req, res) => {
  let userId = req.url.split("/");
  if (req.method == "GET" && userId[1] === "books" && !userId[2]) {
    res.writeHead(200, { "Content-type": "application/json" });
    return res.end(JSON.stringify(users));
  }
  if (req.method == "GET" && req.url.startsWith("/books/")) {
    let id = userId[2];
    let userID = users.find((user) => user.id == id);
    res.writeHead(200, { "Content-type": "application/json" });
    return res.end(JSON.stringify(userID));
  }

  if (req.method === "POST" && userId[1] === "books") {
    let b = "";
    req.on("data", (chunk) => (b += chunk));
    req.on("end", () => {
      try {
        const body = JSON.parse(b);
        const { title, author, year } = body;
        const newBook = {
          id: Date.now(),
          title,
          author,
          year,
        };
        users.push(newBook);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify("File created successfully"));
      } catch {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  if (req.method == "PUT" && req.url.startsWith("/books/")) {
    let putUser = "";
    let id = userId[2];
    req.on("data", (d) => {
      putUser += d;
    });
    req.on("end", () => {
      try {
        const body = JSON.parse(putUser);
        const { title, author, year } = body;
        const newBook = {
          id: Date.now(),
          title,
          author,
          year,
        };
        const i = users.findIndex((book) => book.id == id);
        users[i] = newBook;
        res.writeHead(200);
        res.write(JSON.stringify("File modified successfully"));
      } catch {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }
  if (req.method === "PATCH" && req.url.startsWith("/books/")) {
    let book = "";
    req.on("data", (d) => (book += d));
    req.on("end", () => {
      try {
        let b = JSON.parse(book);
        let index = users.find((item) => item.id == userId[2]);
        users[index] = { ...users, ...b };
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify("Books is a rendering"));
      } catch {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }

  if (req.method === "DELETE" && req.url.startsWith("/books/")) {
    try {
      let index = userId[2];
      users = users.filter((i) => i.id != index);
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify("Books is a rendering"));
      return;
    } catch {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  }
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Route not found" }));
});

ser.listen(3000, () => {
  console.log("Runing...");
});

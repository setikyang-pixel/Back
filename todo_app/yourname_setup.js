use("todoapp");

//Ստեղխում ենք նոր DB
// db.createUser({
//   user: "todo_app",
//   pwd: "gagik123",
//   roles: [{ role: "readWrite", db: "todoapp" }],
// });

// db.createUser({
//   user: "todo_viewer",
//   pwd: "viewer123",
//   roles: [{ role: "read", db: "todoapp" }],
// });

//Ոչինչ չի տխում քքանի որ մենք դեռ նրա մեջ արժեք չենք սահամանել
// db.getUsers()

//1.5 եստեղ սկզբում ինձ մոտ չաշխատեց քանի որ այն հաստածված էր բոլոր user մոտ դրա համար ես փոխարինեցի նրա կարգավորումները որ այն աշխատի ինչպես տրված էր
//user
// {
//   acknowledged: true,
//   insertedId: ObjectId('6a3114b340eacfdd369df8a3')
// }

// [
//   {
//     _id: ObjectId('6a3114b340eacfdd369df8a3'),
//     title: 'Testing for write'
//   }
// ]
// //viewer
// MongoServerError[Unauthorized]: not authorized on todoapp to execute command { insert: "todos", documents: [ { title: "test", _id: ObjectId('6a311798694b4253a69df8a3') } ], ordered: true, lsid: { id: UUID("574a96c7-5920-4bcc-8813-f4ab4b830f6b") }, $db: "todoapp" }
// [
//   {
//     _id: ObjectId('6a3114b340eacfdd369df8a3'),
//     title: 'Testing for write'
//   }
// ]
// todoapp> db.todos.insertOne("test")
// {
//   acknowledged: true,
//   insertedId: ObjectId('6a311523612b377cb29df8a3')
// }
// todoapp> db.todos.insertOne({title : "test"})
// {
//   acknowledged: true,
//   insertedId: ObjectId('6a311597612b377cb29df8a4')
// }

//2
// db.createCollection("todos")
// db.todos.createIndex({title : 1},{unique: true})
// db.todos.createIndex({done : 1, priority : -1})
// db.todos.getIndexes()

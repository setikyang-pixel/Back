use("todoapp");

//3
// db.todos.insertOne({
//   title: "Buy groceries",
//   done: false,
//   priority: "medium",
//   created_at: new Date(),
// });

// db.todos.insertMany([
//   {
//     title: "Read a book",
//     done: false,
//     priority: "low",
//     created_at: new Date(),
//   },
//   { title: "Go to gym", done: true, priority: "high", created_at: new Date() },
//   {
//     title: "Call mom",
//     done: false,
//     priority: "high",
//     created_at: new Date(),
//     due_date: new Date("2025-06-01"),
//   },
//   {
//     title: "Fix bug",
//     done: true,
//     priority: "medium",
//     created_at: new Date(),
//     due_date: new Date("2025-05-20"),
//   },
//   {
//     title: "Clean house",
//     done: false,
//     priority: "low",
//     created_at: new Date(),
//   },
//   {
//     title: "Write report",
//     done: false,
//     priority: "high",
//     created_at: new Date(),
//   },
// ]);

// db.todos.insertOne({
//   title: "Book buying",
//   description: "Book for Armani English translation",
//   done: false,
//   priority: 2,
//   tags: ["education", "shopping", "personal"],
// });

// db.todos.insertOne({
//   title: "Pc buy",
//   description: "Asusu Vivobook",
//   done: true,
//   priority: 1,
//   tags: ["Intel", "Ryzen"],
//   subtasks: [
//     { title: "Ram 16Gb", completed: true },
//     { title: "SSD 512Gb", completed: false },
//     { title: "GPU", completed: true },
//   ],
// });

//կտպի մեր collecttion քանակը
// print(db.todos.countDocuments())

//4
//db.todos.find()

// db.todos.find({
//   done : false
// })

// db.todos.find({
//   priority : "high"
// })

// db.todos.find({
//   priority: "high",
//   done : false
// });

// db.todos.find({
//   due_date: { $lt: new Date() },
// });

// db.todos.find({
//   priority: {
//     $in: ["high", "medium"],
//   },
// });

// db.todos.find({
//   title: {
//     $regex: "buy",
//     $options: "i",
//   },
// });

// db.todos.find({
//   due_date: { $exists: true },
// });

// db.todos
//   .find({
//     priority: "high",
//   })
//   .sort({ created_at: -1 })
//   .limit(3);

// db.todos.find({}, { title: 1, priority: 1, _id: 0 });

////5
// db.todos.updateOne({title : "Buy food"},{$set : {done : true}})

// db.todos.updateMany({priority : "high"},{$set : {done : true}})

// print(db.todos.countDocuments({priority : "high"}))

// db.todos.updateMany({}, { $set: { updated_at: new Date() } });

// db.todos.updateOne({title : "Fix bug"},{$unset : {due_date : ""}})

// db.todos.updateOne({ title: "Fix bug" }, { $addToSet: { important: "work" } });

// db.todos.updateMany({}, { $pull: { title: "urgent" } });

// db.todos.updateMany({},{$inc : {attempts : 0}})

//  db.todos.updateOne({ title: 'Weekly review' }, { $set: {title : "Day review"} }, { upsert: true })

// print(db.todos.find({ subtasks: { $exists: true, $not: { $size: 0 } } }))

// print(db.todos.find({ "subtasks.done": { $not: { $eq: false } } }));

// db.todos.updateOne(
//   { title: "Clean house" },
//   { $push: { subtasks: { title: "Read Book", done: true } } },
// );

// db.todos.updateOne(
//   { title: "Pc buy", "subtasks.title": "Opebn for PC" },
//   { $set: { "subtasks.$.done": true } },
// );

// db.todos.countDocuments({ "subtasks.2": { $exists: true } });

//7

// db.todos.deleteOne({title : "Weekly review"})

// let a = db.todos.deleteMany({done : true});
// console.log(a.deletedCount);

// let timing = db.todos.deleteMany({
//   created_at: { $lt: new Date("2025-01-01") },
// });
// console.log(timing.deletedCount);

//db.todos.deleteMany({}) սա ոչ թեվտանգավոր է այլ պարրզապես սխալ օգտագործում եթե իհարլե այն գիտակցված չես օգտագործում այն պարզապես ջնջում է իմ ամբողջ todo

// let priorityCount = db.todos.aggregate([{ $group: { _id: "$priority", count: { $sum: 1 } } }]);
// print(priorityCount)

// const priorityDone = db.todos.aggregate([
//   { $group: { _id: "$done", count: { $sum: 1 } } },
// ]);
// console.log(priorityDone);

// const tag = db.todos.aggregate([
//   { $unwind: "$tags" },
//   { $group: { _id: "$tags", count: { $sum: 1 } } },
// ]);
// console.log(tag);

// const dateSort = db.todos.aggregate([
//   {
//     $group: {
//       _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
//       count: { $sum: 1 },
//     },
//   },
// ]);
// console.log(dateSort);

// const todoItem = db.todos.aggregate([
//   { $match: { done: false, priority: "high" } },
//   { $project: { title: 1, _id: 0 } },
//   { $sort: { title: 1 } },
// ]);
// console.log(todoItem);

//9

// db.todos.find()

// console.log(db.todos.find().toArray());

// db.todos.insertOne({
//   title: "Viewer Test",
// });
//// MongoServerError[Unauthorized]:
//// not authorized on todoapp to execute command

// db.todos.deleteOne({title : "Viewer Test"})

// db.changeUserPassword(
//   "todo_viewer",
//   "newViewerPass"
// )

// db.grantRolesToUser("todo_viewer", [
//   { role: "readWrite", db: "todoapp" },
// ]);

// db.dropUser("todo_viewer")

// console.log(db.getUsers());

////10

// db.todos.drop()

// db.dropDatabase()

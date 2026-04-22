const EventEmitter = require("events");

class TaskManager extends EventEmitter {
  #total = 0;
  constructor() {
    super();
  }
  addTask(name) {
    this.emit("taskAdded", name);
  }
  completeTask(name) {
    this.emit('taskCompleted',name, ++this.#total);
  }
}
const manager = new TaskManager();

manager.on("taskAdded", (name) => {
  console.log(`NEW: Task "${name}" is now pending.`);
});

manager.on("taskCompleted", (name, total) => {
  console.log(`DONE: Task "${name}" finished. Total completed: ${total}.`);

  if (total === 3) {
    console.log("--- Milestone Achieved: Three tasks finished! ---");
  }
});

manager.addTask("Setup Database");
manager.addTask("Write API Endpoint");
manager.addTask("Design UI Mockups");

manager.completeTask("Setup Database");
manager.completeTask("Write API Endpoint");
manager.completeTask("Design UI Mockups");

class CustomEventEmitter {
  constructor() {
    this.list = [];
  }

  on(event, listener) {
    this.list.push({ event, listener });
  }

  emit(event, ...args) {
    if (!this.list[event]) {
      let s = this.list.map((i) => {
        if (i.event == event) return i;
      });
      console.log(s);
      for (const { event, listener } of s) {
        return listener(...args);
      }
    }
  }

  off(event, listenerToRemove) {
    if (!listenerToRemove) this.list = [];
    if (this.list[event]) {
      this.list[event] = this.list.filter((i) => i.event != event);
    } 
  }
}

const event = new CustomEventEmitter();
event.on("cl", () => console.log("hi"));
event.emit("cl");
event.off("cl");
event.emit("cl");

import mongoose from "mongoose";

const Event = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (val) {
        return val > this.startTime;
      },
    },
  },
  capacity : {
    type : Number,
    required : true,
    min: 1,
  },
  attendees: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      joinedAt: { type: Date, default: Date.now },
    },
  ],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  agenda: [
    {
      time: { type: String, required: true },
      title: { type: String, required: true },
    },
  ],
});

export default mongoose.model("Event", Event);

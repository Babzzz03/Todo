const mongoose = require("mongoose");


const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must provide details"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Task', TaskSchema)
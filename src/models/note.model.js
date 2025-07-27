import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A note must have a title"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  content: {
    type: String,
    required: [true, "A note must have content"],
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
noteSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Note = mongoose.model("Note", noteSchema);
export default Note;

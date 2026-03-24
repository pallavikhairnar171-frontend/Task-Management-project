import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: [true, "File path is required"],
    },
    originalName: {
      type: String,
      required: [true, "Original file name is required"],
    },
  },
  { _id: false },
);

const notificationSchema = new mongoose.Schema(
  {
    noti: {
      type: String,
      required: [true, "Notification title is required"],
      trim: true,
    },
    msg: {
      type: String,
      required: [true, "Notification message is required"],
      trim: true,
    },
    files: [fileSchema],

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project is required"],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;

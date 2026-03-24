import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,

    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    priority:{
      type:String,
      enum:["low" ,"high"],
      default:"low"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true, 
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
    },
  },
  { _id: true, timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    startDate: {
      type: Date,
      require: true,
    },
    expexctedCompletDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "in-progress"],
      default: "pending",
    },
    priority: {
      type: Boolean,
      default: false,
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        require:true
    },
    members: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    tasks: [taskSchema],
  },
  { timestamps: true }
);

const projectModel =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
export default projectModel;

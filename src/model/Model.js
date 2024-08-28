import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      index: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    labels: {
      type: [String],
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["priority1", "priority2", "priority3", "priority4"],
    },
    reminders: {
      type: [
        {
          reminderDate: {
            type: Date,
          },
          reminderTime: {
            type: String,
          },
        },
      ],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    subTasks: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Task",
        },
      ],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    owner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  },
  {
    timestamps: true,
  }
);

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    files: {
      type: String,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    owner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const sectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["project", "team"],
      required: true,
    },
  },
  { timestamps: true }
);

taskSchema.plugin(mongooseAggregatePaginate);
commentSchema.plugin(mongooseAggregatePaginate);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
const taskModel = mongoose.models.Task || mongoose.model("Task", taskSchema);
const projectModel =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
const teamModel = mongoose.models.Team || mongoose.model("Team", teamSchema);
const sectionModel =
  mongoose.models.Section || mongoose.model("Section", sectionSchema);
const commentModel =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export {
  userModel,
  taskModel,
  projectModel,
  teamModel,
  sectionModel,
  commentModel,
};

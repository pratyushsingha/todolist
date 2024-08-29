import dbConnect from "@/lib/dbConnect";
import { taskModel } from "@/model/Model";
import { auth } from "@clerk/nextjs/server";

export async function POST(_, { params }) {
  await dbConnect();
  const { id } = params;
  try {
    const { userId } = auth();
    if (!userId) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const task = await taskModel.findById(id);
    if (!task) {
      return Response.json(
        { success: false, message: "task not found" },
        { status: 404 }
      );
    }
    task.isCompleted = !task.isCompleted;
    await task.save();

    return Response.json(
      {
        success: true,
        data: task,
        message: "task status updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "error updating task status" },
      { status: 500 }
    );
  }
}

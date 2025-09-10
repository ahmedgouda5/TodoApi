import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // العنوان إجباري
      trim: true,     // يشيل المسافات من الأول والآخر
    },
    description: {
      type: String,
      default: "", // ممكن يكون فاضي
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false, // افتراضيًا لسه متعملش
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // بيربط التودو بمستخدم
      required: true,
    },
  },
  {
    timestamps: true, // يضيف createdAt و updatedAt تلقائيًا
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;

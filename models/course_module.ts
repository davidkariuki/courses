import { Schema, Document, model, models, Types } from "mongoose"
import { CoursePart } from "./course_part"

export interface CourseModule {
  _id: string
  moduleId?: number
  title: string
  coursePart: CoursePart
}

const CourseModuleSchema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true },
    moduleId: Number,
    title: { type: String, required: true },
    coursePart: { type: Types.ObjectId, ref: "course_parts" },
  },
  { timestamps: true }
)

export type CourseModuleDocument = CourseModule & Document

export default models.course_parts ||
  model<CourseModuleDocument>("course_modules", CourseModuleSchema)

import { Schema, Document, model, models, Types } from "mongoose"
import { Course } from "./course"

export interface CoursePart {
  _id: string
  partId?: number
  title: string
  summary: string
  industyLeader: {
    name: string
    image: string
  }
  course: Course
  position: number
}

const CoursePartSchema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true },
    partId: Number,
    title: { type: String, required: true },
    summary: String,
    industyLeader: {
      name: String,
      image: String,
    },
    course: { type: Types.ObjectId, ref: "courses" },
    position: Number,
  },
  { timestamps: true }
)

export type CoursePartDocument = CoursePart & Document

export default models.course_parts ||
  model<CoursePartDocument>("course_parts", CoursePartSchema)

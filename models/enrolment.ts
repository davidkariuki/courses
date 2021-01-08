import { Schema, Document, model, models, Types } from "mongoose"
import { Course } from "./course"
import { User } from "./user"

export interface Enrolment {
  _id: string
  userId?: number
  courseId?: number
  user: User
  course: Course
}

const EnrolmentSchema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true },
    courseId: { type: Number },
    userId: { type: Number },
    user: { type: Types.ObjectId, ref: "users", index: true },
    course: { type: Types.ObjectId, ref: "courses", index: true },
  },
  { timestamps: true }
)

export type EnrolmentDocument = Enrolment & Document

export default models.enrolments ||
  model<EnrolmentDocument>("enrolments", EnrolmentSchema)

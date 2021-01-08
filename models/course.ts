import { Schema, Document, model, models, Types } from "mongoose"

export interface Course {
  _id: string
  courseId?: number
  title: string
  slug: string
  headline: string
  summary: string
  images: {
    cover?: string
  }
  syllabusPdf?: string
}

const CourseSchema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true },
    courseId: { type: Number },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    headline: { type: String, required: true },
    summary: { type: String, required: true },
    images: {
      cover: String,
    },
    syllabusPdf: { type: String },
  },
  { timestamps: true }
)

export type CourseDocument = Course & Document

export default models.courses || model<CourseDocument>("courses", CourseSchema)

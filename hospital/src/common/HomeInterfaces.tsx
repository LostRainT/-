export interface CardProps {
    title: string
    image: string
    update: string
    lessonId: string
    videoDuration: number
  }

export interface LessonModel {
  id: string
  title: string
  imageUrl: string
  videoDuration: number
  updatedAt: string
}

export interface LessonDetailModel {
  id: string
  title: string
  imageUrl: string
  videoUrl: string
  videoDuration: number
  updatedAt: string
  info: string
}

export class SignInDesc {
  year: number
  month: number
  signDays: string[]
  constructor(year: number, month: number, days: string[]) {
    this.year = year
    this.month = month
    this.signDays =  days
  }
}
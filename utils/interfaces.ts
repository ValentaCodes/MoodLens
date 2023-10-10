export interface Entry {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  content: string
  analysis: {
    id: string
    createdAt: Date
    updatedAt: Date
    entryId: string
    mood: string
    summary: string
    color: string
    negative: boolean
    subject: string
    sentimentScore: number
  } | null
}
export interface Analysis {
  id: string
  createdAt: Date
  updatedAt: Date
  entryId: string
  mood: string
  summary: string
  color: string
  negative: boolean
  subject: string
  sentimentScore: number
  avg: number
}

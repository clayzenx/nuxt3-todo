declare interface TaskFields {
  header?: string
  description?: string
  startedAt?: Date,
  endedAt?: Date
  isComplete?: boolean
}

declare interface Task {
  id?: number,
  header: string
  description: string
  startedAt: Date,
  endedAt: Date
  isComplete: boolean
}


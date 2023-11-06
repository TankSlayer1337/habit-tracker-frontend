import { HabitDate } from "./habit-date";

export interface DoneHabitRequest {
  habitId: string,
  date: HabitDate
}
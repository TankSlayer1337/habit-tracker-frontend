import { ChartData } from "./chart-data"
import { HabitDate } from "./habit-date"

export interface HabitRecord {
  habitId: string,
  name: string,
  allTimeDoneDatesCount: number,
  startDate: HabitDate,
  endDate: HabitDate,
  doneDates: HabitDate[],
  chartData: ChartData
}
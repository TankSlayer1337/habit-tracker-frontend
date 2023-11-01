export class HabitDate {
  public year: number;
  public month: number;
  public day: number;
  public fullDate: string;

  constructor(date: Date) {
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1; // getMonth returns 0-11
    this.day = date.getDate();
    this.fullDate = this.assembleFullDate(this.year, this.month, this.day);
  }

  assembleFullDate(year: number, month: number, day: number): string {
    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');
    return `${year}-${paddedMonth}-${paddedDay}`;
  }
}
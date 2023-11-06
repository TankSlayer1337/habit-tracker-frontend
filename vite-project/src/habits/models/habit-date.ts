export class HabitDate {
  public year: number;
  public month: number;
  public day: number;

  constructor(date: Date) {
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1; // getMonth returns 0-11
    this.day = date.getDate();
  }

  public isEqualTo(date: HabitDate): Boolean {
    return (date.year === this.year && date.month === this.month && date.day === this.day);
  }

  public static areEqual(a: HabitDate, b: HabitDate): Boolean {
    return a.year === b.year && a.month === b.month && a.day === b.day;
  }
}
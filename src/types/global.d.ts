declare module "hebrew-date" {
  export class HebrewDate {
    constructor(date?: Date);
    getDate(): number;
    getMonth(): number;
    getFullYear(): number;
    getMonthName(): string;
    getDayName(): string;
    getDaysInMonth(): number;
    toString(): string;
  }
}

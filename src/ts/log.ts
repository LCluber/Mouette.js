import { LogContent, ConsoleMethod } from "./types";
import { Level } from "./interfaces";

// declare global {
//   interface console {
//     info:  Function;
//     trace: Function;
//     warn:  Function;
//     error: Function;
//   }
// }

export class Log {
  level: Level;
  message: LogContent;
  date: string;
  group: string;

  constructor(level: Level, content: LogContent, group: string) {
    this.level = level;
    this.message = content;
    this.date = Log.formatDate();
    this.group = group;
  }

  public display(): void {
    const levelName = (this.level.name === 'time' ? 'info' : this.level.name) as ConsoleMethod;
    console[levelName](
      `%c[${this.group}] ${this.date} : `,
      `color: ${this.level.color};`,
      this.message
    );
  }

  // public toString(groupName: string): string {
  //   return `${this.name}[${groupName}] ${this.date} : ${JSON.stringify(this.message)}`;
  // }

  public export(): Pick<Log,'level' | 'message' | 'date' | 'group'> {
    return {
      level: this.level,
      message: this.message,
      date: this.date,
      group: this.group
    }
  }

  private static addZero(value: number): string | number {
    return value < 10 ? "0" + value : value;
  }

  private static formatDate(): string {
    // Create a date object with the current time
    const now: Date = new Date();
    // Create an array with the current month, day and time
    const date: (number | string)[] = [
      Log.addZero(now.getMonth() + 1),
      Log.addZero(now.getDate()),
      now
        .getFullYear()
        .toString()
        .substr(-2)
    ];
    // Create an array with the current hour, minute and second
    const time: (number | string)[] = [
      Log.addZero(now.getHours()),
      Log.addZero(now.getMinutes()),
      Log.addZero(now.getSeconds())
    ];
    // Determine AM or PM suffix based on the hour
    //let t0 = time[0];
    //let suffix:string = ( t0 < 12 ) ? "AM" : "PM";
    // Convert hour from military time
    //t0 = ( t0 < 12 ) ? t0 : <number>t0 - 12;
    // If hour is 0, set it to 12
    //t0 = t0 || 12;
    // Return the formatted string
    return `${date.join("/")} ${time.join(":")}`;
  }
}

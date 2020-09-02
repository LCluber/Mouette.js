import { LevelName, LogContent, ConsoleMethod } from "./types";
import { Level } from "./interfaces";

// declare global {
//   interface console {
//     info:  Function;
//     trace: Function;
//     warn:  Function;
//     error: Function;
//   }
// }

export class Log implements Level {
  id: number;
  name: LevelName;
  color: string | null;
  content: LogContent;
  date: string;

  constructor(level: Level, content: LogContent) {
    this.id = level.id;
    this.name = level.name;
    this.color = level.color;
    this.content = content;
    this.date = Log.formatDate();
  }

  public display(groupName: string): void {
    let name = this.name === "time" ? "info" : this.name;
    console[<ConsoleMethod>name](
      "%c[" + groupName + "] " + this.date + " : ",
      "color:" + this.color + ";",
      this.content
    );
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
    return date.join("/") + " " + time.join(":") /*+ " " + suffix*/;
  }
}

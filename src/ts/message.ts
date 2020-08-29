import { LevelName, MessageContent, ConsoleMethod } from "./types";
import { Level } from "./interfaces";

declare global {
  interface console {
    info: Function;
    trace: Function;
    warn: Function;
    error: Function;
  }
}

export class Message implements Level {
  id: number;
  name: LevelName;
  color: string | null;
  content: MessageContent;
  date: string;

  constructor(level: Level, content: MessageContent) {
    this.id = level.id;
    this.name = level.name;
    this.color = level.color;
    this.content = content;
    this.date = Message.formatDate();
  }

  public display(groupName: string): void {
    console[<ConsoleMethod>this.name](
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
      Message.addZero(now.getMonth() + 1),
      Message.addZero(now.getDate()),
      now
        .getFullYear()
        .toString()
        .substr(-2)
    ];
    // Create an array with the current hour, minute and second
    const time: (number | string)[] = [
      Message.addZero(now.getHours()),
      Message.addZero(now.getMinutes()),
      Message.addZero(now.getSeconds())
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

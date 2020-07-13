import { LevelName, MessageContent, ConsoleMethod } from "./types";
import { Level } from "./interfaces";
import { formatDate } from "./date";

// declare global {
//   interface console {
//     info:  Function;
//     trace: Function;
//     warn:  Function;
//     error: Function;
//   }
// }l

export class Log implements Level {
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
    this.date = formatDate();
  }

  public display(groupName: string): void {
    let name = this.name === "time" ? "info" : this.name;
    console[<ConsoleMethod>name](
      "%c[" + groupName + "] " + this.date + " : ",
      "color:" + this.color + ";",
      this.content
    );
  }
}

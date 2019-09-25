import { LevelName, MessageContent, ConsoleMethod } from "./types";
import { Level } from "./interfaces";
import { formatDate } from "./date";

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
  //html: string;

  constructor(level: Level, content: MessageContent) {
    this.id = level.id;
    this.name = level.name;
    this.color = level.color;
    this.content = content;
    this.date = formatDate();
  }

  public display(groupName: string): void {
    console[<ConsoleMethod>this.name](
      "%c[" + groupName + "] " + this.date + " : ",
      "color:" + this.color + ";",
      this.content
    );
  }
}

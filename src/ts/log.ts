import { LevelName, MessageContent } from "./types";
import { Level } from "./interfaces";
import { formatDate } from "./date";

declare global {
  interface Console {
    [key: string]: Function;
  }
}

export class Log implements Level {
  id: number;
  name: LevelName;
  color: string | null;
  content: MessageContent;
  date: string;
  //html: string;

  constructor(level: Level, content: MessageContent) {
    this.id = level.id;
    this.name = level.name;
    // this.label = label || null;
    this.color = level.color;
    this.content = content;
    this.date = formatDate();
  }

  public display(groupName: string): void {
    let name = this.name;
    if (name === "time") {
      name = "info";
    }
    console[name](
      "%c[" + groupName + "] " + this.date + " : ",
      "color:" + this.color + ";",
      this.content
    );
  }
}

import { LevelName, MessageContent } from "./types";
import { Level } from "./interfaces";
import { LEVELS } from "./levels";
import { Message } from "./message";

export class Group {
  private level: Level;
  public name: string;
  public messages: Message[] = [];

  constructor(name: string, level: Level) {
    this.name = name;
    this.messages = [];
    this.level = level;
    //this.html = '<span class="' + this.level.name + '">' + this.content + '</span><br>'
  }

  public setLevel(name: LevelName): LevelName {
    this.level = LEVELS.hasOwnProperty(name) ? LEVELS[name] : this.level;
    return this.getLevel();
  }

  public getLevel(): LevelName {
    return this.level.name;
  }

  public info(message: MessageContent): void {
    this.log(LEVELS.info, message);
  }

  public trace(message: MessageContent): void {
    this.log(LEVELS.trace, message);
  }

  // public time(message: MessageContent): void {
  //   Logger.log(LEVELS.time, message, group);
  // }

  public warn(message: MessageContent): void {
    this.log(LEVELS.warn, message);
  }

  public error(message: MessageContent): void {
    this.log(LEVELS.error, message);
  }

  private log(level: Level, messageContent: MessageContent): void {
    const message = new Message(level, messageContent);
    this.messages.push(message);
    if (this.level.id <= message.id) {
      message.display(this.name);
    }
  }
}

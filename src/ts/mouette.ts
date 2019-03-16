
import { Level }   from './interfaces';
import { LEVELS }  from './mock-levels';
import { Message } from './message';

export class Logger {

  static _level: Level = LEVELS.info;
  static messages: Array<Message> = [];
  static nbMessages: number = 0;
  // static target: HTMLElement|null = document.getElementById('Mouette');

  set level(name: string) {
    Logger._level = LEVELS.hasOwnProperty(name) ? LEVELS[name] : LEVELS.info;
  }

  get level(): string {
    return Logger._level.name;
  }

  public static info(text: string|number){
    Logger.log(LEVELS.info,<string>text);
  }

  public static trace(text: string|number){
    Logger.log(LEVELS.trace,<string>text);
  }

  // public static time(text: string|number){
  //   Logger.log(LEVELS.time,<string>text);
  // }

  public static warn(text: string|number){
    Logger.log(LEVELS.warn,<string>text);
  }

  public static error(text: string|number){
    Logger.log(LEVELS.error,<string>text);
  }

  private static log(level: Level, content: string|Array<any>|Object): void {
    let message = new Message(level, content);
    this.messages.push(message);
    this.nbMessages ++;
    if(this._level.id <= message.id) {
      //this.target.innerHTML += message.html;
      message.display();
    }
  }

}

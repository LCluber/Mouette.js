
import { LevelNames, MessageContent } from './types';
import { Level }                      from './interfaces';
import { LEVELS }                     from './levels';
import { Message }                    from './message';

export class Logger {

  static _level: Level = LEVELS.info;
  static messages: Message[] = [];
  static nbMessages: number = 0;
  // static target: HTMLElement|null = document.getElementById('Mouette');

  set level(name: LevelNames) {
    Logger._level = LEVELS.hasOwnProperty(name) ? LEVELS[name] : LEVELS.info;
  }

  get level(): LevelNames {
    return Logger._level.name;
  }

  public static info(message: MessageContent): void {
    Logger.log(LEVELS.info, message);
  }

  public static trace(message: MessageContent): void {
    Logger.log(LEVELS.trace, message);
  }

  // public static time(message: MessageContent): void {
  //   Logger.log(LEVELS.time, message);
  // }

  public static warn(message: MessageContent): void {
    Logger.log(LEVELS.warn, message);
  }

  public static error(message: MessageContent): void {
    Logger.log(LEVELS.error, message);
  }

  private static log(level: Level, messageContent: MessageContent): void {
    let message = new Message(level, messageContent);
    this.messages.push(message);
    this.nbMessages ++;
    if(this._level.id <= message.id) {
      //this.target.innerHTML += message.html;
      message.display();
    }
  }
}

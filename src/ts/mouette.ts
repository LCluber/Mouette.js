
import { Dom } from '@lcluber/weejs';
import { Level }  from './level';
import { LEVELS } from './mock-levels';
import { Message }  from './message';

export class Logger {

  static _level: Level = Logger.findLevel(LEVELS[0].name);
  static messages: Array<Message> = [];
  static nbMessages: number = 0;
  static target: HTMLElement = Dom.findById('Mouette');

  set level(name: string) {
    Logger._level = Logger.findLevel(name);
  }

  get level(): string {
    return Logger._level.name;
  }

  public static info(text: string|number){
    Logger.log('info',<string>text);
  }

  public static trace(text: string|number){
    Logger.log('trace',<string>text);
  }

  public static time(text: string|number){
    Logger.log('time',<string>text);
  }

  public static warn(text: string|number){
    Logger.log('warn',<string>text);
  }

  public static error(text: string|number){
    Logger.log('error',<string>text);
  }

  private static log(levelName: string, content: string|Array<any>|Object): void {
    Logger.addMessage(levelName, content);
    let message = this.messages[this.nbMessages-1];
    if(this._level.id <= message.getLevelId()) {
      //this.target.innerHTML += message.html;
      message.display();
    }
  }

  private static addMessage(levelName: string, content: string|Array<any>|Object): void {
    this.messages.push( new Message(levelName, content));
    this.nbMessages ++;
  }

  private static findLevel(name: string): Level {
    for (let level of LEVELS) {
      if(level.name === name) {
        return level;
      }
    }
    return this._level ? this._level : LEVELS[0];
  }

}

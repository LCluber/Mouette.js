
// import { Dom } from 'weejs';
import { Dom } from '../../node_modules/weejs/dist/wee';
import { Level }  from './level';
import { LEVELS } from './mock-levels';
import { Message }  from './message';

export class Logger {

  static _level: Level = Logger.findLevel(LEVELS[0].name);
  static messages: Array<Message> = [];
  static nbMessages: number = 0;
  static target: HTMLElement = Dom.findById('Mouette');

  // constructor(levelName: string ) {
  //   this.setLevel(levelName);
  //   this.messages = [];
  //   this.nbMessages = 0;
  //   this.target = this.findDOMElementById('Mouette');
  // }
  set level(name: string) {
    Logger._level = Logger.findLevel(name);
  }

  get level(): string {
    return Logger._level.name;
  }

  public static debug(text: string|number){
    Logger.log('debug',<string>text);
  }

  public static info(text: string|number){
    Logger.log('info',<string>text);
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

  private static log(levelName: string, text: string): void {
    Logger.addMessage(levelName, text);
    Logger.logMessage();
  }

  private static addMessage(levelName: string, text: string): void {
    this.messages.push( new Message(levelName, text));
    this.nbMessages ++;
  }

  private static logMessage(): void {
    let message = this.messages[this.nbMessages-1];
    if(this._level.id <= message.getLevelId()) {
      this.target.innerHTML += message.html;
      // console.log(this.level.name);
      // console.log(this.text);
      // console.debug(this.text);
      // console.info(this.text);
      // console.warn(this.text);
      // console.time();
      // console.timeEnd();
    }
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

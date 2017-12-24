
import { Level }  from './level';
import { LEVELS } from './mock-levels';
import { Message }  from './message';

export class Logger {
  
  level: Level;
  messages: Array<Message>;
  nbMessages: number;
  target: HTMLElement;

  constructor(levelName: string ) {
    this.setLevel(levelName);
    this.messages = [];
    this.nbMessages = 0;
    this.target = this.findDOMElementById('Mouette');
  }
  
  public setLevel(name: string): void {
    this.level = this.findLevel(name);
  }
  
  public getLevel(): Level {
    return this.level;
  }
  
  public debug(text: string){
    this.log('debug',text);
  }
  
  public info(text: string){
    this.log('info',text);
  }
  
  public time(text: string){
    this.log('time',text);
  }
  
  public warn(text: string){
    this.log('warn',text);
  }
  
  public error(text: string){
    this.log('error',text);
  }
  
  private log(levelName: string, text: string): void {
    this.addMessage(levelName, text);
    this.logMessage();
  }
  
  private addMessage(levelName: string, text: string) {
    this.messages.push( new Message(levelName, text));
    this.nbMessages ++;
  }
  
  private logMessage(){
    let message = this.messages[this.nbMessages-1];
    if(this.level.id <= message.getLevelId()) {
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
  
  private findLevel(name: string): Level {
    for (let level of LEVELS) {
      if(level.name === name) {
        return level;
      }
    }
    return this.level ? this.level : LEVELS[0];
  }
  
  private findDOMElementById(id: string): HTMLElement {
    return document.getElementById(id);
  }
  
}

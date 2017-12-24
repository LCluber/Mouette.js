
import { Level }  from './level';
import { LEVELS } from './mock-levels';

export class Message {
  
  level: Level;
  text: string;
  html: string;

  constructor(levelName: string, text: string) {
    this.setLevel(levelName);
    this.text  = text;
    this.html = '<span class="' + this.level.name + '">' + this.text + '</span><br>'
  }
  
  setLevel(name: string): void {
    this.level = this.findLevel(name);
  }
  
  getLevelId(): number {
    return this.level.id;
  }
  
  
  private findLevel(name: string): Level {
    for (let level of LEVELS) {
      if(level.name === name) {
        return level;
      }
    }
    return this.level ? this.level : LEVELS[0];
  }

}

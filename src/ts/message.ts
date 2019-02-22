
import { Level }  from './level';
import { LEVELS } from './mock-levels';

export class Message {

  level: Level;
  content: string|Array<any>|Object;
  //html: string;

  constructor(levelName: string, content: string|Array<any>|Object) {
    this.setLevel(levelName);
    this.content = content;
    //this.html = '<span class="' + this.level.name + '">' + this.content + '</span><br>'
  }

  setLevel(name: string): void {
    this.level = this.findLevel(name);
  }

  getLevelId(): number {
    return this.level.id;
  }

  // getLevelName(): string {
  //   return this.level.name;
  // }

  display(): void {
    console[this.level.name]('%c'+this.content, 'color:'+this.level.color+';');
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

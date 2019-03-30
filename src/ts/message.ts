
import { Level }  from './level';

export class Message {

  level: Level;
  content: string|Array<any>|Object;
  //html: string;

  constructor(level: Level, content: string|Array<any>|Object) {
    this.level = level;
    this.content = content;
    //this.html = '<span class="' + this.level.name + '">' + this.content + '</span><br>'
  }

  getLevelId(): number {
    return this.level.id;
  }

  display(): void {
    console[this.level.name]('%c'+this.content, 'color:'+this.level.color+';');
  }

}

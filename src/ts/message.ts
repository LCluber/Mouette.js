
import { Level }  from './interfaces';

declare global {
  interface Console {
    [key: string]: Function
  }
}

export class Message implements Level {
  id: number;
  name: string;
  color: string|null;
  content: string|Array<any>|Object;
  //html: string;

  constructor(level: Level, content: string|Array<any>|Object) {
    this.id = level.id;
    this.name = level.name;
    this.color = level.color
    this.content = content;
    //this.html = '<span class="' + this.level.name + '">' + this.content + '</span><br>'
  }

  public display(): void {
    console[this.name]('%c'+this.content, 'color:'+this.color+';');
  }

}

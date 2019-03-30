import { LevelNames, MessageContent } from './types';
import { Level }  from './interfaces';

declare global {
  interface Console {
    [key: string]: Function
  }
}

export class Message implements Level {
  id: number;
  name: LevelNames;
  color: string|null;
  content: MessageContent;
  //html: string;

  constructor(level: Level, content: MessageContent) {
    this.id = level.id;
    this.name = level.name;
    this.color = level.color;
    this.content = content;
    //this.html = '<span class="' + this.level.name + '">' + this.content + '</span><br>'
  }

  public display(): void {
    console[<string>this.name]('%c'+this.content, 'color:'+this.color+';');
  }

}

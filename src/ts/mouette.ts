
import { LevelNames } from './types';
import { Level }      from './interfaces';
import { LEVELS }     from './levels';
import { Group }      from './group';

export class Logger {

  private static level: Level = LEVELS.info;
  private static groups: Group[] = [];

  public static setLevel(name: LevelNames): void {
    Logger.level = LEVELS.hasOwnProperty(name) ? LEVELS[name] : Logger.level;
    for (let group of Logger.groups) {
      group.level = Logger.level.name;
    }
  }

  public static getLevel(): LevelNames {
    return Logger.level.name;
  }

  public static getGroup(name: string): Group|null {
    for (let group of Logger.groups) {
      if(group.name === name){
        return group;
      }
    }
    return null;
  }

  public static addGroup(name: string): Group {
    let group = new Group(name)
    Logger.groups.push(group);
    return group;
  }

}

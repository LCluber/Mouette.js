import { LevelName } from "./types";
import { Level } from "./interfaces";
import { LEVELS } from "./levels";
import { Group } from "./group";

export class Logger {
  private static level: Level = LEVELS.error;
  private static groups: Group[] = [];

  public static setLevel(name: LevelName): LevelName {
    Logger.level = LEVELS.hasOwnProperty(name) ? LEVELS[name] : Logger.level;
    for (const group of Logger.groups) {
      group.setLevel(Logger.level.name);
    }
    return Logger.getLevel();
  }

  public static getLevel(): LevelName {
    return Logger.level.name;
  }

  public static getGroup(name: string): Group | null {
    for (const group of Logger.groups) {
      if (group.name === name) {
        return group;
      }
    }
    return null;
  }

  public static addGroup(name: string): Group {
    return this.getGroup(name) || this.pushGroup(name);
  }

  private static pushGroup(name: string): Group {
    const group = new Group(name, Logger.level);
    Logger.groups.push(group);
    return group;
  }
}

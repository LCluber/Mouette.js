import { HTTP, ResponseDataType, HTTPHeaders } from "@lcluber/aiasjs";
import { LevelName } from "./types";
import { Options } from "./options";
import { Group } from "./group";

export class Logger {
  private static groups: Group[] = [];
  private static options: Options = new Options();

  public static setLevel(name: LevelName): LevelName {
    this.options.level = name;
    for (const group of this.groups) {
      group.setLevel(this.options.level);
    }
    return this.getLevel();
  }

  public static getLevel(): LevelName {
    return this.options.level;
  }

  // public static setMaxLength(length: number): number {
  //   this.options.maxLength = length;
  //   return this.options.maxLength;
  // }

  // public static getMaxLength(): number {
  //   return this.options.maxLength;
  // }

  public static displayConsole(value: boolean): boolean {
    this.options.console = value;
    for (const group of this.groups) {
      group.displayConsole(this.options.console);
    }
    return this.options.console;
  }

  public static addGroup(name: string): Group {
    return this.getGroup(name) || this.createGroup(name);
  }

  public static sendLogs(url: string, headers?: HTTPHeaders): Promise<any> {
    let logs = [];
    if (headers) {
      HTTP.setHeaders("POST", headers);
    }
    for (const group of this.groups) {
      logs.push(...group.logs);
    }
    return (HTTP.post(url, "json", logs) as Promise<ResponseDataType>)
      .then(response => {
        // if(response.success) {
        for (const group of this.groups) {
          group.initLogs();
        }
        // }
        return response;
      })
      .catch(err => {
        console.log("error", err);
        return err;
      });
  }

  private static getGroup(name: string): Group | null {
    for (const group of this.groups) {
      if (group.name === name) {
        return group;
      }
    }
    return null;
  }

  private static createGroup(name: string): Group {
    const group = new Group(name, this.options);
    this.groups.push(group);
    return group;
  }
}

import { LevelName } from "./types";
import { Options } from "./options";
import { Group } from "./group";
import { Log } from "./log";

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

  public static sendLogs(url: string, headers: Headers = new Headers()): Promise<any> | null {
    const logs = this.getLogs();
    if (logs.length) {
      headers.append('Content-Type', 'application/json');
      const params = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(logs)
      }
      return fetch(url, params)
              .then(response => response.json())
              .then((data) => {
                // console.log('Success:', data);
                this.resetLogs();
                return data;
              })
              .catch((error) => {
                console.error('Error:', error);
              });
    }
    return null;
  }

  public static getLogs(): Pick<Log, 'level' | 'message' | 'date' | 'group'>[] {
    let logs = [];
    for (const group of this.groups) {
      logs.push(...group.getLogs());
    }
    return logs;
  }

  public static resetLogs(): void {
    for (const group of this.groups) {
      group.resetLogs();
    }
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

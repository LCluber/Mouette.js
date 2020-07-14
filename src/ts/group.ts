import { LevelName, LogContent } from "./types";
import { Options } from "./options";
import { Level } from "./interfaces";
import { LEVELS } from "./levels";
import { Log } from "./log";
import { Timer } from "./timer";

export class Group {
  public name: string;
  public logs: Log[];
  private timers: Timer[];
  public options: Options;

  constructor(name: string, options: Options) {
    this.name = name;
    this.logs = [];
    this.timers = [];
    this.options = new Options(
      options.level,
      options.console,
      options.maxLength
    );
  }

  public setLevel(name: LevelName): LevelName {
    this.options.level = name;
    return this.options.level;
  }

  public getLevel(): LevelName {
    return this.options.level;
  }

  public displayConsole(value: boolean): boolean {
    this.options.console = value;
    return this.options.console;
  }

  public setMaxLength(length: number): number {
    this.options.maxLength = length;
    return this.options.maxLength;
  }

  public getMaxLength(): number {
    return this.options.maxLength;
  }

  public info(log: LogContent): void {
    this.log(LEVELS.info, log);
  }

  public trace(log: LogContent): void {
    this.log(LEVELS.trace, log);
  }

  public time(key: string | number): void {
    let index = this.timers.findIndex(element => element.key === key);
    if (index > -1) {
      // trigger TimeEnd
      let newTimestamp = new Date().getTime();
      let delta = newTimestamp - this.timers[index].timestamp;
      this.log(LEVELS.time, key + " completed in " + delta + " ms");
      this.timers.splice(index, 1);
    } else {
      this.addTimer(key);
      this.log(LEVELS.time, key + " started");
    }
  }

  public warn(log: LogContent): void {
    this.log(LEVELS.warn, log);
  }

  public error(log: LogContent): void {
    this.log(LEVELS.error, log);
  }

  public initLogs() {
    this.logs = [];
  }

  private log(level: Level, log: LogContent): void {
    const message = new Log(level, log);
    if (this.options.displayMessage(message.id)) {
      this.addLog(message);
      message.display(this.name);
    }
  }

  private addLog(message: Log): void {
    if (this.logs.length >= this.options.maxLength) {
      this.logs.shift();
    }
    this.logs.push(message);
  }

  private addTimer(key: string | number): void {
    if (this.timers.length >= this.options.maxLength) {
      this.timers.shift();
    }
    this.timers.push(new Timer(key));
  }
}

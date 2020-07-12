import { isBoolean } from "@lcluber/chjs";
import { LevelName } from "./types";
import { LEVELS } from "./levels";
import { Level } from "./interfaces";

export class Options {
  private _logLevel: Level;
  private _console: boolean;
  private _maxLength: number;

  constructor(levelName?: LevelName, console?: boolean, maxLength?: number) {
    this._logLevel = LEVELS.error;
    this._console = true;
    this._maxLength = 200;
    this.logLevel = levelName ? levelName : "error";
    this.console = isBoolean(console) ? (console as boolean) : this.console;
    this.maxLength = maxLength ? maxLength : this.maxLength;
  }

  set logLevel(name: LevelName) {
    this._logLevel = LEVELS.hasOwnProperty(name)
      ? LEVELS[name]
      : this._logLevel;
  }

  get logLevel(): LevelName {
    return this._logLevel.name;
  }

  set console(display: boolean) {
    this._console = display ? true : false;
  }

  get console(): boolean {
    return this._console;
  }

  set maxLength(length: number) {
    this._maxLength = length > 50 ? length : 50;
  }

  get maxLength(): number {
    return this._maxLength;
  }

  public displayMessage(messageId: number): boolean {
    return this._console && this._logLevel.id <= messageId;
  }
}

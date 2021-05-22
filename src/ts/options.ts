import { isBoolean } from "@lcluber/chjs";
import { LevelName } from "./types";
import { LEVELS } from "./levels";

export class Options {
  private _level: LevelName;
  private _console: boolean;
  private _maxLength: number;

  constructor(levelName?: LevelName, console?: boolean, maxLength?: number) {
    this._level = "error";
    this._console = true;
    this._maxLength = 400;
    this.level = levelName ? levelName : this._level;
    this.console = isBoolean(console) ? (console as boolean) : this._console;
    this.maxLength = maxLength ? maxLength : this.maxLength;
  }

  set level(name: LevelName) {
    this._level = LEVELS.hasOwnProperty(name) ? name : this._level;
  }

  get level(): LevelName {
    return this._level;
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

  public displayMessage(): boolean {
    return this._console;
  }

  public checkLevel(messageId: number): boolean {
    return LEVELS[this._level].id <= messageId;
  }
}

/** MIT License
* 
* Copyright (c) 2015 Ludovic CLUBER 
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
* http://mouettejs.lcluber.com
*/
export declare function formatDate(): string;



export declare class Group {
    name: string;
    logs: Log[];
    private timers;
    options: Options;
    constructor(name: string, level: LevelName);
    setLevel(name: LevelName): LevelName;
    getLevel(): LevelName;
    info(log: MessageContent): void;
    trace(log: MessageContent): void;
    time(key: string | number): void;
    warn(log: MessageContent): void;
    error(log: MessageContent): void;
    initLogs(): void;
    private log;
    private addLog;
    private addTimer;
}

export interface Level {
    id: number;
    name: LevelName;
    color: string | null;
}
export interface Levels {
    info: Level;
    time: Level;
    trace: Level;
    warn: Level;
    error: Level;
    off: Level;
}

export declare const LEVELS: Levels;


declare global {
    interface Console {
        [key: string]: Function;
    }
}
export declare class Log implements Level {
    id: number;
    name: LevelName;
    color: string | null;
    content: MessageContent;
    date: string;
    constructor(level: Level, content: MessageContent);
    display(groupName: string): void;
}
import { HTTPHeaders } from "@lcluber/aiasjs";


export declare class Logger {
    private static groups;
    private static options;
    static setLevel(name: LevelName): LevelName;
    static getLevel(): LevelName;
    static getGroup(name: string): Group | null;
    static addGroup(name: string): Group;
    static sendLogs(url: string, headers?: HTTPHeaders): Promise<any>;
    private static createGroup;
}

export declare class Options {
    private _logLevel;
    private _displayConsole;
    private _maxLength;
    constructor(levelName?: LevelName, displayConsole?: boolean, maxLength?: number);
    set logLevel(name: LevelName);
    get logLevel(): LevelName;
    set displayConsole(display: boolean);
    get displayConsole(): boolean;
    set maxLength(length: number);
    get maxLength(): number;
    displayMessage(messageId: number): boolean;
}
export declare class Timer {
    key: string | number;
    timestamp: number;
    constructor(key: string | number);
}
export declare type LevelName = "info" | "time" | "trace" | "warn" | "error" | "off";
export declare type MessageContent = string | number | any[] | Object;

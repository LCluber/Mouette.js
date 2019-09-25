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
    private level;
    name: string;
    messages: Message[];
    constructor(name: string, level: Level);
    setLevel(name: LevelName): LevelName;
    getLevel(): LevelName;
    info(message: MessageContent): void;
    trace(message: MessageContent): void;
    warn(message: MessageContent): void;
    error(message: MessageContent): void;
    private log;
}

export interface Level {
    id: number;
    name: LevelName;
    color: string | null;
}
export interface Levels {
    info: Level;
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
export declare class Message implements Level {
    id: number;
    name: LevelName;
    color: string | null;
    content: MessageContent;
    date: string;
    constructor(level: Level, content: MessageContent);
    display(groupName: string): void;
}


export declare class Logger {
    private static level;
    private static groups;
    static setLevel(name: LevelName): LevelName;
    static getLevel(): LevelName;
    static getGroup(name: string): Group | null;
    static addGroup(name: string): Group;
    private static pushGroup;
}
export declare type LevelName = "info" | "trace" | "warn" | "error" | "off";
export declare type MessageContent = string | number | any[] | Object;

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
export interface Level {
    id: number;
    name: string;
    color: string | null;
}
export interface Levels {
    info: Level;
    trace: Level;
    warn: Level;
    error: Level;
    off: Level;
    [key: string]: Level;
}

declare global {
    interface Console {
        [key: string]: Function;
    }
}
export declare class Message implements Level {
    id: number;
    name: string;
    color: string | null;
    content: string | Array<any> | Object;
    constructor(level: Level, content: string | Array<any> | Object);
    display(): void;
}

export declare const LEVELS: Levels;


export declare class Logger {
    static _level: Level;
    static messages: Array<Message>;
    static nbMessages: number;
    level: string;
    static info(text: string | number): void;
    static trace(text: string | number): void;
    static warn(text: string | number): void;
    static error(text: string | number): void;
    private static log;
}

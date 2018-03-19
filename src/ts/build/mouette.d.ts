import { Level } from './level';
import { Message } from './message';
export declare class Logger {
    static _level: Level;
    static messages: Array<Message>;
    static nbMessages: number;
    static target: HTMLElement;
    level: string;
    static debug(text: string | number): void;
    static info(text: string | number): void;
    static time(text: string | number): void;
    static warn(text: string | number): void;
    static error(text: string | number): void;
    private static log(levelName, text);
    private static addMessage(levelName, text);
    private static logMessage();
    private static findLevel(name);
    private static findDOMElementById(id);
}

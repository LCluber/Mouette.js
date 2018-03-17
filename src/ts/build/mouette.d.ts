import { Level } from './level';
import { Message } from './message';
export declare class Logger {
    static _level: Level;
    static messages: Array<Message>;
    static nbMessages: number;
    static target: HTMLElement;
    level: string;
    static debug(text: string): void;
    static info(text: string): void;
    static time(text: string): void;
    static warn(text: string): void;
    static error(text: string): void;
    private static log(levelName, text);
    private static addMessage(levelName, text);
    private static logMessage();
    private static findLevel(name);
    private static findDOMElementById(id);
}

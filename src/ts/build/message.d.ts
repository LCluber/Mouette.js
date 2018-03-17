import { Level } from './level';
export declare class Message {
    level: Level;
    text: string;
    html: string;
    constructor(levelName: string, text: string);
    setLevel(name: string): void;
    getLevelId(): number;
    private findLevel(name);
}

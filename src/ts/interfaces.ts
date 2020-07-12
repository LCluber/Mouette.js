import { LevelName } from "./types";

export interface Level {
  id: number;
  name: LevelName;
  color: string | null;
}

export interface Levels {
  info: Level;
  time: Level;
  // timeEnd: Level;
  trace: Level;
  warn: Level;
  error: Level;
  off: Level;
}

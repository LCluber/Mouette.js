
export interface Level {
  id: number;
  name: string;
  color: string|null;
}

export interface Levels {
  info : Level,
  trace : Level,
  warn : Level,
  error : Level,
  off : Level,
  [key: string]: Level
}

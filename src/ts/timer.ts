export class Timer {
  key: string | number;
  timestamp: number;

  constructor(key: string | number) {
    this.key = key;
    this.timestamp = new Date().getTime();
  }
}

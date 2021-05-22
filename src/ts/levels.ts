import { Levels } from "./interfaces";

export const LEVELS: Levels = {
  info:   { id: 1,  name: "info",   color: "#28a745" },
  time:   { id: 2,  name: "time",   color: "#28a745", time: null },
  trace:  { id: 3,  name: "trace",  color: "#17a2b8" },
  warn:   { id: 4,  name: "warn",   color: "#ffc107" },
  error:  { id: 5,  name: "error",  color: "#dc3545" },
  off:    { id: 99, name: "off",    color: null }
};

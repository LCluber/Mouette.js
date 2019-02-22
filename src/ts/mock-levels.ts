import { Level } from './level';

export const LEVELS: Level[] = [
  { id:  1, name: 'info',  color: '#28a745' },
  { id:  2, name: 'trace', color: '#17a2b8' },
  { id:  3, name: 'warn',  color: '#ffc107' },
  { id:  4, name: 'error', color: '#dc3545' },
  { id: 99, name: 'off',   color:  null}
];

// console.info();
// console.trace();
// console.warn();
// console.error();
// console.time();
// console.timeEnd();

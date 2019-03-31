import { Levels } from './interfaces';

export const LEVELS: Levels = {
  info :  { id:  1, name:'info',  color: '#28a745' },
  trace : { id:  2, name:'trace', color: '#17a2b8' },
  warn :  { id:  3, name:'warn',  color: '#ffc107' },
  error : { id:  4, name:'error', color: '#dc3545' },
  off :   { id: 99, name:'off',   color:  null }
};

// console.info();
// console.trace();
// console.warn();
// console.error();
// console.time();
// console.timeEnd();
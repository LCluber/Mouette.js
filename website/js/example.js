
Mouette.Logger.prototype.level = 'info';

Mouette.Logger.info(window);

function traceExample(){
  Mouette.Logger.trace(window);
}
traceExample();
// Mouette.Logger.time('This is a time log');

function warnExample(){
  Mouette.Logger.warn(window);
}
warnExample();

function errorExample(){
  Mouette.Logger.error(window);
}
errorExample();

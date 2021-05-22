
Mouette.Logger.setLevel("error");
Mouette.Logger.displayConsole(true);

var string = 'test';
var number = 2345;
var array  = [1,2,3,4];
var object = {
  string: 'test',
  number: 2345,
  array: [1,2,3,4],
  object: {yo: 'yo', ye: 'ye'}
};

var newLogsGroup = Mouette.Logger.addGroup("newLogsGroup");

newLogsGroup.setLevel("info");
newLogsGroup.displayConsole(true);

newLogsGroup.info(string);
newLogsGroup.trace(number);
newLogsGroup.warn(array);
newLogsGroup.error(object);

newLogsGroup.time("timing log");
for (i = 0; i < 100000; i++) {
  // some code
}
newLogsGroup.time("timing log");

console.log('newLogsGroup', newLogsGroup);

var logs = Mouette.Logger.getLogs();

console.log('logs', logs);

// Mouette.Logger.resetLogs();

// console.log(Mouette.Logger.getLogs());

var sendLogs = Mouette.Logger.sendLogs('http://httpbin.org/post');
sendLogs.then((data) => {
  console.log(data);
  console.log(Mouette.Logger.getLogs());
});
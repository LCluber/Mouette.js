Mouette.Logger.setLevel("error");
Mouette.Logger.displayConsole(true);

var newLogsGroup = Mouette.Logger.addGroup("newLogsGroup");

newLogsGroup.setLevel("info");
newLogsGroup.displayConsole(true);

newLogsGroup.info(window);
newLogsGroup.trace(window);
newLogsGroup.warn(window);
newLogsGroup.error(window);

newLogsGroup.time("timing log");
for (i = 0; i < 100000; i++) {
  // some code
}
newLogsGroup.time("timing log");

console.log(newLogsGroup);

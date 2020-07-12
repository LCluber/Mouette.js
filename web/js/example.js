Mouette.Logger.setLevel("info");
var newLogsGroup = Mouette.Logger.addGroup("newLogsGroup");

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

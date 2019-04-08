
Mouette.Logger.setLevel('info');
var newLogsGroup = Mouette.Logger.addGroup('newLogsGroup');

newLogsGroup.info(window);
newLogsGroup.trace(window);
newLogsGroup.warn(window);
newLogsGroup.error(window);

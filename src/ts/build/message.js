import { LEVELS } from './mock-levels';
var Message = (function () {
    function Message(levelName, text) {
        this.setLevel(levelName);
        this.text = text;
        this.html = '<span class="' + this.level.name + '">' + this.text + '</span><br>';
    }
    Message.prototype.setLevel = function (name) {
        this.level = this.findLevel(name);
    };
    Message.prototype.getLevelId = function () {
        return this.level.id;
    };
    Message.prototype.findLevel = function (name) {
        for (var _i = 0, LEVELS_1 = LEVELS; _i < LEVELS_1.length; _i++) {
            var level = LEVELS_1[_i];
            if (level.name === name) {
                return level;
            }
        }
        return this.level ? this.level : LEVELS[0];
    };
    return Message;
}());
export { Message };
//# sourceMappingURL=message.js.map
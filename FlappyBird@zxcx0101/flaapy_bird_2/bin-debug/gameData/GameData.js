var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    //从config文件中读取数据
    /**
     * 存放配置文件中读取的障碍物数据
     */
    GameData.elements = [];
    /**
     * 障碍物产生的轮数
     */
    GameData.rounds = 0;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map
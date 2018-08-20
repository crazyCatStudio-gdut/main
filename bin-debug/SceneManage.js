var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SceneManage = (function (_super) {
    __extends(SceneManage, _super);
    function SceneManage() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    SceneManage.prototype.init = function () {
        // 实例化5个场景
        this.login = new Login();
        this.register = new Register();
        this.beginScene = new BeginScene();
        this.gameScene = new GameScene();
        this.scrollerScene = new ScrollerScene();
        // 默认添加登录场景
        this.addChild(this.login);
    };
    // 实例化单例获取方法
    SceneManage.getInstance = function () {
        if (!SceneManage.instance) {
            SceneManage.instance = new SceneManage();
        }
        return SceneManage.instance;
    };
    // 切换场景
    SceneManage.prototype.changeScene = function (type) {
        // 释放资源
        if (type == 'gameScene') {
            this.beginScene.release();
        }
        // 移除所有显示列表中的对象
        this.removeChildren();
        // 添加下一个场景和对应的侦听事件
        this.addChild(this[type]);
        this[type].init();
    };
    SceneManage.prototype.addScene = function (type) {
        this.addChild(this[type]);
    };
    return SceneManage;
}(egret.Sprite));
__reflect(SceneManage.prototype, "SceneManage");
//# sourceMappingURL=SceneManage.js.map
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
var OverScene = (function (_super) {
    __extends(OverScene, _super);
    function OverScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        return _this;
    }
    OverScene.prototype.initView = function () {
        var hand = createBitmapByName("hand_png");
        hand.anchorOffsetX = hand.width / 2;
        hand.anchorOffsetY = hand.height / 2;
        hand.x = this.stage.stageWidth / 2;
        hand.y = this.stage.stageHeight / 2;
        this.addChild(hand);
        var startText = new egret.TextField();
        startText.text = "点击重新游戏";
        startText.size = 100;
        startText.stroke = 8;
        startText.strokeColor = 0x000000;
        startText.anchorOffsetX = startText.width / 2;
        startText.anchorOffsetY = startText.height / 2;
        startText.x = this.stage.stageWidth / 2;
        startText.y = this.stage.stageHeight * 2 / 3;
        this.addChild(startText);
        var menuButton = GameUtil.createButton("菜单");
        menuButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("菜单");
            //游戏初始化 重新打开 开始场景
            SceneController.initGame();
        }, this);
        menuButton.x = this.stage.stageWidth / 2;
        menuButton.y = this.stage.stageHeight / 5;
        this.addChild(menuButton);
        var shareButton = GameUtil.createButton("分享");
        shareButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("分享");
        }, this);
        shareButton.x = this.stage.stageWidth / 2;
        shareButton.y = this.stage.stageHeight * 2 / 5;
        this.addChild(shareButton);
    };
    return OverScene;
}(egret.DisplayObjectContainer));
__reflect(OverScene.prototype, "OverScene");
//# sourceMappingURL=OverScene.js.map
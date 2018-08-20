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
var BeginScene = (function (_super) {
    __extends(BeginScene, _super);
    function BeginScene() {
        var _this = _super.call(this) || this;
        _this.beginCoin = 30;
        return _this;
    }
    BeginScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BeginScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // 页面加载完毕后，调用自定义的初始化方法
        this.init();
        this.iconVoice.play(0, 1);
    };
    // 初始化(给按钮绑定点击事件)
    BeginScene.prototype.init = function () {
        this.beginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        this.rank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toRank, this);
        this.mySkin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toChangeSkin, this);
        this.i.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeSkin, this);
        this.lufei.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeSkin2, this);
        this.lock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toUnlock, this);
        this.home.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backhome, this);
        this.jiesuo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeLock, this);
        this.bujiesuo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.abandon, this);
        //pattern
        this.amusement.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toRulePanel, this);
        this.yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toChangePattern, this);
        this.no.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backhome, this);
        this.beginCoin = SceneManage.getInstance().gameScene.currentCoin;
        this.coin.text = this.beginCoin.toString();
        SceneManage.getInstance().gameScene.jiluScore = 0;
        this.startVoice = RES.getRes('start_mp3');
        this.iconVoice = RES.getRes('icon_mp3');
        if (this.beginCoin < 5) {
            this.yes.touchEnabled = false;
        }
    };
    BeginScene.prototype.tapHandler = function () {
        // 切换场景
        SceneManage.getInstance().changeScene('gameScene');
        //添加开始音频
        this.startVoice.play(0, 1);
    };
    //查看排行榜
    BeginScene.prototype.toRank = function () {
        this.scollBtn.visible = false;
        this.beginBtn.visible = false;
        SceneManage.getInstance().addScene('scrollerScene');
    };
    //pattern
    BeginScene.prototype.toChangePattern = function () {
        SceneManage.getInstance().addScene('gameScene');
        this.rulePanel.visible = false;
        SceneManage.getInstance().gameScene.amuse();
        this.type = 1;
        this.startVoice.play(0, 1);
    };
    BeginScene.prototype.toRulePanel = function () {
        this.rulePanel.visible = true;
    };
    //更换皮肤页面
    BeginScene.prototype.toUnlock = function () {
        this.tipPanel.visible = true;
    };
    BeginScene.prototype.toChangeSkin = function () {
        this.skinPanel.visible = true;
    };
    //选择皮肤
    BeginScene.prototype.changeSkin = function () {
        this.lufei.selected = false;
        this.skinNumber = 0;
    };
    BeginScene.prototype.changeSkin2 = function () {
        this.i.selected = false;
        this.skinNumber = 1;
    };
    BeginScene.prototype.abandon = function () {
        this.tipPanel.visible = false;
    };
    BeginScene.prototype.backhome = function () {
        this.skinPanel.visible = false;
        this.rulePanel.visible = false;
    };
    BeginScene.prototype.removeLock = function () {
        this.tipPanel.visible = false;
        this.lockRect.visible = false;
        this.lock.visible = false;
        this.beginCoin -= 10;
        this.lufei.selected = true;
        this.skinNumber = 1;
        this.coin.text = this.beginCoin.toString();
        SceneManage.getInstance().gameScene.currentCoin -= 10;
        SceneManage.getInstance().gameScene.gamecoin.text = SceneManage.getInstance().gameScene.currentCoin.toString();
    };
    // 移除事件
    BeginScene.prototype.release = function () {
        if (this.beginBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.beginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        }
        if (this.yes.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.yes.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toChangePattern, this);
        }
    };
    return BeginScene;
}(eui.Component));
__reflect(BeginScene.prototype, "BeginScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=BeginScene.js.map
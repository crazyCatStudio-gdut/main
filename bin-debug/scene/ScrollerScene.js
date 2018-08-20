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
var ScrollerScene = (function (_super) {
    __extends(ScrollerScene, _super);
    function ScrollerScene() {
        return _super.call(this) || this;
    }
    ScrollerScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ScrollerScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var dataArr = [
            { number: '1', image: 'resource/assets/bg1.png', name: '徐先生', score: '110' },
            { number: '2', image: 'resource/assets/bg1.png', name: '徐先生', score: '100' },
            { number: '3', image: 'resource/assets/bg1.png', name: '徐先生', score: '92' },
            { number: '4', image: 'resource/assets/bg1.png', name: '徐先生', score: '83' },
            { number: '5', image: 'resource/assets/bg1.png', name: '徐先生', score: '74' },
            { number: '6', image: 'resource/assets/bg1.png', name: '徐先生', score: '65' },
            { number: '7', image: 'resource/assets/bg1.png', name: '徐先生', score: '56' },
            { number: '8', image: 'resource/assets/bg1.png', name: '徐先生', score: '47' },
            { number: '9', image: 'resource/assets/bg1.png', name: '徐先生', score: '37' },
            { number: '10', image: 'resource/assets/bg1.png', name: '徐先生', score: '27' }
        ];
        var euiArr = new eui.ArrayCollection(dataArr);
        this.mylist.dataProvider = euiArr;
        var mydataArr = [
            { number: '1', image: 'resource/assets/bg1.png', name: '徐先生', score: '22' }
        ];
        var euimyArr = new eui.ArrayCollection(mydataArr);
        this.a_list.dataProvider = euimyArr;
        this.init();
    };
    ScrollerScene.prototype.init = function () {
        this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (!SceneManage.getInstance().beginScene.scollBtn.visible) {
                SceneManage.getInstance().changeScene('beginScene');
                SceneManage.getInstance().beginScene.scollBtn.visible = true;
                SceneManage.getInstance().beginScene.beginBtn.visible = true;
            }
            else {
                SceneManage.getInstance().changeScene('gameScene');
                SceneManage.getInstance().gameScene.overPanel.visible = true;
            }
        }, this);
    };
    return ScrollerScene;
}(eui.Component));
__reflect(ScrollerScene.prototype, "ScrollerScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=ScrollerScene.js.map
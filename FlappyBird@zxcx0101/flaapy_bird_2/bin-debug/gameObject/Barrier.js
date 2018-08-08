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
var Barrier = (function (_super) {
    __extends(Barrier, _super);
    function Barrier(enemyData) {
        var _this = _super.call(this) || this;
        _this._barrierData = enemyData;
        _this.hasTrigger = false;
        _this.isScroce = false;
        _this.createBarrier();
        return _this;
    }
    Barrier.prototype.createBarrier = function () {
        var data = this._barrierData;
        this.barrier_down = createBitmapByName("polebot_png");
        this.barrier_down.anchorOffsetX = this.barrier_down.width / 2;
        this.barrier_down.y = data.y;
        this.addChild(this.barrier_down);
        this.barrier_up = createBitmapByName("polebot_png");
        this.barrier_up.anchorOffsetX = this.barrier_up.width / 2;
        this.barrier_up.y = this.barrier_down.y - GameData.barrierWidth;
        this.barrier_up.rotation = 180;
        this.addChild(this.barrier_up);
    };
    Barrier.prototype.update = function (timeStamp) {
        this.x -= GameData.speed;
    };
    return Barrier;
}(GameObject));
__reflect(Barrier.prototype, "Barrier");
//# sourceMappingURL=Barrier.js.map
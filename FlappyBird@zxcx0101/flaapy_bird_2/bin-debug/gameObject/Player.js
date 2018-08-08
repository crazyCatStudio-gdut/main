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
/**
 * 分析：小鸟能够 跳  死亡
 * 玩家 小鸟 跳  哎呦
 */
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        //加速度
        _this.acceleration = 0;
        _this.init();
        return _this;
        // this.addEventListener( egret.Event.ADDED_TO_STAGE,this.init,this);
    }
    Object.defineProperty(Player.prototype, "width", {
        //计算玩家的宽高时 只计算鸟本身 
        get: function () {
            return this._role.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "height", {
        get: function () {
            return this._role.height;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.init = function () {
        this._role = createBitmapByName("player_png");
        this.addChild(this._role);
        // 跳跃效果图
        this.jump_img = createBitmapByName("jump_png");
        this.jump_img.visible = false;
        this.addChild(this.jump_img);
        // 碰撞效果图
        this.death_img = createBitmapByName("death_png");
        this.death_img.visible = false;
        this.addChild(this.death_img);
    };
    Player.prototype.jump = function () {
        var _this = this;
        if (!GameData.isAlive) {
            return;
        }
        //给一个向上的速度
        this.acceleration = -GameData.jumpSpeed;
        //跳的效果图出现
        this.jump_img.x = (this.width - this.jump_img.width) / 2;
        this.jump_img.y = this.height;
        this.jump_img.visible = true;
        egret.setTimeout(function () {
            _this.jump_img.visible = false;
        }, this, 100);
    };
    Player.prototype.death = function (isLanding) {
        var _this = this;
        if (isLanding === void 0) { isLanding = false; }
        GameData.isAlive = false;
        if (!isLanding) {
            this.death_img.x = (this.width - this.jump_img.width) / 2;
            this.death_img.y = -this.death_img.height;
            this.death_img.visible = true;
            egret.setTimeout(function () {
                _this.death_img.visible = false;
            }, this, 500);
        }
    };
    Player.prototype.update = function (timeStamp) {
        this.y += this.acceleration;
        //受重力加速度的影响
        this.acceleration += GameData.gravity;
        if ((this.y + this._role.height) > GameData.groundHeight) {
            this.death(true);
            SceneController.GameEnd();
            console.log("游戏结束");
        }
    };
    return Player;
}(GameObject));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map
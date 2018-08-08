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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickView, _this);
        return _this;
    }
    GameScene.prototype.initView = function () {
        var bg = createBitmapByName("bg_png");
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;
        this.addChild(bg);
        //初始化场景中每一层
        this.UIContainer = new egret.DisplayObjectContainer();
        this.rolerContainer = new egret.DisplayObjectContainer();
        this.barrierContainer = new egret.DisplayObjectContainer();
        this.mileageContainer = new egret.DisplayObjectContainer();
        this.startGameContianer = new egret.DisplayObjectContainer();
        this.addChild(this.barrierContainer);
        this.addChild(this.mileageContainer);
        this.addChild(this.rolerContainer);
        this.addChild(this.UIContainer);
        this.addChild(this.startGameContianer);
        this.gameObjectList = [];
        this.deleteObjectList = [];
        //初始化UI层
        this.initUIContainer();
        //初始化开始游戏层
        this.initStartGameContainer();
        //初始化 小鸟
        this.createRole();
        //创建里程
        this.createMileage();
    };
    GameScene.prototype.initUIContainer = function () {
        // 分数: 0
        var tip1 = new egret.TextField();
        tip1.text = "分数:";
        tip1.textColor = 0xffffff;
        tip1.size = 60;
        tip1.x = 50;
        tip1.y = 20;
        this.UIContainer.addChild(tip1);
        this.barrierText = new egret.TextField();
        this.barrierText.size = 60;
        this.barrierText.x = tip1.width + 50;
        this.barrierText.y = 20;
        this.UIContainer.addChild(this.barrierText);
        this.changeBarriersCount(0);
        //鸡蛋：0
        var tip2 = new egret.TextField();
        tip2.text = "鸟蛋";
        tip2.textColor = 0xffffff;
        tip2.size = 60;
        tip2.x = this.barrierText.x + this.barrierText.width + 50;
        tip2.y = 20;
        this.UIContainer.addChild(tip2);
        this.eggText = new egret.TextField();
        this.eggText.textColor = 0xffffff;
        this.eggText.size = 60;
        this.eggText.x = tip2.x + tip2.width + 50;
        this.eggText.y = 20;
        this.UIContainer.addChild(this.eggText);
        this.changeEggsCount(0);
        //暂停按钮
        var pauseBtn = createBitmapByName("pause_png");
        pauseBtn.touchEnabled = true;
        pauseBtn.x = this.stage.stageWidth - pauseBtn.width - 20;
        pauseBtn.y = 20;
        pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPause, this);
        this.UIContainer.addChild(pauseBtn);
    };
    /**
     * 改变 障碍物文本的值
     */
    GameScene.prototype.changeBarriersCount = function (cnt) {
        this.barrierText.text = cnt.toString();
    };
    /**
     * 改变 鸟蛋的文本值
     */
    GameScene.prototype.changeEggsCount = function (cnt) {
        this.eggText.text = cnt.toString();
    };
    /**
     * 游戏暂停
     */
    GameScene.prototype.onPause = function (e) {
        e.stopPropagation(); //阻止冒泡
        SceneController.pauseGame();
        console.log("游戏暂停");
    };
    /**
     * 创建小鸟
     */
    GameScene.prototype.createRole = function () {
        //创建平台
        this.platfrom_bird = createBitmapByName("platform_png");
        this.platfrom_bird.x = 100;
        this.platfrom_bird.y = this.stage.stageHeight / 2;
        this.rolerContainer.addChild(this.platfrom_bird);
        // 创建小鸟
        GameData.player = new Player();
        GameData.player.x = this.platfrom_bird.x;
        GameData.player.y = this.platfrom_bird.y - GameData.player.height;
        this.rolerContainer.addChild(GameData.player);
    };
    /**
     * 初始化 开始游戏层
     */
    GameScene.prototype.initStartGameContainer = function () {
        //准备
        var readyText = new egret.TextField();
        readyText.text = "准备";
        readyText.size = 100;
        readyText.textColor = 0xFFA500;
        readyText.stroke = 5; //描边
        readyText.strokeColor = 0x000000; //描边颜色
        readyText.x = (this.stage.stageWidth - readyText.width) / 2;
        readyText.y = this.stage.stageHeight / 5;
        this.startGameContianer.addChild(readyText);
        //小手
        var hand = createBitmapByName("hand_png");
        hand.x = (this.stage.stageWidth - hand.width) / 2;
        hand.y = this.stage.stageHeight / 5 * 3;
        this.startGameContianer.addChild(hand);
        //点击开始游戏
        var startText = new egret.TextField();
        startText.text = "点击开始游戏";
        startText.size = 80;
        startText.textColor = 0x000000;
        startText.stroke = 3;
        startText.strokeColor = 0xffffff;
        startText.x = (this.stage.stageWidth - startText.width) / 2;
        startText.y = this.stage.stageHeight / 5 * 4;
        this.startGameContianer.addChild(startText);
    };
    /**
     * 点击界面
     * 第一次点击 开始游戏
     * 后面再次点击 跳跃
     */
    GameScene.prototype.onClickView = function () {
        if (!GameData.hasStart && !GameData.isAlive) {
            SceneController.startGameScene();
            return;
        }
        if (!GameData.hasStart) {
            SceneController.startGame();
            return;
        }
        GameData.player.jump();
    };
    /**
     * 游戏开始 动起来！
     */
    GameScene.prototype.startGame = function () {
        var _this = this;
        console.log("点击了界面，准备开始游戏");
        this.startGameContianer.visible = false;
        egret.Tween.get(this.platfrom_bird).to({ x: -this.platfrom_bird.width }, 300).call(function () {
            _this.rolerContainer.removeChild(_this.platfrom_bird);
        });
    };
    GameScene.prototype.createMileage = function () {
        var mileage1 = createBitmapByName("floor_png");
        mileage1.y = this.stage.stageHeight - mileage1.height + 20;
        this.mileageContainer.addChild(mileage1);
        this.mileage1 = mileage1;
        var mileage2 = createBitmapByName("floor_png");
        mileage2.y = this.stage.stageHeight - mileage2.height + 20;
        mileage2.x = mileage1.width;
        console.log(mileage2.x);
        this.mileageContainer.addChild(mileage2);
        this.mileage2 = mileage2;
        GameData.groundHeight = mileage1.y;
    };
    GameScene.prototype.startTicker = function () {
        egret.ticker.$startTick(this.update, this);
    };
    GameScene.prototype.stopTicker = function () {
        egret.ticker.$stopTick(this.update, this);
    };
    GameScene.prototype.update = function (timeStap) {
        if (!GameData.hasStart) {
            return true;
        }
        //里程碑滚动
        if (this.mileage1.x + this.mileage1.width <= 0) {
            this.mileage1.x = this.mileage2.x + this.mileage2.width;
        }
        if (this.mileage2.x + this.mileage2.width <= 0) {
            this.mileage2.x = this.mileage1.x + this.mileage1.width;
        }
        this.mileage1.x -= GameData.speed;
        this.mileage2.x -= GameData.speed;
        GameData.distance += GameData.speed / 2;
        GameData.player.update(timeStap);
        for (var _i = 0, _a = this.gameObjectList; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.update(timeStap);
        }
        //添加元素
        this.addElement();
        this.collision();
        return true;
    };
    GameScene.prototype.addElement = function () {
        var element = GameData.elements[0];
        //获取到element 并且 里程数大于elements的里程数的时候 就创建障碍物
        if (element && GameData.distance >= element.distance + GameData.rounds * GameData.maxMileage) {
            if (element.type == "wall") {
                console.log("创建wall");
                var barrier = new Barrier(element);
                barrier.x = this.stage.stageWidth;
                this.barrierContainer.addChild(barrier);
                this.gameObjectList.push(barrier);
            }
            if (element.type == "egg") {
                console.log("创建egg");
                var egg = new Egg(element);
                egg.x = this.stage.stageWidth;
                egg.y = element.y;
                this.barrierContainer.addChild(egg);
                this.gameObjectList.push(egg);
            }
            GameData.elements.splice(0, 1);
            if (GameData.elements.length <= 0) {
                //注意 此处必须使用 concat 将一个数组赋值给另一个数组 ！！！
                GameData.elements = GameData.elements.concat(RES.getRes("config_json").elements);
                console.log(RES.getRes("config_json"));
                GameData.rounds++;
            }
        }
    };
    GameScene.prototype.collision = function () {
        var player = GameData.player;
        //碰撞检测
        var player_rect = new egret.Rectangle(player.x, player.y, player.width, player.height);
        for (var _i = 0, _a = this.gameObjectList; _i < _a.length; _i++) {
            var barrier = _a[_i];
            if (barrier instanceof Barrier) {
                var up_rect = new egret.Rectangle(barrier.x, 0, barrier.barrier_up.width, barrier.barrier_down.y - GameData.barrierWidth);
                var down_rect = new egret.Rectangle(barrier.x, barrier.barrier_down.y, barrier.barrier_down.width, barrier.barrier_down.height);
                if (player_rect.intersects(up_rect) || player_rect.intersects(down_rect)) {
                    barrier.hasTrigger = true;
                    GameData.player.death();
                    SceneController.GameEnd();
                }
                if (barrier.x + barrier.barrier_up.width < player.x + 10 && !barrier.isScroce) {
                    barrier.isScroce = true;
                    GameData.barrierCount++;
                    this.changeBarriersCount(GameData.barrierCount);
                }
                if (barrier.x + barrier.barrier_up.width + 50 < 0) {
                    this.deleteObjectList.push();
                }
            }
            if (barrier instanceof Egg) {
                var egg_rect = new egret.Rectangle(barrier.x, barrier.y, barrier.width, barrier.height);
                if (egg_rect.intersects(player_rect) && !barrier.hasTrigger) {
                    barrier.hasTrigger = true;
                    GameData.eggCount++;
                    this.changeEggsCount(GameData.eggCount);
                    this.deleteObjectList.push(barrier);
                }
                if (barrier.x + barrier.width + 50 < 0) {
                    this.deleteObjectList.push(barrier);
                }
            }
            for (var _b = 0, _c = this.deleteObjectList; _b < _c.length; _b++) {
                var obj = _c[_b];
                this.barrierContainer.removeChild(obj);
                this.gameObjectList.splice(this.gameObjectList.indexOf(obj), 1);
            }
            this.deleteObjectList.length = 0;
        }
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map
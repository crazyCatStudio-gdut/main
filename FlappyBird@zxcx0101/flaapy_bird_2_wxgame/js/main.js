var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        return _super.call(this) || this;
    }
    GameObject.prototype.update = function (timeStamp) {
    };
    return GameObject;
}(egret.DisplayObjectContainer));
__reflect(GameObject.prototype, "GameObject");
var SceneController = (function () {
    function SceneController() {
        this.startScene = new StartScene();
        this.gameScene = new GameScene();
        this.overScene = new OverScene();
    }
    Object.defineProperty(SceneController, "instance", {
        get: function () {
            if (!this.sceneController) {
                this.sceneController = new SceneController();
            }
            return this.sceneController;
        },
        enumerable: true,
        configurable: true
    });
    SceneController.prototype.setStage = function (s) {
        this._stage = s;
    };
    /**
     * 游戏初始化（进入开始游戏场景）
     */
    SceneController.initGame = function () {
        var stage = this.instance._stage;
        if (this.instance.gameScene.parent) {
            stage.removeChild(this.instance.gameScene);
            this.instance.gameScene = new GameScene();
        }
        if (this.instance.overScene.parent) {
            stage.removeChild(this.instance.overScene);
            this.instance.overScene = new OverScene();
        }
        //加入开始场景
        stage.addChild(this.instance.startScene);
    };
    /**
     * 游戏开始（进入游戏场景）
     */
    SceneController.startGameScene = function () {
        var stage = this.instance._stage;
        //移除原来的开始场景
        if (this.instance.startScene.parent) {
            stage.removeChild(this.instance.startScene);
            this.instance.startScene = new StartScene();
        }
        if (this.instance.gameScene.parent) {
            stage.removeChild(this.instance.gameScene);
            this.instance.gameScene = new GameScene();
        }
        if (this.instance.overScene.parent) {
            stage.removeChild(this.instance.overScene);
            this.instance.overScene = new OverScene();
        }
        // 游戏数据初始化
        GameData.distance = 0;
        GameData.barrierCount = 0;
        GameData.eggCount = 0;
        GameData.isAlive = true;
        this.loadLevelData();
        //障碍物的位置
        GameData.elements = GameData.elements.concat();
        stage.addChild(this.instance.gameScene);
    };
    /**
     * 游戏开始 （开始游戏）
     */
    SceneController.startGame = function () {
        //游戏开始了
        GameData.hasStart = true;
        this.instance.gameScene.startGame();
        //定时器开始
        this.instance.gameScene.startTicker();
    };
    SceneController.loadLevelData = function () {
        var levelData = RES.getRes("config_json");
        GameData.elements = levelData.elements;
        //按照比例计算
        GameData.speed = (levelData.properties.speed / 1920) * egret.MainContext.instance.stage.stageHeight;
        GameData.gravity = (levelData.properties.gravity / 1920) * egret.MainContext.instance.stage.stageHeight;
        GameData.jumpSpeed = (levelData.properties.jumpSpeed / 1920) * egret.MainContext.instance.stage.stageHeight;
        GameData.barrierWidth = levelData.properties.barrierWidth;
        GameData.maxMileage = levelData.properties.maxMileage;
    };
    /**
     * 游戏结束
     */
    SceneController.GameEnd = function () {
        GameData.hasStart = false;
        this.instance.gameScene.stopTicker();
        var stage = this.instance._stage;
        stage.addChild(this.instance.overScene);
    };
    SceneController.pauseGame = function () {
        if (GameData.ispause) {
            egret.ticker.resume();
            GameData.ispause = false;
        }
        else {
            egret.ticker.pause();
            GameData.ispause = true;
        }
    };
    return SceneController;
}());
__reflect(SceneController.prototype, "SceneController");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var GameUtil = (function () {
    function GameUtil() {
    }
    GameUtil.createButton = function (text) {
        var button = new egret.DisplayObjectContainer();
        var button_bg = createBitmapByName("button_png");
        var textField = this.createText(text);
        button.addChild(button_bg);
        button.addChild(textField);
        textField.x = button_bg.width / 2;
        textField.y = button_bg.height / 2;
        button.touchEnabled = true;
        button.touchChildren = false;
        button.anchorOffsetX = button_bg.width / 2;
        button.anchorOffsetY = button_bg.height / 2;
        return button;
    };
    GameUtil.createText = function (text) {
        var textField = new egret.TextField();
        textField.text = text;
        textField.size = 120;
        textField.anchorOffsetX = textField.width / 2;
        textField.anchorOffsetY = textField.height / 2;
        return textField;
    };
    GameUtil.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");
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
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 3:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var container = new egret.DisplayObjectContainer();
        this.addChild(container);
        SceneController.instance.setStage(container);
        SceneController.initGame();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
/**
 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
 * 全局函数
 */
function createBitmapByName(name) {
    var result = new egret.Bitmap();
    var texture = RES.getRes(name);
    result.texture = texture;
    return result;
}
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        return _this;
    }
    StartScene.prototype.initView = function () {
        var bg = GameUtil.createBitmapByName("bg_png");
        this.addChild(bg);
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;
        //开始游戏的按钮
        var startBtn = GameUtil.createBitmapByName("btn_ksyx_png");
        this.addChild(startBtn);
        startBtn.x = (this.stage.stageWidth - startBtn.width) / 2;
        startBtn.y = (this.stage.stageHeight - startBtn.height) / 2;
        startBtn.touchEnabled = true;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("点击了开始游戏按钮，进入游戏场景");
            SceneController.startGameScene();
        }, this);
    };
    return StartScene;
}(egret.DisplayObjectContainer));
__reflect(StartScene.prototype, "StartScene");
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
var Egg = (function (_super) {
    __extends(Egg, _super);
    function Egg(objData) {
        var _this = _super.call(this) || this;
        _this.hasTrigger = false;
        _this.eggData = objData;
        _this.init();
        return _this;
    }
    Egg.prototype.init = function () {
        var egg = createBitmapByName("egg_png");
        this.addChild(egg);
    };
    Egg.prototype.update = function (timeStamp) {
        this.x -= GameData.speed;
    };
    return Egg;
}(GameObject));
__reflect(Egg.prototype, "Egg");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
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
;window.Main = Main;
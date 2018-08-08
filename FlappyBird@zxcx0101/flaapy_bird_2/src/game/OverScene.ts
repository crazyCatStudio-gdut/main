class OverScene extends egret.DisplayObjectContainer{
	public constructor() {
		super();
		this.addEventListener( egret.Event.ADDED_TO_STAGE,this.initView,this);
	}

	public initView(){
        let hand = createBitmapByName("hand_png");
        hand.anchorOffsetX = hand.width / 2;
        hand.anchorOffsetY = hand.height / 2;
        hand.x = this.stage.stageWidth / 2;
        hand.y =  this.stage.stageHeight / 2;
        this.addChild(hand);

        let startText = new egret.TextField();
        startText.text = "点击重新游戏";
        startText.size = 100;
        startText.stroke = 8;
        startText.strokeColor = 0x000000;
        startText.anchorOffsetX = startText.width / 2;
        startText.anchorOffsetY = startText.height / 2;
        startText.x =  this.stage.stageWidth / 2;
        startText.y =  this.stage.stageHeight * 2 / 3;
        this.addChild(startText);

        let menuButton = GameUtil.createButton("菜单");
        menuButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            console.log("菜单");
			//游戏初始化 重新打开 开始场景
            SceneController.initGame();
        }, this);
        menuButton.x =  this.stage.stageWidth / 2;
        menuButton.y =  this.stage.stageHeight / 5;
        this.addChild(menuButton);

        let shareButton = GameUtil.createButton("分享");
        shareButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            console.log("分享");
        }, this);
        shareButton.x =  this.stage.stageWidth / 2;
        shareButton.y =  this.stage.stageHeight * 2 / 5;
        this.addChild(shareButton);		
	}
}
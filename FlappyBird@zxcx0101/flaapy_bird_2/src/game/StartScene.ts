class StartScene extends egret.DisplayObjectContainer{
	public constructor() {
		super();
		this.addEventListener( egret.Event.ADDED_TO_STAGE,this.initView,this);
	}

	private initView(){
		let bg:egret.Bitmap = GameUtil.createBitmapByName("bg_png");
		this.addChild(bg);
		bg.width = this.stage.stageWidth;
		bg.height = this.stage.stageHeight;

		//开始游戏的按钮
		let startBtn:egret.Bitmap = GameUtil.createBitmapByName("btn_ksyx_png");
		this.addChild(startBtn);
		startBtn.x = (this.stage.stageWidth - startBtn.width)/2;
		startBtn.y = (this.stage.stageHeight - startBtn.height)/2;
		startBtn.touchEnabled = true;
		startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("点击了开始游戏按钮，进入游戏场景");
			SceneController.startGameScene();
		},this)
	}
}
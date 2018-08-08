class SceneManage extends egret.Sprite {
	// 场景控制器的单例
	private static instance: SceneManage;
	// 开始场景
	private beginScene: BeginScene;
	// 游戏场景
	private gameScene: GameScene;

	public constructor() {
		super();
		this.init();
	}
	private init(){
		// 实例化两个场景
		this.beginScene = new BeginScene();
		this.gameScene = new GameScene();
		// 默认添加开始场景
		this.addChild(this.beginScene);
	}
	// 实例化单例获取方法
	public static getInstance(): SceneManage{
		if(!SceneManage.instance){
			SceneManage.instance = new SceneManage();
		}
		return SceneManage.instance;
	}
	// 切换场景
	public changeScene(type){
		// 释放资源
		if(type == 'gameScene'){
			this.beginScene.release();
		}
		// 移除所有显示列表中的对象
		this.removeChildren();
		// 添加下一个场景
		this.addChild(this[type]);
	}
}
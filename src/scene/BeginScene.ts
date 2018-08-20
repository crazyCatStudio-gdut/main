class BeginScene extends eui.Component implements  eui.UIComponent {
	
	// 开始按钮
	public beginBtn:eui.Button;
	public scollBtn:eui.Group;
	public rank:eui.Button;
	public mySkin:eui.Button;
	public skinPanel:eui.Group;
	public skinNumber;
	public lockRect:eui.Rect;
	public lock:eui.Button;
	public lufei:eui.ToggleButton;
	public i:eui.ToggleButton;
	public tipPanel:eui.Group;
	public jiesuo:eui.Button;
	public bujiesuo:eui.Button;
	public tipMes:eui.Label;

	public home:eui.Button;
	public coin:eui.Label;//金币数
	public beginCoin:number = 30;

	//pattern娱乐
	public amusement:eui.Button;
	public yes:eui.Button;
	public no:eui.Button;
	public rulePanel:eui.Group;
	public type;


	//初始的音频
	private startVoice:egret.Sound;
	private iconVoice:egret.Sound;
	

	
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		// 页面加载完毕后，调用自定义的初始化方法
		this.init();
		this.iconVoice.play(0,1);
	}
	
	// 初始化(给按钮绑定点击事件)
	private init(){
		this.beginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this);
		this.rank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toRank,this);
		this.mySkin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toChangeSkin,this);
		this.i.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeSkin,this);
		this.lufei.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeSkin2,this);
		this.lock.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toUnlock,this);
		this.home.addEventListener(egret.TouchEvent.TOUCH_TAP,this.backhome,this);
		this.jiesuo.addEventListener(egret.TouchEvent.TOUCH_TAP,this.removeLock,this);
		this.bujiesuo.addEventListener(egret.TouchEvent.TOUCH_TAP,this.abandon,this);
		
		//pattern
		this.amusement.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toRulePanel,this);
		this.yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toChangePattern,this);
		this.no.addEventListener(egret.TouchEvent.TOUCH_TAP,this.backhome,this);

		this.beginCoin=SceneManage.getInstance().gameScene.currentCoin;
		this.coin.text = this.beginCoin.toString();
		SceneManage.getInstance().gameScene.jiluScore = 0;
		this.startVoice = RES.getRes('start_mp3');
		this.iconVoice = RES.getRes('icon_mp3');

		if(this.beginCoin<5) {
			this.yes.touchEnabled = false;
		}
	}
	private tapHandler(){
		// 切换场景
		SceneManage.getInstance().changeScene('gameScene');
		//添加开始音频
		 this.startVoice.play(0, 1);
	}


	//查看排行榜
	private toRank() {
		this.scollBtn.visible = false;
		this.beginBtn.visible = false;
		SceneManage.getInstance().addScene('scrollerScene');
	}

	//pattern
	public toChangePattern() {
		SceneManage.getInstance().addScene('gameScene');
		this.rulePanel.visible = false;
		SceneManage.getInstance().gameScene.amuse();
		this.type = 1;
		this.startVoice.play(0,1);
	}
	
	private toRulePanel() {
		this.rulePanel.visible = true;
	}

	//更换皮肤页面
	private toUnlock() {
		this.tipPanel.visible = true;
	}

	private toChangeSkin(){
		this.skinPanel.visible = true;
	}

	//选择皮肤
	public changeSkin(){
		this.lufei.selected = false;
		this.skinNumber = 0;
	}
	public changeSkin2(){
		this.i.selected = false;		
		this.skinNumber = 1;
	}

	private abandon() {
		this.tipPanel.visible = false;
	}
	
	private backhome(){
		this.skinPanel.visible = false;
		this.rulePanel.visible = false;
	}

	public removeLock() {
		this.tipPanel.visible = false;
		this.lockRect.visible = false;
		this.lock.visible = false;
		this.beginCoin -= 10;
		this.lufei.selected = true;
		this.skinNumber = 1;
		this.coin.text = this.beginCoin.toString();
		SceneManage.getInstance().gameScene.currentCoin-=10;
		SceneManage.getInstance().gameScene.gamecoin.text=SceneManage.getInstance().gameScene.currentCoin.toString();
	}

	// 移除事件
	public release(){
		if(this.beginBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
			this.beginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this);
		}
		if(this.yes.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
			this.yes.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.toChangePattern,this);
		}
	}
}
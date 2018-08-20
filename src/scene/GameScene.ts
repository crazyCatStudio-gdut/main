class GameScene extends eui.Component implements eui.UIComponent {
	// 游戏场景组
	public blockPanel: eui.Group;
	//分享图标
	public share:eui.Image;
	public bg:eui.Image;
	// 小 i
	public player: eui.Image;


	//创建一个计时器对象
    public timer:egret.Timer = new egret.Timer(10000,0);
	//结束场景延迟计时器
	public overTimer:egret.Timer = new egret.Timer(1600,1);
		 
	// 游戏场景中的积分
	public scoreLabel: eui.Label;
	// 所有方块资源的数组
	private blockSourceNames: Array<string> = [];
	// 所有背景图片资源的数组
	private bgSourceNames: Array<string> = [];
	//初始的音频
	private startVoice:egret.Sound;
	// 按下的音频
	private pushVoice: egret.Sound;
	// 按下音频的SoundChannel对象
	private pushSoundChannel: egret.SoundChannel;
	// 弹跳的音频
	private jumpVoice: egret.Sound;
	//落地的音效
	private successVoice: egret.Sound;
	//跳跃完美的音效
	private certainVoice: egret.Sound;
	//跳跃完美的加分
	public plusscore:eui.Label;

	//摔倒的音频
	private overVoice: egret.Sound;
	// 所有方块的数组
	private blockArr: Array<eui.Image> = [];
	// 所有回收方块的数组
	private reBackBlockArr: Array<eui.Image> = [];
	// 当前的盒子（最新出现的盒子）
	private currentBlock: eui.Image;
	// 下一个盒子方向(1靠右侧出现/-1靠左侧出现)
	public direction: number = 1;
	// 随机盒子距离跳台的距离
	private minDistance = 240;
	private maxDistance = 400;
	// tanθ角度值
	public tanAngle: number = 0.556;

	// 跳的距离
	public jumpDistance: number = 0;
	// 判断是否是按下状态
	private isReadyJump = false;
	// 落脚点
	private targetPos: egret.Point;
	// 左侧跳跃点
	private leftOrigin = { "x": 180, "y": 350 };
	// 右侧跳跃点
	private rightOrigin = { "x": 505, "y": 350 };
	// 游戏中得分
	private score = 0;
	//金币
	public myCoin:eui.Group;
	public gamecoin:eui.Label;
	public currentCoin:number=30;
	
	//复活
	public continue:eui.Button;
	public tipPanel:eui.Group;
	public fuhuo:eui.Button;
	public bufuhuo:eui.Button;
	public tipMes:eui.Label;
	public jiluScore = 0;

	//pattern娱乐
	public time:eui.Label;
	public overTimer2:egret.Timer = new egret.Timer(1600,1);
	public mytimer:egret.Timer = new egret.Timer(1000,20);
	public currentTime:number = 20;
	public defeat:eui.Group;
	public success:eui.Group;
	public back2:eui.Button;
	public back:eui.Button;	
	public replay2:eui.Button;
	public replay1:eui.Button;



	// 游戏结束场景
	public overPanel: eui.Group;
	public overScoreLabel: eui.Label;
	public highestScore:eui.Label;
	public highestScore2:eui.Label;
	public restart: eui.Button;
	public home:eui.Button;
	public checkRank:eui.Label;
	public number:eui.Label;
	public hlistItem:eui.List;	
	public image:eui.Image;
	public hisName:eui.Label;
	public hisScore:eui.Label;


	//新纪录场景
	public overPanel2:eui.Group;
	public share2:eui.Button;
	public overScoreLabel2:eui.Label;
	public checkRank2:eui.Label;
	public home2:eui.Button;
	public restart2:eui.Button;

	// 加分变量
	public num;
	private i=2;


	public constructor() {
		super();
		 
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
		this.reset();
		this.threeData();
	}

	
	private init() {
		this.gamecoin.text=this.currentCoin.toString();
		//pattern 娱乐
		this.time.visible = false;
		this.defeat.visible = false;
		this.success.visible = false;
		this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toback, this);
		this.back2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toback, this);
		this.replay1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tryAgain, this);
		this.replay2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tryAgain, this);
		this.overTimer2.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc2,this)

		//注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.changeBg,this);	
		this.overTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this)
		this.continue.addEventListener(egret.TouchEvent.TOUCH_TAP,this.continueGame,this);
		this.fuhuo.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toFuHuo,this);
		this.bufuhuo.addEventListener(egret.TouchEvent.TOUCH_TAP,this.buFuHuo,this);
		
		//this.changeBg();
		this.addChildAt(this.bg,0);
		/*this.blockPanel.addChild(this.share);*/

		this.blockSourceNames = ["block1_png", "block2_png", "block3_png", "block5_png", "block7_png", "block9_png", "block10_png", ];
		this.bgSourceNames = ["bg1_png","bg2_png","bg3_png","bg4_png","bg5_png"];
		
		// 初始化音频
		this.startVoice = RES.getRes('start_mp3');
		this.pushVoice = RES.getRes('scale_intro_mp3');
		this.jumpVoice = RES.getRes('jump_mp3');
		this.successVoice = RES.getRes('success_mp3');
		this.certainVoice = RES.getRes('certain_mp3');
		this.overVoice = RES.getRes('gameover_mp3')
		
		// 添加触摸事件
		this.blockPanel.touchEnabled = true;
		this.blockPanel.touchChildren = true;
		this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onKeyDown, this);
		this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_END, this.onKeyUp, this);
		
		// 绑定结束按钮
		this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartHandler, this);
		this.restart2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartHandler, this);
		
		// 设置玩家的锚点
		this.player.anchorOffsetX = this.player.width / 2;
		this.player.anchorOffsetY = this.player.height - 10;

		// 心跳计时器
		egret.Ticker.getInstance().register(function (dt) {
			dt /= 1000;
			if (this.isReadyJump) {
				this.jumpDistance += 244 * dt;
			}
		}, this)

		// 完美跳跃加分效果图
		this.plusscore.visible = false;
		this.addChild(this.plusscore);


		//查看排行榜
		this.checkRank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toRank,this)
		this.checkRank2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toRank,this)
		//返回主页
		this.home.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toHome,this)
		this.home2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toHome,this)

		//更换小人皮肤
		if(SceneManage.getInstance().beginScene.skinNumber == 0){
			this.player.source = 'piece_png';
		}
		
		if(SceneManage.getInstance().beginScene.skinNumber == 1){
			this.player.source = 'lufei_png';
		}

		// 金币不足不可再玩
		if(this.currentCoin<5) {
			this.replay1.touchEnabled = false;
			this.replay2.touchEnabled = false;
		}

	}


	// 按下的事件逻辑
	private onKeyDown() {
		this.timer.start();
		
		// 播放按下的音频
		this.pushSoundChannel = this.pushVoice.play(0, 1);
			
		// 变形
		egret.Tween.get(this.player).to({
			scaleY: 0.5
		}, 3000)
		egret.Tween.get(this.blockArr[this.blockArr.length-2]).to({
			scaleY: 0.5
		},3000)

		this.isReadyJump = true;
	}
	
	// 放开
	private onKeyUp() {
		
		// 判断是否是在按下状态
		if (!this.isReadyJump) {
			return;
		}
		
		// 声明落点坐标
		if (!this.targetPos) {
			this.targetPos = new egret.Point();
		}
		// 立刻让屏幕不可点,等小人落下后重新可点
		this.blockPanel.touchEnabled = false;
		this.blockPanel.touchChildren = false;
	

		// 停止播放按压音频,并且播放弹跳音频
		this.pushSoundChannel.stop()
		this.jumpVoice.play(0, 1);
		
		// 清除所有动画
		egret.Tween.removeAllTweens();
		this.blockPanel.addChild(this.player);
		
		// 结束跳跃状态
		this.isReadyJump = false;

		// 落点坐标
		this.targetPos.x = this.player.x + this.jumpDistance * this.direction;
		
		// 根据落点重新计算斜率,确保小人往目标中心跳跃
		this.targetPos.y = this.player.y + this.jumpDistance * (this.currentBlock.y - this.player.y) / (this.currentBlock.x - this.player.x) * this.direction;
		
		// 执行跳跃动画
		egret.Tween.get(this.blockArr[this.blockArr.length-2]).to({
			scaleY: 1
		},120)
		egret.Tween.get(this).to({ factor: 1 }, 500).call(() => {
			this.player.scaleY = 1;
			
			this.jumpDistance = 0;
			// 判断跳跃是否成功
			this.judgeResult();		
		});
		

		// 执行小人空翻动画
		this.player.anchorOffsetY = this.player.height / 2;

		egret.Tween.get(this.player).to({ rotation: this.direction > 0 ? 360 : -360 }, 260).call(() => {
			this.player.rotation = 0
		}).call(() => {
			this.player.anchorOffsetY = this.player.height - 10;
		});		
	}

	// 重置游戏
	public reset() {
		this.addChildAt(this.bg,0);
		
		// 清空舞台
		this.blockPanel.removeChildren();
		this.blockArr = [];
		
		// 添加一个方块
		let blockNode = this.createBlock();
		blockNode.touchEnabled = false;
		
		// 设置方块的起始位置
		blockNode.x = 200;
		blockNode.y = this.height / 2 + blockNode.height;
		this.currentBlock = blockNode;
		
		//添加开始音频
		this.pushSoundChannel = this.startVoice.play(0,1 );
		
		// 摆正小人的位置
		this.player.y = this.currentBlock.y;
		this.player.x = this.currentBlock.x;
		this.blockPanel.addChild(this.player);
		this.direction = 1;
		
		// 添加积分
		this.blockPanel.addChild(this.scoreLabel);
		this.scoreLabel.visible = true;
		this.blockPanel.addChild(this.myCoin);
		this.myCoin.visible = true;
		
		// 添加下一个方块
		this.addBlock();
	}

	// 添加一个方块
	private addBlock() {
		
		// 随机一个方块
		let blockNode = this.createBlock();
		
		// 设置位置
		let distance = this.minDistance + Math.random() * (this.maxDistance - this.minDistance);
		if (this.direction > 0) {
			blockNode.x = this.currentBlock.x + distance;
			blockNode.y = this.currentBlock.y - distance * this.tanAngle;
		} else {
			blockNode.x = this.currentBlock.x - distance;
			blockNode.y = this.currentBlock.y - distance * this.tanAngle;
		}
		this.currentBlock = blockNode;
	}

	//随机产生背景图片
	private changeBg():eui.Image {
		let n = Math.floor(Math.random() * this.bgSourceNames.length);
		this.bg.source = this.bgSourceNames[n];
		this.blockPanel.addChildAt(this.bg,0);
		return this.bg;
	}


	// 工厂方法,创建一个方块
	private createBlock(): eui.Image {
		var blockNode = null;
		if (this.reBackBlockArr.length) {
			// 回收池里面有,则直接取
			blockNode = this.reBackBlockArr.splice(0, 1)[0];
		} else {
			// 回收池里面没有,则重新创建
			blockNode = new eui.Image();
		}
		
		// 使用随机背景图
		let n = Math.floor(Math.random() * this.blockSourceNames.length);
		blockNode.source = this.blockSourceNames[n];
		this.blockPanel.addChild(blockNode);
		
		// 设置方块的锚点
		blockNode.anchorOffsetX = 222;
		blockNode.anchorOffsetY = 78;
		
		// 把新创建的block添加进入blockArr里
		this.blockArr.push(blockNode);
		blockNode.touchEnabled = false;
		return blockNode;		
	}

	public timerComFunc()
    {
       this.overPanel.visible = true;
	   this.scoreLabel.visible = false;
    }

	private judgeResult() {
			
		// 根据this.jumpDistance来判断跳跃是否成功
		if (Math.pow(this.currentBlock.x - this.player.x, 2) + Math.pow(this.currentBlock.y - this.player.y, 2) <= 70 * 70) {
				
			if(Math.pow(this.currentBlock.x - this.player.x, 2) + Math.pow(this.currentBlock.y - this.player.y, 2) <= 20 * 20)
			{	
				if(this.num==2){
					this.i+=2;
				}else if(this.num==1){
					this.i=2;
				}	
				this.score += this.i;
				this.pushSoundChannel = this.certainVoice.play(0, 1);
				this.num=2;
			}
			
			
			// 更新积分
			else
			{
				this.successVoice.play(0,1);
				egret.setTimeout(()=>{
				},this,400)
				this.score++;
				this.i=1;
				this.num=1;
			}

			this.plusscore.text = "+"+this.i;	

			//跳的效果图出现
			this.plusscore.x = this.player.x -80;
			this.plusscore.y = this.player.y -160;
			this.plusscore.visible = true;
			egret.setTimeout(()=>{
			this.plusscore.visible = false;
			},this,350)

			// if(this.score)
			this.scoreLabel.text = this.score.toString();
			
			// 随机下一个方块出现的位置
			this.direction = Math.random() > 0.5 ? 1 : -1;
			
			// 当前方块要移动到相应跳跃点的距离
			var blockX, blockY;
			blockX = this.direction > 0 ? this.leftOrigin.x : this.rightOrigin.x;
			blockY = this.height / 2 + this.currentBlock.height;
			
			// 小人要移动到的点.
			var playerX, PlayerY;
			playerX = this.player.x - (this.currentBlock.x - blockX);
			PlayerY = this.player.y - (this.currentBlock.y - blockY);
			
			// 更新页面
			this.update(this.currentBlock.x - blockX, this.currentBlock.y - blockY);
			
			// 更新小人的位置
			egret.Tween.get(this.player).to({
				x: playerX,
				y: PlayerY
			}, 1000).call(() => {
				// 开始创建下一个方块
				this.addBlock();
				// 让屏幕重新可点;
				this.blockPanel.touchEnabled = true;
				this.blockPanel.touchChildren = true;
			})
			
			// console.log('x' + x);
			console.log(this.currentBlock.x);
	} 
	else if(Math.pow(this.player.x - this.blockArr[this.blockArr.length-2].x, 2) + Math.pow(this.player.y -this.blockArr[this.blockArr.length-2].y, 2) <= 70 * 70)
		
		{
			this.blockPanel.touchEnabled = true;
			this.blockPanel.touchChildren = true;
			
		}
		else{
			this.pushSoundChannel = this.overVoice.play(0, 1);
			// 失败,弹出重新开始的panel
			console.log('游戏失败!')
			this.timer.stop();
			this.mytimer.stop();

			this.overScoreLabel.text = this.score.toString();
			this.overScoreLabel2.text = this.score.toString();
			this.highestScore.text = this.score.toString();
			this.highestScore2.text = this.score.toString();
			this.currentCoin += Math.floor((this.score - this.jiluScore)/10);
			this.gamecoin.text = this.currentCoin.toString();


			if(SceneManage.getInstance().beginScene.type == 1){
				this.overTimer2.start();
			}
			else{
				this.overTimer.start();
			}
			
		}
	}
	
	//使游戏场景继续
	private update(x, y) {
		egret.Tween.removeAllTweens();
		for (var i: number = this.blockArr.length - 1; i >= 0; i--) {
			var blockNode = this.blockArr[i];
			if (blockNode.x + (blockNode.width - 222) < 0 || blockNode.x - 222 > this.width || blockNode.y - 78 > this.height) {
				
				// 方块超出屏幕,从显示列表中移除
				this.blockPanel.removeChild(blockNode);
				this.blockArr.splice(i, 1);
				
				// 添加到回收数组中
				this.reBackBlockArr.push(blockNode);
			} else {
				
				// 没有超出屏幕的话,则移动
				egret.Tween.get(blockNode).to({
					x: blockNode.x - x,
					y: blockNode.y - y
				}, 1000)
			}
		}
		console.log(this.blockArr);

	}
	// 重新一局
	private restartHandler() {
		
		// 隐藏结束场景
		this.overPanel.visible = false;
		this.overPanel2.visible = false;
		
		// 置空积分
		this.score = 0;
		this.scoreLabel.text = this.score.toString();
		
		// 开始放置方块
		this.reset();
		
		// 游戏场景可点
		this.blockPanel.touchEnabled = true;
		this.blockPanel.touchChildren = true;
		
		//重置记录分数
		this.jiluScore = 0;
		this.num=1
	}
	
	//查看排行榜
	public toRank() {
		SceneManage.getInstance().addScene('scrollerScene');
		this.overPanel.visible = false;
		this.overPanel2.visible = false;
	}
	
	//返回主页
	public toHome() {
		this.restartHandler();
		this.overPanel.visible = false;
		this.overPanel2.visible =false;
		this.reset();
		SceneManage.getInstance().changeScene('beginScene');
		
	}

   //复活
	public continueGame() {
		this.overPanel.visible = false;
		this.overPanel2.visible = false;
		this.blockPanel.touchChildren = false;
		this.tipPanel.visible = true;
		this.jiluScore = this.score;
		if(this.currentCoin >= 10) {
			this.tipMes.text = "确认消耗10金币复活？";
		}else {
			this.tipMes.text = "金币不够10个，前往购买！";
		}
	}
   
    //确认复活
	public toFuHuo() {
		if(this.currentCoin < 10) {
			this.buFuHuo();
			return;
		}
		this.currentCoin -= 10;
		this.gamecoin.text = this.currentCoin.toString(); 
		
		// 开始放置方块
		this.tipPanel.visible = false;
		this.reset();
		this.blockPanel.touchEnabled = true;
		//this.blockPanel.touchChildren = true;
	}
	
	//取消复活
	public buFuHuo() {
		this.tipPanel.visible = false;
		this.overPanel.visible = true;
		this.overPanel.touchChildren = true;
	}
	public resContinueHandler() {
		// 隐藏结束场景
		this.overPanel.visible = false;
		this.overPanel2.visible = false;
		// 开始放置方块
		this.reset();
		// 游戏场景可点
		this.blockPanel.touchEnabled = true;
	}
	
	//添加factor的set,get方法,注意用public  
	public get factor(): number {
		return 0;
	}
	
	//计算方法参考 二次贝塞尔公式  
	public set factor(value: number) {
		this.player.x = (1 - value) * (1 - value) * this.player.x + 2 * value * (1 - value) * (this.player.x + this.targetPos.x) / 2 + value * value * (this.targetPos.x);
		this.player.y = (1 - value) * (1 - value) * this.player.y + 2 * value * (1 - value) * (this.targetPos.y - 300) + value * value * (this.targetPos.y);
	}



	
	 
	public threeData() {
		var threedataArr:any[]=[
	 	{ number: '1',image: 'resource/assets/bg1.png', name: '徐先生',  score:'110'},

		{ number: '2',image: 'resource/assets/bg1.png', name: '徐先生',  score:'100'},

	 	{ number: '3',image: 'resource/assets/bg1.png', name: '徐先生',  score:'88'}
    	]

    	var euithreeArr:eui.ArrayCollection=new eui.ArrayCollection(threedataArr);
		this.hlistItem.dataProvider=euithreeArr;
	}


	 //pattern娱乐
	public timerComFunc2()
    {
       if (this.score>=15) {
			this.currentCoin +=25;
			this.gamecoin.text = this.currentCoin.toString();
			this.success.visible = true;
			}else {
			this.currentCoin -=5;
			this.gamecoin.text = this.currentCoin.toString(); 
			this.defeat.visible = true;
			}
		if(this.currentCoin<5) {
			this.replay1.touchEnabled = false;
			this.replay2.touchEnabled = false;
		}
    }

	 public tryAgain() {
		this.reset();
		SceneManage.getInstance().beginScene.toChangePattern();
		this.score = 0;
		this.scoreLabel.text = this.score.toString();
		this.num = 1;
	 }

	 public toback() {
		SceneManage.getInstance().beginScene.type = 0;
		this.restartHandler();
		this.overPanel.visible = false;
		this.overPanel2.visible =false;
		this.reset();
		SceneManage.getInstance().changeScene('beginScene');
	 }

	public amuse() {
		this.mytimer.reset();
		this.defeat.visible = false;
		this.success.visible = false;
		this.currentTime = 20;
		this.time.text = this.currentTime.toString();
		this.addChild(this.time);
		this.time.visible=true;	
		this.mytimer = new egret.Timer(1000,20);
   	 	this.mytimer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
    	this.mytimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerComplete,this);
    	this.mytimer.start();
		this.judgeResult();
    }

   	public onTimer(evt:egret.TimerEvent):void {
        this.currentTime--;
		this.time.text = this.currentTime.toString(); 
        console.log("倒计时:"+this.currentTime);
    }

 	public onTimerComplete(evt:egret.TimerEvent):void {
		 this.pushSoundChannel.stop();
		 this.isReadyJump = false;
		 egret.Tween.removeAllTweens();
		 this.jumpDistance = 0;
		 this.player.scaleY = 1;
		 this.overTimer2.start();
		 this.overVoice.play(0, 1);
		}
 }
class GameScene extends egret.DisplayObjectContainer{
	public constructor() {
		super();
		this.addEventListener( egret.Event.ADDED_TO_STAGE,this.initView,this);
		this.touchEnabled = true;
		this.addEventListener( egret.TouchEvent.TOUCH_TAP,this.onClickView,this);
	}
	//游戏场景中分为以下几层：UI层 roler层 障碍物层 背景层 开始游戏层
	private UIContainer:egret.DisplayObjectContainer;//UI层
	private rolerContainer:egret.DisplayObjectContainer;//主角
	private barrierContainer:egret.DisplayObjectContainer;//障碍物
	private mileageContainer:egret.DisplayObjectContainer;//背景地砖层
	private startGameContianer:egret.DisplayObjectContainer;//开始游戏层

	// 跨过的障碍物数
	private barrierText:egret.TextField;
	//获取的鸡蛋的个数
	private eggText:egret.TextField;
	private platfrom_bird:egret.Bitmap;//小鸟站的平台
	//存放 
	private gameObjectList:GameObject[];
	//删除元素
	private deleteObjectList:GameData[];


	private initView(){
		let bg:egret.Bitmap = createBitmapByName("bg_png");
		bg.width = this.stage.stageWidth;
		bg.height = this.stage.stageHeight;
		this.addChild(bg);

		//初始化场景中每一层
		this.UIContainer = new egret.DisplayObjectContainer();
		this.rolerContainer = new egret.DisplayObjectContainer();
		this.barrierContainer = new egret.DisplayObjectContainer();
		this.mileageContainer = new egret.DisplayObjectContainer();
		this.startGameContianer = new egret.DisplayObjectContainer();

		this.addChild( this.barrierContainer );
		this.addChild( this.mileageContainer );
		this.addChild( this.rolerContainer );
		this.addChild( this.UIContainer );
		this.addChild( this.startGameContianer );

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
	}


	private initUIContainer(){
		// 分数: 0
		let tip1:egret.TextField = new egret.TextField();
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
		let tip2:egret.TextField = new egret.TextField();
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
		this.UIContainer.addChild( this.eggText );
		this.changeEggsCount(0);

		//暂停按钮
		let pauseBtn:egret.Bitmap = createBitmapByName("pause_png");
		pauseBtn.touchEnabled = true;
		pauseBtn.x = this.stage.stageWidth - pauseBtn.width - 20;
		pauseBtn.y = 20;
		pauseBtn.addEventListener( egret.TouchEvent.TOUCH_TAP,this.onPause,this);
		this.UIContainer.addChild(pauseBtn);
	}
	/**
	 * 改变 障碍物文本的值
	 */
	private changeBarriersCount(cnt:number){
		this.barrierText.text = cnt.toString();
	}
	/**
	 * 改变 鸟蛋的文本值
	 */
	private changeEggsCount(cnt:number){
		this.eggText.text = cnt.toString();
	}

	/**
	 * 游戏暂停
	 */
	private onPause(e:egret.TouchEvent){
		e.stopPropagation();//阻止冒泡
		SceneController.pauseGame();
		console.log("游戏暂停");
	}
	/**
	 * 创建小鸟
	 */

	private createRole(){
		//创建平台
		this.platfrom_bird = createBitmapByName("platform_png");
		this.platfrom_bird.x = 100;
		this.platfrom_bird.y = this.stage.stageHeight/2;
		this.rolerContainer.addChild( this.platfrom_bird);
		// 创建小鸟
		GameData.player = new Player();
		GameData.player.x = this.platfrom_bird.x;
		GameData.player.y = this.platfrom_bird.y - GameData.player.height;
		this.rolerContainer.addChild(GameData.player);
	}

	/**
	 * 初始化 开始游戏层
	 */
	private initStartGameContainer(){
		//准备
		let readyText:egret.TextField = new egret.TextField();
		readyText.text = "准备";
		readyText.size = 100;
		readyText.textColor = 0xFFA500;
		readyText.stroke = 5;//描边
		readyText.strokeColor = 0x000000;//描边颜色
		readyText.x = (this.stage.stageWidth - readyText.width)/2;
		readyText.y = this.stage.stageHeight/5;
		this.startGameContianer.addChild( readyText );
		//小手
		let hand:egret.Bitmap = createBitmapByName("hand_png");
		hand.x = (this.stage.stageWidth - hand.width)/2;
		hand.y = this.stage.stageHeight / 5 * 3;
		this.startGameContianer.addChild(hand);
		//点击开始游戏
		let startText:egret.TextField = new egret.TextField();
		startText.text = "点击开始游戏";
		startText.size = 80;
		startText.textColor = 0x000000;
		startText.stroke = 3;
		startText.strokeColor = 0xffffff;
		startText.x = (this.stage.stageWidth - startText.width)/2;
		startText.y = this.stage.stageHeight/5 * 4;
		this.startGameContianer.addChild(startText);
	}

	/**
	 * 点击界面
	 * 第一次点击 开始游戏
	 * 后面再次点击 跳跃
	 */
	private onClickView(){
		if(!GameData.hasStart && !GameData.isAlive){
			SceneController.startGameScene();
			return;
		}
		if(!GameData.hasStart){
			SceneController.startGame();
			return;
		}
		GameData.player.jump();
	}

	/**
	 * 游戏开始 动起来！
	 */
	public startGame(){
		console.log("点击了界面，准备开始游戏");
		this.startGameContianer.visible = false;
		egret.Tween.get( this.platfrom_bird ).to({x:-this.platfrom_bird.width},300).call(()=>{
			this.rolerContainer.removeChild( this.platfrom_bird );
		})
	}
	private mileage1:egret.Bitmap;
	private mileage2:egret.Bitmap;

	private createMileage(){
        let mileage1 = createBitmapByName("floor_png");
        mileage1.y = this.stage.stageHeight - mileage1.height+20;
        this.mileageContainer.addChild(mileage1);
		this.mileage1 = mileage1;
        let mileage2 = createBitmapByName("floor_png");
        mileage2.y = this.stage.stageHeight - mileage2.height+20;
        mileage2.x = mileage1.width;
		console.log( mileage2.x);
        this.mileageContainer.addChild(mileage2);
		this.mileage2 = mileage2;

		GameData.groundHeight = mileage1.y;

	}

	public startTicker(){
		egret.ticker.$startTick(this.update,this);
	}
	public stopTicker(){
		egret.ticker.$stopTick(this.update,this);
	}

	private update(timeStap:number):boolean{
		if(!GameData.hasStart){
			return true;
		}
		//里程碑滚动
		if( this.mileage1.x + this.mileage1.width <=0 ){
			this.mileage1.x = this.mileage2.x + this.mileage2.width;
		}
		if( this.mileage2.x + this.mileage2.width <= 0){
			this.mileage2.x = this.mileage1.x + this.mileage1.width;
		}
		this.mileage1.x -= GameData.speed;
		this.mileage2.x -= GameData.speed;

		GameData.distance += GameData.speed/2;

		GameData.player.update(timeStap);

		for( let obj of this.gameObjectList){
			obj.update(timeStap);
		}
		//添加元素
		this.addElement();
		this.collision();
		return true;

	}

	private addElement(){
		let element:ElementData = GameData.elements[0];
		//获取到element 并且 里程数大于elements的里程数的时候 就创建障碍物
		if( element && GameData.distance >= element.distance + GameData.rounds * GameData.maxMileage){
			
			if(element.type == "wall"){
				console.log("创建wall");
				let barrier = new Barrier(element);
				barrier.x = this.stage.stageWidth;
				this.barrierContainer.addChild(barrier);
				this.gameObjectList.push(barrier);	
			}
			if(element.type == "egg"){
				console.log("创建egg");
				let egg = new Egg(element);
				egg.x = this.stage.stageWidth;
				egg.y = element.y;
				this.barrierContainer.addChild(egg);
				this.gameObjectList.push(egg);
			}
			GameData.elements.splice(0,1);
			if( GameData.elements.length <= 0){
				//注意 此处必须使用 concat 将一个数组赋值给另一个数组 ！！！
				GameData.elements = GameData.elements.concat(RES.getRes("config_json").elements);
				console.log( RES.getRes("config_json") )
				GameData.rounds ++;
			}
		}
	}

	private collision(){
		let player:Player = GameData.player;
        //碰撞检测
        let player_rect:egret.Rectangle = new egret.Rectangle(player.x,player.y,player.width,player.height);
		for( let barrier of this.gameObjectList){
			if( barrier instanceof Barrier){
				let up_rect:egret.Rectangle = 
					new egret.Rectangle(barrier.x,0,barrier.barrier_up.width,barrier.barrier_down.y-GameData.barrierWidth );
				let down_rect:egret.Rectangle = 
					new egret.Rectangle( barrier.x,barrier.barrier_down.y,barrier.barrier_down.width,barrier.barrier_down.height);
				if( player_rect.intersects(up_rect) || player_rect.intersects( down_rect)  ){
						barrier.hasTrigger = true;
						GameData.player.death();
						SceneController.GameEnd();	
				}
				if( barrier.x + barrier.barrier_up.width < player.x + 10 && !barrier.isScroce){
            		barrier.isScroce = true;
            		GameData.barrierCount ++;
					this.changeBarriersCount( GameData.barrierCount);
        		}

				if(barrier.x + barrier.barrier_up.width+50 < 0){
					this.deleteObjectList.push()
				}

			}
			if( barrier instanceof Egg){
				let egg_rect:egret.Rectangle = new egret.Rectangle( barrier.x,barrier.y,barrier.width,barrier.height);
				if( egg_rect.intersects(player_rect) && !barrier.hasTrigger){
						barrier.hasTrigger = true;
						GameData.eggCount ++;
						this.changeEggsCount( GameData.eggCount );
						this.deleteObjectList.push( barrier);
				}
				if( barrier.x + barrier.width + 50 < 0){
						this.deleteObjectList.push(barrier);
				}
			}

			
			for( let obj of this.deleteObjectList){
				this.barrierContainer.removeChild( <GameObject>obj);
				this.gameObjectList.splice( this.gameObjectList.indexOf(< GameObject>obj),1);
			}
			this.deleteObjectList.length = 0;
		}
	}

}



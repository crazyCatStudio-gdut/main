/**
 * 分析：小鸟能够 跳  死亡 
 * 玩家 小鸟 跳  哎呦 
 */
class Player extends GameObject{
	public constructor() {
		super();
		this.init();
		// this.addEventListener( egret.Event.ADDED_TO_STAGE,this.init,this);
	}

	private _role:egret.Bitmap;
	private jump_img:egret.Bitmap;
	private death_img:egret.Bitmap;

	//加速度
	private acceleration:number = 0;

	//计算玩家的宽高时 只计算鸟本身 
	get width(){
		return this._role.width;
	}
	get height(){
		return this._role.height;
	}


	private init(){
		this._role = createBitmapByName("player_png");
		this.addChild( this._role );	
		// 跳跃效果图
		this.jump_img = createBitmapByName("jump_png");
        this.jump_img.visible = false;
        this.addChild(this.jump_img);
		// 碰撞效果图
        this.death_img = createBitmapByName("death_png");
        this.death_img.visible = false;
        this.addChild(this.death_img);
	}

	public jump(){

		if(!GameData.isAlive){
			return;
		}
		//给一个向上的速度
		this.acceleration = -GameData.jumpSpeed;
		//跳的效果图出现
		this.jump_img.x = (this.width - this.jump_img.width)/2;
		this.jump_img.y = this.height ;
		this.jump_img.visible = true;
		egret.setTimeout(()=>{
			this.jump_img.visible = false;
		},this,100)
	}
	death(isLanding:boolean = false){
		GameData.isAlive = false;
		if( !isLanding){
			this.death_img.x = (this.width - this.jump_img.width)/2;
			this.death_img.y = - this.death_img.height;
			this.death_img.visible = true;
			egret.setTimeout(()=>{
				this.death_img.visible = false;
			},this,500);
		}
	}
	update(timeStamp:number){
		this.y += this.acceleration;
		//受重力加速度的影响
		this.acceleration += GameData.gravity;

		if((this.y + this._role.height)>GameData.groundHeight){
			this.death(true);
			SceneController.GameEnd();
			console.log("游戏结束");
		}
	}
}
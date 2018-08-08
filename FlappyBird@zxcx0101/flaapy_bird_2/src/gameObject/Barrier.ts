interface ElementData{
    "type": string , 
    "distance": number, 
    "y": number
}
class Barrier extends GameObject{

	private _barrierData:ElementData;
	public barrier_down:egret.Bitmap;
	public barrier_up:egret.Bitmap;

	
	public isScroce:boolean;//是否计分

	public constructor(enemyData:ElementData) {
		super();
		this._barrierData = enemyData;
		this.hasTrigger = false;
        this.isScroce = false;
		this.createBarrier();
	}

	public createBarrier(){
        let data: ElementData = this._barrierData;
        
        this.barrier_down = createBitmapByName("polebot_png");
        this.barrier_down.anchorOffsetX = this.barrier_down.width / 2;
        this.barrier_down.y = data.y;
        this.addChild(this.barrier_down);

        this.barrier_up = createBitmapByName("polebot_png");
        this.barrier_up.anchorOffsetX = this.barrier_up.width / 2
        this.barrier_up.y = this.barrier_down.y - GameData.barrierWidth;
        this.barrier_up.rotation = 180; 
        this.addChild(this.barrier_up);		
	}
	update(timeStamp: number) {
        this.x -= GameData.speed;
        
    }

}


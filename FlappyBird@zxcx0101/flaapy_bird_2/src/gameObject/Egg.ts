class Egg extends GameObject{
	private eggData:ElementData;

	public constructor(objData:ElementData) {
		super();
		this.hasTrigger = false;
		this.eggData = objData;
		this.init();

	}

	private init(){
		let egg:egret.Bitmap = createBitmapByName("egg_png");
		this.addChild(egg);
	}

	update(timeStamp:number){
		this.x -= GameData.speed;
	}
}
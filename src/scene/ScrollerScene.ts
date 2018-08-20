class ScrollerScene extends eui.Component implements eui.UIComponent{
 
public number:eui.Label;
public image:eui.Image;
public hisName:eui.Label;
public score:eui.Label;
public rank:eui.Scroller;
public mylist:eui.List;
public back_btn:eui.Button;
public a_list:eui.List;


 
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
 
	let dataArr:any[] =[
 
	{ number: '1',image: 'resource/assets/bg1.png', name: '徐先生', score:'110'},
	
	{ number: '2',image: 'resource/assets/bg1.png', name: '徐先生',  score:'100'},
 
	{ number: '3',image: 'resource/assets/bg1.png', name: '徐先生', score:'92'},

	{ number: '4',image: 'resource/assets/bg1.png', name: '徐先生', score:'83'},

	{ number: '5',image: 'resource/assets/bg1.png', name: '徐先生',  score:'74'},

	{ number: '6',image: 'resource/assets/bg1.png', name: '徐先生',  score:'65'},

	{ number: '7',image: 'resource/assets/bg1.png', name: '徐先生',  score:'56'},

	{ number: '8',image: 'resource/assets/bg1.png', name: '徐先生',  score:'47'},

	{ number: '9',image: 'resource/assets/bg1.png', name: '徐先生',  score:'37'},

	{ number: '10',image: 'resource/assets/bg1.png', name: '徐先生',  score:'27'}
       
	]
 
	let euiArr:eui.ArrayCollection=new eui.ArrayCollection(dataArr);
 
	this.mylist.dataProvider=euiArr;

 	let mydataArr:any[]=[
	 { number: '1',image: 'resource/assets/bg1.png', name: '徐先生',  score:'22'}
 	]

 	let euimyArr:eui.ArrayCollection=new eui.ArrayCollection(mydataArr);
 
 	this.a_list.dataProvider=euimyArr;

	 this.init();
	}

public init() {
	
	this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=>{
		if(!SceneManage.getInstance().beginScene.scollBtn.visible){
			SceneManage.getInstance().changeScene('beginScene');
			SceneManage.getInstance().beginScene.scollBtn.visible = true;
			SceneManage.getInstance().beginScene.beginBtn.visible = true;
		}else {
			SceneManage.getInstance().changeScene('gameScene');
			SceneManage.getInstance().gameScene.overPanel.visible = true;
		}
		}, this)
	}
}

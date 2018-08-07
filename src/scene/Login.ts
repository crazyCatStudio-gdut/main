class Login extends eui.Component implements  eui.UIComponent {
	
	//获取用户信息
	public loginName:eui.TextInput;
	public loginPassword:eui.TextInput;
	public loginBtn:eui.Button;
	public toReg:eui.Button;

	//提示 
	public logPhone:eui.Label;
	public logPass:eui.Label;

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
		this.init();
	}
	
	//初始化（绑定监听事件）
	public init() {
		this.loginName.addEventListener(egret.FocusEvent.FOCUS_OUT,this.CheckPhone,this);
		this.loginPassword.addEventListener(egret.FocusEvent.FOCUS_OUT,this.CheckPassword,this);
		this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.logHandler,this);
		this.toReg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toRegHandler,this);
	}

	//登录（成功则切换到开始游戏界面）
	public logHandler() {
		SceneManage.getInstance().changeScene('beginScene');
		this.release();
	}

	//去注册（切换到注册场景）
	public toRegHandler() {
		SceneManage.getInstance().changeScene('register');
		this.release();
	}

	//移除对应的监听事件
	public release() {
		if(this.loginBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
			this.loginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.logHandler,this);
		}

		if(this.toReg.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
			this.toReg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.logHandler,this);
		}
	}

	//验证手机（用户名）
	public CheckPhone(): boolean {
		let userName:string = this.loginName.text; 
		let myPhone=/^[1][3,4,5,7,8][0-9]{9}$/;
		if(!myPhone.test(userName)) {
			this.logPhone.text = "用户名格式不正确！";
			if(userName ==="") {
				this.logPhone.text = "用户名不能为空！";
				return false;
			}
			return false;
		}else {
			this.logPhone.text = "";
			return true;
		}	
	}

	//验证密码
	public CheckPassword(): boolean {
		let password:string = this.loginPassword.text;
		let mypw:RegExp = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$');
		//6-15位数字和字母的组合
       if(!mypw.test(password)) {
            this.logPass.text = "密码格式不符!";
			if(password ==="") {
				this.logPass.text = "密码不能为空！";
				return false;
			}
			return false;
        }else {
			this.logPass.text = "";
			return true;
		}
	}

}
class Register extends eui.Component implements  eui.UIComponent {

	//获取用户输入的值
	public regNickname:eui.TextInput;
	public regUsername:eui.TextInput;
	public regPassword:eui.TextInput;
	public comfirmpw:eui.TextInput;
	public regBtn:eui.Button;
	public backToLog:eui.Image;


	//提示文本
	public regPhone:eui.Label; //用户名（电话）
	public regNick:eui.Label;  //昵称
	public regPass:eui.Label;  //密码
	public comfirmPw:eui.Label; //确认密码
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
	
	//初始化，绑定监听事件
	public init() {
		// this.$touchEnabled = true;
		this.regUsername.addEventListener(egret.FocusEvent.FOCUS_OUT,this.CheckPhone,this);
		this.regNickname.addEventListener(egret.FocusEvent.FOCUS_OUT,this.CheckNick,this);
		this.regPassword.addEventListener(egret.FocusEvent.FOCUS_OUT,this.CheckPassword,this);
		this.comfirmpw.addEventListener(egret.FocusEvent.FOCUS_OUT,this.ComfirmPw,this);
		this.regBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.RegHandler,this);
		this.backToLog.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toLog,this);
	}

	//注册（成功则切换到登录界面）
	public RegHandler() {
		let checkReg: boolean = this.CheckPhone() && this.CheckNick() &&
								this.CheckPassword() && this.ComfirmPw();//正则验证
		if(checkReg) {
			SceneManage.getInstance().changeScene('login');
		  	this.release();
		}
	}

	public toLog() {
		SceneManage.getInstance().changeScene('login');
		this.release();
	}

	//移除监听事件
	public release() {
		if(this.regBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
			this.regBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.RegHandler,this);
		}

		if(this.regUsername.hasEventListener(egret.FocusEvent.FOCUS_OUT)){
			this.regUsername.removeEventListener(egret.FocusEvent.FOCUS_OUT,this.CheckPhone,this);
		}

		if(this.regNickname.hasEventListener(egret.FocusEvent.FOCUS_OUT)){
			this.regNickname.removeEventListener(egret.FocusEvent.FOCUS_OUT,this.CheckNick,this);
		}

		if(this.regPassword.hasEventListener(egret.FocusEvent.FOCUS_OUT)){
			this.regPassword.removeEventListener(egret.FocusEvent.FOCUS_OUT,this.CheckPassword,this);
		}

		if(this.comfirmpw.hasEventListener(egret.FocusEvent.FOCUS_OUT)){
			this.comfirmpw.removeEventListener(egret.FocusEvent.FOCUS_OUT,this.ComfirmPw,this);
		}
	}

	//验证手机（用户名）
	public CheckPhone(): boolean {
		let userName:string = this.regUsername.text; 
		let myPhone=/^[1][3,4,5,7,8][0-9]{9}$/;
		if(!myPhone.test(userName)) {
			this.regPhone.text = "用户名格式不正确！";
			if(userName ==="") {
				this.regPhone.text = "用户名不能为空！";
				return false;
			}
			return false;
		}else {
			this.regPhone.text = "";
			return true;
		}	
	}

	//验证昵称
	public CheckNick(): boolean {
		let nickname:string = this.regNickname.text;
		let myNick:RegExp = new RegExp('^.{1,10}$');//1到10个字符
        if(!myNick.test(nickname)) {
            this.regNick.text = "昵称长度不符!";
			if(nickname ==="") {
				this.regNick.text = "用户名不能为空！";
				return false;
			}
			return false;
        }else {
			this.regNick.text = "";
			return true;
		}
	}

	//验证密码
	public CheckPassword(): boolean {
		let password:string = this.regPassword.text;
		let mypw:RegExp = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$');
		//6-15位数字和字母的组合
       if(!mypw.test(password)) {
            this.regPass.text = "密码格式不符!";
			if(password ==="") {
				this.regPass.text = "密码不能为空！";
				return false;
			}
			return false;
        }else {
			this.regPass.text = "";
			return true;
		}
	}

	//确认密码
	public ComfirmPw(): boolean {
		let password:string = this.regPassword.text;
		let compw:string = this.comfirmpw.text;
		if(password !== compw) {
			this.comfirmPw.text = "两次密码不相同！";
			return false;
		}else{
			this.comfirmPw.text = "";
			return true;
		}
	}
}

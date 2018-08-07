// class CheckReg extends egret.Sprite{

// 	//获取用户输入的值
// 	public regUsername:eui.TextInput;
// 	public regNickname:eui.TextInput;
// 	public regPassword:eui.TextInput;
// 	public comfirmpw:eui.TextInput;
	
// 	//提示文本
// 	public regPhone:eui.Label; //用户名（电话）
// 	public regNick:eui.Label;  //昵称
// 	public regPass:eui.Label;  //密码
// 	public comfirmPw:eui.Label; //确认密码

// 	public constructor() {
// 		super();
// 		this.init();
// 	}

// 	private init():boolean {
// 		this.regUsername.addEventListener(egret.FocusEvent.FOCUS_OUT,this.CheckPhone,this);
// 		this.regNickname.addEventListener(egret.FocusEvent.FOCUS_OUT,this.CheckNick,this);
// 		this.regPassword.addEventListener(egret.FocusEvent.FOCUS_OUT,this.CheckPassword,this);
// 		this.comfirmpw.addEventListener(egret.FocusEvent.FOCUS_OUT,this.ComfirmPw,this);
// 		return(this.CheckPhone() && this.CheckNick() && this.CheckPassword())
// 	}
// 	//验证手机（用户名）
// 	public CheckPhone(): boolean {
// 		let userName:string = this.regUsername.text; 
// 		let myPhone:RegExp = new RegExp('/^[1][3,4,5,7,8][0-9]{9}$/');
// 		if(userName = '') {
// 			this.regPhone.text = "用户名不能为空！";
// 			// this.addChild(this.regPhone);
// 			return false;
// 		}else if(!myPhone.test(userName)) {
// 			this.regPhone.text = "用户名格式不正确！";
// 			// this.addChild(this.regPhone);
// 			return false;
// 		}else{
// 			this.regPhone.text = "";
// 			return true;
// 		}
// 	}

// 	//验证昵称
// 	public CheckNick(): boolean {
// 		let nickname:string = this.regNickname.text;
// 		let myNick:RegExp = new RegExp('^.{1,15}$');//1到15个字符
//         if(nickname = ""){
//             this.regNick.text = "昵称不能为空!";
//             // this.addChild(this.regNick);
// 			return false;
//         }else if(!myNick.test(nickname)){
//             this.regNick.text = "昵称长度不符!";
//             // this.addChild(this.regNick);
// 			return false;
            
//         }else{
//             this.regNick.text = "";
// 			return true;
//         }
// 	}

// 	//验证密码
// 	public CheckPassword(): boolean {
// 		let password:string = this.regPassword.text;
// 		let mypw:RegExp = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$');
// 		//6-15位数字和字母的组合
//         if(password = ""){
//             this.regPass.text = "密码不能为空!";
//             // this.addChild(this.regPass);
// 			return false;
//         }else if(!mypw.test(password)){
//             this.regPass.text = "密码格式不符!";
//             // this.addChild(this.regPass);
// 			return false;
            
//         }else{
//             this.regPass.text = "";
// 			return true;
//         }
// 	}

// 	//确认密码
// 	public ComfirmPw(): boolean {
// 		let password:string = this.regPassword.text;
// 		let compw:string = this.comfirmpw.text;
// 		if(password !== compw) {
// 			this.comfirmPw.text = "两次密码不相同！";
// 			return false;
// 		}else{
// 			this.comfirmPw.text = "";
// 			return true;
// 		}
// 	}
// }
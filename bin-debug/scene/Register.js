var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Register = (function (_super) {
    __extends(Register, _super);
    function Register() {
        return _super.call(this) || this;
    }
    Register.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Register.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    //初始化，绑定监听事件
    Register.prototype.init = function () {
        this.regUsername.addEventListener(egret.FocusEvent.FOCUS_OUT, this.CheckPhone, this);
        this.regNickname.addEventListener(egret.FocusEvent.FOCUS_OUT, this.CheckNick, this);
        this.regPassword.addEventListener(egret.FocusEvent.FOCUS_OUT, this.CheckPassword, this);
        this.comfirmpw.addEventListener(egret.FocusEvent.FOCUS_OUT, this.ComfirmPw, this);
        this.regBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.RegHandler, this);
    };
    //注册（成功则切换到登录界面）
    Register.prototype.RegHandler = function () {
        var checkReg = this.CheckPhone() && this.CheckNick() &&
            this.CheckPassword() && this.ComfirmPw(); //正则验证
        if (checkReg) {
            SceneManage.getInstance().changeScene('login');
            this.release();
        }
    };
    //移除监听事件
    Register.prototype.release = function () {
        if (this.regBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.regBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.RegHandler, this);
        }
        if (this.regUsername.hasEventListener(egret.FocusEvent.FOCUS_OUT)) {
            this.regUsername.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.CheckPhone, this);
        }
        if (this.regNickname.hasEventListener(egret.FocusEvent.FOCUS_OUT)) {
            this.regNickname.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.CheckNick, this);
        }
        if (this.regPassword.hasEventListener(egret.FocusEvent.FOCUS_OUT)) {
            this.regPassword.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.CheckPassword, this);
        }
        if (this.comfirmpw.hasEventListener(egret.FocusEvent.FOCUS_OUT)) {
            this.comfirmpw.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.ComfirmPw, this);
        }
    };
    //验证手机（用户名）
    Register.prototype.CheckPhone = function () {
        var userName = this.regUsername.text;
        var myPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myPhone.test(userName)) {
            this.regPhone.text = "用户名格式不正确！";
            if (userName === "") {
                this.regPhone.text = "用户名不能为空！";
                return false;
            }
            return false;
        }
        else {
            this.regPhone.text = "";
            return true;
        }
    };
    //验证昵称
    Register.prototype.CheckNick = function () {
        var nickname = this.regNickname.text;
        var myNick = new RegExp('^.{1,10}$'); //1到10个字符
        if (!myNick.test(nickname)) {
            this.regNick.text = "昵称长度不符!";
            if (nickname === "") {
                this.regNick.text = "用户名不能为空！";
                return false;
            }
            return false;
        }
        else {
            this.regNick.text = "";
            return true;
        }
    };
    //验证密码
    Register.prototype.CheckPassword = function () {
        var password = this.regPassword.text;
        var mypw = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$');
        //6-15位数字和字母的组合
        if (!mypw.test(password)) {
            this.regPass.text = "密码格式不符!";
            if (password === "") {
                this.regPass.text = "密码不能为空！";
                return false;
            }
            return false;
        }
        else {
            this.regPass.text = "";
            return true;
        }
    };
    //确认密码
    Register.prototype.ComfirmPw = function () {
        var password = this.regPassword.text;
        var compw = this.comfirmpw.text;
        if (password !== compw) {
            this.comfirmPw.text = "两次密码不相同！";
            return false;
        }
        else {
            this.comfirmPw.text = "";
            return true;
        }
    };
    return Register;
}(eui.Component));
__reflect(Register.prototype, "Register", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Register.js.map
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
var Login = (function (_super) {
    __extends(Login, _super);
    function Login() {
        return _super.call(this) || this;
    }
    Login.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Login.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    //初始化（绑定监听事件）
    Login.prototype.init = function () {
        this.loginName.addEventListener(egret.FocusEvent.FOCUS_OUT, this.CheckPhone, this);
        this.loginPassword.addEventListener(egret.FocusEvent.FOCUS_OUT, this.CheckPassword, this);
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.logHandler, this);
        this.toReg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toRegHandler, this);
    };
    //登录（成功则切换到开始游戏界面）
    Login.prototype.logHandler = function () {
        SceneManage.getInstance().changeScene('beginScene');
        this.release();
    };
    //去注册（切换到注册场景）
    Login.prototype.toRegHandler = function () {
        SceneManage.getInstance().changeScene('register');
        this.release();
    };
    //移除对应的监听事件
    Login.prototype.release = function () {
        if (this.loginBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.loginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.logHandler, this);
        }
        if (this.toReg.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.toReg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.logHandler, this);
        }
    };
    //验证手机（用户名）
    Login.prototype.CheckPhone = function () {
        var userName = this.loginName.text;
        var myPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myPhone.test(userName)) {
            this.logPhone.text = "用户名格式不正确！";
            if (userName === "") {
                this.logPhone.text = "用户名不能为空！";
                return false;
            }
            return false;
        }
        else {
            this.logPhone.text = "";
            return true;
        }
    };
    //验证密码
    Login.prototype.CheckPassword = function () {
        var password = this.loginPassword.text;
        var mypw = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$');
        //6-15位数字和字母的组合
        if (!mypw.test(password)) {
            this.logPass.text = "密码格式不符!";
            if (password === "") {
                this.logPass.text = "密码不能为空！";
                return false;
            }
            return false;
        }
        else {
            this.logPass.text = "";
            return true;
        }
    };
    return Login;
}(eui.Component));
__reflect(Login.prototype, "Login", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Login.js.map
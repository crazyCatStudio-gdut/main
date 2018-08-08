class GameData {
	static groundHeight:number;// 地面的高度
	
	/**
	 * 游戏是否开始
	 */
	static hasStart:boolean;
	/**
	 * 对象是否存活
	 */
	static isAlive:boolean;
	/**
	 * 是否暂停游戏
	 */
	static ispause:boolean;
	/**
	 * 游戏角色
	 */
	static player:Player
	
	/**
	 * 穿过的障碍数
	 */
	static barrierCount:number;

	/**
	 * 鸡蛋计数
	 */
	static eggCount:number;
	/**
	 * 走过的距离 用于计算位置
	 */
	static distance:number;


	//从config文件中读取数据

	/**
	 * 存放配置文件中读取的障碍物数据
	 */
	static elements:any[] = [];
	/**
	 * 场景的移动速度
	 */
	static speed:number;
    /**
     * 重力加速度
     */
    static gravity;
    /**
     * 跳跃力度
     */
    static jumpSpeed;
	/**
	 * 障碍物最远的里程数
	 */
	static maxMileage:number;

	/**
	 * 管道之间的缝隙宽度
	 */
	static barrierWidth:number;
	/**
	 * 障碍物产生的轮数
	 */
	static rounds:number = 0;
}
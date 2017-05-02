window.onload = function (){
    /*
    ** 抽奖概率为 总和 * 10 ; 总概率 360°
    ** 旋转最少  turn +  度数的圈数 ;
    **
    */
    var PrizeSon =  ["一等奖 : iPhone6 plus " , " 二等奖 : iPad Air2" , " 三等奖 : iPad mini retina" , " 四等奖 : 特级红富士一个" , " 鼓励奖 : 差点就中奖了!" , "  再接再厉 : 很遗憾您没有中奖 !"] ; //奖品提示
    var totalNum = 6 ; // 转盘 总数
    var trunNum = [ 1 , 2 , 3 , 4 , 5 , 6 ]; //概率奖品 编号
    var turntable = [] ; // 随机概率计算
    var isStatr = false ; //锁 专拍没有执行完的时候 不可以再次点击 ;
    var lenCloc = 0 ; //当前第几次计算叠加的度数
    var turn  = 3 ; //转盘旋转最低的圈数

    var brn = document.getElementById("button");
    var wheel = document.getElementById("wheel");

    /* 循环概率 */
    for (var i = 0; i < trunNum.length; i++) {
        for (var j = 0; j < trunNum[i]; j++) {
            turntable.push(i+1);
        }
    }

    /* 点击 开始  */
    brn.onclick = function(){
        if(!isStatr){
            isStatr = true;
            var random = Math.floor(Math.random()*turntable.length);
            //console.log(Math.floor(Math.random()*turntable.length)%6);
            operation(random);
        }else{
            return false;
        }
    }

    /*    开始 function  ran = 随机    */
    function operation( ran ) {
        lenCloc++;
        var Prize = turntable[ran]-1 , sun = turn*360 ;  //编号  // 度数  //  时间
        if(Prize>=totalNum){
            Prize = 0;
        }
        var soBuom =parseInt(Math.floor(Math.random()*60) - 30);

        /*    避免多次出现1等奖 所以要删除 下标    */
        turntable.splice(ran, 1);

        /*    旋转度数 = 上次度数+ 最小圈数 * 360 + 当前数字 * 60 +随机角度  = 最终旋转度数     */
        wheel.style.transform = "rotate("+((lenCloc*sun+Prize*60)+soBuom)+"deg)";
        //wheel.style.webkitTransform = "rotate("+((lenCloc*sun+Prize*60)+soBuom)+"deg)";

        setTimeout(function () {

            alert("您获得了奖品编号:" + PrizeSon[Prize]);
            isStatr = false;

        }, 3200);
    }
}
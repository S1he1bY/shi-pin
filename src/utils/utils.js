export function formatWatch(view){
    return view >=10000 ? (view/10000).toFixed(1)+'w' : view
  }

export function formatTime(time){
    var min = Math.floor(time/60);
    var second = time % 60;
    return (min < 10 ? '0'+ min : min) + "'" + (second <10  ? '0' + second : second) +'"'
  }

export function formateDate(time){
  var date = new Date(time)
  var year = date.getFullYear();
  var month = date.getMonth()+1
  var day = date.getDate()
  return year+'-'+month+'-'+day
}

// -------------------------------------------计算两个时间戳相减开始 -----------------------------------------------------------
export function getDistanceTime(ago){
  let stime = new Date().getTime();  // 当前时间
  let usedTime = stime - ago;  // 两个时间戳相差的毫秒数

  let one_min = 60*1000;
  let one_hour = 60*60*1000;
  let one_day = 24*60*60*1000;
  let timetxt = '';

  // 获取now的时间
  // var date = new Date(now)
  // var nowYear = date.getFullYear();
  // var nowMonth = date.getMonth() + 1;
  // var nowDay = date.getDate()

  // 如果相差时间大于一天
  if(usedTime >= one_day){
    let disparityDay = parseInt(usedTime/one_day);  //计算相差几天
    timetxt = disparityDay + '天前'

    if(disparityDay > getCurMonthDay()) timetxt = getDistanceMonth(disparityDay) + '个月前';
    
    if(disparityDay > getYearDay()) timetxt = parseInt(disparityDay / getYearDay() ) + '年前';
  
  }else{  // 相差时间少于一天
    if(usedTime >= one_hour){
      timetxt = parseInt(usedTime / one_hour) + '小时前'
    }else if(usedTime >= one_min){
      timetxt = parseInt(usedTime / one_min) + '分钟前'
    }else{
      timetxt = '刚刚'
    }
  }
  return timetxt;
}

// 获取相差几个月 传天数
export function getDistanceMonth(disparityDay){
  let disparityMonth = 0;
  let count = ()=>{
    if(disparityDay > getCurMonthDay(disparityMonth)){  // 相差大于一个月时
      disparityDay -= getCurMonthDay(disparityMonth)     // 减去那一个月的天数 getCurMonthDay就是那一个月多少天
      disparityMonth += 1;  // 加一个月
      count(disparityMonth) // 递归，
    }else{
      return disparityMonth;  // 不满足if条件 结束递归，返回相差几个月(这个count函数的功能到此)
    }
  }
  count(disparityMonth) // 调用count函数开始计算相差几个月
  return disparityMonth;  // 返回相差几个月
}

// 获取当前月
export function getNowMonth(){
  return new Date().getMonth() + 1;
}

// 获取当前月有多少天 28,29 30 31  可以计算前面几个月有多少天，upnum是前面几个月
export function getCurMonthDay(upnum){
  let day = 0;
  let month = getNowMonth()  //获得当前月
  if(upnum){ //如果传参 传5
    let date = new Date(); //拿到当前系统时间  假如6月          （上面count逻辑,一开始upnum为0 就是当前月的天数减去之后还剩天数，这里的upnum=1，继续算还大于上一个月天数，再减，直到少于上一个月天数，返回相差几个月）
    date.setMonth(date.getMonth() - upnum)  //假如upnum传5    这里getMonth少1(6-1)  5-5=0
    month = date.getMonth() + 1;  // 0+1 =1  1月继续走下面逻辑31天
  }
  if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
    day = 31;
  }else if(month == 2){
    if(getYearDay() == 366) day = 29   // 闰年2月
    if(getYearDay() == 365) day = 28  
  }else{
    day = 30
  }
  return day;
}

// 获取当前年有多少天
export function getYearDay(){
  let day = 365
  let year = new Date().getFullYear()
  if(year % 4 == 0) day = 366   // 闰年
  return day;
}  
// ----------------------------------------------计算时间戳函数到此------------------------------------------------------------
// let time = (new Date().getTime()) - (1000 * 60 * 60 * 24 * 20)
// let timeTxt = getDistanceTime(time)
// console.log('timeTxt', timeTxt)

//IOS标准时间（JSON时间格式）转换为标准时间
export function iosTurn(time){
  time = time.replace(/-/, '-')
  time = time.replace(/T/, ' ')
  let times = time.split('.')
  return times[0]
}

// 日期转换成中国标准时间 最后转换为时间戳
export function timeToNum(date){
  let time = new Date(date)
  let time2 = time.getTime();
  return time2;
}
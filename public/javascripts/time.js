// var time = null;
//
// function diff(current, interval){
//     var time_diff = {
//         hour: 0,
//         minute: 0
//     };
//   var standard_date = new Date();
//   var standard_hour = (parseInt(current.getHours()/interval) + 1) * interval;
//   console.log(standard_hour);
//   //console.log((parseInt(current.getHours()/interval) + 1)* interval);
//   standard_date.setHours(48,0); //마일즈 세컨즈
//   var gap = (standard_date.getTime() - current.getTime())/60000;
//   console.log(standard_date);
//   console.log(current);
//   console.log(standard_date.getTime());
//   console.log(current.getTime());
//   time_diff.hour = parseInt(gap/60);
//   time_diff.minute = gap%60;
//
//   document.getElementById("result").innerHTML = time_diff.hour + ":" + time_diff.minute;
//
//   //return time_diff;
// }
// time = setInterval(diff(new Date(), 48),1000);
var time = 7200; //기준시간 작성
	var min = ""; //분
	var sec = ""; //초

	//setInterval(함수, 시간) : 주기적인 실행
	var x = setInterval(function() {
		//parseInt() : 정수를 반환
    hour = parseInt(time/3600);
    hour = hour % 60;
		min = parseInt(time/60);
    min = min % 60; //몫을 계산
		sec = time % 60; //나머지를 계산

		document.getElementById("result3").innerHTML = hour + 'min + "분" + sec + "초";
		time--;

		//타임아웃 시
		if (time < 0) {
			clearInterval(x); //setInterval() 실행을 끝냄
			document.getElementById("result3").innerHTML = "시간초과";
		}
	}, 1000);
function server_time0()
{
    var now = new Date();
    var period = new Date();
    const a = period.setHours(48,0);
    //console.log(period.setHours(48,0));
    var periodhour;
    var periodminute;
    var gap = (a - now.getTime());
    periodhour = parseInt((gap/60000)/60);
    periodminute = parseInt((gap/60000)%60);
    document.getElementById("result0").innerHTML = periodhour + "시간 " + periodminute + "분";
}
function server_time1()
{
    var now = new Date();
    var period1 = new Date();
    period1.setHours(48,0);
    console.log(now.getTime());
    var periodhour;
    var periodminute;
    var gap = (period1.getTime() - now.getTime());
    periodhour = parseInt((gap/60000)/60);
    periodminute = parseInt((gap/60000)%60);
    document.getElementById("result1").innerHTML = periodhour + "시간 " + periodminute + "분";
}
//var check = Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0); //0 : 할당 안됨

var timerId = Array.apply(null, new Array(10));
var t1=null;
var t2=null;

console.log(timerId);
playAlert = setInterval(function() {
    if ($("#rent0").attr('name')=="return")
    {
      timerId[0] = server_time0();
      //timerId[0] = setInterval("server_time0()", 1000);
    }
    if ($("#rent0").attr('name')=="rent")
    {
      clearInterval(timerId[0]);
    }
    if ($("#rent1").attr('name')=="return")
    {
      timerId[1] = setInterval("server_time1()", 1000);
    }
    if ($("#rent1").attr('name')=="rent")
    {
      clearInterval(timerId[1]);
    }
}, 1000);

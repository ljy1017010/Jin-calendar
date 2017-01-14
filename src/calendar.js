
/*
* *
* 还可以进行诸多改进和完善
* //加上换肤
* //加上3D效果
* //加上笔记记录
* //加上节气，节日
* //加上一切可以想象的东西
*
* Date：2016年11月6日
* Info：
* 	初始版本,搭建了一个大体框架
*
* Date：2016年11月18日
* Info：
* 	增加功能，能显示当前月的数据
*
* Date：2016年11月28日
* Info：
*	1 加上事件，能够显示下一个月，上一个月的数据
*	2 优化UI
*	3 临界点测试,修复跨年数据紊乱的问题
*
* Date：2017年1月14日
* Info:
* 	1 优化UI，加上andy样式。
*	2 加上返回今天功能
* */

// 核心打印函数，接受一个日期，打印出该日期
function printDate(date) {
    //初始化判断，如果是当前月，就给今天加上背景
	var dateOfNow = new Date(date.getTime());
	if (dateOfNow.getMonth() == (new Date()).getMonth() &&
		dateOfNow.getFullYear() == (new Date()).getFullYear()){
		setCurrentDayBackground(new Date());
	}
	//写出当月的日期
	function currentMonth(date){
		var firstDay = new Date(date.setDate(1));   //取得该月的第一天
		var weekDay = firstDay.getDay();				//该月的第一天是星期几
		var cellId = '';

		if (weekDay == 0){
            cellId = "17"; //如果week刚好是0，那么cellID为17.
		} else {
            cellId = "1" + weekDay;
		}
		var startCellId = parseInt(cellId);
		var endCellId = getSumDay(date) + startCellId - 1;
		cellId = parseInt(cellId);

		for (var dayNumber = 1; cellId <= endCellId; ++dayNumber, ++cellId) {
			//写入数值
			document.getElementById(cellId).innerHTML = dayNumber;
			//操作样式
			if (document.getElementById(cellId).getAttribute('class') == 'selected') {
                document.getElementById(cellId).setAttribute('class', 'selected currentMonth');
			} else {
                document.getElementById(cellId).setAttribute('class', 'currentMonth');
			}
		}
	}
	currentMonth(new Date(date.getTime()));  //必须这样做，防止被setDate()所污染,因为date是引用类型的。

	//将该月尾部的日期写上去
	function headOfNextMonth() {
		var cellOfIndex = 52;
		var nullSum = 0;
		var cell = document.getElementById(cellOfIndex);

		//先获得需要写入的第一个cell的下标cellOfIndex和需要写入的总数量nullSum
		while(cell.innerHTML == "&nbsp;") {
			++nullSum;
			--cellOfIndex;
            cell = document.getElementById(cellOfIndex);
		}

		//写入
        var startCellId = cellOfIndex + 1;
		var dateNum = 1;
		while(nullSum > 0) {
            cell = document.getElementById(startCellId);
            cell.setAttribute('class', 'null');	//设置日期样式
            cell.innerHTML = dateNum;
			--nullSum;
			++dateNum;
			++startCellId;
		}
	}
	headOfNextMonth();

	//将该月头部的日期写上去
	function tailOfPreviousMonth(date){
		//先获取要写入的第一个下标位置startCellId和要写入的总数nullSum
		var startCellId = 11;
		var nullSum = 0;
		var cell = document.getElementById(startCellId);
		while(cell.innerHTML == "&nbsp;") {
			++startCellId;
			++nullSum;
            cell = document.getElementById(startCellId);
		}

		//获得上一月的最后一天
		//临界点考虑：一定要注意跨年的情况
        var prevDateString = '';
		if (date.getMonth() == 0){
            prevDateString = 12 +  "/" + 1 + "/"+ (date.getFullYear() - 1);
		} else {
            prevDateString = date.getMonth() + "/" + 1 + "/"+ date.getFullYear();
		}
		var prevDate = new Date(prevDateString);
		var endNumber = getSumDay(prevDate);

        startCellId = startCellId - 1;

		while (nullSum > 0) {
            cell = document.getElementById(startCellId);
            cell.setAttribute('class', 'null');	//设置日期样式
            cell.innerHTML = endNumber;
			--endNumber;
			--nullSum;
			--startCellId;
		}

	}
	tailOfPreviousMonth(new Date(date.getTime())); //必须这样做，防止被setDate()所污染

	//写上Caption
	function writeCaption(){
		y = document.getElementById("caption-title");
		y.innerHTML = date.getFullYear() + "年" + "&nbsp" + getMonthString(date);

		function getMonthString(date) {
			switch (date.getMonth()) {
				case 0:
					return "1月";
					break;
				case 1:
					return "2月";
					break;
				case 2:
					return "3月";
					break;
				case 3:
					return "4月";
					break;
				case 4:
					return "5月";
					break;
				case 5:
					return "6月";
					break;
				case 6:
					return "7月";
					break;
				case 7:
					return "8月";
					break;
				case 8:
					return "9月";
					break;
				case 9:
					return "10月";
					break;
				case 10:
					return "11月";
					break;
				case 11:
					return "12月";
					break;
				default:
					return "error";
					break;
			}
		}
	}
	writeCaption();

	//功能函数： 获取该月有多少天
    function getSumDay(date) {
        var day = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return day.getDate();
    }

	//功能函数，设置今天的背景
	function setCurrentDayBackground(date) {
		var currentDay = date.getDate(); //必须在date.setDate(1)调用前执行，防止污染。

		var firstDay = new Date(date.setDate(1)); ///取得该月的第一天
		var weekDay = firstDay.getDay() == 0 ? 7 : firstDay.getDay(); //该月的第一天是星期几
		var cellId = "1" + weekDay.toString(); //得到第一天的CellId
		cellId = parseInt(cellId);

		var currentCellId = cellId + currentDay - 1;
		var currentCell = document.getElementById(currentCellId);
		currentCell.setAttribute('class', 'selected');
	}

}

// 获得当前月的下一个月，并打印
function nextMonth(){
    //从caption中获得当前显示时间
	var captionDate = getCaptionDate();
    //获得下一个月
    var nextMonth = getNextMonth(captionDate);

    //初始化：在打印之前，得把之前所有cell中的数据清空,(11-52)
    clearCell();

    //ִ执行核心打印程序
    printDate(nextMonth);

	//封装函数：获得date的下一个月
	function getNextMonth(date){
		var month = date.getMonth()+1;
		var year =  date.getFullYear();
		var dateString = '';
		if (month == 12) {
			year = year +1;
			dateString = 1 + "/" + 1 + "/"+ year;
			return new Date(dateString);
		} else {
			month = month +1;
			dateString = month + "/" + 1 + "/"+ year;
			return new Date(dateString);
		}
	}
}
	
// 获得当前月的上一个月，并打印
function prevMonth(){
    //从caption中获得当前显示时间
    var captionDate = getCaptionDate();
    //获得上一个月
    var previousDate = getPreviousDate(captionDate);
	//初始化：在打印之前，得把之前所有cell中的数据清空,(11-52)
	clearCell();
    //ִ执行核心打印程序
    printDate(previousDate);
    //封装函数：获得date的上一个月
	function getPreviousDate(date){
		var year = date.getFullYear();
		var month = date.getMonth();
		if (date.getMonth() !== 0 ) {   //不要写成date.getMonth！不然会得到构造函数
			return new Date(month + "/" + 1 + "/" + year);
		} else {
			year = year - 1;
			return new Date(12 + "/" + 1 +  "/" + year);
		}
	}

}

// 点击今，返回到今天
function today() {
    //初始化：在打印之前，得把之前所有cell中的数据清空,(11-52)
    clearCell();
    //ִ执行核心打印程序
    printDate(new Date());
}

// 封装函数，供nextMonth()和prevMonth()调用
function getCaptionDate(){
    var captionString = document.getElementById("caption-title").innerHTML;
    var captionYear = captionString.slice(0, 4); //得到年
    var captionMonth = captionString.replace(/&nbsp;/g, '').slice(4);
    captionMonth = captionMonth.replace(/\D/g, '');	//得到月
    return new Date(captionMonth + "/" + 1 + "/"+ captionYear);
}

// 封装函数，供nextMonth()和prevMonth()调用
function clearCell(){
    var clearIndex = 11;
    var clearCell = document.getElementById(clearIndex.toString());
    while (clearIndex <= 52) {
        clearCell.innerHTML = "&nbsp;";
        ++clearIndex;
        clearCell = document.getElementById(clearIndex.toString());
    }
}


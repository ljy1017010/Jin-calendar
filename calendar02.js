		// 还可以加上浏览器前后退按钮事件
		//加上换肤
		//加上3D
		//加上笔记记录
		//加上节气，节日

		// 封装函数，给其一个日期，打印出该日期到日历页面上。
		function printDate(date) {
			/* 设置当天的背景为棕色 */
			//单独设置一个日期用于记录现在时间。以免被下面的setDate()所污染，因为date是引用类型的。
			var dateForBackground = new Date(date.getTime()); 
			//初始化：判断一下，如果是当前月，就加上背景，如果不是，取消之前设置的背景
			if ( dateForBackground.getMonth() == (new Date()).getMonth() && dateForBackground.getFullYear() == (new Date()).getFullYear() ){
				//先取消样式，再设置样式。
				cancelStyle();
				setCurrentDayBackground(new Date());				
			} else {
				cancelStyle();
			}

			/*	写出当月的日期	*/		
			function currentMonth(date){
				var firstDay = new Date(date.setDate(1));   //取得该月的第一天
				var week = firstDay.getDay();						//该月的第一天是星期几
				var cellId = "";

				//写入该月第一天
				if (week !== 0){
					cellId = "1" + week.toString();
				} else {
					cellId = "17";		//判断一下，如果week刚好是0，那么cellID为17.
				}
				var  x = document.getElementById(cellId);		// cellId为字符串和数字都可以
				x.innerHTML = 1;

				var startCellId = parseInt(cellId);
				var endCellId = getSumDay(date) +startCellId;

				cellId=parseInt(cellId) + 1;

				//从该月第二天开始循环写入
				for (var dayNumber=2; cellId<endCellId; ++dayNumber, ++cellId) {
					var y = document.getElementById(cellId);
					y.innerHTML = dayNumber;
				}
			
			}
			currentMonth( new Date(date.getTime()) );  //最好这样做，防止污染date

			//Desc:	将该月尾部的日期写上去	
			function headOfNextMonth() {
				var indexEnd = 52;
				var nullSum = 0;
				var y = document.getElementById(indexEnd);
		
				/* 先获得需要写入的第一个cell的下标indexEnd和需要写入的总数量nullSum */
				for (; y.innerHTML=="&nbsp;"; ) {
					++nullSum;
					--indexEnd;
					y = document.getElementById(indexEnd);
				}

				/* 再写入 */
				indexEnd = indexEnd + 1;
				var dateNum = 1;
				for (; nullSum>0; ) {
					y = document.getElementById(indexEnd);
					y.style.color="#b6b6b6";	//将不是本月的日期颜色变灰
					y.innerHTML = dateNum;
					--nullSum;		
					++dateNum;	
					++indexEnd; 
				}
			}
			headOfNextMonth();

			/*	Desc:	将该月头部的日期写上去 */	
			function tailOfPreviousMonth(date){
				//先获取要写入的第一个下标位置indexStart和要写入的总数nullSum
				var indexStart = 11;
				var nullSum = 0;
				var y = document.getElementById(indexStart);
				for(; y.innerHTML == "&nbsp;"; ) {
					++indexStart;
					++nullSum;
					y = document.getElementById(indexStart);
				}

				/*  再写入 */
				// 获得上一月的最后一天
				var preMonth = "";
				var preDateString = "";

				 //一定要注意跨年的情况
				if ( date.getMonth() !== 0){
					preMonth = date.getMonth(); 
					preDateString = preMonth + "/" + 1 + "/"+ date.getFullYear();
				} else {
					preDateString = 12 +  "/" + 1 + "/"+ (date.getFullYear() - 1); 
				}
				var preDate = new Date(preDateString);
				var dateEnd = getSumDay(preDate);

				indexStart = indexStart - 1;
			
				for (; nullSum>0; ) {
					y = document.getElementById(indexStart);
					y.style.color="#b6b6b6"; //将不是本月的日期颜色变灰
					y.innerHTML = dateEnd;
					--dateEnd;
					--nullSum;
					--indexStart; 
				}
			
			}
			tailOfPreviousMonth( new Date(date.getTime()) );

			// 写上Caption
			function writeCaption(){
				y = document.getElementById("caption");
				y.innerHTML = date.getFullYear() + "年" + " " + getMonthString(date);

				function getMonthString(date) {
					switch ( date.getMonth() ) {
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

			//   ***** 功能函数： 获取该月有多少天 *****
			function getSumDay(date) {
				//var date = new Date();
				var dayNumber = 1;											//日号
				var monNumber = date.getMonth();				//月号
				var sum = 0;

				//给新日期初始化
				var newDate = new Date(date.setDate(1));
				var newMonNumber = newDate.getMonth(); 
			
				//只要月份相等，说明还在该月中，继续循环，直到下一个月
				for ( ;  newMonNumber == monNumber; ) {
					newDate = new Date(newDate.setDate(dayNumber));   
					newMonNumber = newDate.getMonth();

					++dayNumber;
					++sum;
				}
				sum = sum - 1;
				return sum;
			}

			//   *** 功能函数，将当前天的背景设置为棕色 ***
			function setCurrentDayBackground(date) {
				var currentDay = date.getDate();	// 必须在date.setDate(1)调用前执行，防止污染。

				var firstDay = new Date(date.setDate(1));   //取得该月的第一天
				var week = firstDay.getDay();						//该月的第一天是星期几
				var cellId = "1" + week.toString();				//得到第一天的CellId
				cellId = parseInt(cellId);

				var currentCellId = cellId + currentDay - 1;
				var currentCell = document.getElementById(currentCellId);	
				currentCell.style.background = "#ead1bc";
				currentCell.style.borderRadius = "50px";		
			}
			//   *** 功能函数，取消所有cell的背景, 还得将之前设置的非本月（头和尾巴上的）日期的样式移除，防止污染。***
			function cancelStyle(){
				var clearIndex = 11; 
				var clearCell = document.getElementById(clearIndex.toString());
				for (; clearIndex <= 52; ) {
					clearCell.removeAttribute("style");
					++clearIndex;
					clearCell = document.getElementById(clearIndex.toString());
				}
			}
			
		}

		/* Desc：获得当前月的下一个月，并打印 */
		function nextMonth(){		
			var x = document.getElementById("caption");
			var captionString = x.innerHTML;
			var captionYear = captionString.replace(/\s/g, "").slice(0, 4); //得到年
			var captionMonth = captionString.replace(/\s/g, "").slice(4);
			captionMonth = captionMonth.replace(/\D/g, "");	//得到月

			var captionDateString = captionMonth + "/" + 1 + "/"+ captionYear;
			var captionDate = new Date(captionDateString);

			// 封装功能：获得date的下一个月
			function getNextMonth(date){
				var month = date.getMonth()+1;
				var year =  date.getFullYear();
				var dateString = "";
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

			//每次点击都获得了当前月的下一个月
			var nextDate = getNextMonth( new Date(captionDate.getTime()) );

			//初始化：在打印之前，得把之前所有cell中的数据清空,(11-52)
			function clearCell(){
				var clearIndex = 11; 
				var clearCell = document.getElementById(clearIndex.toString());
				for (; clearIndex <= 52; ) {
					clearCell.innerHTML = "&nbsp;";
					++clearIndex;
					clearCell = document.getElementById(clearIndex.toString());
				}
			}
			clearCell();

			//执行一样的打印日期的程序。
			printDate( new Date(nextDate.getTime()) );
			
		}
	
		/* Desc：获得当前月的上一个月，并打印 */
		function previousMonth(){
			var x = document.getElementById("caption");
			var captionString = x.innerHTML;
			var captionYear = captionString.replace(/\s/g, "").slice(0, 4); //得到年
			var captionMonth = captionString.replace(/\s/g, "").slice(4);
			captionMonth = captionMonth.replace(/\D/g, "");	//得到月

			var captionDateString = captionMonth + "/" + 1 + "/"+ captionYear;
			var captionDate = new Date(captionDateString);
			
			//初始化：在打印之前，得把之前所有cell中的数据清空,(11-52)
			function clearCell(){
				var clearIndex = 11; 
				var clearCell = document.getElementById(clearIndex.toString());
				for (; clearIndex <= 52; ) {
					clearCell.innerHTML = "&nbsp;";
					++clearIndex;
					clearCell = document.getElementById(clearIndex.toString());
				}
			}
			clearCell();

			// 封装功能：获得date的上一个月
			function getPreviousDate(date){
				var year = date.getFullYear();
				var month = date.getMonth();
				var dateString = "";
				if (date.getMonth() !== 0 ) {   // 注意：不要写成date.getMonth！这是一个方法，不然会得到构造函数，会出现奇怪问题。
					dateString = month + "/" + 1 + "/" + year;
					return new Date(dateString);
				} else {
					year = year - 1;
					dateString = 12 + "/" + 1 +  "/" + year;
					return new Date(dateString);
				}
			}
			var previousDate = getPreviousDate( new Date(captionDate.getTime()) );
			//执行一样的打印日期的程序。
			//console.log(previousDate);
			printDate( new Date(previousDate.getTime()) );

		}
		

		// �����Լ��������ǰ���˰�ť�¼�
		//���ϻ���
		//����3D
		//���ϱʼǼ�¼
		//���Ͻ���������

		// ��װ����������һ�����ڣ���ӡ�������ڵ�����ҳ���ϡ�
		function printDate(date) {
			/* ���õ���ı���Ϊ��ɫ */
			//��������һ���������ڼ�¼����ʱ�䡣���ⱻ�����setDate()����Ⱦ����Ϊdate���������͵ġ�
			var dateForBackground = new Date(date.getTime()); 
			//��ʼ�����ж�һ�£�����ǵ�ǰ�£��ͼ��ϱ�����������ǣ�ȡ��֮ǰ���õı���
			if ( dateForBackground.getMonth() == (new Date()).getMonth() && dateForBackground.getFullYear() == (new Date()).getFullYear() ){
				//��ȡ����ʽ����������ʽ��
				cancelStyle();
				setCurrentDayBackground(new Date());				
			} else {
				cancelStyle();
			}

			/*	д�����µ�����	*/		
			function currentMonth(date){
				var firstDay = new Date(date.setDate(1));   //ȡ�ø��µĵ�һ��
				var week = firstDay.getDay();						//���µĵ�һ�������ڼ�
				var cellId = "";

				//д����µ�һ��
				if (week !== 0){
					cellId = "1" + week.toString();
				} else {
					cellId = "17";		//�ж�һ�£����week�պ���0����ôcellIDΪ17.
				}
				var  x = document.getElementById(cellId);		// cellIdΪ�ַ��������ֶ�����
				x.innerHTML = 1;

				var startCellId = parseInt(cellId);
				var endCellId = getSumDay(date) +startCellId;

				cellId=parseInt(cellId) + 1;

				//�Ӹ��µڶ��쿪ʼѭ��д��
				for (var dayNumber=2; cellId<endCellId; ++dayNumber, ++cellId) {
					var y = document.getElementById(cellId);
					y.innerHTML = dayNumber;
				}
			
			}
			currentMonth( new Date(date.getTime()) );  //�������������ֹ��Ⱦdate

			//Desc:	������β��������д��ȥ	
			function headOfNextMonth() {
				var indexEnd = 52;
				var nullSum = 0;
				var y = document.getElementById(indexEnd);
		
				/* �Ȼ����Ҫд��ĵ�һ��cell���±�indexEnd����Ҫд���������nullSum */
				for (; y.innerHTML=="&nbsp;"; ) {
					++nullSum;
					--indexEnd;
					y = document.getElementById(indexEnd);
				}

				/* ��д�� */
				indexEnd = indexEnd + 1;
				var dateNum = 1;
				for (; nullSum>0; ) {
					y = document.getElementById(indexEnd);
					y.style.color="#b6b6b6";	//�����Ǳ��µ�������ɫ���
					y.innerHTML = dateNum;
					--nullSum;		
					++dateNum;	
					++indexEnd; 
				}
			}
			headOfNextMonth();

			/*	Desc:	������ͷ��������д��ȥ */	
			function tailOfPreviousMonth(date){
				//�Ȼ�ȡҪд��ĵ�һ���±�λ��indexStart��Ҫд�������nullSum
				var indexStart = 11;
				var nullSum = 0;
				var y = document.getElementById(indexStart);
				for(; y.innerHTML == "&nbsp;"; ) {
					++indexStart;
					++nullSum;
					y = document.getElementById(indexStart);
				}

				/*  ��д�� */
				// �����һ�µ����һ��
				var preMonth = "";
				var preDateString = "";

				 //һ��Ҫע���������
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
					y.style.color="#b6b6b6"; //�����Ǳ��µ�������ɫ���
					y.innerHTML = dateEnd;
					--dateEnd;
					--nullSum;
					--indexStart; 
				}
			
			}
			tailOfPreviousMonth( new Date(date.getTime()) );

			// д��Caption
			function writeCaption(){
				y = document.getElementById("caption");
				y.innerHTML = date.getFullYear() + "��" + " " + getMonthString(date);

				function getMonthString(date) {
					switch ( date.getMonth() ) {
						case 0: 
							return "1��";
							break;
						case 1: 
							return "2��";
							break;
						case 2: 
							return "3��";
							break;
						case 3: 
							return "4��";
							break;
						case 4: 
							return "5��";
							break;
						case 5: 
							return "6��";
							break;	
						case 6: 
							return "7��";
							break;
						case 7: 
							return "8��";
							break;
						case 8: 
							return "9��";
							break;
						case 9: 
							return "10��";
							break;
						case 10: 
							return "11��";
							break;
						case 11: 
							return "12��";
							break;	
						default: 
							return "error";
							break;	
					}
				}		
			}
			writeCaption();

			//   ***** ���ܺ����� ��ȡ�����ж����� *****
			function getSumDay(date) {
				//var date = new Date();
				var dayNumber = 1;											//�պ�
				var monNumber = date.getMonth();				//�º�
				var sum = 0;

				//�������ڳ�ʼ��
				var newDate = new Date(date.setDate(1));
				var newMonNumber = newDate.getMonth(); 
			
				//ֻҪ�·���ȣ�˵�����ڸ����У�����ѭ����ֱ����һ����
				for ( ;  newMonNumber == monNumber; ) {
					newDate = new Date(newDate.setDate(dayNumber));   
					newMonNumber = newDate.getMonth();

					++dayNumber;
					++sum;
				}
				sum = sum - 1;
				return sum;
			}

			//   *** ���ܺ���������ǰ��ı�������Ϊ��ɫ ***
			function setCurrentDayBackground(date) {
				var currentDay = date.getDate();	// ������date.setDate(1)����ǰִ�У���ֹ��Ⱦ��

				var firstDay = new Date(date.setDate(1));   //ȡ�ø��µĵ�һ��
				var week = firstDay.getDay();						//���µĵ�һ�������ڼ�
				var cellId = "1" + week.toString();				//�õ���һ���CellId
				cellId = parseInt(cellId);

				var currentCellId = cellId + currentDay - 1;
				var currentCell = document.getElementById(currentCellId);	
				currentCell.style.background = "#ead1bc";
				currentCell.style.borderRadius = "50px";		
			}
			//   *** ���ܺ�����ȡ������cell�ı���, ���ý�֮ǰ���õķǱ��£�ͷ��β���ϵģ����ڵ���ʽ�Ƴ�����ֹ��Ⱦ��***
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

		/* Desc����õ�ǰ�µ���һ���£�����ӡ */
		function nextMonth(){		
			var x = document.getElementById("caption");
			var captionString = x.innerHTML;
			var captionYear = captionString.replace(/\s/g, "").slice(0, 4); //�õ���
			var captionMonth = captionString.replace(/\s/g, "").slice(4);
			captionMonth = captionMonth.replace(/\D/g, "");	//�õ���

			var captionDateString = captionMonth + "/" + 1 + "/"+ captionYear;
			var captionDate = new Date(captionDateString);

			// ��װ���ܣ����date����һ����
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

			//ÿ�ε��������˵�ǰ�µ���һ����
			var nextDate = getNextMonth( new Date(captionDate.getTime()) );

			//��ʼ�����ڴ�ӡ֮ǰ���ð�֮ǰ����cell�е��������,(11-52)
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

			//ִ��һ���Ĵ�ӡ���ڵĳ���
			printDate( new Date(nextDate.getTime()) );
			
		}
	
		/* Desc����õ�ǰ�µ���һ���£�����ӡ */
		function previousMonth(){
			var x = document.getElementById("caption");
			var captionString = x.innerHTML;
			var captionYear = captionString.replace(/\s/g, "").slice(0, 4); //�õ���
			var captionMonth = captionString.replace(/\s/g, "").slice(4);
			captionMonth = captionMonth.replace(/\D/g, "");	//�õ���

			var captionDateString = captionMonth + "/" + 1 + "/"+ captionYear;
			var captionDate = new Date(captionDateString);
			
			//��ʼ�����ڴ�ӡ֮ǰ���ð�֮ǰ����cell�е��������,(11-52)
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

			// ��װ���ܣ����date����һ����
			function getPreviousDate(date){
				var year = date.getFullYear();
				var month = date.getMonth();
				var dateString = "";
				if (date.getMonth() !== 0 ) {   // ע�⣺��Ҫд��date.getMonth������һ����������Ȼ��õ����캯���������������⡣
					dateString = month + "/" + 1 + "/" + year;
					return new Date(dateString);
				} else {
					year = year - 1;
					dateString = 12 + "/" + 1 +  "/" + year;
					return new Date(dateString);
				}
			}
			var previousDate = getPreviousDate( new Date(captionDate.getTime()) );
			//ִ��һ���Ĵ�ӡ���ڵĳ���
			//console.log(previousDate);
			printDate( new Date(previousDate.getTime()) );

		}
		

/***
* TEQ JS
* PLUGINS Number
*
*
*
**/
'use strict';

(function () {
	
	var TeqNumber = {
		
		random : function (min,max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
		between : function (number, start, finish) {
			number = Number(number);
			start = Number(start);
			finish = Number(finish);
			return (start < finish) && (number  > start  && number  < finish);	
		}
	};
	t.number = TeqNumber;
}());
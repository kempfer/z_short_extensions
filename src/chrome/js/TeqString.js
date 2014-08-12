/***
* TEQ JS
* PLUGINS String
*
*
*
**/
'use strict';

(function () {

	var 
		arrayChars = [
			'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
			'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
			'0','1','2','3','4','5','6','7','8','9'
		],
		arraySpecialChars = ['!','@','#','$','%','^','&','*','(',')','-','+','=',']','[',':',';','?','>','<','"',"'",'|','\\','/'],
		entitiesHtmlEncode = {
			'&': '&amp;',
			'>': '&gt;',
			'<': '&lt;',
			'"': '&quot;',
			"'": '&#039;'
		},
		entitiesHtmlDecode = {
			'&amp;': '&',
            '&gt;': '>',
            '&lt;': '<',
            '&quot;': '"',
			'&#039;' : "'"
		},
		htmlEncodeReg = function() {
			var keys = [], p;
			for (p in entitiesHtmlEncode) {
				keys.push(p);
			}			
			return RegExp('(' + keys.join('|') + ')', 'g');	
		},
		htmlDecodeReg = function () {
			var keys = [], p;
			for (p in entitiesHtmlDecode) {
				keys.push(p);
			}        
			return  new RegExp('(' + keys.join('|') + '|&#[0-9]{1,5};' + ')', 'g');
		};
	
	var TeqString = {	
		
		htmlEncode : function(value) {
			return (!value) ? value : String(value).replace(htmlEncodeReg(), function(match, capture) {
				return entitiesHtmlEncode[capture];    
			});
		},
		htmlDecode : function (value) {
			return (!value) ? value : String(value).replace(htmlDecodeReg(), function(match, capture) {
                if (capture in entitiesHtmlDecode) {
                    return entitiesHtmlDecode[capture];
                } 
				else {
                    return String.fromCharCode(parseInt(capture.substr(2), 10));
                }
            });
		},
		contains: function (string, substr) {
			return string ? string.indexOf( substr ) >= 0 : false;
        },
		random : function (countChart,includeSpecial){
			var currentArrayChars, size, randomArrayChars,
				randomString = '';
			randomArrayChars = arrayChars;
			if(includeSpecial){
				randomArrayChars = t.array.merge(randomArrayChars,arraySpecialChars);
			}
			currentArrayChars = t.array.shuffle(randomArrayChars);
			size = currentArrayChars.length;			
			while(countChart--) {
				randomString += randomArrayChars[Math.floor(Math.random() * size)];
			}
			return randomString;
		},
		/**
         * Converts the first character of a string to lower case
         * @param {string} str
         * @returns {string}
         */
		lcfirst : function (str) {
			return str ? str.charAt(0).toLowerCase() + str.substr(1) : '';
		},
		/**
         * Converts the first character of a string to uppercase
         * @param {string} str
         * @returns {string}
         */
		ucfirst: function (str) {
			return str ? str.charAt(0).toUpperCase() + str.substr(1) : '';
		}
	};
	t.string = TeqString;
}());
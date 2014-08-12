/***
* TEQ JS
* PLUGINS AJAX
*
*
*
**/

(function () {
	var 
		stringify = function (object) {
			if (!object) return '';
			if(typeof window.FormData != "undefined"){
                if(object instanceof window.FormData) return object;
            }
			if (typeof object == 'string' || typeof object == 'number') return String( object );

			var array = [], e = encodeURIComponent;
			for (var i in object) if (object.hasOwnProperty(i)) {
				array.push( e(i) + '=' + e(object[i]) );
			}
			return array.join('&');
		},
		headers = {
				'X-Requested-With': 'XMLHttpRequest',
				'Accept': 'text/javascript, text/html, application/xml, text/xml, */*',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		prepareUrl = function (url,method,data,cache) {		
			if (method == 'GET' && data) {
				url += (url.indexOf( '?' ) == -1 ? '?' : '&') + data;
			}
			if (!cache) {				
				url += (url.indexOf( '?' ) == -1 ? '?' : '&') + 'rand=' + Date.now();
			}	
			return url;
		},
		prepareConfig = function (params) {
			var config = t.combine(TeqAjax.defaultParamas,params);
			config.headers = t.combine(TeqAjax.defaultParamas.headers,params.headers);
			if(config.file){
				delete(config.headers['Content-Type']);
			}
			return config;
		},
		TeqAjax = function (params) {
			var config, url, method, headers,data;
			var xhr = new XMLHttpRequest();			
			config = prepareConfig(params);
			method = config.method.toUpperCase();				
			data = stringify(config.data);
			url = prepareUrl(config.url,method,data,config.cache);			
			xhr.open(method, url, config.async);
			for(var key in config.headers){
				xhr.setRequestHeader(key,config.headers[key]);
			}
			if(config.async){
				xhr.timeout = config.timeout;
			}			
			xhr.onreadystatechange = TeqAjax.onready(xhr, config);
			xhr.onprogress = config.onProgress;
			xhr.onabort = config.onAbort;
			xhr.send( method == 'POST' && data ? data : null );
		};		
		TeqAjax.defaultParamas = {
			timeout : 30000,
			type    : 'json',
			file    : false,
			method  : 'POST',
			async	: true,
			data    : {},
			headers : headers,
			cache   : false,
			url     : location.href,
			onAbort : t.emptyFunc,
			onProgress : t.emptyFunc,
			onReady : t.emptyFunc,
			onError : t.emptyFunc
		};
		TeqAjax.onready = function (xhr, config) {		
			return function (e) {
				if (xhr.readyState == 4) {				
					if (xhr.status == 200) {
						var result = xhr.responseText;
						if(config.type.toUpperCase() == 'JSON'){
							result = t.decode(result);
						}	
						config.onReady(result);
					}
					else{		
						var result = xhr.responseText;					
						config.onError(xhr.status,result);
					}				
				}
			}
		}
		Teq.ajax = TeqAjax;
}());
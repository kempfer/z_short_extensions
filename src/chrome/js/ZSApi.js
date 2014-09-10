t.Class.define('zs.api',{
	init : function (key,secret) {
		//console.log(key);
		//console.log(secret);
	},
	createShortUrl : function (longUrl) {
		return this.__send('link',{long_link: longUrl}, 'POST');
	},
	__send : function (url,data,method,headers) {
		return t.promise(function (resolve,reject) {
			t.ajax({
				method : method,
				data : data,
				url : 'http://zshort.zotmax.magnusega.com/' + url,
				onReady : function (response) {
					resolve(response);
				},
				onError : function () {
					reject();
				}
			});
		});
	}
});
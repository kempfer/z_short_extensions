t.dom.onReady(function () {	
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		if(!t.isEmpty(tabs[0]) && !t.isEmpty(tabs[0].url)){
			t.dom('#long_link').val(tabs[0].url);
		}
	});
	
	//var hmac = Crypto.HMAC(Crypto.SHA1, "Message", "Secret Passphrase", { asString: true });
	//console.log(window.btoa(hmac));
	var api = new zs.api("faf","asfa");
	t.dom("#button_create_link").bind('click', function () {
		var longLink = t.dom('#long_link').val();
		api.createShortUrl(longLink).then(function (response) {
			t.dom('#long_link').removeAttr('disabled');
            t.dom('#button_create_link').removeAttr('disabled');
			t.dom('#response').html = response.data['short'];
			t.dom('#response').css('display','block');
			console.log(response.data['short']);
		});
	});
	
	
});
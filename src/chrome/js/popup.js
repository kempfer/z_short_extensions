t.dom.onReady(function () {
	console.log('onReady');
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		if(!t.isEmpty(tabs[0]) && !t.isEmpty(tabs[0].url)){
			t.dom('#long_link').val(tabs[0].url);
		}
	});
});
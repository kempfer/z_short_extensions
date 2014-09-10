(function () {
	'use strict';
	
	var globalScope = (typeof window === 'undefined') ? this : window,
	all;
	if (globalScope.Promise) {
		if (typeof globalScope.Promise.all !== 'function') {
			all = function (iterable) {
				var count = 0, results = [], resolve, reject;
				var promise = new t.Promise(function (resolve_, reject_) {
					resolve = resolve_;
					reject = reject_;
				});
				iterable.forEach(function (p, i) {
					count++;
					p.then(function (result) {
						results[i] = result;
						count--;
						if (count === 0) {
							resolve(results);
						}
					}, reject);
				});
				if (count === 0) {
					resolve(results);
				}
				return promise;
			}
		}
		else{
			all = Promise.all;
		}
	}
	
	
	var TeqPromise = function (resolver) {
        if (! (this instanceof TeqPromise)) {
            return new TeqPromise(resolver);
        }

		return new Promise(function (resolve_, reject_) {
			var resolve , reject;
			if(typeof resolve_ != "function" && typeof resolve_ == "object"){
				resolve = resolve_.resolve;
				reject = resolve_.reject;
			}
			else{
				resolve = resolve_;
				reject = reject_;
			}
			return resolver(resolve,reject);
		});		
	};
	TeqPromise.prototype = {
		constructor : TeqPromise,
		all : all
	};
	t.promise = TeqPromise;
})();
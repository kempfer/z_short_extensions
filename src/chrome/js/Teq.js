/**
* TEQ JS
*/
var Teq = {

	/**
	*
	*
	**/
	uniqueId : (function() {
		var id = 0;
		return function(){ return id++; };
	})(),
	/**
	*
	*
	**/
	isFunction : function (item) {
		return typeof item === "function" ;
	},
	/**
	*
	*
	**/
	isArray : function (item) {
		return Array.isArray(item);
	},
	/**
	*
	*
	**/
	toArray : function (item) {
		return Array.prototype.slice.call(item);
	},
    isArrayLike : function (item) {
        return item && (t.isArray(item) || (
                typeof item != 'string' &&
                !t.isFunction(item) &&
                typeof item.nodeName != 'string' &&
                typeof item.length == 'number'
        ));
    },
	/**
	*
	*
	**/
	isArrayLike: function (item) {
		return item && (Array.isArray(item) || (
				typeof item != 'string' &&
				!t.isFunction(item) &&
				typeof item.nodeName != 'string' &&
				typeof item.length == 'number'
		));
	},
	/**
	*
	*
	**/
	isEmpty : function (item) {
		return 	(item === false ) 									||
				(item === 0) 										||
				(item === null)										||
				(item === undefined )								||
				(Teq.isArray(item) && item.length === 0) 			||
				(t.isObject(item) && Object.keys(item).length === 0);
	},
	/**
	*
	*
	**/
	accessor : function (callbacks) {
		return function (key, val) {
			if(typeof val === 'undefined' && typeof key !== 'object'){
				return callbacks.get.call(this,key);
			}
			else {
				var object = key;
				if (typeof object !== 'object') {
					object = {};
					object[key] = val;
				}
				for(var index in object){
					callbacks.set.call(this,index,object[index]);
				}
			}
		}
	},
	/**
	*
	*
	**/
	isObject : function (o) {
		return Object.prototype.toString.call(o) === '[object Object]' ;
	},
	/**
	*
	*
	**/
	isString : function (v) {
		return typeof v === "string";
	},
	/**
	*
	*
	**/
	isBoolean : function (v) {
		return typeof v === "boolean";
	},
	/**
	*
	*
	**/
	isNumber : function (v) {
		return typeof v === "number" && isFinite(v);
	},
	/**
	*
	*
	**/
	isset : function () {
		if (arguments.length === 0){
			return false;
		}
		var tmp = arguments[0];
		return  (typeof tmp === 'undefined') ? false : true;
	},
	/**
	*
	*
	**/
	encode : function (data) {
		try{
			return JSON.stringify(data);
		}
		catch(e){
			return false;
		}
	},
	/**
	*
	*
	**/
	decode : function (data) {
		try{
			return JSON.parse(data);
		}
		catch(e){
			return false;
		}
	},
	/**
	*
	*
	**/
	combine : function (obj,options) {
		var newObj = {};
		for(var i in obj){
			newObj[i] = obj[i];
		}
		for(var key in options){
			newObj[key] = options[key];
		}
		return newObj;
	},
	/**
	*
	*
	**/
	emptyFunc : function () {},
	/**
	*
	*
	**/
	contains : function  (array, element) {
		return array.indexOf(element) >= 0;
	},
	/**
	*
	*
	**/
	expand : function (elem, from) {
		
	},
	/**
	*
	*
	**/
	append : function (name,object) {

	},
	globalScope : (typeof window === 'undefined') ? this : window,
	
	lambdaFunc : function (value) { 
		return function () { 
			return value; 
		}
	},
};
window.t = Teq;
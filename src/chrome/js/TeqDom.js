/***
* TEQ JS
* PLUGINS DOM
*
*
*
**/

(function (window, document) {
	var 
		ready = false;
		
		regexpSelector = {
			findTag  	: /^[-_a-z0-9]+$/i,
			findClass	: /^\.[-_a-z0-9]+$/i,
			findId   	: /^#[-_a-z0-9]+$/i
		},
		onReadyList = [],
		camelCase = function (str) {
			return String(str).replace(/-\D/g, function(match){
				return match[1].toUpperCase();
			});
		},
		hyphenate = function (str) {
			return String(str).replace(/[A-Z]/g, function(match){
				return '-' + match[0].toLowerCase();
			});
		},
		ignoreCssPostfix =  {
			zIndex: true,
			fontWeight: true,
			opacity: true,
			zoom: true,
			lineHeight: true
		},		
		
		readyFunc = function () {
			if(ready === true){
				return true;
			}
			ready = true;
			for(var i = 0; i < onReadyList.length;){				
				onReadyList[i++]();					
			}
			onReadyList = [];
		},
		findParentByStep = function (node, step) {
			if (step == null || step < 0){
				step = 1;
			}
			if (!node || step <= 0){
				return t.dom(node);
			}			
			return findParentByStep(node.parentNode, step-1);
		};
		
		document.addEventListener('DOMContentLoaded', readyFunc, false);
		window.addEventListener('load', readyFunc, false);
		
		var TeqDom = function (selector,context) {
			if (! (this instanceof TeqDom)) {
				return new TeqDom(selector);
			}

			if (!arguments.length) {
				this.nodes = [document];
				return this;
			}
			
			var context = context || document;
			
			var nodes = this.nodes =
				typeof selector == 'string' ? TeqDom.query(selector,context) :
				selector == window          ? [ document ] : 				
				selector instanceof TeqDom  ? t.toArray(selector.nodes) :				
				TeqDom.isElement(selector)  ? [selector] :
				t.isArray(selector)  		? t.toArray(selector) :
				[];
			return this;
		}
		
		TeqDom.prototype = {
			constructor: TeqDom,
			nodes: [],
			get : function (index) {
				return this.nodes[Number(index) || 0];
			},
			get length() {
				return this.nodes ? this.nodes.length : 0;
			},
			get first() {
				return this.nodes[0];
			},
			get body() {
				return t.dom('body');
			},
			children : function (index) {
				var childs = t.toArray(this.first.childNodes);				
				if(index == null){
					var result = [];
					childs.forEach(function (child){
						if(t.dom.isElement(child)){
							result.push(child); 
						}						
					});					
					return t.dom(result);
				}
				else {
					return t.dom(childs[Number(index) || 0]);
				}				
			},
			each : function (func) {
				this.nodes.forEach(func.bind(this));
				return this;
			},
			_actionsClasses  : function (names,action) {
				var classNames = (!t.isArray(names)) ? [names] : names;
				return this.each(function (node) {					
					for (var key in classNames) {
						switch (action) {
							case 'add' :							
								node.classList.add(classNames[key]);								
							break;
							case 'remove' :
								node.classList.remove(classNames[key]);								
							break;
							case 'toggle' : 
								node.classList.toggle(classNames[key]);								
							break;
						}						
					}
				})
			},
			addClass : function (className) {
				return this._actionsClasses(className, 'add');
			},
			removeClass : function (className) {
				return this._actionsClasses(className, 'remove');
			},
			toggleClass : function (className) {
				return this._actionsClasses(className, 'toggle');
			},
			hasClass : function (className) {
				var result = false;
				this.each(function (node) {
					result =  node.classList.contains(className);
					if(result === true){
						return;
					}
				});
				return result;
			},
			attr : t.accessor({
				get : function (key) {
					return this.first.getAttribute(key);
				},
				set : function (key,val) {							
					var e = this.nodes, i = e.length;
					while (i--) {
						e[i].setAttribute(key, val);
					}
				}
			}),
			get html () {
				return this.first.innerHTML;
			},
			set html (value) {
				this.first.innerHTML = value;
				return this;
			},
			get text () {
				var property = document.body.innerText == null ? 'textContent' : 'innerText';
				return this.first[property];
			},
			set text (text) {
				var property = document.body.innerText == null ? 'textContent' : 'innerText';
				this.first[property] = text;
				return this;
			},
			css : t.accessor({
				get : function (key) {
					return window.getComputedStyle(this.first, "").getPropertyValue(hyphenate(key));
				},
				set : function (key,val) {							
					var e = this.nodes, i = e.length;
					while (i--) {
						if (typeof val == 'number' && !ignoreCssPostfix[key]) {
							val += 'px';
						}
						e[i].style[camelCase(key)] = val;
					}
				}
			}),
			get offset () {
				var node = this.first;
				if (node.offsetX != null) {
					return { x: node.offsetX, y: node.offsetY };
				}
				try {
					var box = node.getBoundingClientRect(),
						body    = document.body,
						docElem = document.documentElement,
						scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
						scrollTop  = window.pageYOffset || docElem.scrollTop  || body.scrollTop,
						clientLeft = docElem.clientLeft || body.clientLeft || 0,
						clientTop  = docElem.clientTop  || body.clientTop  || 0;

					return {
						x: Math.round(box.left + scrollLeft - clientLeft),
						y: Math.round(box.top  + scrollTop  - clientTop )
					};
				}
				catch(e){
					return null;
				}
			},
			get size () {
				var node = (this.first == document) ? document.body : this.first;
				var box = node.getBoundingClientRect();
				return {width : box.width, height : box.height}
			},
			bind : function (event,callback) {
				this.each(function (node) {
					node.addEventListener(event, callback, false);
				});
				return this;
			},
			unbind : function (event,callback) {
				this.each(function (node) {
					node.removeEventListener(event, callback, false);
				});
				return this;
			},			
			empty : function () {
				return this.each(function (node) {
					while (node.hasChildNodes()) {
						node.removeChild( node.firstChild );
					}
				});
			},
			parent : function(step) {
				return findParentByStep(this.first, step);
			},
			insertBefore: function (node) {
				var fr = document.createDocumentFragment();
				this.each(function (node) {
					fr.appendChild(node);
				});
				TeqDom(node).parent().first.insertBefore(fr, TeqDom(node).first);
				return this;
			},
			insertAfter : function (node) {
				var parent = TeqDom(node).parent().first;
				var next = TeqDom(node).first.nextSibling;
				var fr = document.createDocumentFragment();
				this.each(function (node) {
					fr.appendChild(node);
				});
				if (TeqDom.isElement(next)) {					
					parent.insertBefore(fr, next);
				} 
				else{
					parent.appendChild(fr);
				}
				return this;
			},
			append : function (node,index) {						
				if (index == null || !(this.children(index) instanceof TeqDom) || this.children(index).length == 0) {
					var fr = document.createDocumentFragment();
					node.each(function (node) {
						fr.appendChild(node);
					});
					this.first.appendChild(fr);
				}
				else{					
					t.dom(node).insertBefore(this.children(index));
				}
				return this;
			},
			clone : function (deep) {
				if(arguments.length <= 0){
					deep = true;
				}
				var clones = [];
				this.each (function (node) {
					clones.push(node.cloneNode(deep));
				});
				return t.dom(clones);
			},
			remove : function () {
				return this.each(function (node) {
					if (node.parentNode) {
						node.parentNode.removeChild(node);
					}
				});
			},
			find : function (selector) {
				var result = [],found;
				this.each(function (node) {
					found = t.dom.query(selector,node);				
					found.forEach(function (el) {
						result.push(el);
					});					
				});
				return new t.dom(result);
			},
			is : function (selector) {	
				if(!selector){
					return this.length > 0;
				}
				return t.dom.is(this.first, selector);
			}
		};
		
		TeqDom.query = function (selector,context) {		
			var currentContext = context.getElementById ? context : document;
			return 	selector.match(regexpSelector.findId)  		? [currentContext.getElementById(selector.substr(1))] :
					selector.match(regexpSelector.findClass) 	? Teq.toArray(context.getElementsByClassName(selector.substr(1))) :
					selector.match(regexpSelector.findTag)   	? Teq.toArray(context.getElementsByTagName  (selector)) :
																  Teq.toArray(context.querySelectorAll(selector));					
		};
		TeqDom.isElement = function (node) {
			return !!(node && node.nodeName);
		};
		TeqDom.onReady = function (readyCallback) {					
				ready ? setTimeout(readyCallback, 1) : onReadyList.push(readyCallback);
				return this;
		};
		TeqDom.create = function (tagName, attr) {
			var node = new TeqDom(document.createElement(tagName));
			if (attr){
				node.attr(attr);
			}
			return node;
		};
		TeqDom.is = function (selector,context) {			
			var node = t.dom.query(selector,context);
			return node.length > 0;
		};
		TeqDom.height = function () {
			return window.innerHeight;
		};
		TeqDom.width = function () {
			return window.innerWidth;
		};
		Teq.dom = TeqDom;
}(window, window.document));
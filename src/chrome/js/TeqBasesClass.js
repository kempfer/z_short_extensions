t.Class.define('t.Base.Class.Event',{
	
	$events : {},	
	
	on : function (name, fn){
		if (!this.$events[name]) {
			this.$events[name] = fn;
		}
		else if(t.isArray(this.$events[name])){
			 this.$events[name].push(fn);
		}
		else{
			this.$events[name] = [this.$events[name], fn];
		}
		return this;
	},
	/**
	*
	*
	*/
	removeListener : function (name, fn) {
		if (this.$events && this.$events[name]) {
			var list = this.$events[name];
			if(t.isArray(list)){
				var pos = -1;
				for (var i = 0, l = list.length; i < l; i++) {
					if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {
						pos = i;
						break;
					}
				}
				if (pos < 0) {
					return this;
				}
				list.splice(pos, 1);

				if (!list.length) {
					this.$events = t.array.remove(this.$events,name);
				}
			}
			else if (list === fn || (list.listener && list.listener === fn)){
				this.$events = t.array.remove(this.$events,name);
			}
		}
	},
   /**
	 * Removes all listeners for an event.
	 * @param {String} name
	 */
	removeAllListeners : function (name) {
		if (name === undefined) {
			this.$events = {};
			return this;
		}
		if (this.$events && this.$events[name]) {
		   this.$events[name] = null;
		}
		return this;
	},
   /**
	 * Gets all listeners for a certain event.
	 * @param {String} name	 
	 */
	getListeners : function (name) {
		if (!this.$events) {
			this.$events = {};
		}

		if (!this.$events[name]) { 
			this.$events[name] = [];
		}

		if (!t.isArray(this.$events[name])) {
			this.$events[name] = [this.$events[name]];
		}
        return this.$events[name];
	},
	/**
	* Fire Event
	* @param {String} name
	*/
	fire : function (name) {
		if (!this.$events) {
			return false;
		}
		var handler = this.$events[name];
		if (!handler) {
			return false;
		}
		var args = Array.prototype.slice.call(arguments, 1);
		if(typeof handler == "function"){            
			handler.apply(this, args);
		}
		else if (t.isArray(handler)) {
			var listeners = handler.slice();
			for (var i = 0, l = listeners.length; i < l; i++) {
				listeners[i].apply(this, args);
			}
		}
		else{
			return false;
		}
	}
});
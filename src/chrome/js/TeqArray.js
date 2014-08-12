/***
* TEQ JS
* PLUGINS Array
*
*
*
**/
'use strict';

(function (array) {
	var 
		splice = array.prototype.splice,
		slice = array.prototype.slice;
	var TeqArray = {
		is: t.isArray,
		last : function (el) {
			 return array.length ? array[array.length - 1] : null;
		},
		/**
         * Returns max value in array
         * @param {Array} el
         * @returns {Array}
         */
		max : function (el,comparisonFn) {
			var max = Math.max.apply(null, el);
			if(arguments.length == 1 && !isNaN(max)){
				return max;
			}
			else{
				max = el[0];
                var i, ln, item;
				for (i = 0, ln = el.length; i < ln; i++) {
					item = el[i];

					if (comparisonFn) {
						if (comparisonFn(max, item) === -1) {
							max = item;
						}
					}
					else {
						if (item > max) {
							max = item;
						}
					}
				}
				return max;
			}
		},
		/**
         * Returns min value in array
         * @param {Array} el
         * @returns {Array}
         */
		min : function (el,comparisonFn) {
			var min = Math.min.apply(null, el);
			if(arguments.length == 1 && !isNaN(min)){
				return min;
			}
			else{
				min = el[0];
				var i, ln, item;

				for (i = 0, ln = el.length; i < ln; i++) {
					item = el[i];

					if (comparisonFn) {
						if (comparisonFn(min, item) === 1) {
							min = item;
						}
					}
					else {
						if (item < min) {
							min = item;
						}
					}
				}
				return min;
			}
		},
		/**
         * Returns sum of all elements in array
         * @param {Array} el
         * @returns {number}
         */
        sum: function (el) {
			var summa = 0,
				i;
			for (i = 0; i < el.length; i++){
				summa += el[i];
			} 
			return summa;
        },
		/**
         * shuffle array
         * @param {Array} el
         * @returns {Array}
         */
		shuffle : function (el) {
			var currentIndex = el.length,
				temporaryValue, randomIndex;
			while(0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temporaryValue = el[currentIndex];
				el[currentIndex] = el[randomIndex];
				el[randomIndex] = temporaryValue;
			}
			return el;
		},
		/**
         * Check, if array contains elem
         * @param {Array} array
         * @param {*} elem         
         * @returns {boolean}
         */
        contains: t.contains,
		/**
         * Push element to array, if it doesn't contains such element
         * @param {Array} el
         * @param {*} item
         * @returns {Array} - el array
         */
		include : function (el,item) {
			if(!t.contains(el,item)){
				el.push(item)
			}
			return el;
		},
		/**
         * Remove item from array by value
         * @param {Array} el
         * @param {*} item
         * @returns {Array} - el array
         */
		remove : function (el,item) {
			var index = el.indexOf(item);
			if(index != -1){
				el.splice(index,1);
			}
			return el;
		},
		/**
         * Remove all item from array by value
         * @param {Array} el
         * @param {*} item
         * @returns {Array} - el array
         */
		removeAll : function (el,item) {
			for (var i = el.length; i--;) {
				if (el[i] == item) {
						el.splice( i, 1 );
				}
			}
			return el;
		},
        /**
         * Merge multiple arrays into one with unique items.
         *  
         * @param {Array} array1
         * @param {Array} array2
         * @param {Array} etc
         * @return {Array} merged
         */
        merge: function() {
			var args = slice.call(arguments),
                array = [],
                i, ln;

            for (i = 0, ln = args.length; i < ln; i++) {
                array = array.concat(args[i]);
            }

            return t.array.unique(array);
		},
		/**
         * Returns a new array with unique items
         *
         * @param {Array} array
         * @return {Array} results
         */
		unique : function (el) {
			var clone = [],
                i = 0,
                ln = el.length,
                item;
            for (; i < ln; i++) {
                item = el[i];
                if (clone.indexOf(item) === -1) {
                    clone.push(item);
                }
            }
            return clone;
		},
		empty: function (el) {
			el.length = 0;
			return el;
        },
		isEmpty : t.isEmpty,
		/**
         * Clone a flat array without referencing the previous one. Note that this is different
         * for Array.prototype.slice.call(array)
         *
         * @param {Array} array The array
         * @return {Array} The clone array
         */
        clone: function(el) {
            return slice.call(el);
        },
		/**
         * Filter through an array and remove empty item
         *    
         * @param {Array} el
         * @return {Array} results
         */
        clean: function(el) {
			return el.filter(function (item) { return !t.isEmpty(item)});
		},
		/**
         * Converts a value to an array if it's not already an array; returns:         *
         *
         * @param {Object} value The value to convert to an array if it's not already is an array
         * @param {Boolean} newReference (Optional) True to clone the given array and return a new reference if necessary,
         * defaults to false
         * @return {Array} array
         */
		 from: function (item) {
			if (item == null) return [];
			return (!t.isArrayLike(item)) ? [item] :
					array.isArray(item) ? item : slice.call(item);
        },
		/**
		 * Return random index
         * @param {Array} array
         * @returns number
         */
		randomIndex : function (array) {
			var count;
			count = array.length;
			if(count === 0){
				return null;
			}
			return t.number.random(0,count - 1);
		},
		/**
		 * Return random value
         * @param {Array} array
         * @returns {*}
         */
		random : function (array) {
			var count;
			count = array.length;
			if(count === 0){
				return null;
			}
			return array[t.array.randomIndex(array)];
		}

	};
	t.array = TeqArray;
}(window.Array));
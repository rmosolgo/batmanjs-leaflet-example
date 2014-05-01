/*!
 * jQuery JavaScript Library v2.1.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:10Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var trim = "".trim;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return a 'clean' array
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return just the object
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return obj - parseFloat( obj ) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Support: Firefox <20
		// The try/catch suppresses exceptions thrown when attempting to access
		// the "constructor" property of certain host objects, ie. |window.location|
		// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
		try {
			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android < 4.0, iOS < 6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	trim: function( text ) {
		return text == null ? "" : trim.call( text );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select t=''><option selected=''></option></select>";

			// Support: IE8, Opera 10-12
			// Nothing should be selected when empty strings follow ^= or $= or *=
			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
						name = attrs[ i ].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.slice(5) );
							dataAttr( elem, name, data[ name ] );
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) );

	// #11217 - WebKit loses check when the name is after the checked attribute
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE9-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				// Support: Android < 4.0
				src.defaultPrevented === undefined &&
				src.getPreventDefault && src.getPreventDefault() ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, events, type, key, j,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					events = Object.keys( data.events || {} );
					if ( events.length ) {
						for ( j = 0; (type = events[j]) !== undefined; j++ ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			window.getDefaultComputedStyle( elem[ 0 ] ).display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') in IE9, see #12537
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
		divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;" +
			"-moz-box-sizing:content-box;box-sizing:content-box",
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;" +
		"margin-top:1px";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
		div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;" +
			"position:absolute;top:1%";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Use window.getComputedStyle because jsdom on node.js will break without it.
	if ( window.getComputedStyle ) {
		jQuery.extend(support, {
			pixelPosition: function() {
				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {
				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );

				// Clean up the div for other support tests.
				div.innerHTML = "";

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css(elem, "display") );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				// Support: Chrome, Safari
				// Setting style to blank string required to delete "style: x !important;"
				style[ name ] = "";
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );
		// Get default display if display is currently "none"
		if ( display === "none" ) {
			display = defaultDisplay( elem.nodeName );
		}
		if ( display === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				// Do send the request
				// This may raise an exception which is actually
				// handled in jQuery.ajax (so no try/catch here)
				xhr.send( options.hasContent && options.data || null );
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

(function() {
  var Batman,
    __slice = [].slice;

  Batman = function() {
    var mixins;
    mixins = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Batman.Object, mixins, function(){});
  };

  Batman.version = '0.15.0';

  Batman.config = {
    pathToApp: '/',
    usePushState: true,
    pathToHTML: 'html',
    fetchRemoteHTML: true,
    cacheViews: false,
    minificationErrors: true,
    protectFromCSRF: false
  };

  (Batman.container = (function() {
    return this;
  })()).Batman = Batman;

  if (typeof define === 'function') {
    define('batman', [], function() {
      return Batman;
    });
  }

  Batman.exportHelpers = function(onto) {
    var k, _i, _len, _ref;
    _ref = ['mixin', 'extend', 'unmixin', 'redirect', 'typeOf', 'redirect', 'setImmediate', 'clearImmediate'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      onto["$" + k] = Batman[k];
    }
    return onto;
  };

  Batman.exportGlobals = function() {
    return Batman.exportHelpers(Batman.container);
  };

}).call(this);

(function() {
  var _Batman;

  Batman._Batman = _Batman = (function() {
    function _Batman(object) {
      this.object = object;
    }

    _Batman.prototype.check = function(object) {
      if (object !== this.object) {
        object._batman = new Batman._Batman(object);
        return false;
      }
      return true;
    };

    _Batman.prototype.get = function(key) {
      var reduction, results;
      results = this.getAll(key);
      switch (results.length) {
        case 0:
          return void 0;
        case 1:
          return results[0];
        default:
          reduction = results[0].concat != null ? function(a, b) {
            return a.concat(b);
          } : results[0].merge != null ? function(a, b) {
            return a.merge(b);
          } : results.every(function(x) {
            return typeof x === 'object';
          }) ? (results.unshift({}), function(a, b) {
            return Batman.extend(a, b);
          }) : void 0;
          if (reduction) {
            return results.reduceRight(reduction);
          } else {
            return results;
          }
      }
    };

    _Batman.prototype.getFirst = function(key) {
      var results;
      results = this.getAll(key);
      return results[0];
    };

    _Batman.prototype.getAll = function(keyOrGetter) {
      var getter, results, val;
      if (typeof keyOrGetter === 'function') {
        getter = keyOrGetter;
      } else {
        getter = function(ancestor) {
          var _ref;
          return (_ref = ancestor._batman) != null ? _ref[keyOrGetter] : void 0;
        };
      }
      results = this.ancestors(getter);
      if (val = getter(this.object)) {
        results.unshift(val);
      }
      return results;
    };

    _Batman.prototype.ancestors = function(getter) {
      var ancestor, results, val, _i, _len, _ref;
      this._allAncestors || (this._allAncestors = this.allAncestors());
      if (getter) {
        results = [];
        _ref = this._allAncestors;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ancestor = _ref[_i];
          val = getter(ancestor);
          if (val != null) {
            results.push(val);
          }
        }
        return results;
      } else {
        return this._allAncestors;
      }
    };

    _Batman.prototype.allAncestors = function() {
      var isClass, parent, proto, results, _ref, _ref1;
      results = [];
      isClass = !!this.object.prototype;
      parent = isClass ? (_ref = this.object.__super__) != null ? _ref.constructor : void 0 : (proto = Object.getPrototypeOf(this.object)) === this.object ? this.object.constructor.__super__ : proto;
      if (parent != null) {
        if ((_ref1 = parent._batman) != null) {
          _ref1.check(parent);
        }
        results.push(parent);
        if (parent._batman != null) {
          results = results.concat(parent._batman.allAncestors());
        }
      }
      return results;
    };

    _Batman.prototype.set = function(key, value) {
      return this[key] = value;
    };

    return _Batman;

  })();

}).call(this);

(function() {
  var chr, _encodedChars, _encodedCharsPattern, _entityMap, _implementImmediates, _objectToString, _unsafeChars, _unsafeCharsPattern,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Batman.typeOf = function(object) {
    if (typeof object === 'undefined') {
      return "Undefined";
    }
    return _objectToString.call(object).slice(8, -1);
  };

  _objectToString = Object.prototype.toString;

  Batman.extend = function() {
    var key, object, objects, to, value, _i, _len;
    to = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = objects.length; _i < _len; _i++) {
      object = objects[_i];
      for (key in object) {
        value = object[key];
        to[key] = value;
      }
    }
    return to;
  };

  Batman.mixin = function() {
    var hasSet, key, mixin, mixins, to, value, _i, _len;
    to = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    hasSet = typeof to.set === 'function';
    for (_i = 0, _len = mixins.length; _i < _len; _i++) {
      mixin = mixins[_i];
      if (Batman.typeOf(mixin) !== 'Object') {
        continue;
      }
      for (key in mixin) {
        if (!__hasProp.call(mixin, key)) continue;
        value = mixin[key];
        if (key === 'initialize' || key === 'uninitialize' || key === 'prototype') {
          continue;
        }
        if (hasSet) {
          to.set(key, value);
        } else if (to.nodeName != null) {
          Batman.data(to, key, value);
        } else {
          to[key] = value;
        }
      }
      if (typeof mixin.initialize === 'function') {
        mixin.initialize.call(to);
      }
    }
    return to;
  };

  Batman.unmixin = function() {
    var from, key, mixin, mixins, _i, _len;
    from = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = mixins.length; _i < _len; _i++) {
      mixin = mixins[_i];
      for (key in mixin) {
        if (key === 'initialize' || key === 'uninitialize') {
          continue;
        }
        delete from[key];
      }
      if (typeof mixin.uninitialize === 'function') {
        mixin.uninitialize.call(from);
      }
    }
    return from;
  };

  Batman._functionName = Batman.functionName = function(f) {
    var _ref;
    if (f.__name__) {
      return f.__name__;
    }
    if (f.name) {
      return f.name;
    }
    return (_ref = f.toString().match(/\W*function\s+([\w\$]+)\(/)) != null ? _ref[1] : void 0;
  };

  Batman._isChildOf = Batman.isChildOf = function(parentNode, childNode) {
    var node;
    node = childNode.parentNode;
    while (node) {
      if (node === parentNode) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };

  _implementImmediates = function(container) {
    var canUsePostMessage, count, functions, getHandle, handler, prefix, tasks;
    canUsePostMessage = function() {
      var async, oldMessage;
      if (!container.postMessage) {
        return false;
      }
      async = true;
      oldMessage = container.onmessage;
      container.onmessage = function() {
        return async = false;
      };
      container.postMessage("", "*");
      container.onmessage = oldMessage;
      return async;
    };
    tasks = new Batman.SimpleHash;
    count = 0;
    getHandle = function() {
      return "go" + (++count);
    };
    if (container.setImmediate && container.clearImmediate) {
      Batman.setImmediate = function() {
        return container.setImmediate.apply(container, arguments);
      };
      return Batman.clearImmediate = function() {
        return container.clearImmediate.apply(container, arguments);
      };
    } else if (canUsePostMessage()) {
      prefix = 'com.batman.';
      handler = function(e) {
        var handle, _base;
        if (typeof e.data !== 'string' || !~e.data.search(prefix)) {
          return;
        }
        handle = e.data.substring(prefix.length);
        return typeof (_base = tasks.unset(handle)) === "function" ? _base() : void 0;
      };
      if (container.addEventListener) {
        container.addEventListener('message', handler, false);
      } else {
        container.attachEvent('onmessage', handler);
      }
      Batman.setImmediate = function(f) {
        var handle;
        tasks.set(handle = getHandle(), f);
        container.postMessage(prefix + handle, "*");
        return handle;
      };
      return Batman.clearImmediate = function(handle) {
        return tasks.unset(handle);
      };
    } else if (typeof document !== 'undefined' && __indexOf.call(document.createElement("script"), "onreadystatechange") >= 0) {
      Batman.setImmediate = function(f) {
        var handle, script;
        handle = getHandle();
        script = document.createElement("script");
        script.onreadystatechange = function() {
          var _base;
          if (typeof (_base = tasks.get(handle)) === "function") {
            _base();
          }
          script.onreadystatechange = null;
          script.parentNode.removeChild(script);
          return script = null;
        };
        document.documentElement.appendChild(script);
        return handle;
      };
      return Batman.clearImmediate = function(handle) {
        return tasks.unset(handle);
      };
    } else if (typeof process !== "undefined" && process !== null ? process.nextTick : void 0) {
      functions = {};
      Batman.setImmediate = function(f) {
        var handle;
        handle = getHandle();
        functions[handle] = f;
        process.nextTick(function() {
          if (typeof functions[handle] === "function") {
            functions[handle]();
          }
          return delete functions[handle];
        });
        return handle;
      };
      return Batman.clearImmediate = function(handle) {
        return delete functions[handle];
      };
    } else {
      Batman.setImmediate = function(f) {
        return setTimeout(f, 0);
      };
      return Batman.clearImmediate = function(handle) {
        return clearTimeout(handle);
      };
    }
  };

  Batman.setImmediate = function() {
    _implementImmediates(Batman.container);
    return Batman.setImmediate.apply(this, arguments);
  };

  Batman.clearImmediate = function() {
    _implementImmediates(Batman.container);
    return Batman.clearImmediate.apply(this, arguments);
  };

  Batman.forEach = function(container, iterator, ctx) {
    var e, i, k, v, _i, _len;
    if (container.forEach) {
      container.forEach(iterator, ctx);
    } else if (container.indexOf) {
      for (i = _i = 0, _len = container.length; _i < _len; i = ++_i) {
        e = container[i];
        iterator.call(ctx, e, i, container);
      }
    } else {
      for (k in container) {
        v = container[k];
        iterator.call(ctx, k, v, container);
      }
    }
  };

  Batman.objectHasKey = function(object, key) {
    if (typeof object.hasKey === 'function') {
      return object.hasKey(key);
    } else {
      return key in object;
    }
  };

  Batman.contains = function(container, item) {
    if (container.indexOf) {
      return __indexOf.call(container, item) >= 0;
    } else if (typeof container.has === 'function') {
      return container.has(item);
    } else {
      return Batman.objectHasKey(container, item);
    }
  };

  Batman.get = function(base, key) {
    if (typeof base.get === 'function') {
      return base.get(key);
    } else {
      return Batman.Property.forBaseAndKey(base, key).getValue();
    }
  };

  Batman.getPath = function(base, segments) {
    var segment, _i, _len;
    for (_i = 0, _len = segments.length; _i < _len; _i++) {
      segment = segments[_i];
      if (base != null) {
        base = Batman.get(base, segment);
        if (base == null) {
          return base;
        }
      } else {
        return;
      }
    }
    return base;
  };

  _entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&#34;",
    "/": "&#47;",
    "'": "&#39;"
  };

  _unsafeChars = [];

  _encodedChars = [];

  for (chr in _entityMap) {
    _unsafeChars.push(chr);
    _encodedChars.push(_entityMap[chr]);
  }

  _unsafeCharsPattern = new RegExp("[" + (_unsafeChars.join('')) + "]", "g");

  _encodedCharsPattern = new RegExp("(" + (_encodedChars.join('|')) + ")", "g");

  Batman.escapeHTML = (function() {
    return function(s) {
      return ("" + s).replace(_unsafeCharsPattern, function(c) {
        return _entityMap[c];
      });
    };
  })();

  Batman.unescapeHTML = (function() {
    return function(s) {
      var node;
      if (s == null) {
        return;
      }
      node = Batman._unescapeHTMLNode || (Batman._unescapeHTMLNode = document.createElement('DIV'));
      node.innerHTML = s;
      return Batman.DOM.textContent(node);
    };
  })();

  Batman.translate = function(x, values) {
    if (values == null) {
      values = {};
    }
    return Batman.helpers.interpolate(Batman.get(Batman.translate.messages, x), values);
  };

  Batman.translate.messages = {};

  Batman.t = function() {
    return Batman.translate.apply(Batman, arguments);
  };

  Batman.redirect = function(url, replaceState) {
    var _ref;
    if (replaceState == null) {
      replaceState = false;
    }
    return (_ref = Batman.navigator) != null ? _ref.redirect(url, replaceState) : void 0;
  };

  Batman.initializeObject = function(object) {
    if (object._batman != null) {
      return object._batman.check(object);
    } else {
      return object._batman = new Batman._Batman(object);
    }
  };

}).call(this);

(function() {
  var __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Batman.Inflector = (function() {
    Inflector.prototype.plural = function(regex, replacement) {
      return this._plural.unshift([regex, replacement]);
    };

    Inflector.prototype.singular = function(regex, replacement) {
      return this._singular.unshift([regex, replacement]);
    };

    Inflector.prototype.human = function(regex, replacement) {
      return this._human.unshift([regex, replacement]);
    };

    Inflector.prototype.uncountable = function() {
      var strings;
      strings = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this._uncountable = this._uncountable.concat(strings.map(function(x) {
        return new RegExp("" + x + "$", 'i');
      }));
    };

    Inflector.prototype.irregular = function(singular, plural) {
      if (singular.charAt(0) === plural.charAt(0)) {
        this.plural(new RegExp("(" + (singular.charAt(0)) + ")" + (singular.slice(1)) + "$", "i"), "$1" + plural.slice(1));
        this.plural(new RegExp("(" + (singular.charAt(0)) + ")" + (plural.slice(1)) + "$", "i"), "$1" + plural.slice(1));
        return this.singular(new RegExp("(" + (plural.charAt(0)) + ")" + (plural.slice(1)) + "$", "i"), "$1" + singular.slice(1));
      } else {
        this.plural(new RegExp("" + singular + "$", 'i'), plural);
        this.plural(new RegExp("" + plural + "$", 'i'), plural);
        return this.singular(new RegExp("" + plural + "$", 'i'), singular);
      }
    };

    function Inflector() {
      this._plural = [];
      this._singular = [];
      this._uncountable = [];
      this._human = [];
    }

    Inflector.prototype.ordinalize = function(number, radix) {
      var absNumber, _ref;
      if (radix == null) {
        radix = 10;
      }
      number = parseInt(number, radix);
      absNumber = Math.abs(number);
      if (_ref = absNumber % 100, __indexOf.call([11, 12, 13], _ref) >= 0) {
        return number + "th";
      } else {
        switch (absNumber % 10) {
          case 1:
            return number + "st";
          case 2:
            return number + "nd";
          case 3:
            return number + "rd";
          default:
            return number + "th";
        }
      }
    };

    Inflector.prototype.pluralize = function(word) {
      var regex, replace_string, uncountableRegex, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      _ref = this._uncountable;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        uncountableRegex = _ref[_i];
        if (uncountableRegex.test(word)) {
          return word;
        }
      }
      _ref1 = this._plural;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        _ref2 = _ref1[_j], regex = _ref2[0], replace_string = _ref2[1];
        if (regex.test(word)) {
          return word.replace(regex, replace_string);
        }
      }
      return word;
    };

    Inflector.prototype.singularize = function(word) {
      var regex, replace_string, uncountableRegex, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      _ref = this._uncountable;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        uncountableRegex = _ref[_i];
        if (uncountableRegex.test(word)) {
          return word;
        }
      }
      _ref1 = this._singular;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        _ref2 = _ref1[_j], regex = _ref2[0], replace_string = _ref2[1];
        if (regex.test(word)) {
          return word.replace(regex, replace_string);
        }
      }
      return word;
    };

    Inflector.prototype.humanize = function(word) {
      var regex, replace_string, _i, _len, _ref, _ref1;
      _ref = this._human;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], regex = _ref1[0], replace_string = _ref1[1];
        if (regex.test(word)) {
          return word.replace(regex, replace_string);
        }
      }
      return word;
    };

    return Inflector;

  })();

}).call(this);

(function() {
  var Inflector, camelize_rx, humanize_rx1, humanize_rx2, humanize_rx3, titleize_rx, underscore_rx1, underscore_rx2;

  camelize_rx = /(?:^|_|\-)(.)/g;

  titleize_rx = /(^|\s)([a-z])/g;

  underscore_rx1 = /([A-Z]+)([A-Z][a-z])/g;

  underscore_rx2 = /([a-z\d])([A-Z])/g;

  humanize_rx1 = /_id$/;

  humanize_rx2 = /_|-|\./g;

  humanize_rx3 = /^\w/g;

  Batman.helpers = {
    ordinalize: function() {
      return Batman.helpers.inflector.ordinalize.apply(Batman.helpers.inflector, arguments);
    },
    singularize: function() {
      return Batman.helpers.inflector.singularize.apply(Batman.helpers.inflector, arguments);
    },
    pluralize: function(count, singular, plural, includeCount) {
      var result;
      if (includeCount == null) {
        includeCount = true;
      }
      if (arguments.length < 2) {
        return Batman.helpers.inflector.pluralize(count);
      } else {
        result = +count === 1 ? singular : plural || Batman.helpers.inflector.pluralize(singular);
        if (includeCount) {
          result = ("" + (count || 0) + " ") + result;
        }
        return result;
      }
    },
    camelize: function(string, firstLetterLower) {
      string = string.replace(camelize_rx, function(str, p1) {
        return p1.toUpperCase();
      });
      if (firstLetterLower) {
        return string.substr(0, 1).toLowerCase() + string.substr(1);
      } else {
        return string;
      }
    },
    underscore: function(string) {
      return string.replace(underscore_rx1, '$1_$2').replace(underscore_rx2, '$1_$2').replace('-', '_').toLowerCase();
    },
    titleize: function(string) {
      return string.replace(titleize_rx, function(m, p1, p2) {
        return p1 + p2.toUpperCase();
      });
    },
    capitalize: function(string) {
      Batman.developer.deprecated('capitalize', 'Renamed to titleize.');
      return Batman.helpers.titleize(string);
    },
    trim: function(string) {
      if (string) {
        return string.trim();
      } else {
        return "";
      }
    },
    interpolate: function(stringOrObject, keys) {
      var key, string, value;
      if (typeof stringOrObject === 'object') {
        string = stringOrObject[keys.count];
        if (!string) {
          string = stringOrObject['other'];
        }
      } else {
        string = stringOrObject;
      }
      for (key in keys) {
        value = keys[key];
        string = string.replace(new RegExp("%\\{" + key + "\\}", "g"), value);
      }
      return string;
    },
    humanize: function(string) {
      string = Batman.helpers.underscore(string);
      string = Batman.helpers.inflector.humanize(string);
      return string.replace(humanize_rx1, '').replace(humanize_rx2, ' ').replace(humanize_rx3, function(match) {
        return match.toUpperCase();
      });
    },
    toSentence: function(array) {
      var itemString, last;
      if (array.length < 3) {
        return array.join(' and ');
      } else {
        last = array.pop();
        itemString = array.join(', ');
        itemString += ", and " + last;
        return itemString;
      }
    }
  };

  Inflector = new Batman.Inflector;

  Batman.helpers.inflector = Inflector;

  Inflector.plural(/$/, 's');

  Inflector.plural(/s$/i, 's');

  Inflector.plural(/(ax|test)is$/i, '$1es');

  Inflector.plural(/(octop|vir)us$/i, '$1i');

  Inflector.plural(/(octop|vir)i$/i, '$1i');

  Inflector.plural(/(alias|status)$/i, '$1es');

  Inflector.plural(/(bu)s$/i, '$1ses');

  Inflector.plural(/(buffal|tomat)o$/i, '$1oes');

  Inflector.plural(/([ti])um$/i, '$1a');

  Inflector.plural(/([ti])a$/i, '$1a');

  Inflector.plural(/sis$/i, 'ses');

  Inflector.plural(/(?:([^f])fe|([lr])f)$/i, '$1$2ves');

  Inflector.plural(/(hive)$/i, '$1s');

  Inflector.plural(/([^aeiouy]|qu)y$/i, '$1ies');

  Inflector.plural(/(x|ch|ss|sh)$/i, '$1es');

  Inflector.plural(/(matr|vert|ind)(?:ix|ex)$/i, '$1ices');

  Inflector.plural(/([m|l])ouse$/i, '$1ice');

  Inflector.plural(/([m|l])ice$/i, '$1ice');

  Inflector.plural(/^(ox)$/i, '$1en');

  Inflector.plural(/^(oxen)$/i, '$1');

  Inflector.plural(/(quiz)$/i, '$1zes');

  Inflector.singular(/s$/i, '');

  Inflector.singular(/(n)ews$/i, '$1ews');

  Inflector.singular(/([ti])a$/i, '$1um');

  Inflector.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1$2sis');

  Inflector.singular(/(^analy)ses$/i, '$1sis');

  Inflector.singular(/([^f])ves$/i, '$1fe');

  Inflector.singular(/(hive)s$/i, '$1');

  Inflector.singular(/(tive)s$/i, '$1');

  Inflector.singular(/([lr])ves$/i, '$1f');

  Inflector.singular(/([^aeiouy]|qu)ies$/i, '$1y');

  Inflector.singular(/(s)eries$/i, '$1eries');

  Inflector.singular(/(m)ovies$/i, '$1ovie');

  Inflector.singular(/(x|ch|ss|sh)es$/i, '$1');

  Inflector.singular(/([m|l])ice$/i, '$1ouse');

  Inflector.singular(/(bus)es$/i, '$1');

  Inflector.singular(/(o)es$/i, '$1');

  Inflector.singular(/(shoe)s$/i, '$1');

  Inflector.singular(/(cris|ax|test)es$/i, '$1is');

  Inflector.singular(/(octop|vir)i$/i, '$1us');

  Inflector.singular(/(alias|status)es$/i, '$1');

  Inflector.singular(/^(ox)en/i, '$1');

  Inflector.singular(/(vert|ind)ices$/i, '$1ex');

  Inflector.singular(/(matr)ices$/i, '$1ix');

  Inflector.singular(/(quiz)zes$/i, '$1');

  Inflector.singular(/(database)s$/i, '$1');

  Inflector.irregular('person', 'people');

  Inflector.irregular('man', 'men');

  Inflector.irregular('child', 'children');

  Inflector.irregular('sex', 'sexes');

  Inflector.irregular('move', 'moves');

  Inflector.irregular('cow', 'kine');

  Inflector.irregular('zombie', 'zombies');

  Inflector.uncountable('equipment', 'information', 'rice', 'money', 'species', 'series', 'fish', 'sheep', 'jeans');

}).call(this);

(function() {
  var developer;

  Batman.developer = {
    suppressed: false,
    DevelopmentError: (function() {
      var DevelopmentError;
      DevelopmentError = function(message) {
        this.message = message;
        return this.name = "DevelopmentError";
      };
      DevelopmentError.prototype = Error.prototype;
      return DevelopmentError;
    })(),
    _ie_console: function(f, args) {
      var arg, _i, _len, _results;
      if (args.length !== 1) {
        if (typeof console !== "undefined" && console !== null) {
          console[f]("..." + f + " of " + args.length + " items...");
        }
      }
      _results = [];
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        arg = args[_i];
        _results.push(typeof console !== "undefined" && console !== null ? console[f](arg) : void 0);
      }
      return _results;
    },
    suppress: function(f) {
      developer.suppressed = true;
      if (f) {
        f();
        return developer.suppressed = false;
      }
    },
    unsuppress: function() {
      return developer.suppressed = false;
    },
    log: function() {
      if (developer.suppressed || !((typeof console !== "undefined" && console !== null ? console.log : void 0) != null)) {
        return;
      }
      if (console.log.apply) {
        return console.log.apply(console, arguments);
      } else {
        return developer._ie_console("log", arguments);
      }
    },
    warn: function() {
      if (developer.suppressed || !((typeof console !== "undefined" && console !== null ? console.warn : void 0) != null)) {
        return;
      }
      if (console.warn.apply) {
        return console.warn.apply(console, arguments);
      } else {
        return developer._ie_console("warn", arguments);
      }
    },
    error: function(message) {
      throw new developer.DevelopmentError(message);
    },
    assert: function(result, message) {
      if (!result) {
        return developer.error(message);
      }
    },
    "do": function(f) {
      if (!developer.suppressed) {
        return f();
      }
    },
    addFilters: function() {
      return Batman.extend(Batman.Filters, {
        log: function(value, key) {
          if (typeof console !== "undefined" && console !== null) {
            if (typeof console.log === "function") {
              console.log(arguments);
            }
          }
          return value;
        },
        logStack: function(value) {
          if (typeof console !== "undefined" && console !== null) {
            if (typeof console.log === "function") {
              console.log(developer.currentFilterStack);
            }
          }
          return value;
        }
      });
    },
    deprecated: function(deprecatedName, upgradeString) {
      return Batman.developer.warn("" + deprecatedName + " has been deprecated.", upgradeString || '');
    }
  };

  developer = Batman.developer;

  Batman.developer.assert((function() {}).bind, "Error! Batman needs Function.bind to work! Please shim it using something like es5-shim or augmentjs!");

}).call(this);

(function() {
  Batman.Event = (function() {
    Event.forBaseAndKey = function(base, key) {
      if (base.isEventEmitter) {
        return base.event(key);
      } else {
        return new Batman.Event(base, key);
      }
    };

    function Event(base, key) {
      this.base = base;
      this.key = key;
      this._preventCount = 0;
    }

    Event.prototype.isEvent = true;

    Event.prototype.isEqual = function(other) {
      return this.constructor === other.constructor && this.base === other.base && this.key === other.key;
    };

    Event.prototype.hashKey = function() {
      var key;
      this.hashKey = function() {
        return key;
      };
      return key = "<Batman.Event base: " + (Batman.Hash.prototype.hashKeyFor(this.base)) + ", key: \"" + (Batman.Hash.prototype.hashKeyFor(this.key)) + "\">";
    };

    Event.prototype.addHandler = function(handler) {
      this.handlers || (this.handlers = []);
      if (this.handlers.indexOf(handler) === -1) {
        this.handlers.push(handler);
      }
      if (this.oneShot) {
        this.autofireHandler(handler);
      }
      return this;
    };

    Event.prototype.removeHandler = function(handler) {
      var index;
      if (this.handlers && (index = this.handlers.indexOf(handler)) !== -1) {
        this.handlers.splice(index, 1);
      }
      return this;
    };

    Event.prototype.eachHandler = function(iterator) {
      var ancestor, key, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      if ((_ref = this.handlers) != null) {
        _ref.slice().forEach(iterator);
      }
      if ((_ref1 = this.base) != null ? _ref1.isEventEmitter : void 0) {
        key = this.key;
        _ref3 = (_ref2 = this.base._batman) != null ? _ref2.ancestors() : void 0;
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          ancestor = _ref3[_i];
          if (ancestor.isEventEmitter && ((_ref4 = ancestor._batman) != null ? (_ref5 = _ref4.events) != null ? _ref5.hasOwnProperty(key) : void 0 : void 0)) {
            if ((_ref6 = ancestor.event(key, false)) != null) {
              if ((_ref7 = _ref6.handlers) != null) {
                _ref7.slice().forEach(iterator);
              }
            }
          }
        }
      }
    };

    Event.prototype.clearHandlers = function() {
      return this.handlers = void 0;
    };

    Event.prototype.handlerContext = function() {
      return this.base;
    };

    Event.prototype.prevent = function() {
      return ++this._preventCount;
    };

    Event.prototype.allow = function() {
      if (this._preventCount) {
        --this._preventCount;
      }
      return this._preventCount;
    };

    Event.prototype.isPrevented = function() {
      return this._preventCount > 0;
    };

    Event.prototype.autofireHandler = function(handler) {
      if (this._oneShotFired && (this._oneShotArgs != null)) {
        return handler.apply(this.handlerContext(), this._oneShotArgs);
      }
    };

    Event.prototype.resetOneShot = function() {
      this._oneShotFired = false;
      return this._oneShotArgs = null;
    };

    Event.prototype.fire = function() {
      return this.fireWithContext(this.handlerContext(), arguments);
    };

    Event.prototype.fireWithContext = function(context, args) {
      if (this.isPrevented() || this._oneShotFired) {
        return false;
      }
      if (this.oneShot) {
        this._oneShotFired = true;
        this._oneShotArgs = args;
      }
      return this.eachHandler(function(handler) {
        return handler.apply(context, args);
      });
    };

    Event.prototype.allowAndFire = function() {
      return this.allowAndFireWithContext(this.handlerContext(), arguments);
    };

    Event.prototype.allowAndFireWithContext = function(context, args) {
      this.allow();
      return this.fireWithContext(context, args);
    };

    return Event;

  })();

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PropertyEvent = (function(_super) {
    __extends(PropertyEvent, _super);

    function PropertyEvent() {
      _ref = PropertyEvent.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PropertyEvent.prototype.eachHandler = function(iterator) {
      return this.eachObserver(iterator);
    };

    PropertyEvent.prototype.handlerContext = function() {
      return this.base;
    };

    return PropertyEvent;

  })(Batman.Event);

}).call(this);

(function() {
  var __slice = [].slice;

  Batman.EventEmitter = {
    isEventEmitter: true,
    hasEvent: function(key) {
      var _ref, _ref1;
      return (_ref = this._batman) != null ? typeof _ref.get === "function" ? (_ref1 = _ref.get('events')) != null ? _ref1.hasOwnProperty(key) : void 0 : void 0 : void 0;
    },
    event: function(key, createEvent) {
      var ancestor, eventClass, events, existingEvent, newEvent, _base, _i, _len, _ref, _ref1, _ref2, _ref3;
      if (createEvent == null) {
        createEvent = true;
      }
      Batman.initializeObject(this);
      eventClass = this.eventClass || Batman.Event;
      if ((_ref = this._batman.events) != null ? _ref.hasOwnProperty(key) : void 0) {
        return existingEvent = this._batman.events[key];
      } else {
        _ref1 = this._batman.ancestors();
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          ancestor = _ref1[_i];
          existingEvent = (_ref2 = ancestor._batman) != null ? (_ref3 = _ref2.events) != null ? _ref3[key] : void 0 : void 0;
          if (existingEvent) {
            break;
          }
        }
        if (createEvent || (existingEvent != null ? existingEvent.oneShot : void 0)) {
          events = (_base = this._batman).events || (_base.events = {});
          newEvent = events[key] = new eventClass(this, key);
          newEvent.oneShot = existingEvent != null ? existingEvent.oneShot : void 0;
          return newEvent;
        } else {
          return existingEvent;
        }
      }
    },
    on: function() {
      var handler, key, keys, _i, _j, _len;
      keys = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), handler = arguments[_i++];
      for (_j = 0, _len = keys.length; _j < _len; _j++) {
        key = keys[_j];
        this.event(key).addHandler(handler);
      }
      return true;
    },
    off: function() {
      var handler, key, keys, _i, _j, _len;
      keys = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), handler = arguments[_i++];
      if (!keys.length) {
        key = handler;
        this.event(key).clearHandlers();
      }
      for (_j = 0, _len = keys.length; _j < _len; _j++) {
        key = keys[_j];
        this.event(key).removeHandler(handler);
      }
      return true;
    },
    once: function(key, handler) {
      var event, handlerWrapper;
      event = this.event(key);
      handlerWrapper = function() {
        handler.apply(this, arguments);
        return event.removeHandler(handlerWrapper);
      };
      return event.addHandler(handlerWrapper);
    },
    registerAsMutableSource: function() {
      return Batman.Property.registerSource(this);
    },
    mutate: function(wrappedFunction) {
      var result;
      this.prevent('change');
      result = wrappedFunction.call(this);
      this.allowAndFire('change', this, this);
      return result;
    },
    mutation: function(wrappedFunction) {
      return function() {
        var result, _ref;
        result = wrappedFunction.apply(this, arguments);
        if ((_ref = this.event('change', false)) != null) {
          _ref.fire(this, this);
        }
        return result;
      };
    },
    prevent: function(key) {
      this.event(key).prevent();
      return this;
    },
    allow: function(key) {
      this.event(key).allow();
      return this;
    },
    fire: function() {
      var args, key, _ref;
      key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return (_ref = this.event(key, false)) != null ? _ref.fireWithContext(this, args) : void 0;
    },
    allowAndFire: function() {
      var args, key, _ref;
      key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return (_ref = this.event(key, false)) != null ? _ref.allowAndFireWithContext(this, args) : void 0;
    },
    isPrevented: function(key) {
      var _ref;
      return (_ref = this.event(key, false)) != null ? _ref.isPrevented() : void 0;
    }
  };

}).call(this);

(function() {
  var fire,
    __slice = [].slice;

  Batman.LifecycleEvents = {
    initialize: function() {
      return this.prototype.fireLifecycleEvent = fire;
    },
    lifecycleEvent: function(eventName, normalizeFunction) {
      var addCallback, afterName, beforeName;
      beforeName = "before" + (Batman.helpers.camelize(eventName));
      afterName = "after" + (Batman.helpers.camelize(eventName));
      addCallback = function(lifecycleEventName) {
        return function(callbackName, options) {
          var callback, handlers, target, _base, _ref;
          if (Batman.typeOf(callbackName) === 'Object') {
            _ref = [options, callbackName], callbackName = _ref[0], options = _ref[1];
          }
          if (Batman.typeOf(callbackName) === 'String') {
            callback = function() {
              return this[callbackName].apply(this, arguments);
            };
          } else {
            callback = callbackName;
          }
          options = (typeof normalizeFunction === "function" ? normalizeFunction(options) : void 0) || options;
          target = this.prototype || this;
          Batman.initializeObject(target);
          handlers = (_base = target._batman)[lifecycleEventName] || (_base[lifecycleEventName] = []);
          return handlers.push({
            options: options,
            callback: callback
          });
        };
      };
      this[beforeName] = addCallback(beforeName);
      this.prototype[beforeName] = addCallback(beforeName);
      this[afterName] = addCallback(afterName);
      return this.prototype[afterName] = addCallback(afterName);
    }
  };

  fire = function() {
    var args, callback, handlers, lifecycleEventName, options, _i, _len, _ref;
    lifecycleEventName = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (!(handlers = this._batman.get(lifecycleEventName))) {
      return;
    }
    for (_i = 0, _len = handlers.length; _i < _len; _i++) {
      _ref = handlers[_i], options = _ref.options, callback = _ref.callback;
      if ((options != null ? options["if"] : void 0) && !options["if"].apply(this, args)) {
        continue;
      }
      if ((options != null ? options.unless : void 0) && options.unless.apply(this, args)) {
        continue;
      }
      if (callback.apply(this, args) === false) {
        return false;
      }
    }
  };

}).call(this);

(function() {
  Batman.Enumerable = {
    isEnumerable: true,
    map: function(f, ctx) {
      var result;
      if (ctx == null) {
        ctx = Batman.container;
      }
      result = [];
      this.forEach(function() {
        return result.push(f.apply(ctx, arguments));
      });
      return result;
    },
    mapToProperty: function(key) {
      var result;
      result = [];
      this.forEach(function(item) {
        return result.push(Batman.get(item, key));
      });
      return result;
    },
    every: function(f, ctx) {
      var result;
      if (ctx == null) {
        ctx = Batman.container;
      }
      result = true;
      this.forEach(function() {
        return result = result && !!f.apply(ctx, arguments);
      });
      return result;
    },
    some: function(f, ctx) {
      var result;
      if (ctx == null) {
        ctx = Batman.container;
      }
      result = false;
      this.forEach(function() {
        return result = result || !!f.apply(ctx, arguments);
      });
      return result;
    },
    reduce: function(f, accumulator) {
      var index, initialValuePassed,
        _this = this;
      index = 0;
      initialValuePassed = accumulator != null;
      this.forEach(function(element, value) {
        if (!initialValuePassed) {
          accumulator = element;
          initialValuePassed = true;
          return;
        }
        accumulator = f(accumulator, element, value, index, self);
        return index++;
      });
      return accumulator;
    },
    filter: function(f) {
      var result, wrap,
        _this = this;
      result = new this.constructor;
      if (result.add) {
        wrap = function(result, element, value) {
          if (f(element, value, _this)) {
            result.add(element);
          }
          return result;
        };
      } else if (result.set) {
        wrap = function(result, element, value) {
          if (f(element, value, _this)) {
            result.set(element, value);
          }
          return result;
        };
      } else {
        if (!result.push) {
          result = [];
        }
        wrap = function(result, element, value) {
          if (f(element, value, _this)) {
            result.push(element);
          }
          return result;
        };
      }
      return this.reduce(wrap, result);
    },
    count: function(f, ctx) {
      var count,
        _this = this;
      if (ctx == null) {
        ctx = Batman.container;
      }
      if (!f) {
        return this.length;
      }
      count = 0;
      this.forEach(function(element, value) {
        if (f.call(ctx, element, value, _this)) {
          return count++;
        }
      });
      return count;
    },
    inGroupsOf: function(groupSize) {
      var current, i, result;
      result = [];
      current = false;
      i = 0;
      this.forEach(function(element) {
        if (i++ % groupSize === 0) {
          current = [];
          result.push(current);
        }
        return current.push(element);
      });
      return result;
    }
  };

}).call(this);

(function() {
  var _objectToString,
    __slice = [].slice;

  _objectToString = Object.prototype.toString;

  Batman.SimpleHash = (function() {
    function SimpleHash(obj) {
      this._storage = {};
      this.length = 0;
      if (obj != null) {
        this.update(obj);
      }
    }

    Batman.extend(SimpleHash.prototype, Batman.Enumerable);

    SimpleHash.prototype.hasKey = function(key) {
      var pair, pairs, _i, _len;
      if (this.objectKey(key)) {
        if (!this._objectStorage) {
          return false;
        }
        if (pairs = this._objectStorage[this.hashKeyFor(key)]) {
          for (_i = 0, _len = pairs.length; _i < _len; _i++) {
            pair = pairs[_i];
            if (this.equality(pair[0], key)) {
              return true;
            }
          }
        }
        return false;
      } else {
        key = this.prefixedKey(key);
        return this._storage.hasOwnProperty(key);
      }
    };

    SimpleHash.prototype.getObject = function(key) {
      var pair, pairs, _i, _len;
      if (!this._objectStorage) {
        return;
      }
      if (pairs = this._objectStorage[this.hashKeyFor(key)]) {
        for (_i = 0, _len = pairs.length; _i < _len; _i++) {
          pair = pairs[_i];
          if (this.equality(pair[0], key)) {
            return pair[1];
          }
        }
      }
    };

    SimpleHash.prototype.getString = function(key) {
      return this._storage["_" + key];
    };

    SimpleHash.prototype.setObject = function(key, val) {
      var pair, pairs, _base, _i, _len, _name;
      this._objectStorage || (this._objectStorage = {});
      pairs = (_base = this._objectStorage)[_name = this.hashKeyFor(key)] || (_base[_name] = []);
      for (_i = 0, _len = pairs.length; _i < _len; _i++) {
        pair = pairs[_i];
        if (this.equality(pair[0], key)) {
          return pair[1] = val;
        }
      }
      this.length++;
      pairs.push([key, val]);
      return val;
    };

    SimpleHash.prototype.setString = function(key, val) {
      key = "_" + key;
      if (this._storage[key] == null) {
        this.length++;
      }
      return this._storage[key] = val;
    };

    SimpleHash.prototype.get = function(key) {
      var pair, pairs, _i, _len;
      if (this.objectKey(key)) {
        if (!this._objectStorage) {
          return;
        }
        if (pairs = this._objectStorage[this.hashKeyFor(key)]) {
          for (_i = 0, _len = pairs.length; _i < _len; _i++) {
            pair = pairs[_i];
            if (this.equality(pair[0], key)) {
              return pair[1];
            }
          }
        }
      } else {
        return this._storage[this.prefixedKey(key)];
      }
    };

    SimpleHash.prototype.set = function(key, val) {
      var pair, pairs, _base, _i, _len, _name;
      if (this.objectKey(key)) {
        this._objectStorage || (this._objectStorage = {});
        pairs = (_base = this._objectStorage)[_name = this.hashKeyFor(key)] || (_base[_name] = []);
        for (_i = 0, _len = pairs.length; _i < _len; _i++) {
          pair = pairs[_i];
          if (this.equality(pair[0], key)) {
            return pair[1] = val;
          }
        }
        this.length++;
        pairs.push([key, val]);
        return val;
      } else {
        key = this.prefixedKey(key);
        if (this._storage[key] == null) {
          this.length++;
        }
        return this._storage[key] = val;
      }
    };

    SimpleHash.prototype.unset = function(key) {
      var hashKey, index, obj, pair, pairs, val, value, _i, _len, _ref;
      if (this.objectKey(key)) {
        if (!this._objectStorage) {
          return;
        }
        hashKey = this.hashKeyFor(key);
        if (pairs = this._objectStorage[hashKey]) {
          for (index = _i = 0, _len = pairs.length; _i < _len; index = ++_i) {
            _ref = pairs[index], obj = _ref[0], value = _ref[1];
            if (this.equality(obj, key)) {
              pair = pairs.splice(index, 1);
              if (!pairs.length) {
                delete this._objectStorage[hashKey];
              }
              this.length--;
              return pair[0][1];
            }
          }
        }
      } else {
        key = this.prefixedKey(key);
        val = this._storage[key];
        if (this._storage[key] != null) {
          this.length--;
          delete this._storage[key];
        }
        return val;
      }
    };

    SimpleHash.prototype.getOrSet = function(key, valueFunction) {
      var currentValue;
      currentValue = this.get(key);
      if (!currentValue) {
        currentValue = valueFunction();
        this.set(key, currentValue);
      }
      return currentValue;
    };

    SimpleHash.prototype.prefixedKey = function(key) {
      return "_" + key;
    };

    SimpleHash.prototype.unprefixedKey = function(key) {
      return key.slice(1);
    };

    SimpleHash.prototype.hashKeyFor = function(obj) {
      var hashKey, typeString;
      if (hashKey = obj != null ? typeof obj.hashKey === "function" ? obj.hashKey() : void 0 : void 0) {
        return hashKey;
      } else {
        typeString = _objectToString.call(obj);
        if (typeString === "[object Array]") {
          return typeString;
        } else {
          return obj;
        }
      }
    };

    SimpleHash.prototype.equality = function(lhs, rhs) {
      if (lhs === rhs) {
        return true;
      }
      if (lhs !== lhs && rhs !== rhs) {
        return true;
      }
      if ((lhs != null ? typeof lhs.isEqual === "function" ? lhs.isEqual(rhs) : void 0 : void 0) && (rhs != null ? typeof rhs.isEqual === "function" ? rhs.isEqual(lhs) : void 0 : void 0)) {
        return true;
      }
      return false;
    };

    SimpleHash.prototype.objectKey = function(key) {
      return typeof key !== 'string';
    };

    SimpleHash.prototype.forEach = function(iterator, ctx) {
      var key, obj, results, value, values, _i, _len, _ref, _ref1, _ref2, _ref3;
      results = [];
      if (this._objectStorage) {
        _ref = this._objectStorage;
        for (key in _ref) {
          values = _ref[key];
          _ref1 = values.slice();
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            _ref2 = _ref1[_i], obj = _ref2[0], value = _ref2[1];
            results.push(iterator.call(ctx, obj, value, this));
          }
        }
      }
      _ref3 = this._storage;
      for (key in _ref3) {
        value = _ref3[key];
        results.push(iterator.call(ctx, this.unprefixedKey(key), value, this));
      }
      return results;
    };

    SimpleHash.prototype.keys = function() {
      var result;
      result = [];
      Batman.SimpleHash.prototype.forEach.call(this, function(key) {
        return result.push(key);
      });
      return result;
    };

    SimpleHash.prototype.toArray = SimpleHash.prototype.keys;

    SimpleHash.prototype.clear = function() {
      this._storage = {};
      delete this._objectStorage;
      return this.length = 0;
    };

    SimpleHash.prototype.isEmpty = function() {
      return this.length === 0;
    };

    SimpleHash.prototype.merge = function() {
      var hash, merged, others, _i, _len;
      others = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      merged = new this.constructor;
      others.unshift(this);
      for (_i = 0, _len = others.length; _i < _len; _i++) {
        hash = others[_i];
        hash.forEach(function(obj, value) {
          return merged.set(obj, value);
        });
      }
      return merged;
    };

    SimpleHash.prototype.update = function(object) {
      var k, v;
      for (k in object) {
        v = object[k];
        this.set(k, v);
      }
    };

    SimpleHash.prototype.replace = function(object) {
      var _this = this;
      this.forEach(function(key, value) {
        if (!(key in object)) {
          return _this.unset(key);
        }
      });
      return this.update(object);
    };

    SimpleHash.prototype.toObject = function() {
      var key, obj, pair, value, _ref, _ref1;
      obj = {};
      _ref = this._storage;
      for (key in _ref) {
        value = _ref[key];
        obj[this.unprefixedKey(key)] = value;
      }
      if (this._objectStorage) {
        _ref1 = this._objectStorage;
        for (key in _ref1) {
          pair = _ref1[key];
          obj[key] = pair[0][1];
        }
      }
      return obj;
    };

    SimpleHash.prototype.toJSON = function() {
      var key, obj, objectKey, value, values, _ref, _ref1, _ref2;
      obj = {};
      _ref = this._storage;
      for (key in _ref) {
        value = _ref[key];
        obj[this.unprefixedKey(key)] = (value != null ? typeof value.toJSON === "function" ? value.toJSON() : void 0 : void 0) || value;
      }
      if (this._objectStorage) {
        _ref1 = this._objectStorage;
        for (key in _ref1) {
          values = _ref1[key];
          _ref2 = values[0], objectKey = _ref2[0], value = _ref2[1];
          obj[key] = (value != null ? typeof value.toJSON === "function" ? value.toJSON() : void 0 : void 0) || value;
        }
      }
      return obj;
    };

    return SimpleHash;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.AssociationCurator = (function(_super) {
    __extends(AssociationCurator, _super);

    AssociationCurator.availableAssociations = ['belongsTo', 'hasOne', 'hasMany'];

    function AssociationCurator(model) {
      this.model = model;
      AssociationCurator.__super__.constructor.call(this);
      this._byTypeStorage = new Batman.SimpleHash;
    }

    AssociationCurator.prototype.add = function(association) {
      var associationTypeSet;
      this.set(association.label, association);
      if (!(associationTypeSet = this._byTypeStorage.get(association.associationType))) {
        associationTypeSet = new Batman.SimpleSet;
        this._byTypeStorage.set(association.associationType, associationTypeSet);
      }
      return associationTypeSet.add(association);
    };

    AssociationCurator.prototype.getByType = function(type) {
      return this._byTypeStorage.get(type);
    };

    AssociationCurator.prototype.getByLabel = function(label) {
      return this.get(label);
    };

    AssociationCurator.prototype.getAll = function() {
      var allAssociations, typeSets, _ref;
      typeSets = this._byTypeStorage.map(function(label, typeSet) {
        return typeSet;
      });
      return allAssociations = (_ref = new Batman.SimpleSet).merge.apply(_ref, typeSets);
    };

    AssociationCurator.prototype.reset = function() {
      this.forEach(function(label, association) {
        return association.reset();
      });
      return true;
    };

    AssociationCurator.prototype.merge = function() {
      var others, result;
      others = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      result = AssociationCurator.__super__.merge.apply(this, arguments);
      result._byTypeStorage = this._byTypeStorage.merge(others.map(function(other) {
        return other._byTypeStorage;
      }));
      return result;
    };

    AssociationCurator.prototype._markDirtyAttribute = function(key, oldValue) {
      var _ref;
      if ((_ref = this.lifecycle.get('state')) !== 'loading' && _ref !== 'creating' && _ref !== 'saving' && _ref !== 'saved') {
        if (this.lifecycle.startTransition('set')) {
          return this.dirtyKeys.set(key, oldValue);
        } else {
          throw new Batman.StateMachine.InvalidTransitionError("Can't set while in state " + (this.lifecycle.get('state')));
        }
      }
    };

    return AssociationCurator;

  })(Batman.SimpleHash);

}).call(this);

(function() {
  var __slice = [].slice;

  Batman.SimpleSet = (function() {
    function SimpleSet() {
      var item, itemsToAdd;
      this._storage = [];
      this.length = 0;
      itemsToAdd = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          item = arguments[_i];
          if (item != null) {
            _results.push(item);
          }
        }
        return _results;
      }).apply(this, arguments);
      if (itemsToAdd.length > 0) {
        this.add.apply(this, itemsToAdd);
      }
    }

    Batman.extend(SimpleSet.prototype, Batman.Enumerable);

    SimpleSet.prototype.at = function(index) {
      return this._storage[index];
    };

    SimpleSet.prototype.add = function() {
      var addedItems, item, items, _i, _len;
      items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      addedItems = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        if (!(this._indexOfItem(item) === -1)) {
          continue;
        }
        this._storage.push(item);
        addedItems.push(item);
      }
      this.length = this._storage.length;
      return addedItems;
    };

    SimpleSet.prototype.insert = function() {
      return this.insertWithIndexes.apply(this, arguments).addedItems;
    };

    SimpleSet.prototype.insertWithIndexes = function(items, indexes) {
      var addedIndexes, addedItems, i, index, item, _i, _len;
      addedIndexes = [];
      addedItems = [];
      for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
        item = items[i];
        if (!(this._indexOfItem(item) === -1)) {
          continue;
        }
        index = indexes[i];
        this._storage.splice(index, 0, item);
        addedItems.push(item);
        addedIndexes.push(index);
      }
      this.length = this._storage.length;
      return {
        addedItems: addedItems,
        addedIndexes: addedIndexes
      };
    };

    SimpleSet.prototype.remove = function() {
      return this.removeWithIndexes.apply(this, arguments).removedItems;
    };

    SimpleSet.prototype.removeWithIndexes = function() {
      var index, item, items, removedIndexes, removedItems, _i, _len;
      items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      removedIndexes = [];
      removedItems = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        if (!((index = this._indexOfItem(item)) !== -1)) {
          continue;
        }
        this._storage.splice(index, 1);
        removedItems.push(item);
        removedIndexes.push(index);
      }
      this.length = this._storage.length;
      return {
        removedItems: removedItems,
        removedIndexes: removedIndexes
      };
    };

    SimpleSet.prototype.clear = function() {
      var items;
      items = this._storage;
      this._storage = [];
      this.length = 0;
      return items;
    };

    SimpleSet.prototype.replace = function(other) {
      this.clear();
      return this.add.apply(this, other.toArray());
    };

    SimpleSet.prototype.has = function(item) {
      return this._indexOfItem(item) !== -1;
    };

    SimpleSet.prototype.find = function(fn) {
      var item, _i, _len, _ref;
      _ref = this._storage;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (fn(item)) {
          return item;
        }
      }
    };

    SimpleSet.prototype.forEach = function(iterator, ctx) {
      var key, _i, _len, _ref;
      _ref = this._storage;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        iterator.call(ctx, key, null, this);
      }
    };

    SimpleSet.prototype.isEmpty = function() {
      return this.length === 0;
    };

    SimpleSet.prototype.toArray = function() {
      return this._storage.slice();
    };

    SimpleSet.prototype.merge = function() {
      var merged, others, set, _i, _len;
      others = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      merged = new this.constructor;
      others.unshift(this);
      for (_i = 0, _len = others.length; _i < _len; _i++) {
        set = others[_i];
        set.forEach(function(v) {
          return merged.add(v);
        });
      }
      return merged;
    };

    SimpleSet.prototype.indexedBy = function(key) {
      this._indexes || (this._indexes = new Batman.SimpleHash);
      return this._indexes.get(key) || this._indexes.set(key, new Batman.SetIndex(this, key));
    };

    SimpleSet.prototype.indexedByUnique = function(key) {
      this._uniqueIndexes || (this._uniqueIndexes = new Batman.SimpleHash);
      return this._uniqueIndexes.get(key) || this._uniqueIndexes.set(key, new Batman.UniqueSetIndex(this, key));
    };

    SimpleSet.prototype.sortedBy = function(key, order) {
      var sortsForKey;
      if (order == null) {
        order = "asc";
      }
      order = order.toLowerCase() === "desc" ? "desc" : "asc";
      this._sorts || (this._sorts = new Batman.SimpleHash);
      sortsForKey = this._sorts.get(key) || this._sorts.set(key, new Batman.Object);
      return sortsForKey.get(order) || sortsForKey.set(order, new Batman.SetSort(this, key, order));
    };

    SimpleSet.prototype.equality = Batman.SimpleHash.prototype.equality;

    SimpleSet.prototype._indexOfItem = function(givenItem) {
      var index, item, _i, _len, _ref;
      _ref = this._storage;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        item = _ref[index];
        if (this.equality(givenItem, item)) {
          return index;
        }
      }
      return -1;
    };

    return SimpleSet;

  })();

}).call(this);

(function() {
  var SOURCE_TRACKER_STACK, SOURCE_TRACKER_STACK_VALID,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SOURCE_TRACKER_STACK = [];

  SOURCE_TRACKER_STACK_VALID = true;

  Batman.Property = (function(_super) {
    __extends(Property, _super);

    Property._sourceTrackerStack = SOURCE_TRACKER_STACK;

    Property._sourceTrackerStackValid = SOURCE_TRACKER_STACK_VALID;

    Property.defaultAccessor = {
      get: function(key) {
        return this[key];
      },
      set: function(key, val) {
        return this[key] = val;
      },
      unset: function(key) {
        var x;
        x = this[key];
        delete this[key];
        return x;
      },
      cache: false
    };

    Property.defaultAccessorForBase = function(base) {
      var _ref;
      return ((_ref = base._batman) != null ? _ref.getFirst('defaultAccessor') : void 0) || Batman.Property.defaultAccessor;
    };

    Property.accessorForBaseAndKey = function(base, key) {
      var accessor, ancestor, _bm, _i, _len, _ref, _ref1, _ref2, _ref3;
      if ((_bm = base._batman) != null) {
        accessor = (_ref = _bm.keyAccessors) != null ? _ref.get(key) : void 0;
        if (!accessor) {
          _ref1 = _bm.ancestors();
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            ancestor = _ref1[_i];
            accessor = (_ref2 = ancestor._batman) != null ? (_ref3 = _ref2.keyAccessors) != null ? _ref3.get(key) : void 0 : void 0;
            if (accessor) {
              break;
            }
          }
        }
      }
      return accessor || this.defaultAccessorForBase(base);
    };

    Property.forBaseAndKey = function(base, key) {
      if (base.isObservable) {
        return base.property(key);
      } else {
        return new Batman.Keypath(base, key);
      }
    };

    Property.withoutTracking = function(block) {
      return this.wrapTrackingPrevention(block)();
    };

    Property.wrapTrackingPrevention = function(block) {
      return function() {
        Batman.Property.pushDummySourceTracker();
        try {
          return block.apply(this, arguments);
        } finally {
          Batman.Property.popSourceTracker();
        }
      };
    };

    Property.registerSource = function(obj) {
      var set;
      if (!(obj.isEventEmitter || obj instanceof Batman.Property)) {
        return;
      }
      if (SOURCE_TRACKER_STACK_VALID) {
        set = SOURCE_TRACKER_STACK[SOURCE_TRACKER_STACK.length - 1];
      } else {
        set = [];
        SOURCE_TRACKER_STACK.push(set);
        SOURCE_TRACKER_STACK_VALID = true;
      }
      if (set != null) {
        set.push(obj);
      }
      return void 0;
    };

    Property.pushSourceTracker = function() {
      if (SOURCE_TRACKER_STACK_VALID) {
        return SOURCE_TRACKER_STACK_VALID = false;
      } else {
        return SOURCE_TRACKER_STACK.push([]);
      }
    };

    Property.popSourceTracker = function() {
      if (SOURCE_TRACKER_STACK_VALID) {
        return SOURCE_TRACKER_STACK.pop();
      } else {
        SOURCE_TRACKER_STACK_VALID = true;
        return void 0;
      }
    };

    Property.pushDummySourceTracker = function() {
      if (!SOURCE_TRACKER_STACK_VALID) {
        SOURCE_TRACKER_STACK.push([]);
        SOURCE_TRACKER_STACK_VALID = true;
      }
      return SOURCE_TRACKER_STACK.push(null);
    };

    function Property(base, key) {
      this.base = base;
      this.key = key;
    }

    Property.prototype._isolationCount = 0;

    Property.prototype.cached = false;

    Property.prototype.value = null;

    Property.prototype.sources = null;

    Property.prototype.isProperty = true;

    Property.prototype.isDead = false;

    Property.prototype.isBatchingChanges = false;

    Property.prototype.registerAsMutableSource = function() {
      return Batman.Property.registerSource(this);
    };

    Property.prototype.isEqual = function(other) {
      return this.constructor === other.constructor && this.base === other.base && this.key === other.key;
    };

    Property.prototype.hashKey = function() {
      return this._hashKey || (this._hashKey = "<Batman.Property base: " + (Batman.Hash.prototype.hashKeyFor(this.base)) + ", key: \"" + (Batman.Hash.prototype.hashKeyFor(this.key)) + "\">");
    };

    Property.prototype.accessor = function() {
      return this._accessor || (this._accessor = this.constructor.accessorForBaseAndKey(this.base, this.key));
    };

    Property.prototype.eachObserver = function(iterator) {
      var ancestor, handlers, key, object, property, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      key = this.key;
      handlers = (_ref = this.handlers) != null ? _ref.slice() : void 0;
      if (handlers) {
        for (_i = 0, _len = handlers.length; _i < _len; _i++) {
          object = handlers[_i];
          iterator(object);
        }
      }
      if (this.base.isObservable) {
        _ref1 = this.base._batman.ancestors();
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          ancestor = _ref1[_j];
          if (ancestor.isObservable && ancestor.hasProperty(key)) {
            property = ancestor.property(key);
            handlers = (_ref2 = property.handlers) != null ? _ref2.slice() : void 0;
            if (handlers) {
              for (_k = 0, _len2 = handlers.length; _k < _len2; _k++) {
                object = handlers[_k];
                iterator(object);
              }
            }
          }
        }
      }
    };

    Property.prototype.observers = function() {
      var results;
      results = [];
      this.eachObserver(function(observer) {
        return results.push(observer);
      });
      return results;
    };

    Property.prototype.hasObservers = function() {
      return this.observers().length > 0;
    };

    Property.prototype.updateSourcesFromTracker = function() {
      var handler, newSources, source, _i, _j, _len, _len1, _ref, _ref1;
      newSources = this.constructor.popSourceTracker();
      handler = this.sourceChangeHandler();
      if (this.sources) {
        _ref = this.sources;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          source = _ref[_i];
          if (source != null) {
            if (source.on) {
              source.off('change', handler);
            } else {
              source.removeHandler(handler);
            }
          }
        }
      }
      this.sources = newSources;
      if (this.sources) {
        _ref1 = this.sources;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          source = _ref1[_j];
          if (source != null) {
            if (source.on) {
              source.on('change', handler);
            } else {
              source.addHandler(handler);
            }
          }
        }
      }
      return null;
    };

    Property.prototype.getValue = function() {
      this.registerAsMutableSource();
      if (!this.isCached()) {
        this.constructor.pushSourceTracker();
        try {
          this.value = this.valueFromAccessor();
          this.cached = true;
        } finally {
          this.updateSourcesFromTracker();
        }
      }
      return this.value;
    };

    Property.prototype.isCachable = function() {
      var cacheable;
      if (this.isFinal()) {
        return true;
      }
      cacheable = this.accessor().cache;
      if (cacheable != null) {
        return !!cacheable;
      } else {
        return true;
      }
    };

    Property.prototype.isCached = function() {
      return this.isCachable() && this.cached;
    };

    Property.prototype.isFinal = function() {
      return this.final || (this.final = !!this.accessor()['final']);
    };

    Property.prototype.refresh = function() {
      var previousValue, value;
      this.cached = false;
      previousValue = this.value;
      value = this.getValue();
      if (value !== previousValue && !this.isIsolated()) {
        this.fire(value, previousValue, this.key);
      }
      if (this.value !== void 0 && this.isFinal()) {
        return this.lockValue();
      }
    };

    Property.prototype.sourceChangeHandler = function() {
      var _this = this;
      this._sourceChangeHandler || (this._sourceChangeHandler = function() {
        return _this._handleSourceChange();
      });
      Batman.developer["do"](function() {
        return _this._sourceChangeHandler.property = _this;
      });
      return this._sourceChangeHandler;
    };

    Property.prototype._handleSourceChange = function() {
      if (this.isIsolated()) {
        return this._needsRefresh = true;
      } else if (this.isDead) {
        return this._removeHandlers();
      } else if (!this.isFinal() && !this.hasObservers()) {
        this.cached = false;
        return this._removeHandlers();
      } else if (!this.isBatchingChanges) {
        return this.refresh();
      }
    };

    Property.prototype.valueFromAccessor = function() {
      var _ref;
      return (_ref = this.accessor().get) != null ? _ref.call(this.base, this.key) : void 0;
    };

    Property.prototype.setValue = function(val) {
      var set;
      if (!(set = this.accessor().set)) {
        return;
      }
      return this._changeValue(function() {
        return set.call(this.base, this.key, val);
      });
    };

    Property.prototype.unsetValue = function() {
      var unset;
      if (!(unset = this.accessor().unset)) {
        return;
      }
      return this._changeValue(function() {
        return unset.call(this.base, this.key);
      });
    };

    Property.prototype._changeValue = function(block) {
      var result;
      this.cached = false;
      this.constructor.pushDummySourceTracker();
      try {
        result = block.apply(this);
        this.refresh();
      } finally {
        this.constructor.popSourceTracker();
      }
      if (!(this.isCached() || this.hasObservers())) {
        this.die();
      }
      return result;
    };

    Property.prototype.forget = function(handler) {
      if (handler != null) {
        return this.removeHandler(handler);
      } else {
        return this.clearHandlers();
      }
    };

    Property.prototype.observeAndFire = function(handler) {
      this.observe(handler);
      return handler.call(this.base, this.value, this.value, this.key);
    };

    Property.prototype.observe = function(handler) {
      this.addHandler(handler);
      if (this.sources == null) {
        this.getValue();
      }
      return this;
    };

    Property.prototype.observeOnce = function(originalHandler) {
      var handler, self;
      self = this;
      handler = function() {
        originalHandler.apply(this, arguments);
        return self.removeHandler(handler);
      };
      this.addHandler(handler);
      if (this.sources == null) {
        this.getValue();
      }
      return this;
    };

    Property.prototype._removeHandlers = function() {
      var handler, source, _i, _len, _ref;
      handler = this.sourceChangeHandler();
      if (this.sources) {
        _ref = this.sources;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          source = _ref[_i];
          if (source.on) {
            source.off('change', handler);
          } else {
            source.removeHandler(handler);
          }
        }
      }
      delete this.sources;
      return this.clearHandlers();
    };

    Property.prototype.lockValue = function() {
      this._removeHandlers();
      this.getValue = function() {
        return this.value;
      };
      return this.setValue = this.unsetValue = this.refresh = this.observe = function() {};
    };

    Property.prototype.die = function() {
      var _ref, _ref1;
      this._removeHandlers();
      if ((_ref = this.base._batman) != null) {
        if ((_ref1 = _ref.properties) != null) {
          _ref1.unset(this.key);
        }
      }
      this.base = null;
      return this.isDead = true;
    };

    Property.prototype.isolate = function() {
      if (this._isolationCount === 0) {
        this._preIsolationValue = this.getValue();
      }
      return this._isolationCount++;
    };

    Property.prototype.expose = function() {
      if (this._isolationCount === 1) {
        this._isolationCount--;
        if (this._needsRefresh) {
          this.value = this._preIsolationValue;
          this.refresh();
        } else if (this.value !== this._preIsolationValue) {
          this.fire(this.value, this._preIsolationValue, this.key);
        }
        return this._preIsolationValue = null;
      } else if (this._isolationCount > 0) {
        return this._isolationCount--;
      }
    };

    Property.prototype.isIsolated = function() {
      return this._isolationCount > 0;
    };

    return Property;

  })(Batman.PropertyEvent);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Keypath = (function(_super) {
    __extends(Keypath, _super);

    function Keypath(base, key) {
      if (typeof key === 'string') {
        this.segments = key.split('.');
        this.depth = this.segments.length;
      } else {
        this.segments = [key];
        this.depth = 1;
      }
      Keypath.__super__.constructor.apply(this, arguments);
    }

    Keypath.prototype.isCachable = function() {
      if (this.depth === 1) {
        return Keypath.__super__.isCachable.apply(this, arguments);
      } else {
        return true;
      }
    };

    Keypath.prototype.terminalProperty = function() {
      var base;
      base = Batman.getPath(this.base, this.segments.slice(0, -1));
      if (base == null) {
        return;
      }
      return Batman.Keypath.forBaseAndKey(base, this.segments[this.depth - 1]);
    };

    Keypath.prototype.valueFromAccessor = function() {
      if (this.depth === 1) {
        return Keypath.__super__.valueFromAccessor.apply(this, arguments);
      } else {
        return Batman.getPath(this.base, this.segments);
      }
    };

    Keypath.prototype.setValue = function(val) {
      var _ref;
      if (this.depth === 1) {
        return Keypath.__super__.setValue.apply(this, arguments);
      } else {
        return (_ref = this.terminalProperty()) != null ? _ref.setValue(val) : void 0;
      }
    };

    Keypath.prototype.unsetValue = function() {
      var _ref;
      if (this.depth === 1) {
        return Keypath.__super__.unsetValue.apply(this, arguments);
      } else {
        return (_ref = this.terminalProperty()) != null ? _ref.unsetValue() : void 0;
      }
    };

    return Keypath;

  })(Batman.Property);

}).call(this);

(function() {
  var __slice = [].slice;

  Batman.Observable = {
    isObservable: true,
    hasProperty: function(key) {
      var _ref, _ref1;
      return (_ref = this._batman) != null ? (_ref1 = _ref.properties) != null ? typeof _ref1.hasKey === "function" ? _ref1.hasKey(key) : void 0 : void 0 : void 0;
    },
    property: function(key) {
      var properties, propertyClass, _base;
      Batman.initializeObject(this);
      propertyClass = this.propertyClass || Batman.Keypath;
      properties = (_base = this._batman).properties || (_base.properties = new Batman.SimpleHash);
      if (properties.objectKey(key)) {
        return properties.getObject(key) || properties.setObject(key, new propertyClass(this, key));
      } else {
        return properties.getString(key) || properties.setString(key, new propertyClass(this, key));
      }
    },
    get: function(key) {
      return this.property(key).getValue();
    },
    set: function(key, val) {
      return this.property(key).setValue(val);
    },
    unset: function(key) {
      return this.property(key).unsetValue();
    },
    getOrSet: Batman.SimpleHash.prototype.getOrSet,
    forget: function(key, observer) {
      var _ref;
      if (key) {
        this.property(key).forget(observer);
      } else {
        if ((_ref = this._batman.properties) != null) {
          _ref.forEach(function(key, property) {
            return property.forget();
          });
        }
      }
      return this;
    },
    observe: function() {
      var args, key, _ref;
      key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      (_ref = this.property(key)).observe.apply(_ref, args);
      return this;
    },
    observeAndFire: function() {
      var args, key, _ref;
      key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      (_ref = this.property(key)).observeAndFire.apply(_ref, args);
      return this;
    },
    observeOnce: function() {
      var args, key, _ref;
      key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      (_ref = this.property(key)).observeOnce.apply(_ref, args);
      return this;
    }
  };

}).call(this);

(function() {
  var methodName, platformMethods, _i, _len;

  Batman.DOM = {
    textInputTypes: ['text', 'search', 'tel', 'url', 'email', 'password'],
    scrollIntoView: function(elementID) {
      var _ref;
      return (_ref = document.getElementById(elementID)) != null ? typeof _ref.scrollIntoView === "function" ? _ref.scrollIntoView() : void 0 : void 0;
    },
    setStyleProperty: function(node, property, value, importance) {
      if (node.style.setProperty) {
        return node.style.setProperty(property, value, importance);
      } else {
        return node.style.setAttribute(property, value, importance);
      }
    },
    valueForNode: function(node, value, escapeValue) {
      var child, isSetting, nodeName, _i, _len, _ref, _results;
      if (value == null) {
        value = '';
      }
      if (escapeValue == null) {
        escapeValue = true;
      }
      isSetting = arguments.length > 1;
      nodeName = node.nodeName.toUpperCase();
      switch (nodeName) {
        case 'INPUT':
        case 'TEXTAREA':
          if (isSetting) {
            return node.value = value;
          } else {
            return node.value;
          }
          break;
        case 'SELECT':
          if (isSetting) {
            return node.value = value;
          } else if (node.multiple) {
            _ref = node.children;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              child = _ref[_i];
              if (child.selected) {
                _results.push(child.value);
              }
            }
            return _results;
          } else {
            return node.value;
          }
          break;
        default:
          if (isSetting) {
            if (nodeName === 'OPTION') {
              node.text = value;
            }
            return Batman.DOM.setInnerHTML(node, escapeValue ? Batman.escapeHTML(value) : value);
          } else {
            return node.innerHTML;
          }
      }
    },
    nodeIsEditable: function(node) {
      var _ref;
      return (_ref = node.nodeName.toUpperCase()) === 'INPUT' || _ref === 'TEXTAREA' || _ref === 'SELECT';
    },
    addEventListener: function(node, eventName, callback) {
      var listeners;
      if (!(listeners = Batman._data(node, 'listeners'))) {
        listeners = Batman._data(node, 'listeners', {});
      }
      if (!listeners[eventName]) {
        listeners[eventName] = [];
      }
      listeners[eventName].push(callback);
      if (Batman.DOM.hasAddEventListener) {
        return node.addEventListener(eventName, callback, false);
      } else {
        return node.attachEvent("on" + eventName, callback);
      }
    },
    removeEventListener: function(node, eventName, callback) {
      var eventListeners, index, listeners;
      if (listeners = Batman._data(node, 'listeners')) {
        if (eventListeners = listeners[eventName]) {
          index = eventListeners.indexOf(callback);
          if (index !== -1) {
            eventListeners.splice(index, 1);
          }
        }
      }
      if (Batman.DOM.hasAddEventListener) {
        return node.removeEventListener(eventName, callback, false);
      } else {
        return node.detachEvent('on' + eventName, callback);
      }
    },
    cleanupNode: function(node) {
      var child, eventListeners, eventName, listeners, _i, _len, _ref;
      if (listeners = Batman._data(node, 'listeners')) {
        for (eventName in listeners) {
          eventListeners = listeners[eventName];
          eventListeners.forEach(function(listener) {
            return Batman.DOM.removeEventListener(node, eventName, listener);
          });
        }
      }
      Batman.removeData(node, null, null, true);
      _ref = node.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        Batman.DOM.cleanupNode(child);
      }
    },
    hasAddEventListener: !!(typeof window !== "undefined" && window !== null ? window.addEventListener : void 0),
    preventDefault: function(e) {
      if (typeof e.preventDefault === "function") {
        return e.preventDefault();
      } else {
        return e.returnValue = false;
      }
    },
    stopPropagation: function(e) {
      if (e.stopPropagation) {
        return e.stopPropagation();
      } else {
        return e.cancelBubble = true;
      }
    }
  };

  platformMethods = ['querySelector', 'querySelectorAll', 'setInnerHTML', 'containsNode', 'destroyNode', 'textContent'];

  for (_i = 0, _len = platformMethods.length; _i < _len; _i++) {
    methodName = platformMethods[_i];
    Batman.DOM[methodName] = function() {
      return Batman.developer.error("Please include a platform adapter to define " + methodName + ".");
    };
  }

}).call(this);

(function() {
  Batman.DOM.ReaderBindingDefinition = (function() {
    function ReaderBindingDefinition(node, keyPath, view) {
      this.node = node;
      this.keyPath = keyPath;
      this.view = view;
    }

    return ReaderBindingDefinition;

  })();

  Batman.BindingDefinitionOnlyObserve = {
    Data: 'data',
    Node: 'node',
    All: 'all',
    None: 'none'
  };

  Batman.DOM.readers = {
    target: function(definition) {
      definition.onlyObserve = Batman.BindingDefinitionOnlyObserve.Node;
      return Batman.DOM.readers.bind(definition);
    },
    source: function(definition) {
      definition.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;
      return Batman.DOM.readers.bind(definition);
    },
    bind: function(definition) {
      var bindingClass, node;
      node = definition.node;
      switch (node.nodeName.toLowerCase()) {
        case 'input':
          switch (node.getAttribute('type')) {
            case 'checkbox':
              definition.attr = 'checked';
              Batman.DOM.attrReaders.bind(definition);
              return true;
            case 'radio':
              bindingClass = Batman.DOM.RadioBinding;
              break;
            case 'file':
              bindingClass = Batman.DOM.FileBinding;
          }
          break;
        case 'select':
          bindingClass = Batman.DOM.SelectBinding;
      }
      bindingClass || (bindingClass = Batman.DOM.ValueBinding);
      return new bindingClass(definition);
    },
    context: function(definition) {
      return new Batman.DOM.ContextBinding(definition);
    },
    showif: function(definition) {
      return new Batman.DOM.ShowHideBinding(definition);
    },
    hideif: function(definition) {
      definition.invert = true;
      return new Batman.DOM.ShowHideBinding(definition);
    },
    insertif: function(definition) {
      return new Batman.DOM.InsertionBinding(definition);
    },
    removeif: function(definition) {
      definition.invert = true;
      return new Batman.DOM.InsertionBinding(definition);
    },
    deferif: function(definition) {
      definition.invert = true;
      return new Batman.DOM.DeferredRenderBinding(definition);
    },
    renderif: function(definition) {
      return new Batman.DOM.DeferredRenderBinding(definition);
    },
    route: function(definition) {
      return new Batman.DOM.RouteBinding(definition);
    },
    view: function(definition) {
      return new Batman.DOM.ViewBinding(definition);
    },
    partial: function(definition) {
      var keyPath, node, partialView, view;
      node = definition.node, keyPath = definition.keyPath, view = definition.view;
      node.removeAttribute('data-partial');
      partialView = new Batman.View({
        source: keyPath,
        parentNode: node,
        node: node
      });
      return {
        skipChildren: true,
        initialized: function() {
          partialView.loadView(node);
          return view.subviews.add(partialView);
        }
      };
    },
    defineview: function(definition) {
      var keyPath, node, view;
      node = definition.node, view = definition.view, keyPath = definition.keyPath;
      Batman.View.store.set(Batman.Navigator.normalizePath(keyPath), node.innerHTML);
      return {
        skipChildren: true,
        initialized: function() {
          if (node.parentNode) {
            return node.parentNode.removeChild(node);
          }
        }
      };
    },
    contentfor: function(definition) {
      var contentView, keyPath, node, view;
      node = definition.node, keyPath = definition.keyPath, view = definition.view;
      contentView = new Batman.View({
        html: node.innerHTML,
        contentFor: keyPath
      });
      contentView.addToParentNode = function(parentNode) {
        parentNode.innerHTML = '';
        return parentNode.appendChild(this.get('node'));
      };
      view.subviews.add(contentView);
      return {
        skipChildren: true,
        initialized: function() {
          if (node.parentNode) {
            return node.parentNode.removeChild(node);
          }
        }
      };
    },
    "yield": function(definition) {
      var yieldObject;
      yieldObject = Batman.DOM.Yield.withName(definition.keyPath);
      yieldObject.set('containerNode', definition.node);
      return {
        skipChildren: true
      };
    }
  };

}).call(this);

(function() {
  var __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Batman.DOM.events = {
    primaryInteractionEvent: function(node, callback, view, eventName, preventDefault) {
      if (eventName == null) {
        eventName = Batman.DOM.primaryInteractionEventName;
      }
      if (preventDefault == null) {
        preventDefault = true;
      }
      Batman.DOM.addEventListener(node, eventName, function() {
        var args, event;
        event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (event.metaKey || event.ctrlKey || event.button === 1) {
          return;
        }
        if (preventDefault) {
          Batman.DOM.preventDefault(event);
        }
        if (!Batman.DOM.eventIsAllowed(eventName, event)) {
          return;
        }
        return callback.apply(null, [node, event].concat(__slice.call(args), [view]));
      });
      if (node.nodeName.toUpperCase() === 'A' && !node.href) {
        node.href = '#';
      }
      return node;
    },
    click: function(node, callback, view, eventName, preventDefault) {
      if (eventName == null) {
        eventName = 'click';
      }
      if (preventDefault == null) {
        preventDefault = true;
      }
      return Batman.DOM.events.primaryInteractionEvent(node, callback, view, eventName, preventDefault);
    },
    doubleclick: function(node, callback, view) {
      return Batman.DOM.events.click(node, callback, view, 'dblclick');
    },
    change: function(node, callback, view) {
      var eventName, eventNames, oldCallback, _i, _len;
      eventNames = (function() {
        var _ref;
        switch (node.nodeName.toUpperCase()) {
          case 'TEXTAREA':
            return ['input', 'keyup', 'change'];
          case 'INPUT':
            if (_ref = node.type.toLowerCase(), __indexOf.call(Batman.DOM.textInputTypes, _ref) >= 0) {
              oldCallback = callback;
              callback = function(node, event, view) {
                if (event.type === 'keyup' && Batman.DOM.events.isEnter(event)) {
                  return;
                }
                return oldCallback(node, event, view);
              };
              return ['input', 'keyup', 'change'];
            } else {
              return ['input', 'change'];
            }
            break;
          default:
            return ['change'];
        }
      })();
      for (_i = 0, _len = eventNames.length; _i < _len; _i++) {
        eventName = eventNames[_i];
        Batman.DOM.addEventListener(node, eventName, function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return callback.apply(null, [node].concat(__slice.call(args), [view]));
        });
      }
    },
    isEnter: function(ev) {
      var _ref, _ref1;
      return ((13 <= (_ref = ev.keyCode) && _ref <= 14)) || ((13 <= (_ref1 = ev.which) && _ref1 <= 14)) || ev.keyIdentifier === 'Enter' || ev.key === 'Enter';
    },
    submit: function(node, callback, view) {
      if (Batman.DOM.nodeIsEditable(node)) {
        Batman.DOM.addEventListener(node, 'keydown', function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (Batman.DOM.events.isEnter(args[0])) {
            return Batman.DOM._keyCapturingNode = node;
          }
        });
        Batman.DOM.addEventListener(node, 'keyup', function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (Batman.DOM.events.isEnter(args[0])) {
            if (Batman.DOM._keyCapturingNode === node) {
              Batman.DOM.preventDefault(args[0]);
              callback.apply(null, [node].concat(__slice.call(args), [view]));
            }
            return Batman.DOM._keyCapturingNode = null;
          }
        });
      } else {
        Batman.DOM.addEventListener(node, 'submit', function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          Batman.DOM.preventDefault(args[0]);
          return callback.apply(null, [node].concat(__slice.call(args), [view]));
        });
      }
      return node;
    },
    other: function(node, eventName, callback, view) {
      return Batman.DOM.addEventListener(node, eventName, function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return callback.apply(null, [node].concat(__slice.call(args), [view]));
      });
    }
  };

  Batman.DOM.eventIsAllowed = function(eventName, event) {
    var delegate, _ref, _ref1;
    if (delegate = (_ref = Batman.currentApp) != null ? (_ref1 = _ref.shouldAllowEvent) != null ? _ref1[eventName] : void 0 : void 0) {
      if (delegate(event) === false) {
        return false;
      }
    }
    return true;
  };

  Batman.DOM.primaryInteractionEventName = 'click';

}).call(this);

(function() {
  Batman.DOM.AttrReaderBindingDefinition = (function() {
    function AttrReaderBindingDefinition(node, attr, keyPath, view) {
      this.node = node;
      this.attr = attr;
      this.keyPath = keyPath;
      this.view = view;
    }

    return AttrReaderBindingDefinition;

  })();

  Batman.DOM.attrReaders = {
    _parseAttribute: function(value) {
      if (value === 'false') {
        value = false;
      }
      if (value === 'true') {
        value = true;
      }
      return value;
    },
    source: function(definition) {
      definition.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;
      return Batman.DOM.attrReaders.bind(definition);
    },
    bind: function(definition) {
      var bindingClass;
      bindingClass = (function() {
        switch (definition.attr) {
          case 'checked':
          case 'disabled':
          case 'selected':
            return Batman.DOM.CheckedBinding;
          case 'value':
          case 'href':
          case 'src':
          case 'size':
            return Batman.DOM.NodeAttributeBinding;
          case 'class':
            return Batman.DOM.ClassBinding;
          case 'style':
            return Batman.DOM.StyleBinding;
          default:
            return Batman.DOM.AttributeBinding;
        }
      })();
      return new bindingClass(definition);
    },
    context: function(definition) {
      return new Batman.DOM.ContextBinding(definition);
    },
    event: function(definition) {
      return new Batman.DOM.EventBinding(definition);
    },
    track: function(definition) {
      if (definition.attr === 'view') {
        return new Batman.DOM.ViewTrackingBinding(definition);
      } else if (definition.attr === 'click') {
        return new Batman.DOM.ClickTrackingBinding(definition);
      }
    },
    addclass: function(definition) {
      return new Batman.DOM.AddClassBinding(definition);
    },
    removeclass: function(definition) {
      definition.invert = true;
      return new Batman.DOM.AddClassBinding(definition);
    },
    foreach: function(definition) {
      return new Batman.DOM.IteratorBinding(definition);
    },
    formfor: function(definition) {
      return new Batman.DOM.FormBinding(definition);
    },
    style: function(definition) {
      return new Batman.DOM.StyleAttributeBinding(definition);
    }
  };

}).call(this);

(function() {
  var BatmanObject, ObjectFunctions, getAccessorObject, promiseWrapper, wrapSingleAccessor,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  getAccessorObject = function(base, accessor) {
    var deprecated, _i, _len, _ref;
    if (typeof accessor === 'function') {
      accessor = {
        get: accessor
      };
    }
    _ref = ['cachable', 'cacheable'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      deprecated = _ref[_i];
      if (deprecated in accessor) {
        Batman.developer.warn("Property accessor option \"" + deprecated + "\" is deprecated. Use \"cache\" instead.");
        if (!('cache' in accessor)) {
          accessor.cache = accessor[deprecated];
        }
      }
    }
    return accessor;
  };

  promiseWrapper = function(fetcher) {
    return function(defaultAccessor) {
      return {
        get: function(key) {
          var asyncDeliver, existingValue, newValue, _base, _base1,
            _this = this;
          if ((existingValue = defaultAccessor.get.apply(this, arguments)) != null) {
            return existingValue;
          }
          asyncDeliver = false;
          newValue = void 0;
          if ((_base = this._batman).promises == null) {
            _base.promises = {};
          }
          if ((_base1 = this._batman.promises)[key] == null) {
            _base1[key] = (function() {
              var deliver, returnValue;
              deliver = function(err, result) {
                if (asyncDeliver) {
                  _this.set(key, result);
                }
                return newValue = result;
              };
              returnValue = fetcher.call(_this, deliver, key);
              if (newValue == null) {
                newValue = returnValue;
              }
              return true;
            })();
          }
          asyncDeliver = true;
          return newValue;
        },
        cache: true
      };
    };
  };

  wrapSingleAccessor = function(core, wrapper) {
    var k, v;
    wrapper = (typeof wrapper === "function" ? wrapper(core) : void 0) || wrapper;
    for (k in core) {
      v = core[k];
      if (!(k in wrapper)) {
        wrapper[k] = v;
      }
    }
    return wrapper;
  };

  ObjectFunctions = {
    _defineAccessor: function() {
      var accessor, key, keys, _base, _i, _j, _len, _ref;
      keys = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), accessor = arguments[_i++];
      if (accessor == null) {
        return Batman.Property.defaultAccessorForBase(this);
      } else if (keys.length === 0 && ((_ref = Batman.typeOf(accessor)) !== 'Object' && _ref !== 'Function')) {
        return Batman.Property.accessorForBaseAndKey(this, accessor);
      } else if (typeof accessor.promise === 'function') {
        return this._defineWrapAccessor.apply(this, __slice.call(keys).concat([promiseWrapper(accessor.promise)]));
      }
      Batman.initializeObject(this);
      if (keys.length === 0) {
        this._batman.defaultAccessor = getAccessorObject(this, accessor);
      } else {
        (_base = this._batman).keyAccessors || (_base.keyAccessors = new Batman.SimpleHash);
        for (_j = 0, _len = keys.length; _j < _len; _j++) {
          key = keys[_j];
          this._batman.keyAccessors.set(key, getAccessorObject(this, accessor));
        }
      }
      return true;
    },
    _defineWrapAccessor: function() {
      var key, keys, wrapper, _i, _j, _len;
      keys = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), wrapper = arguments[_i++];
      Batman.initializeObject(this);
      if (keys.length === 0) {
        this._defineAccessor(wrapSingleAccessor(this._defineAccessor(), wrapper));
      } else {
        for (_j = 0, _len = keys.length; _j < _len; _j++) {
          key = keys[_j];
          this._defineAccessor(key, wrapSingleAccessor(this._defineAccessor(key), wrapper));
        }
      }
      return true;
    },
    _resetPromises: function() {
      var key;
      if (this._batman.promises == null) {
        return;
      }
      for (key in this._batman.promises) {
        this._resetPromise(key);
      }
    },
    _resetPromise: function(key) {
      this.unset(key);
      this.property(key).cached = false;
      delete this._batman.promises[key];
    }
  };

  BatmanObject = (function(_super) {
    var counter;

    __extends(BatmanObject, _super);

    Batman.initializeObject(BatmanObject);

    Batman.initializeObject(BatmanObject.prototype);

    Batman.mixin(BatmanObject.prototype, ObjectFunctions, Batman.EventEmitter, Batman.Observable);

    Batman.mixin(BatmanObject, ObjectFunctions, Batman.EventEmitter, Batman.Observable);

    BatmanObject.classMixin = function() {
      return Batman.mixin.apply(Batman, [this].concat(__slice.call(arguments)));
    };

    BatmanObject.mixin = function() {
      return this.classMixin.apply(this.prototype, arguments);
    };

    BatmanObject.prototype.mixin = BatmanObject.classMixin;

    BatmanObject.classAccessor = BatmanObject._defineAccessor;

    BatmanObject.accessor = function() {
      var _ref;
      return (_ref = this.prototype)._defineAccessor.apply(_ref, arguments);
    };

    BatmanObject.prototype.accessor = BatmanObject._defineAccessor;

    BatmanObject.wrapClassAccessor = BatmanObject._defineWrapAccessor;

    BatmanObject.wrapAccessor = function() {
      var _ref;
      return (_ref = this.prototype)._defineWrapAccessor.apply(_ref, arguments);
    };

    BatmanObject.prototype.wrapAccessor = BatmanObject._defineWrapAccessor;

    BatmanObject.observeAll = function() {
      return this.prototype.observe.apply(this.prototype, arguments);
    };

    BatmanObject.singleton = function(singletonMethodName) {
      if (singletonMethodName == null) {
        singletonMethodName = "sharedInstance";
      }
      return this.classAccessor(singletonMethodName, {
        get: function() {
          var _name;
          return this[_name = "_" + singletonMethodName] || (this[_name] = new this);
        }
      });
    };

    BatmanObject.accessor('_batmanID', function() {
      return this._batmanID();
    });

    BatmanObject.delegate = function() {
      var options, properties, _i,
        _this = this;
      properties = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), options = arguments[_i++];
      if (options == null) {
        options = {};
      }
      if (!options.to) {
        Batman.developer.warn('delegate must include to option', this, properties);
      }
      return properties.forEach(function(property) {
        return _this.accessor(property, {
          get: function() {
            var _ref;
            return (_ref = this.get(options.to)) != null ? _ref.get(property) : void 0;
          },
          set: function(key, value) {
            var _ref;
            return (_ref = this.get(options.to)) != null ? _ref.set(property, value) : void 0;
          },
          unset: function() {
            var _ref;
            return (_ref = this.get(options.to)) != null ? _ref.unset(property) : void 0;
          }
        });
      });
    };

    BatmanObject.classDelegate = function() {
      var options, properties, _i,
        _this = this;
      properties = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), options = arguments[_i++];
      if (options == null) {
        options = {};
      }
      if (!options.to) {
        Batman.developer.warn('delegate must include to option', this, properties);
      }
      return properties.forEach(function(property) {
        return _this.classAccessor(property, {
          get: function() {
            var _ref;
            return (_ref = this.get(options.to)) != null ? _ref.get(property) : void 0;
          },
          set: function(key, value) {
            var _ref;
            return (_ref = this.get(options.to)) != null ? _ref.set(property, value) : void 0;
          },
          unset: function() {
            var _ref;
            return (_ref = this.get(options.to)) != null ? _ref.unset(property) : void 0;
          }
        });
      });
    };

    function BatmanObject() {
      var mixins;
      mixins = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this._batman = new Batman._Batman(this);
      this.mixin.apply(this, mixins);
    }

    counter = 0;

    BatmanObject.prototype._batmanID = function() {
      var _base;
      this._batman.check(this);
      if ((_base = this._batman).id == null) {
        _base.id = counter++;
      }
      return this._batman.id;
    };

    BatmanObject.prototype.hashKey = function() {
      var _base;
      if (typeof this.isEqual === 'function') {
        return;
      }
      return (_base = this._batman).hashKey || (_base.hashKey = "<Batman.Object " + (this._batmanID()) + ">");
    };

    BatmanObject.prototype.toJSON = function() {
      var key, obj, value;
      obj = {};
      for (key in this) {
        if (!__hasProp.call(this, key)) continue;
        value = this[key];
        if (key !== "_batman" && key !== "hashKey" && key !== "_batmanID") {
          obj[key] = (value != null ? value.toJSON : void 0) ? value.toJSON() : value;
        }
      }
      return obj;
    };

    BatmanObject.prototype.batchAccessorChanges = function() {
      var i, key, properties, property, result, wrappedFunction, _i, _j, _k, _len, _len1;
      properties = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), wrappedFunction = arguments[_i++];
      for (i = _j = 0, _len = properties.length; _j < _len; i = ++_j) {
        key = properties[i];
        property = properties[i] = this.property(key);
        property.isBatchingChanges = true;
      }
      result = wrappedFunction.call(this);
      for (_k = 0, _len1 = properties.length; _k < _len1; _k++) {
        property = properties[_k];
        property.isBatchingChanges = false;
        property.refresh();
      }
      return result;
    };

    return BatmanObject;

  })(Object);

  Batman.Object = BatmanObject;

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.BindingParser = (function(_super) {
    var bindingSortOrder, bindingSortPositions, name, pos, viewBackedBindings, _i, _len;

    __extends(BindingParser, _super);

    function BindingParser(view) {
      this.view = view;
      BindingParser.__super__.constructor.call(this);
      this.node = this.view.node;
      this.parseTree(this.node);
    }

    bindingSortOrder = ["defineview", "foreach", "renderif", "view", "formfor", "context", "bind", "source", "target", "track", "event"];

    viewBackedBindings = ["foreach", "renderif", "formfor", "context"];

    bindingSortPositions = {};

    for (pos = _i = 0, _len = bindingSortOrder.length; _i < _len; pos = ++_i) {
      name = bindingSortOrder[pos];
      bindingSortPositions[name] = pos;
    }

    BindingParser.prototype._sortBindings = function(a, b) {
      var aindex, bindex;
      aindex = bindingSortPositions[a[0]];
      bindex = bindingSortPositions[b[0]];
      if (aindex == null) {
        aindex = bindingSortOrder.length;
      }
      if (bindex == null) {
        bindex = bindingSortOrder.length;
      }
      if (aindex > bindex) {
        return 1;
      } else if (bindex > aindex) {
        return -1;
      } else if (a[0] > b[0]) {
        return 1;
      } else if (b[0] > a[0]) {
        return -1;
      } else {
        return 0;
      }
    };

    BindingParser.prototype.parseTree = function(root) {
      var skipChildren;
      while (root) {
        skipChildren = this.parseNode(root);
        root = this.nextNode(root, skipChildren);
      }
      this.fire('bindingsInitialized');
    };

    BindingParser.prototype.parseNode = function(node) {
      var attr, attrIndex, attribute, backingView, binding, bindingDefinition, bindings, isViewBacked, reader, value, _j, _k, _len1, _len2, _ref, _ref1, _ref2, _ref3;
      isViewBacked = false;
      if (node.getAttribute && node.attributes) {
        bindings = [];
        _ref = node.attributes;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          attribute = _ref[_j];
          if (((_ref1 = attribute.nodeName) != null ? _ref1.substr(0, 5) : void 0) !== "data-") {
            continue;
          }
          name = attribute.nodeName.substr(5);
          attrIndex = name.indexOf('-');
          bindings.push(attrIndex !== -1 ? [name.substr(0, attrIndex), name.substr(attrIndex + 1), attribute.value] : [name, void 0, attribute.value]);
        }
        _ref2 = bindings.sort(this._sortBindings);
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          _ref3 = _ref2[_k], name = _ref3[0], attr = _ref3[1], value = _ref3[2];
          if (isViewBacked && viewBackedBindings.indexOf(name) === -1) {
            continue;
          }
          binding = attr ? (reader = Batman.DOM.attrReaders[name]) ? (bindingDefinition = new Batman.DOM.AttrReaderBindingDefinition(node, attr, value, this.view), reader(bindingDefinition)) : void 0 : (reader = Batman.DOM.readers[name]) ? (bindingDefinition = new Batman.DOM.ReaderBindingDefinition(node, value, this.view), reader(bindingDefinition)) : void 0;
          if (binding != null ? binding.initialized : void 0) {
            this.once('bindingsInitialized', (function(binding) {
              return function() {
                return binding.initialized.call(binding);
              };
            })(binding));
          }
          if (binding != null ? binding.skipChildren : void 0) {
            return true;
          }
          if (binding != null ? binding.backWithView : void 0) {
            isViewBacked = true;
          }
        }
      }
      if (isViewBacked && (backingView = Batman._data(node, 'view'))) {
        backingView.initializeBindings();
      }
      return isViewBacked;
    };

    BindingParser.prototype.nextNode = function(node, skipChildren) {
      var children, nextParent, parentSibling, sibling;
      if (!skipChildren) {
        children = node.childNodes;
        if (children != null ? children.length : void 0) {
          return children[0];
        }
      }
      sibling = node.nextSibling;
      if (this.node === node) {
        return;
      }
      if (sibling) {
        return sibling;
      }
      nextParent = node;
      while (nextParent = nextParent.parentNode) {
        parentSibling = nextParent.nextSibling;
        if (this.node === nextParent) {
          return;
        }
        if (parentSibling) {
          return parentSibling;
        }
      }
    };

    return BindingParser;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.ValidationError = (function(_super) {
    __extends(ValidationError, _super);

    ValidationError.accessor('fullMessage', function() {
      if (this.attribute === 'base') {
        return Batman.t('errors.base.format', {
          message: this.message
        });
      } else {
        return Batman.t('errors.format', {
          attribute: Batman.helpers.humanize(Batman.ValidationError.singularizeAssociated(this.attribute)),
          message: this.message
        });
      }
    });

    function ValidationError(attribute, message) {
      ValidationError.__super__.constructor.call(this, {
        attribute: attribute,
        message: message
      });
    }

    ValidationError.singularizeAssociated = function(attribute) {
      var i, parts, _i, _ref;
      parts = attribute.split(".");
      for (i = _i = 0, _ref = parts.length - 1; _i < _ref; i = _i += 1) {
        parts[i] = Batman.helpers.singularize(parts[i]);
      }
      return parts.join(" ");
    };

    return ValidationError;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.StorageAdapter = (function(_super) {
    __extends(StorageAdapter, _super);

    StorageAdapter.StorageError = (function(_super1) {
      __extends(StorageError, _super1);

      StorageError.prototype.name = "StorageError";

      function StorageError(message) {
        StorageError.__super__.constructor.apply(this, arguments);
        this.message = message;
      }

      return StorageError;

    })(Error);

    StorageAdapter.RecordExistsError = (function(_super1) {
      __extends(RecordExistsError, _super1);

      RecordExistsError.prototype.name = 'RecordExistsError';

      function RecordExistsError(message) {
        RecordExistsError.__super__.constructor.call(this, message || "Can't create this record because it already exists in the store!");
      }

      return RecordExistsError;

    })(StorageAdapter.StorageError);

    StorageAdapter.NotFoundError = (function(_super1) {
      __extends(NotFoundError, _super1);

      NotFoundError.prototype.name = 'NotFoundError';

      function NotFoundError(message) {
        NotFoundError.__super__.constructor.call(this, message || "Record couldn't be found in storage!");
      }

      return NotFoundError;

    })(StorageAdapter.StorageError);

    StorageAdapter.UnauthorizedError = (function(_super1) {
      __extends(UnauthorizedError, _super1);

      UnauthorizedError.prototype.name = 'UnauthorizedError';

      function UnauthorizedError(message) {
        UnauthorizedError.__super__.constructor.call(this, message || "Storage operation denied due to invalid credentials!");
      }

      return UnauthorizedError;

    })(StorageAdapter.StorageError);

    StorageAdapter.NotAllowedError = (function(_super1) {
      __extends(NotAllowedError, _super1);

      NotAllowedError.prototype.name = "NotAllowedError";

      function NotAllowedError(message) {
        NotAllowedError.__super__.constructor.call(this, message || "Storage operation denied access to the operation!");
      }

      return NotAllowedError;

    })(StorageAdapter.StorageError);

    StorageAdapter.NotAcceptableError = (function(_super1) {
      __extends(NotAcceptableError, _super1);

      NotAcceptableError.prototype.name = "NotAcceptableError";

      function NotAcceptableError(message) {
        NotAcceptableError.__super__.constructor.call(this, message || "Storage operation permitted but the request was malformed!");
      }

      return NotAcceptableError;

    })(StorageAdapter.StorageError);

    StorageAdapter.EntityTooLargeError = (function(_super1) {
      __extends(EntityTooLargeError, _super1);

      EntityTooLargeError.prototype.name = "EntityTooLargeError";

      function EntityTooLargeError(message) {
        EntityTooLargeError.__super__.constructor.call(this, message || "Storage operation denied due to size constraints!");
      }

      return EntityTooLargeError;

    })(StorageAdapter.StorageError);

    StorageAdapter.UnprocessableRecordError = (function(_super1) {
      __extends(UnprocessableRecordError, _super1);

      UnprocessableRecordError.prototype.name = "UnprocessableRecordError";

      function UnprocessableRecordError(message) {
        UnprocessableRecordError.__super__.constructor.call(this, message || "Storage adapter could not process the record!");
      }

      return UnprocessableRecordError;

    })(StorageAdapter.StorageError);

    StorageAdapter.InternalStorageError = (function(_super1) {
      __extends(InternalStorageError, _super1);

      InternalStorageError.prototype.name = "InternalStorageError";

      function InternalStorageError(message) {
        InternalStorageError.__super__.constructor.call(this, message || "An error occurred during the storage operation!");
      }

      return InternalStorageError;

    })(StorageAdapter.StorageError);

    StorageAdapter.NotImplementedError = (function(_super1) {
      __extends(NotImplementedError, _super1);

      NotImplementedError.prototype.name = "NotImplementedError";

      function NotImplementedError(message) {
        NotImplementedError.__super__.constructor.call(this, message || "This operation is not implemented by the storage adapter!");
      }

      return NotImplementedError;

    })(StorageAdapter.StorageError);

    StorageAdapter.BadGatewayError = (function(_super1) {
      __extends(BadGatewayError, _super1);

      BadGatewayError.prototype.name = "BadGatewayError";

      function BadGatewayError(message) {
        BadGatewayError.__super__.constructor.call(this, message || "Storage operation failed due to unavailability of the backend!");
      }

      return BadGatewayError;

    })(StorageAdapter.StorageError);

    function StorageAdapter(model) {
      var constructor;
      StorageAdapter.__super__.constructor.call(this, {
        model: model
      });
      constructor = this.constructor;
      if (constructor.ModelMixin) {
        Batman.extend(model, constructor.ModelMixin);
      }
      if (constructor.RecordMixin) {
        Batman.extend(model.prototype, constructor.RecordMixin);
      }
    }

    StorageAdapter.prototype.isStorageAdapter = true;

    StorageAdapter.prototype.onlyCertainAttributes = function(json, only) {
      var key;
      for (key in json) {
        if (only.indexOf(key) < 0) {
          delete json[key];
        }
      }
      return json;
    };

    StorageAdapter.prototype.exceptCertainAttributes = function(json, except) {
      var key, _i, _len;
      for (_i = 0, _len = except.length; _i < _len; _i++) {
        key = except[_i];
        delete json[key];
      }
      return json;
    };

    StorageAdapter.prototype.storageKey = function(record) {
      var model;
      model = (record != null ? record.constructor : void 0) || this.model;
      return model.get('storageKey') || Batman.helpers.pluralize(Batman.helpers.underscore(model.get('resourceName')));
    };

    StorageAdapter.prototype.getRecordFromData = function(attributes, constructor) {
      if (constructor == null) {
        constructor = this.model;
      }
      return constructor.createFromJSON(attributes);
    };

    StorageAdapter.prototype.getRecordsFromData = function(attributeSet, constructor) {
      if (constructor == null) {
        constructor = this.model;
      }
      return constructor.createMultipleFromJSON(attributeSet);
    };

    StorageAdapter.skipIfError = function(f) {
      return function(env, next) {
        if (env.error != null) {
          return next();
        } else {
          return f.call(this, env, next);
        }
      };
    };

    StorageAdapter.prototype.before = function() {
      return this._addFilter.apply(this, ['before'].concat(__slice.call(arguments)));
    };

    StorageAdapter.prototype.after = function() {
      return this._addFilter.apply(this, ['after'].concat(__slice.call(arguments)));
    };

    StorageAdapter.prototype._inheritFilters = function() {
      var filtersByKey, filtersList, key, oldFilters, position;
      if (!this._batman.check(this) || !this._batman.filters) {
        oldFilters = this._batman.getFirst('filters');
        this._batman.filters = {
          before: {},
          after: {}
        };
        if (oldFilters != null) {
          for (position in oldFilters) {
            filtersByKey = oldFilters[position];
            for (key in filtersByKey) {
              filtersList = filtersByKey[key];
              this._batman.filters[position][key] = filtersList.slice(0);
            }
          }
        }
      }
      return true;
    };

    StorageAdapter.prototype._addFilter = function() {
      var filter, key, keys, position, _base, _i, _j, _len;
      position = arguments[0], keys = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), filter = arguments[_i++];
      this._inheritFilters();
      for (_j = 0, _len = keys.length; _j < _len; _j++) {
        key = keys[_j];
        (_base = this._batman.filters[position])[key] || (_base[key] = []);
        this._batman.filters[position][key].push(filter);
      }
      return true;
    };

    StorageAdapter.prototype.runFilter = function(position, action, env, callback) {
      var actionFilters, allFilters, filters, next,
        _this = this;
      this._inheritFilters();
      allFilters = this._batman.filters[position].all || [];
      actionFilters = this._batman.filters[position][action] || [];
      env.action = action;
      filters = position === 'before' ? actionFilters.concat(allFilters) : allFilters.concat(actionFilters);
      next = function(newEnv) {
        var nextFilter;
        if (newEnv != null) {
          env = newEnv;
        }
        if ((nextFilter = filters.shift()) != null) {
          return nextFilter.call(_this, env, next);
        } else {
          return callback.call(_this, env);
        }
      };
      return next();
    };

    StorageAdapter.prototype.runBeforeFilter = function() {
      return this.runFilter.apply(this, ['before'].concat(__slice.call(arguments)));
    };

    StorageAdapter.prototype.runAfterFilter = function(action, env, callback) {
      return this.runFilter('after', action, env, this.exportResult(callback));
    };

    StorageAdapter.prototype.exportResult = function(callback) {
      return function(env) {
        return callback(env.error, env.result, env);
      };
    };

    StorageAdapter.prototype._jsonToAttributes = function(json) {
      return JSON.parse(json);
    };

    StorageAdapter.prototype.perform = function(key, subject, options, callback) {
      var env, next,
        _this = this;
      options || (options = {});
      env = {
        options: options,
        subject: subject
      };
      next = function(newEnv) {
        if (newEnv != null) {
          env = newEnv;
        }
        return _this.runAfterFilter(key, env, callback);
      };
      this.runBeforeFilter(key, env, function(env) {
        return this[key](env, next);
      });
      return void 0;
    };

    return StorageAdapter;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Batman.RestStorage = (function(_super) {
    var key, _fn, _i, _len, _ref,
      _this = this;

    __extends(RestStorage, _super);

    RestStorage.CommunicationError = (function(_super1) {
      __extends(CommunicationError, _super1);

      CommunicationError.prototype.name = 'CommunicationError';

      function CommunicationError(message) {
        CommunicationError.__super__.constructor.call(this, message || "A communication error has occurred!");
      }

      return CommunicationError;

    })(RestStorage.StorageError);

    RestStorage.JSONContentType = 'application/json';

    RestStorage.PostBodyContentType = 'application/x-www-form-urlencoded';

    RestStorage.BaseMixin = {
      request: function(action, options, callback) {
        if (!callback) {
          callback = options;
          options = {};
        }
        options.method || (options.method = 'GET');
        options.action = action;
        return this._doStorageOperation(options.method.toLowerCase(), options, callback);
      }
    };

    RestStorage.ModelMixin = Batman.extend({}, RestStorage.BaseMixin, {
      urlNestsUnder: function() {
        var key, keys, parents, _i, _len;
        keys = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        parents = {};
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
          key = keys[_i];
          parents[key + '_id'] = Batman.helpers.pluralize(key);
        }
        this.url = function(options) {
          var childSegment, parentID, plural;
          childSegment = this.storageKey || Batman.helpers.pluralize(this.get('resourceName').toLowerCase());
          for (key in parents) {
            plural = parents[key];
            parentID = options.data[key];
            if (parentID) {
              delete options.data[key];
              return "" + plural + "/" + parentID + "/" + childSegment;
            }
          }
          return childSegment;
        };
        return this.prototype.url = function() {
          var childSegment, id, parentID, plural, url;
          childSegment = this.constructor.storageKey || Batman.helpers.pluralize(this.constructor.get('resourceName').toLowerCase());
          for (key in parents) {
            plural = parents[key];
            parentID = this.get('dirtyKeys').get(key);
            if (parentID === void 0) {
              parentID = this.get(key);
            }
            if (parentID) {
              url = "" + plural + "/" + parentID + "/" + childSegment;
              break;
            }
          }
          url || (url = childSegment);
          if (id = this.get('id')) {
            url += '/' + id;
          }
          return url;
        };
      }
    });

    RestStorage.RecordMixin = Batman.extend({}, RestStorage.BaseMixin);

    RestStorage.prototype.defaultRequestOptions = {
      type: 'json'
    };

    RestStorage.prototype._implicitActionNames = ['create', 'read', 'update', 'destroy', 'readAll'];

    RestStorage.prototype.serializeAsForm = true;

    function RestStorage() {
      RestStorage.__super__.constructor.apply(this, arguments);
      this.defaultRequestOptions = Batman.extend({}, this.defaultRequestOptions);
    }

    RestStorage.prototype.recordJsonNamespace = function(record) {
      return Batman.helpers.singularize(this.storageKey(record));
    };

    RestStorage.prototype.collectionJsonNamespace = function(constructor) {
      return Batman.helpers.pluralize(this.storageKey(constructor.prototype));
    };

    RestStorage.prototype._execWithOptions = function(object, key, options, context) {
      if (context == null) {
        context = object;
      }
      if (typeof object[key] === 'function') {
        return object[key].call(context, options);
      } else {
        return object[key];
      }
    };

    RestStorage.prototype._defaultCollectionUrl = function(model) {
      return "" + (this.storageKey(model.prototype));
    };

    RestStorage.prototype._addParams = function(url, options) {
      var _ref;
      if (options && options.action && !(_ref = options.action, __indexOf.call(this._implicitActionNames, _ref) >= 0)) {
        url += '/' + options.action.toLowerCase();
      }
      return url;
    };

    RestStorage.prototype._addUrlAffixes = function(url, subject, env) {
      var prefix, segments;
      segments = [url, this.urlSuffix(subject, env)];
      if (url.charAt(0) !== '/') {
        prefix = this.urlPrefix(subject, env);
        if (prefix.charAt(prefix.length - 1) !== '/') {
          segments.unshift('/');
        }
        segments.unshift(prefix);
      }
      return segments.join('');
    };

    RestStorage.prototype.urlPrefix = function(object, env) {
      return this._execWithOptions(object, 'urlPrefix', env.options) || '';
    };

    RestStorage.prototype.urlSuffix = function(object, env) {
      return this._execWithOptions(object, 'urlSuffix', env.options) || '';
    };

    RestStorage.prototype.urlForRecord = function(record, env) {
      var id, url, _ref;
      if ((_ref = env.options) != null ? _ref.recordUrl : void 0) {
        url = this._execWithOptions(env.options, 'recordUrl', env.options, record);
      } else if (record.url) {
        url = this._execWithOptions(record, 'url', env.options);
      } else {
        url = record.constructor.url ? this._execWithOptions(record.constructor, 'url', env.options) : this._defaultCollectionUrl(record.constructor);
        if (env.action !== 'create') {
          if ((id = record.get('id')) != null) {
            url = url + "/" + id;
          } else {
            throw new this.constructor.StorageError("Couldn't get/set record primary key on " + env.action + "!");
          }
        }
      }
      return this._addUrlAffixes(this._addParams(url, env.options), record, env);
    };

    RestStorage.prototype.urlForCollection = function(model, env) {
      var url, _ref;
      url = ((_ref = env.options) != null ? _ref.collectionUrl : void 0) ? this._execWithOptions(env.options, 'collectionUrl', env.options, env.options.urlContext) : model.url ? this._execWithOptions(model, 'url', env.options) : this._defaultCollectionUrl(model, env.options);
      return this._addUrlAffixes(this._addParams(url, env.options), model, env);
    };

    RestStorage.prototype.request = function(env, next) {
      var options;
      options = Batman.extend(env.options, {
        autosend: false,
        success: function(data) {
          return env.data = data;
        },
        error: function(error) {
          return env.error = error;
        },
        loaded: function() {
          env.response = env.request.get('response');
          return next();
        }
      });
      env.request = new Batman.Request(options);
      return env.request.send();
    };

    RestStorage.prototype.perform = function(key, record, options, callback) {
      options || (options = {});
      Batman.extend(options, this.defaultRequestOptions);
      return RestStorage.__super__.perform.call(this, key, record, options, callback);
    };

    RestStorage.prototype.before('all', RestStorage.skipIfError(function(env, next) {
      var error;
      if (!env.options.url) {
        try {
          env.options.url = env.subject.prototype ? this.urlForCollection(env.subject, env) : this.urlForRecord(env.subject, env);
        } catch (_error) {
          error = _error;
          env.error = error;
        }
      }
      return next();
    }));

    RestStorage.prototype.before('get', 'put', 'post', 'delete', RestStorage.skipIfError(function(env, next) {
      env.options.method = env.action.toUpperCase();
      return next();
    }));

    RestStorage.prototype.before('create', 'update', RestStorage.skipIfError(function(env, next) {
      var data, json, namespace;
      json = env.subject.toJSON();
      if (env.options.only) {
        json = this.onlyCertainAttributes(json, env.options.only);
      }
      if (env.options.except) {
        json = this.exceptCertainAttributes(json, env.options.except);
      }
      if (namespace = this.recordJsonNamespace(env.subject)) {
        data = {};
        data[namespace] = json;
      } else {
        data = json;
      }
      env.options.data = data;
      return next();
    }));

    RestStorage.prototype.before('create', 'update', 'put', 'post', RestStorage.skipIfError(function(env, next) {
      if (this.serializeAsForm) {
        env.options.contentType = this.constructor.PostBodyContentType;
      } else {
        if (env.options.data != null) {
          env.options.data = JSON.stringify(env.options.data);
          env.options.contentType = this.constructor.JSONContentType;
        }
      }
      return next();
    }));

    RestStorage.prototype.after('all', RestStorage.skipIfError(function(env, next) {
      var error, json;
      if (env.data == null) {
        return next();
      }
      if (typeof env.data === 'string') {
        if (env.data.length > 0) {
          try {
            json = this._jsonToAttributes(env.data);
          } catch (_error) {
            error = _error;
            env.error = error;
            return next();
          }
        }
      } else if (typeof env.data === 'object') {
        json = env.data;
      }
      if (json != null) {
        env.json = json;
      }
      return next();
    }));

    RestStorage.prototype.extractFromNamespace = function(data, namespace) {
      if (namespace && (data[namespace] != null)) {
        return data[namespace];
      } else {
        return data;
      }
    };

    RestStorage.prototype.after('create', 'read', 'update', RestStorage.skipIfError(function(env, next) {
      var json;
      if (env.json != null) {
        json = this.extractFromNamespace(env.json, this.recordJsonNamespace(env.subject));
        env.subject._withoutDirtyTracking(function() {
          return this.fromJSON(json);
        });
      }
      env.result = env.subject;
      return next();
    }));

    RestStorage.prototype.after('readAll', RestStorage.skipIfError(function(env, next) {
      var namespace;
      namespace = this.collectionJsonNamespace(env.subject);
      env.recordsAttributes = this.extractFromNamespace(env.json, namespace);
      if (Batman.typeOf(env.recordsAttributes) !== 'Array') {
        namespace = this.recordJsonNamespace(env.subject.prototype);
        env.recordsAttributes = [this.extractFromNamespace(env.json, namespace)];
      }
      env.result = env.records = this.getRecordsFromData(env.recordsAttributes, env.subject);
      return next();
    }));

    RestStorage.prototype.after('get', 'put', 'post', 'delete', RestStorage.skipIfError(function(env, next) {
      var namespace;
      if (env.json != null) {
        namespace = env.subject.prototype ? this.collectionJsonNamespace(env.subject) : this.recordJsonNamespace(env.subject);
        env.result = this.extractFromNamespace(env.json, namespace);
      }
      return next();
    }));

    RestStorage.HTTPMethods = {
      create: 'POST',
      update: 'PUT',
      read: 'GET',
      readAll: 'GET',
      destroy: 'DELETE'
    };

    _ref = ['create', 'read', 'update', 'destroy', 'readAll', 'get', 'post', 'put', 'delete'];
    _fn = function(key) {
      return RestStorage.prototype[key] = RestStorage.skipIfError(function(env, next) {
        var _base;
        (_base = env.options).method || (_base.method = this.constructor.HTTPMethods[key]);
        return this.request(env, next);
      });
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      _fn(key);
    }

    RestStorage.prototype.after('all', function(env, next) {
      if (env.error) {
        env.error = this._errorFor(env.error, env);
      }
      return next();
    });

    RestStorage._statusCodeErrors = {
      '0': RestStorage.CommunicationError,
      '401': RestStorage.UnauthorizedError,
      '403': RestStorage.NotAllowedError,
      '404': RestStorage.NotFoundError,
      '406': RestStorage.NotAcceptableError,
      '409': RestStorage.RecordExistsError,
      '413': RestStorage.EntityTooLargeError,
      '422': RestStorage.UnprocessableRecordError,
      '500': RestStorage.InternalStorageError,
      '501': RestStorage.NotImplementedError,
      '502': RestStorage.BadGatewayError
    };

    RestStorage.prototype._errorFor = function(error, env) {
      var errorClass, request;
      if (error instanceof Error || (error.request == null)) {
        return error;
      }
      if (errorClass = this.constructor._statusCodeErrors[error.request.status]) {
        request = error.request;
        error = new errorClass;
        error.request = request;
        error.env = env;
      }
      return error;
    };

    return RestStorage;

  }).call(this, Batman.StorageAdapter);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.LocalStorage = (function(_super) {
    __extends(LocalStorage, _super);

    function LocalStorage() {
      if (typeof window.localStorage === 'undefined') {
        return null;
      }
      LocalStorage.__super__.constructor.apply(this, arguments);
      this.storage = localStorage;
    }

    LocalStorage.prototype.storageRegExpForRecord = function(record) {
      return new RegExp("^" + (this.storageKey(record)) + "(\\d+)$");
    };

    LocalStorage.prototype.nextIdForRecord = function(record) {
      var nextId, re;
      re = this.storageRegExpForRecord(record);
      nextId = 1;
      this._forAllStorageEntries(function(k, v) {
        var matches;
        if (matches = re.exec(k)) {
          return nextId = Math.max(nextId, parseInt(matches[1], 10) + 1);
        }
      });
      return nextId;
    };

    LocalStorage.prototype._forAllStorageEntries = function(iterator) {
      var i, key, _i, _ref;
      for (i = _i = 0, _ref = this.storage.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        key = this.storage.key(i);
        iterator.call(this, key, this.storage.getItem(key));
      }
      return true;
    };

    LocalStorage.prototype._storageEntriesMatching = function(constructor, options) {
      var re, records;
      re = this.storageRegExpForRecord(constructor.prototype);
      records = [];
      this._forAllStorageEntries(function(storageKey, storageString) {
        var data, keyMatches;
        if (keyMatches = re.exec(storageKey)) {
          data = this._jsonToAttributes(storageString);
          data[constructor.primaryKey] = keyMatches[1];
          if (this._dataMatches(options, data)) {
            return records.push(data);
          }
        }
      });
      return records;
    };

    LocalStorage.prototype._dataMatches = function(conditions, data) {
      var k, match, v;
      match = true;
      for (k in conditions) {
        v = conditions[k];
        if (data[k] !== v) {
          match = false;
          break;
        }
      }
      return match;
    };

    LocalStorage.prototype.before('read', 'create', 'update', 'destroy', LocalStorage.skipIfError(function(env, next) {
      var _this = this;
      if (env.action === 'create') {
        env.id = env.subject.get('id') || env.subject._withoutDirtyTracking(function() {
          return env.subject.set('id', _this.nextIdForRecord(env.subject));
        });
      } else {
        env.id = env.subject.get('id');
      }
      if (env.id == null) {
        env.error = new this.constructor.StorageError("Couldn't get/set record primary key on " + env.action + "!");
      } else {
        env.key = this.storageKey(env.subject) + env.id;
      }
      return next();
    }));

    LocalStorage.prototype.before('create', 'update', LocalStorage.skipIfError(function(env, next) {
      var json;
      json = env.subject.toJSON();
      if (env.options.only) {
        json = this.onlyCertainAttributes(json, env.options.only);
      }
      if (env.options.except) {
        json = this.exceptCertainAttributes(json, env.options.except);
      }
      env.recordAttributes = JSON.stringify(json);
      return next();
    }));

    LocalStorage.prototype.after('read', LocalStorage.skipIfError(function(env, next) {
      var error;
      if (typeof env.recordAttributes === 'string') {
        try {
          env.recordAttributes = this._jsonToAttributes(env.recordAttributes);
        } catch (_error) {
          error = _error;
          env.error = error;
          return next();
        }
      }
      env.subject._withoutDirtyTracking(function() {
        return this.fromJSON(env.recordAttributes);
      });
      return next();
    }));

    LocalStorage.prototype.after('read', 'create', 'update', 'destroy', LocalStorage.skipIfError(function(env, next) {
      env.result = env.subject;
      return next();
    }));

    LocalStorage.prototype.after('readAll', LocalStorage.skipIfError(function(env, next) {
      env.result = env.records = this.getRecordsFromData(env.recordsAttributes, env.subject);
      return next();
    }));

    LocalStorage.prototype.read = LocalStorage.skipIfError(function(env, next) {
      env.recordAttributes = this.storage.getItem(env.key);
      if (!env.recordAttributes) {
        env.error = new this.constructor.NotFoundError();
      }
      return next();
    });

    LocalStorage.prototype.create = LocalStorage.skipIfError(function(_arg, next) {
      var key, recordAttributes;
      key = _arg.key, recordAttributes = _arg.recordAttributes;
      if (this.storage.getItem(key)) {
        arguments[0].error = new this.constructor.RecordExistsError;
      } else {
        this.storage.setItem(key, recordAttributes);
      }
      return next();
    });

    LocalStorage.prototype.update = LocalStorage.skipIfError(function(_arg, next) {
      var key, recordAttributes;
      key = _arg.key, recordAttributes = _arg.recordAttributes;
      this.storage.setItem(key, recordAttributes);
      return next();
    });

    LocalStorage.prototype.destroy = LocalStorage.skipIfError(function(_arg, next) {
      var key;
      key = _arg.key;
      this.storage.removeItem(key);
      return next();
    });

    LocalStorage.prototype.readAll = LocalStorage.skipIfError(function(env, next) {
      var error;
      try {
        arguments[0].recordsAttributes = this._storageEntriesMatching(env.subject, env.options.data);
      } catch (_error) {
        error = _error;
        arguments[0].error = error;
      }
      return next();
    });

    return LocalStorage;

  })(Batman.StorageAdapter);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.SessionStorage = (function(_super) {
    __extends(SessionStorage, _super);

    function SessionStorage() {
      if (typeof window.sessionStorage === 'undefined') {
        return null;
      }
      SessionStorage.__super__.constructor.apply(this, arguments);
      this.storage = sessionStorage;
    }

    return SessionStorage;

  })(Batman.LocalStorage);

}).call(this);

(function() {
  Batman.Encoders = new Batman.Object;

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.ParamsReplacer = (function(_super) {
    __extends(ParamsReplacer, _super);

    function ParamsReplacer(navigator, params) {
      this.navigator = navigator;
      this.params = params;
    }

    ParamsReplacer.prototype.redirect = function() {
      return this.navigator.redirect(this.toObject(), true);
    };

    ParamsReplacer.prototype.replace = function(params) {
      this.params.replace(params);
      return this.redirect();
    };

    ParamsReplacer.prototype.update = function(params) {
      this.params.update(params);
      return this.redirect();
    };

    ParamsReplacer.prototype.clear = function() {
      this.params.clear();
      return this.redirect();
    };

    ParamsReplacer.prototype.toObject = function() {
      return this.params.toObject();
    };

    ParamsReplacer.accessor({
      get: function(k) {
        return this.params.get(k);
      },
      set: function(k, v) {
        var oldValue, result;
        oldValue = this.params.get(k);
        result = this.params.set(k, v);
        if (oldValue !== v) {
          this.redirect();
        }
        return result;
      },
      unset: function(k) {
        var hadKey, result;
        hadKey = this.params.hasKey(k);
        result = this.params.unset(k);
        if (hadKey) {
          this.redirect();
        }
        return result;
      }
    });

    return ParamsReplacer;

  })(Batman.Object);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.ParamsPusher = (function(_super) {
    __extends(ParamsPusher, _super);

    function ParamsPusher() {
      _ref = ParamsPusher.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ParamsPusher.prototype.redirect = function() {
      return this.navigator.redirect(this.toObject());
    };

    return ParamsPusher;

  })(Batman.ParamsReplacer);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.NamedRouteQuery = (function(_super) {
    __extends(NamedRouteQuery, _super);

    NamedRouteQuery.prototype.isNamedRouteQuery = true;

    function NamedRouteQuery(routeMap, args) {
      var key;
      if (args == null) {
        args = [];
      }
      NamedRouteQuery.__super__.constructor.call(this, {
        routeMap: routeMap,
        args: args
      });
      for (key in this.get('routeMap').childrenByName) {
        this[key] = this._queryAccess.bind(this, key);
      }
    }

    NamedRouteQuery.accessor('route', function() {
      var collectionRoute, memberRoute, route, _i, _len, _ref, _ref1;
      _ref = this.get('routeMap'), memberRoute = _ref.memberRoute, collectionRoute = _ref.collectionRoute;
      _ref1 = [memberRoute, collectionRoute];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        route = _ref1[_i];
        if (route != null) {
          if (route.namedArguments.length === this.get('args').length) {
            return route;
          }
        }
      }
      return collectionRoute || memberRoute;
    });

    NamedRouteQuery.accessor('path', function() {
      return this.path();
    });

    NamedRouteQuery.accessor('routeMap', 'args', 'cardinality', 'hashValue', Batman.Property.defaultAccessor);

    NamedRouteQuery.accessor({
      get: function(key) {
        if (key == null) {
          return;
        }
        if (typeof key === 'string') {
          return this.nextQueryForName(key);
        } else {
          return this.nextQueryWithArgument(key);
        }
      },
      cache: false
    });

    NamedRouteQuery.accessor('withHash', function() {
      var _this = this;
      return new Batman.Accessible(function(hashValue) {
        return _this.withHash(hashValue);
      });
    });

    NamedRouteQuery.prototype.withHash = function(hashValue) {
      var clone;
      clone = this.clone();
      clone.set('hashValue', hashValue);
      return clone;
    };

    NamedRouteQuery.prototype.nextQueryForName = function(key) {
      var map;
      if (map = this.get('routeMap').childrenByName[key]) {
        return new Batman.NamedRouteQuery(map, this.args);
      } else {
        return Batman.developer.error("Couldn't find a route for the name " + key + "!");
      }
    };

    NamedRouteQuery.prototype.nextQueryWithArgument = function(arg) {
      var args;
      args = this.args.slice(0);
      args.push(arg);
      return this.clone(args);
    };

    NamedRouteQuery.prototype.path = function() {
      var argumentName, argumentValue, index, namedArguments, params, _i, _len;
      params = {};
      namedArguments = this.get('route.namedArguments');
      for (index = _i = 0, _len = namedArguments.length; _i < _len; index = ++_i) {
        argumentName = namedArguments[index];
        if ((argumentValue = this.get('args')[index]) != null) {
          params[argumentName] = this._toParam(argumentValue);
        }
      }
      if (this.get('hashValue') != null) {
        params['#'] = this.get('hashValue');
      }
      return this.get('route').pathFromParams(params);
    };

    NamedRouteQuery.prototype.toString = function() {
      return this.path();
    };

    NamedRouteQuery.prototype.clone = function(args) {
      if (args == null) {
        args = this.args;
      }
      return new Batman.NamedRouteQuery(this.routeMap, args);
    };

    NamedRouteQuery.prototype._toParam = function(arg) {
      if (arg instanceof Batman.AssociationProxy) {
        arg = arg.get('target');
      }
      if ((arg != null ? arg.toParam : void 0) != null) {
        return arg.toParam();
      } else {
        return arg;
      }
    };

    NamedRouteQuery.prototype._queryAccess = function(key, arg) {
      var query;
      query = this.nextQueryForName(key);
      if (arg != null) {
        query = query.nextQueryWithArgument(arg);
      }
      return query;
    };

    return NamedRouteQuery;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Dispatcher = (function(_super) {
    var ControllerDirectory, _ref;

    __extends(Dispatcher, _super);

    Dispatcher.canInferRoute = function(argument) {
      return argument instanceof Batman.Model || argument instanceof Batman.AssociationProxy || argument.prototype instanceof Batman.Model;
    };

    Dispatcher.paramsFromArgument = function(argument) {
      var resourceNameFromModel;
      resourceNameFromModel = function(model) {
        return Batman.helpers.camelize(Batman.helpers.pluralize(model.get('resourceName')), true);
      };
      if (!this.canInferRoute(argument)) {
        return argument;
      }
      if (argument instanceof Batman.Model || argument instanceof Batman.AssociationProxy) {
        if (argument.isProxy) {
          argument = argument.get('target');
        }
        if (argument != null) {
          return {
            controller: resourceNameFromModel(argument.constructor),
            action: 'show',
            id: (typeof argument.toParam === "function" ? argument.toParam() : void 0) || argument.get('id')
          };
        } else {
          return {};
        }
      } else if (argument.prototype instanceof Batman.Model) {
        return {
          controller: resourceNameFromModel(argument),
          action: 'index'
        };
      } else {
        return argument;
      }
    };

    ControllerDirectory = (function(_super1) {
      __extends(ControllerDirectory, _super1);

      function ControllerDirectory() {
        _ref = ControllerDirectory.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ControllerDirectory.accessor('__app', Batman.Property.defaultAccessor);

      ControllerDirectory.accessor(function(key) {
        return this.get("__app." + (Batman.helpers.titleize(key)) + "Controller.sharedController");
      });

      return ControllerDirectory;

    })(Batman.Object);

    Dispatcher.accessor('controllers', function() {
      return new ControllerDirectory({
        __app: this.get('app')
      });
    });

    function Dispatcher(app, routeMap) {
      Dispatcher.__super__.constructor.call(this, {
        app: app,
        routeMap: routeMap
      });
    }

    Dispatcher.prototype.routeForParams = function(params) {
      params = this.constructor.paramsFromArgument(params);
      return this.get('routeMap').routeForParams(params);
    };

    Dispatcher.prototype.pathFromParams = function(params) {
      var _ref1;
      if (typeof params === 'string') {
        return params;
      }
      params = this.constructor.paramsFromArgument(params);
      return (_ref1 = this.routeForParams(params)) != null ? _ref1.pathFromParams(params) : void 0;
    };

    Dispatcher.prototype.dispatch = function(params, paramsMixin) {
      var error, inferredParams, path, route, _ref1, _ref2;
      inferredParams = this.constructor.paramsFromArgument(params);
      route = this.routeForParams(inferredParams);
      if (route) {
        _ref1 = route.pathAndParamsFromArgument(inferredParams), path = _ref1[0], params = _ref1[1];
        if (paramsMixin) {
          Batman.mixin(params, paramsMixin);
        }
        this.set('app.currentRoute', route);
        this.set('app.currentURL', path);
        this.get('app.currentParams').replace(params || {});
        route.dispatch(params);
      } else {
        if (Batman.typeOf(params) === 'Object' && !this.constructor.canInferRoute(params)) {
          return this.get('app.currentParams').replace(params);
        } else {
          this.get('app.currentParams').clear();
        }
        error = {
          type: '404',
          isPrevented: false,
          preventDefault: function() {
            return this.isPrevented = true;
          }
        };
        if ((_ref2 = Batman.currentApp) != null) {
          _ref2.fire('error', error);
        }
        if (error.isPrevented) {
          return params;
        }
        if (params !== '/404') {
          return Batman.redirect('/404');
        }
      }
      return path;
    };

    return Dispatcher;

  }).call(this, Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Route = (function(_super) {
    __extends(Route, _super);

    Route.regexps = {
      namedParam: /:([\w\d]+)/g,
      splatParam: /\*([\w\d]+)/g,
      queryParam: '(?:\\?.+)?',
      namedOrSplat: /[:|\*]([\w\d]+)/g,
      namePrefix: '[:|\*]',
      escapeRegExp: /[-[\]{}+?.,\\^$|#\s]/g,
      openOptParam: /\(/g,
      closeOptParam: /\)/g
    };

    Route.prototype.optionKeys = ['member', 'collection'];

    Route.prototype.testKeys = ['controller', 'action'];

    Route.prototype.isRoute = true;

    function Route(templatePath, baseParams) {
      var k, matches, namedArguments, pattern, properties, regexp, regexps, _i, _len, _ref;
      regexps = this.constructor.regexps;
      if (templatePath.indexOf('/') !== 0) {
        templatePath = "/" + templatePath;
      }
      pattern = templatePath.replace(regexps.escapeRegExp, '\\$&');
      regexp = RegExp("^" + (pattern.replace(regexps.openOptParam, '(?:').replace(regexps.closeOptParam, ')?').replace(regexps.namedParam, '([^\/]+)').replace(regexps.splatParam, '(.*?)')) + regexps.queryParam + "$");
      regexps.namedOrSplat.lastIndex = 0;
      namedArguments = ((function() {
        var _results;
        _results = [];
        while (matches = regexps.namedOrSplat.exec(pattern)) {
          _results.push(matches[1]);
        }
        return _results;
      })());
      properties = {
        templatePath: templatePath,
        pattern: pattern,
        regexp: regexp,
        namedArguments: namedArguments,
        baseParams: baseParams
      };
      _ref = this.optionKeys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        k = _ref[_i];
        properties[k] = baseParams[k];
        delete baseParams[k];
      }
      Route.__super__.constructor.call(this, properties);
    }

    Route.prototype.paramsFromPath = function(pathAndQuery) {
      var index, match, matches, name, namedArguments, params, uri, _i, _len;
      uri = new Batman.URI(pathAndQuery);
      namedArguments = this.get('namedArguments');
      params = Batman.extend({
        path: uri.path
      }, this.get('baseParams'));
      matches = this.get('regexp').exec(uri.path).slice(1);
      for (index = _i = 0, _len = matches.length; _i < _len; index = ++_i) {
        match = matches[index];
        name = namedArguments[index];
        if (match != null) {
          params[name] = decodeURIComponent(match);
        }
      }
      return Batman.extend(params, uri.queryParams);
    };

    Route.prototype.pathFromParams = function(argumentParams) {
      var hash, key, name, newPath, params, path, query, regexp, regexps, _i, _j, _len, _len1, _ref, _ref1;
      params = Batman.extend({}, argumentParams);
      path = this.get('templatePath');
      regexps = this.constructor.regexps;
      _ref = this.get('namedArguments');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        regexp = RegExp("" + regexps.namePrefix + name);
        newPath = path.replace(regexp, (params[name] != null ? params[name] : ''));
        if (newPath !== path) {
          delete params[name];
          path = newPath;
        }
      }
      path = path.replace(regexps.openOptParam, '').replace(regexps.closeOptParam, '').replace(/([^\/])\/+$/, '$1');
      _ref1 = this.testKeys;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        key = _ref1[_j];
        delete params[key];
      }
      if (params['#']) {
        hash = params['#'];
        delete params['#'];
      }
      query = Batman.URI.queryFromParams(params);
      if (query) {
        path += "?" + query;
      }
      if (hash) {
        path += "#" + hash;
      }
      return path;
    };

    Route.prototype.test = function(pathOrParams) {
      var key, path, value, _i, _len, _ref;
      if (typeof pathOrParams === 'string') {
        path = pathOrParams;
      } else if (pathOrParams.path != null) {
        path = pathOrParams.path;
      } else {
        path = this.pathFromParams(pathOrParams);
        _ref = this.testKeys;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          if ((value = this.get(key)) != null) {
            if (pathOrParams[key] !== value) {
              return false;
            }
          }
        }
      }
      return this.get('regexp').test(path);
    };

    Route.prototype.pathAndParamsFromArgument = function(pathOrParams) {
      var params, path;
      if (typeof pathOrParams === 'string') {
        params = this.paramsFromPath(pathOrParams);
        path = pathOrParams;
      } else {
        params = pathOrParams;
        path = this.pathFromParams(pathOrParams);
      }
      return [path, params];
    };

    Route.prototype.dispatch = function(params) {
      if (!this.test(params)) {
        return false;
      }
      return this.get('callback')(params);
    };

    Route.prototype.callback = function() {
      throw new Batman.DevelopmentError("Override callback in a Route subclass");
    };

    return Route;

  })(Batman.Object);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.ControllerActionRoute = (function(_super) {
    __extends(ControllerActionRoute, _super);

    ControllerActionRoute.prototype.optionKeys = ['member', 'collection', 'app', 'controller', 'action'];

    function ControllerActionRoute(templatePath, options) {
      this.callback = __bind(this.callback, this);
      var action, controller, _ref, _ref1;
      if (options.signature) {
        if (Batman.typeOf(options.signature) === 'String') {
          _ref = options.signature.split('#'), controller = _ref[0], action = _ref[1];
        } else {
          _ref1 = options.signature, controller = _ref1.controller, action = _ref1.action;
        }
        action || (action = 'index');
        options.controller = controller;
        options.action = action;
        delete options.signature;
      }
      ControllerActionRoute.__super__.constructor.call(this, templatePath, options);
    }

    ControllerActionRoute.prototype.callback = function(params) {
      var controller;
      controller = this.get("app.dispatcher.controllers." + (this.get('controller')));
      return controller.dispatch(this.get('action'), params);
    };

    return ControllerActionRoute;

  })(Batman.Route);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.CallbackActionRoute = (function(_super) {
    __extends(CallbackActionRoute, _super);

    function CallbackActionRoute() {
      _ref = CallbackActionRoute.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CallbackActionRoute.prototype.optionKeys = ['member', 'collection', 'callback', 'app'];

    CallbackActionRoute.prototype.controller = false;

    CallbackActionRoute.prototype.action = false;

    return CallbackActionRoute;

  })(Batman.Route);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Hash = (function(_super) {
    var k, _fn, _i, _j, _len, _len1, _ref, _ref1,
      _this = this;

    __extends(Hash, _super);

    Hash.Metadata = (function(_super1) {
      __extends(Metadata, _super1);

      Batman.extend(Metadata.prototype, Batman.Enumerable);

      function Metadata(hash) {
        this.hash = hash;
      }

      Metadata.accessor('length', function() {
        this.hash.registerAsMutableSource();
        return this.hash.length;
      });

      Metadata.accessor('isEmpty', 'keys', 'toArray', function(key) {
        this.hash.registerAsMutableSource();
        return this.hash[key]();
      });

      Metadata.prototype.forEach = function() {
        var _ref;
        return (_ref = this.hash).forEach.apply(_ref, arguments);
      };

      return Metadata;

    })(Batman.Object);

    function Hash() {
      this.meta = new this.constructor.Metadata(this);
      Batman.SimpleHash.apply(this, arguments);
      Hash.__super__.constructor.apply(this, arguments);
    }

    Batman.extend(Hash.prototype, Batman.Enumerable);

    Hash.prototype.propertyClass = Batman.Property;

    Hash.defaultAccessor = {
      cache: false,
      get: Batman.SimpleHash.prototype.get,
      set: Hash.mutation(function(key, value) {
        var oldResult, result;
        oldResult = Batman.SimpleHash.prototype.get.call(this, key);
        result = Batman.SimpleHash.prototype.set.call(this, key, value);
        if ((oldResult != null) && oldResult !== result) {
          this.fire('itemsWereChanged', [key], [result], [oldResult]);
        } else {
          this.fire('itemsWereAdded', [key], [result]);
        }
        return result;
      }),
      unset: Hash.mutation(function(key) {
        var result;
        result = Batman.SimpleHash.prototype.unset.call(this, key);
        if (result != null) {
          this.fire('itemsWereRemoved', [key], [result]);
        }
        return result;
      })
    };

    Hash.accessor(Hash.defaultAccessor);

    Hash.prototype._preventMutationEvents = function(block) {
      this.prevent('change');
      this.prevent('itemsWereAdded');
      this.prevent('itemsWereChanged');
      this.prevent('itemsWereRemoved');
      try {
        return block.call(this);
      } finally {
        this.allow('change');
        this.allow('itemsWereAdded');
        this.allow('itemsWereChanged');
        this.allow('itemsWereRemoved');
      }
    };

    Hash.prototype.clear = Hash.mutation(function() {
      var key, keys, values;
      keys = this.keys();
      values = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
          key = keys[_i];
          _results.push(this.get(key));
        }
        return _results;
      }).call(this);
      this._preventMutationEvents(function() {
        var _this = this;
        return this.forEach(function(k) {
          return _this.unset(k);
        });
      });
      Batman.SimpleHash.prototype.clear.call(this);
      this.fire('itemsWereRemoved', keys, values);
      return values;
    });

    Hash.prototype.update = Hash.mutation(function(object) {
      var addedKeys, addedValues, changedKeys, changedNewValues, changedOldValues;
      addedKeys = [];
      addedValues = [];
      changedKeys = [];
      changedNewValues = [];
      changedOldValues = [];
      this._preventMutationEvents(function() {
        var _this = this;
        return Batman.forEach(object, function(k, v) {
          if (_this.hasKey(k)) {
            changedKeys.push(k);
            changedOldValues.push(_this.get(k));
            return changedNewValues.push(_this.set(k, v));
          } else {
            addedKeys.push(k);
            return addedValues.push(_this.set(k, v));
          }
        });
      });
      if (addedKeys.length > 0) {
        this.fire('itemsWereAdded', addedKeys, addedValues);
      }
      if (changedKeys.length > 0) {
        return this.fire('itemsWereChanged', changedKeys, changedNewValues, changedOldValues);
      }
    });

    Hash.prototype.replace = Hash.mutation(function(object) {
      var addedKeys, addedValues, changedKeys, changedNewValues, changedOldValues, removedKeys, removedValues;
      addedKeys = [];
      addedValues = [];
      removedKeys = [];
      removedValues = [];
      changedKeys = [];
      changedOldValues = [];
      changedNewValues = [];
      this._preventMutationEvents(function() {
        var _this = this;
        this.forEach(function(k) {
          if (!Batman.objectHasKey(object, k)) {
            removedKeys.push(k);
            return removedValues.push(_this.unset(k));
          }
        });
        return Batman.forEach(object, function(k, v) {
          if (_this.hasKey(k)) {
            changedKeys.push(k);
            changedOldValues.push(_this.get(k));
            return changedNewValues.push(_this.set(k, v));
          } else {
            addedKeys.push(k);
            return addedValues.push(_this.set(k, v));
          }
        });
      });
      if (addedKeys.length > 0) {
        this.fire('itemsWereAdded', addedKeys, addedValues);
      }
      if (changedKeys.length > 0) {
        this.fire('itemsWereChanged', changedKeys, changedNewValues, changedOldValues);
      }
      if (removedKeys.length > 0) {
        return this.fire('itemsWereRemoved', removedKeys, removedValues);
      }
    });

    _ref = ['equality', 'hashKeyFor', 'objectKey', 'prefixedKey', 'unprefixedKey'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      Hash.prototype[k] = Batman.SimpleHash.prototype[k];
    }

    _ref1 = ['hasKey', 'forEach', 'isEmpty', 'keys', 'toArray', 'merge', 'toJSON', 'toObject'];
    _fn = function(k) {
      return Hash.prototype[k] = function() {
        this.registerAsMutableSource();
        return Batman.SimpleHash.prototype[k].apply(this, arguments);
      };
    };
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      k = _ref1[_j];
      _fn(k);
    }

    return Hash;

  }).call(this, Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.RenderCache = (function(_super) {
    __extends(RenderCache, _super);

    RenderCache.prototype.maximumLength = 4;

    function RenderCache() {
      RenderCache.__super__.constructor.apply(this, arguments);
      this.keyQueue = [];
    }

    RenderCache.prototype.viewForOptions = function(options) {
      var _this = this;
      if (Batman.config.cacheViews || options.cache || options.viewClass.prototype.cache) {
        return this.getOrSet(options, function() {
          return _this._newViewFromOptions(Batman.extend({}, options));
        });
      } else {
        return this._newViewFromOptions(options);
      }
    };

    RenderCache.prototype._newViewFromOptions = function(options) {
      return new options.viewClass(options);
    };

    RenderCache.wrapAccessor(function(core) {
      return {
        cache: false,
        get: function(key) {
          var result;
          result = core.get.call(this, key);
          if (result) {
            this._addOrBubbleKey(key);
          }
          return result;
        },
        set: function(key, value) {
          var result;
          result = core.set.apply(this, arguments);
          result.set('cached', true);
          this._addOrBubbleKey(key);
          this._evictExpiredKeys();
          return result;
        },
        unset: function(key) {
          var result;
          result = core.unset.apply(this, arguments);
          result.set('cached', false);
          this._removeKeyFromQueue(key);
          return result;
        }
      };
    });

    RenderCache.prototype.equality = function(incomingOptions, storageOptions) {
      var key;
      if (Object.keys(incomingOptions).length !== Object.keys(storageOptions).length) {
        return false;
      }
      for (key in incomingOptions) {
        if (!(key === 'view')) {
          if (incomingOptions[key] !== storageOptions[key]) {
            return false;
          }
        }
      }
      return true;
    };

    RenderCache.prototype.reset = function() {
      var key, _i, _len, _ref;
      _ref = this.keyQueue.slice(0);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        this.unset(key);
      }
    };

    RenderCache.prototype._addOrBubbleKey = function(key) {
      this._removeKeyFromQueue(key);
      return this.keyQueue.unshift(key);
    };

    RenderCache.prototype._removeKeyFromQueue = function(key) {
      var index, queuedKey, _i, _len, _ref;
      _ref = this.keyQueue;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        queuedKey = _ref[index];
        if (this.equality(queuedKey, key)) {
          this.keyQueue.splice(index, 1);
          break;
        }
      }
      return key;
    };

    RenderCache.prototype._evictExpiredKeys = function() {
      var currentKeys, i, key, _i, _ref, _ref1;
      if (this.length > this.maximumLength) {
        currentKeys = this.keyQueue.slice(0);
        for (i = _i = _ref = this.maximumLength, _ref1 = currentKeys.length; _ref <= _ref1 ? _i < _ref1 : _i > _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
          key = currentKeys[i];
          if (!this.get(key).isInDOM()) {
            this.unset(key);
          }
        }
      }
    };

    return RenderCache;

  })(Batman.Hash);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;

  Batman.Controller = (function(_super) {
    __extends(Controller, _super);

    Controller.singleton('sharedController');

    Controller.wrapAccessor('routingKey', function(core) {
      return {
        get: function() {
          if (this.routingKey != null) {
            return this.routingKey;
          } else {
            if (Batman.config.minificationErrors) {
              Batman.developer.error("Please define `routingKey` on the prototype of " + (Batman.functionName(this.constructor)) + " in order for your controller to be minification safe.");
            }
            return Batman.functionName(this.constructor).replace(/Controller$/, '');
          }
        }
      };
    });

    Controller.classMixin(Batman.LifecycleEvents);

    Controller.lifecycleEvent('action', function(options) {
      var except, normalized, only;
      if (options == null) {
        options = {};
      }
      normalized = {};
      only = Batman.typeOf(options.only) === 'String' ? [options.only] : options.only;
      except = Batman.typeOf(options.except) === 'String' ? [options.except] : options.except;
      normalized["if"] = function(params, frame) {
        var _ref, _ref1;
        if (this._afterFilterRedirect) {
          return false;
        }
        if (only && (_ref = frame.action, __indexOf.call(only, _ref) < 0)) {
          return false;
        }
        if (except && (_ref1 = frame.action, __indexOf.call(except, _ref1) >= 0)) {
          return false;
        }
        return true;
      };
      return normalized;
    });

    Controller.beforeFilter = function() {
      Batman.developer.deprecated("Batman.Controller::beforeFilter", "Please use beforeAction instead.");
      return this.beforeAction.apply(this, arguments);
    };

    Controller.afterFilter = function() {
      Batman.developer.deprecated("Batman.Controller::afterFilter", "Please use afterAction instead.");
      return this.afterAction.apply(this, arguments);
    };

    Controller.afterAction(function(params) {
      if (this.autoScrollToHash && (params['#'] != null)) {
        return this.scrollToHash(params['#']);
      }
    });

    Controller.catchError = function() {
      var currentHandlers, error, errors, handlers, options, _base, _i, _j, _len, _results;
      errors = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), options = arguments[_i++];
      Batman.initializeObject(this);
      (_base = this._batman).errorHandlers || (_base.errorHandlers = new Batman.SimpleHash);
      handlers = Batman.typeOf(options["with"]) === 'Array' ? options["with"] : [options["with"]];
      _results = [];
      for (_j = 0, _len = errors.length; _j < _len; _j++) {
        error = errors[_j];
        currentHandlers = this._batman.errorHandlers.get(error) || [];
        _results.push(this._batman.errorHandlers.set(error, currentHandlers.concat(handlers)));
      }
      return _results;
    };

    Controller.prototype.errorHandler = function(callback) {
      var errorFrame, _ref,
        _this = this;
      errorFrame = (_ref = this._actionFrames) != null ? _ref[this._actionFrames.length - 1] : void 0;
      return function(err, result, env) {
        if (err) {
          if (errorFrame != null ? errorFrame.error : void 0) {
            return;
          }
          if (errorFrame != null) {
            errorFrame.error = err;
          }
          if (!_this.handleError(err)) {
            throw err;
          }
        } else {
          return typeof callback === "function" ? callback(result, env) : void 0;
        }
      };
    };

    Controller.prototype.handleError = function(error) {
      var handled, _ref,
        _this = this;
      handled = false;
      if ((_ref = this.constructor._batman.getAll('errorHandlers')) != null) {
        _ref.forEach(function(hash) {
          return hash.forEach(function(key, value) {
            var handler, _i, _len, _results;
            if (error instanceof key) {
              handled = true;
              _results = [];
              for (_i = 0, _len = value.length; _i < _len; _i++) {
                handler = value[_i];
                if (typeof handler === 'string') {
                  handler = _this[handler];
                }
                _results.push(handler.call(_this, error));
              }
              return _results;
            }
          });
        });
      }
      return handled;
    };

    function Controller() {
      this.redirect = __bind(this.redirect, this);
      this.handleError = __bind(this.handleError, this);
      this.errorHandler = __bind(this.errorHandler, this);
      Controller.__super__.constructor.apply(this, arguments);
      this._resetActionFrames();
    }

    Controller.prototype.renderCache = new Batman.RenderCache;

    Controller.prototype.defaultRenderYield = 'main';

    Controller.prototype.autoScrollToHash = true;

    Controller.prototype.dispatch = function(action, params) {
      var redirectTo;
      if (params == null) {
        params = {};
      }
      params.controller || (params.controller = this.get('routingKey'));
      params.action || (params.action = action);
      params.target || (params.target = this);
      this._resetActionFrames();
      this.set('action', action);
      this.set('params', params);
      this.executeAction(action, params);
      redirectTo = this._afterFilterRedirect;
      this._afterFilterRedirect = null;
      delete this._afterFilterRedirect;
      if (redirectTo) {
        return Batman.redirect(redirectTo);
      }
    };

    Controller.prototype.executeAction = function(action, params) {
      var frame, oldRedirect, parentFrame, result, _ref, _ref1,
        _this = this;
      if (params == null) {
        params = this.get('params');
      }
      Batman.developer.assert(this[action], "Error! Controller action " + (this.get('routingKey')) + "." + action + " couldn't be found!");
      parentFrame = this._actionFrames[this._actionFrames.length - 1];
      frame = new Batman.ControllerActionFrame({
        parentFrame: parentFrame,
        action: action,
        params: params
      }, function() {
        var _ref;
        if (!_this._afterFilterRedirect) {
          _this.fireLifecycleEvent('afterAction', frame.params, frame);
        }
        _this._resetActionFrames();
        return (_ref = Batman.navigator) != null ? _ref.redirect = oldRedirect : void 0;
      });
      this._actionFrames.push(frame);
      frame.startOperation({
        internal: true
      });
      oldRedirect = (_ref = Batman.navigator) != null ? _ref.redirect : void 0;
      if ((_ref1 = Batman.navigator) != null) {
        _ref1.redirect = this.redirect;
      }
      if (this.fireLifecycleEvent('beforeAction', frame.params, frame) !== false) {
        if (!this._afterFilterRedirect) {
          result = this[action](params);
        }
        if (!frame.operationOccurred) {
          this.render();
        }
      }
      frame.finishOperation();
      return result;
    };

    Controller.prototype.redirect = function(url) {
      var frame;
      frame = this._actionFrames[this._actionFrames.length - 1];
      if (frame) {
        if (frame.operationOccurred) {
          Batman.developer.warn("Warning! Trying to redirect but an action has already been taken during " + (this.get('routingKey')) + "." + (frame.action || this.get('action')));
          return;
        }
        frame.startAndFinishOperation();
        if (this._afterFilterRedirect != null) {
          return Batman.developer.warn("Warning! Multiple actions trying to redirect!");
        } else {
          return this._afterFilterRedirect = url;
        }
      } else {
        if (Batman.typeOf(url) === 'Object') {
          url.controller || (url.controller = this.get('routingKey'));
        }
        return Batman.redirect(url);
      }
    };

    Controller.prototype.render = function(options) {
      var action, frame, view, yieldContentView, yieldName, _ref, _ref1, _ref2, _ref3, _ref4;
      if (options == null) {
        options = {};
      }
      if (frame = (_ref = this._actionFrames) != null ? _ref[this._actionFrames.length - 1] : void 0) {
        frame.startOperation();
      }
      if (options === false) {
        frame.finishOperation();
        return;
      }
      action = (frame != null ? frame.action : void 0) || this.get('action');
      if (view = options.view) {
        options.view = null;
      } else {
        options.viewClass || (options.viewClass = this._viewClassForAction(action));
        options.source || (options.source = ((_ref1 = options.viewClass) != null ? _ref1.prototype.source : void 0) || Batman.helpers.underscore(this.get('routingKey') + '/' + action));
        view = this.renderCache.viewForOptions(options);
      }
      if (view) {
        view.once('viewDidAppear', function() {
          return frame != null ? frame.finishOperation() : void 0;
        });
        yieldName = options.into || this.defaultRenderYield;
        if (yieldContentView = Batman.DOM.Yield.withName(yieldName).contentView) {
          if (yieldContentView !== view && !yieldContentView.isDead) {
            yieldContentView.die();
          }
        }
        if (!view.contentFor && !view.parentNode) {
          view.set('contentFor', yieldName);
        }
        view.set('controller', this);
        if ((_ref2 = Batman.currentApp) != null) {
          if ((_ref3 = _ref2.layout) != null) {
            if ((_ref4 = _ref3.subviews) != null) {
              _ref4.add(view);
            }
          }
        }
        this.set('currentView', view);
      }
      return view;
    };

    Controller.prototype.scrollToHash = function(hash) {
      if (hash == null) {
        hash = this.get('params')['#'];
      }
      return Batman.DOM.scrollIntoView(hash);
    };

    Controller.prototype._resetActionFrames = function() {
      return this._actionFrames = [];
    };

    Controller.prototype._viewClassForAction = function(action) {
      var classPrefix, _ref;
      classPrefix = this.get('routingKey').replace('/', '_');
      return ((_ref = Batman.currentApp) != null ? _ref[Batman.helpers.camelize("" + classPrefix + "_" + action + "_view")] : void 0) || Batman.View;
    };

    return Controller;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Set = (function(_super) {
    var k, _fn, _i, _j, _len, _len1, _ref, _ref1,
      _this = this;

    __extends(Set, _super);

    Set.prototype.isCollectionEventEmitter = true;

    function Set() {
      Batman.SimpleSet.apply(this, arguments);
    }

    Batman.extend(Set.prototype, Batman.Enumerable);

    Set._applySetAccessors = function(klass) {
      var accessor, accessors, key;
      accessors = {
        first: function() {
          return this.toArray()[0];
        },
        last: function() {
          return this.toArray()[this.length - 1];
        },
        isEmpty: function() {
          return this.isEmpty();
        },
        toArray: function() {
          return this.toArray();
        },
        length: function() {
          this.registerAsMutableSource();
          return this.length;
        },
        indexedBy: function() {
          var _this = this;
          return new Batman.TerminalAccessible(function(key) {
            return _this.indexedBy(key);
          });
        },
        indexedByUnique: function() {
          var _this = this;
          return new Batman.TerminalAccessible(function(key) {
            return _this.indexedByUnique(key);
          });
        },
        sortedBy: function() {
          var _this = this;
          return new Batman.TerminalAccessible(function(key) {
            return _this.sortedBy(key);
          });
        },
        sortedByDescending: function() {
          var _this = this;
          return new Batman.TerminalAccessible(function(key) {
            return _this.sortedBy(key, 'desc');
          });
        }
      };
      for (key in accessors) {
        accessor = accessors[key];
        klass.accessor(key, accessor);
      }
    };

    Set._applySetAccessors(Set);

    _ref = ['indexedBy', 'indexedByUnique', 'sortedBy', 'equality', '_indexOfItem'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      Set.prototype[k] = Batman.SimpleSet.prototype[k];
    }

    _ref1 = ['at', 'find', 'merge', 'forEach', 'toArray', 'isEmpty', 'has'];
    _fn = function(k) {
      return Set.prototype[k] = function() {
        this.registerAsMutableSource();
        return Batman.SimpleSet.prototype[k].apply(this, arguments);
      };
    };
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      k = _ref1[_j];
      _fn(k);
    }

    Set.prototype.toJSON = function() {
      return this.map(function(value) {
        return (typeof value.toJSON === "function" ? value.toJSON() : void 0) || value;
      });
    };

    Set.prototype.add = Set.mutation(function() {
      var addedItems;
      addedItems = Batman.SimpleSet.prototype.add.apply(this, arguments);
      if (addedItems.length) {
        this.fire('itemsWereAdded', addedItems);
      }
      return addedItems;
    });

    Set.prototype.insert = function() {
      return this.insertWithIndexes.apply(this, arguments).addedItems;
    };

    Set.prototype.insertWithIndexes = Set.mutation(function() {
      var addedIndexes, addedItems, _ref2;
      _ref2 = Batman.SimpleSet.prototype.insertWithIndexes.apply(this, arguments), addedItems = _ref2.addedItems, addedIndexes = _ref2.addedIndexes;
      if (addedItems.length) {
        this.fire('itemsWereAdded', addedItems, addedIndexes);
      }
      return {
        addedItems: addedItems,
        addedIndexes: addedIndexes
      };
    });

    Set.prototype.remove = function() {
      return this.removeWithIndexes.apply(this, arguments).removedItems;
    };

    Set.prototype.removeWithIndexes = Set.mutation(function() {
      var removedIndexes, removedItems, _ref2;
      _ref2 = Batman.SimpleSet.prototype.removeWithIndexes.apply(this, arguments), removedItems = _ref2.removedItems, removedIndexes = _ref2.removedIndexes;
      if (removedItems.length) {
        this.fire('itemsWereRemoved', removedItems, removedIndexes);
      }
      return {
        removedItems: removedItems,
        removedIndexes: removedIndexes
      };
    });

    Set.prototype.clear = Set.mutation(function() {
      var removedItems;
      removedItems = Batman.SimpleSet.prototype.clear.call(this);
      if (removedItems.length) {
        this.fire('itemsWereRemoved', removedItems);
      }
      return removedItems;
    });

    Set.prototype.replace = Set.mutation(function(other) {
      var addedItems, removedItems;
      removedItems = Batman.SimpleSet.prototype.clear.call(this);
      addedItems = Batman.SimpleSet.prototype.add.apply(this, other.toArray());
      if (removedItems.length) {
        this.fire('itemsWereRemoved', removedItems);
      }
      if (addedItems.length) {
        return this.fire('itemsWereAdded', addedItems);
      }
    });

    return Set;

  }).call(this, Batman.Object);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.ErrorsSet = (function(_super) {
    __extends(ErrorsSet, _super);

    function ErrorsSet() {
      _ref = ErrorsSet.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ErrorsSet.accessor(function(key) {
      return this.indexedBy('attribute').get(key);
    });

    ErrorsSet.prototype.add = function(key, error) {
      return ErrorsSet.__super__.add.call(this, new Batman.ValidationError(key, error));
    };

    return ErrorsSet;

  })(Batman.Set);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.SetProxy = (function(_super) {
    var k, _fn, _i, _len, _ref,
      _this = this;

    __extends(SetProxy, _super);

    function SetProxy(base) {
      this.base = base;
      SetProxy.__super__.constructor.call(this);
      this.length = this.base.length;
      if (this.base.isCollectionEventEmitter) {
        this.isCollectionEventEmitter = true;
        this._setObserver = new Batman.SetObserver(this.base);
        this._setObserver.on('itemsWereAdded', this._handleItemsAdded.bind(this));
        this._setObserver.on('itemsWereRemoved', this._handleItemsRemoved.bind(this));
        this.startObserving();
      }
    }

    Batman.extend(SetProxy.prototype, Batman.Enumerable);

    SetProxy.prototype.startObserving = function() {
      var _ref;
      return (_ref = this._setObserver) != null ? _ref.startObserving() : void 0;
    };

    SetProxy.prototype.stopObserving = function() {
      var _ref;
      return (_ref = this._setObserver) != null ? _ref.stopObserving() : void 0;
    };

    SetProxy.prototype._handleItemsAdded = function(items, indexes) {
      this.set('length', this.base.length);
      return this.fire('itemsWereAdded', items, indexes);
    };

    SetProxy.prototype._handleItemsRemoved = function(items, indexes) {
      this.set('length', this.base.length);
      return this.fire('itemsWereRemoved', items, indexes);
    };

    SetProxy.prototype.filter = function(f) {
      return this.reduce(function(accumulator, element) {
        if (f(element)) {
          accumulator.add(element);
        }
        return accumulator;
      }, new Batman.Set());
    };

    SetProxy.prototype.replace = function() {
      var length, result;
      length = this.property('length');
      length.isolate();
      result = this.base.replace.apply(this.base, arguments);
      length.expose();
      return result;
    };

    Batman.Set._applySetAccessors(SetProxy);

    _ref = ['add', 'insert', 'insertWithIndexes', 'remove', 'removeWithIndexes', 'at', 'find', 'clear', 'has', 'merge', 'toArray', 'isEmpty', 'indexedBy', 'indexedByUnique', 'sortedBy'];
    _fn = function(k) {
      return SetProxy.prototype[k] = function() {
        return this.base[k].apply(this.base, arguments);
      };
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      _fn(k);
    }

    SetProxy.accessor('length', {
      get: function() {
        this.registerAsMutableSource();
        return this.length;
      },
      set: function(_, v) {
        return this.length = v;
      }
    });

    return SetProxy;

  }).call(this, Batman.Object);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.BinarySetOperation = (function(_super) {
    __extends(BinarySetOperation, _super);

    function BinarySetOperation(left, right) {
      this.left = left;
      this.right = right;
      this._setup = __bind(this._setup, this);
      BinarySetOperation.__super__.constructor.call(this);
      this._setup(this.left, this.right);
      this._setup(this.right, this.left);
    }

    BinarySetOperation.prototype._setup = function(set, opposite) {
      var _this = this;
      set.on('itemsWereAdded', function(items) {
        return _this._itemsWereAddedToSource.apply(_this, [set, opposite].concat(__slice.call(items)));
      });
      set.on('itemsWereRemoved', function(items) {
        return _this._itemsWereRemovedFromSource.apply(_this, [set, opposite].concat(__slice.call(items)));
      });
      return this._itemsWereAddedToSource.apply(this, [set, opposite].concat(__slice.call(set.toArray())));
    };

    BinarySetOperation.prototype.merge = function() {
      var merged, others, set, _i, _len;
      others = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      merged = new Batman.Set;
      others.unshift(this);
      for (_i = 0, _len = others.length; _i < _len; _i++) {
        set = others[_i];
        set.forEach(function(v) {
          return merged.add(v);
        });
      }
      return merged;
    };

    BinarySetOperation.prototype.filter = Batman.SetProxy.prototype.filter;

    return BinarySetOperation;

  })(Batman.Set);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.SetUnion = (function(_super) {
    __extends(SetUnion, _super);

    function SetUnion() {
      _ref = SetUnion.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SetUnion.prototype._itemsWereAddedToSource = function() {
      var items, opposite, source;
      source = arguments[0], opposite = arguments[1], items = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      return this.add.apply(this, items);
    };

    SetUnion.prototype._itemsWereRemovedFromSource = function() {
      var item, items, itemsToRemove, opposite, source;
      source = arguments[0], opposite = arguments[1], items = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      itemsToRemove = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          if (!opposite.has(item)) {
            _results.push(item);
          }
        }
        return _results;
      })();
      return this.remove.apply(this, itemsToRemove);
    };

    return SetUnion;

  })(Batman.BinarySetOperation);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.SetIntersection = (function(_super) {
    __extends(SetIntersection, _super);

    function SetIntersection() {
      _ref = SetIntersection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SetIntersection.prototype._itemsWereAddedToSource = function() {
      var item, items, itemsToAdd, opposite, source;
      source = arguments[0], opposite = arguments[1], items = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      itemsToAdd = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          if (opposite.has(item)) {
            _results.push(item);
          }
        }
        return _results;
      })();
      if (itemsToAdd.length > 0) {
        return this.add.apply(this, itemsToAdd);
      }
    };

    SetIntersection.prototype._itemsWereRemovedFromSource = function() {
      var items, opposite, source;
      source = arguments[0], opposite = arguments[1], items = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      return this.remove.apply(this, items);
    };

    return SetIntersection;

  })(Batman.BinarySetOperation);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.SetComplement = (function(_super) {
    __extends(SetComplement, _super);

    function SetComplement() {
      _ref = SetComplement.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SetComplement.prototype._itemsWereAddedToSource = function() {
      var item, items, itemsToAdd, itemsToRemove, opposite, source;
      source = arguments[0], opposite = arguments[1], items = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      if (source === this.left) {
        itemsToAdd = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = items.length; _i < _len; _i++) {
            item = items[_i];
            if (!opposite.has(item)) {
              _results.push(item);
            }
          }
          return _results;
        })();
        if (itemsToAdd.length > 0) {
          return this.add.apply(this, itemsToAdd);
        }
      } else {
        itemsToRemove = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = items.length; _i < _len; _i++) {
            item = items[_i];
            if (opposite.has(item)) {
              _results.push(item);
            }
          }
          return _results;
        })();
        if (itemsToRemove.length > 0) {
          return this.remove.apply(this, itemsToRemove);
        }
      }
    };

    SetComplement.prototype._itemsWereRemovedFromSource = function() {
      var item, items, itemsToAdd, opposite, source;
      source = arguments[0], opposite = arguments[1], items = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      if (source === this.left) {
        return this.remove.apply(this, items);
      } else {
        itemsToAdd = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = items.length; _i < _len; _i++) {
            item = items[_i];
            if (opposite.has(item)) {
              _results.push(item);
            }
          }
          return _results;
        })();
        if (itemsToAdd.length > 0) {
          return this.add.apply(this, itemsToAdd);
        }
      }
    };

    SetComplement.prototype._addComplement = function(items, opposite) {
      var item, itemsToAdd;
      itemsToAdd = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          if (opposite.has(item)) {
            _results.push(item);
          }
        }
        return _results;
      })();
      if (itemsToAdd.length > 0) {
        return this.add.apply(this, itemsToAdd);
      }
    };

    return SetComplement;

  })(Batman.BinarySetOperation);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.StateMachine = (function(_super) {
    __extends(StateMachine, _super);

    StateMachine.InvalidTransitionError = function(message) {
      this.message = message != null ? message : "";
    };

    StateMachine.InvalidTransitionError.prototype = new Error;

    StateMachine.transitions = function(table) {
      var definePredicate, fromState, k, object, predicateKeys, toState, transitions, v, _fn, _ref,
        _this = this;
      for (k in table) {
        v = table[k];
        if (!(v.from && v.to)) {
          continue;
        }
        object = {};
        if (v.from.forEach) {
          v.from.forEach(function(fromKey) {
            return object[fromKey] = v.to;
          });
        } else {
          object[v.from] = v.to;
        }
        table[k] = object;
      }
      this.prototype.transitionTable = Batman.extend({}, this.prototype.transitionTable, table);
      predicateKeys = [];
      definePredicate = function(state) {
        var key;
        key = "is" + (Batman.helpers.titleize(state));
        if (_this.prototype[key] != null) {
          return;
        }
        predicateKeys.push(key);
        return _this.prototype[key] = function() {
          return this.get('state') === state;
        };
      };
      _ref = this.prototype.transitionTable;
      _fn = function(k) {
        return _this.prototype[k] = function() {
          return this.startTransition(k);
        };
      };
      for (k in _ref) {
        transitions = _ref[k];
        if (!(!this.prototype[k])) {
          continue;
        }
        _fn(k);
        for (fromState in transitions) {
          toState = transitions[fromState];
          definePredicate(fromState);
          definePredicate(toState);
        }
      }
      if (predicateKeys.length) {
        this.accessor.apply(this, __slice.call(predicateKeys).concat([function(key) {
          return this[key]();
        }]));
      }
      return this;
    };

    function StateMachine(startState) {
      this.nextEvents = [];
      this.set('_state', startState);
    }

    StateMachine.accessor('state', function() {
      return this.get('_state');
    });

    StateMachine.prototype.isTransitioning = false;

    StateMachine.prototype.transitionTable = {};

    StateMachine.prototype._transitionEvent = function(from, into) {
      return "" + from + "->" + into;
    };

    StateMachine.prototype._enterEvent = function(into) {
      return "enter " + into;
    };

    StateMachine.prototype._exitEvent = function(from) {
      return "exit " + from;
    };

    StateMachine.prototype._beforeEvent = function(into) {
      return "before " + into;
    };

    StateMachine.prototype.onTransition = function(from, into, callback) {
      return this.on(this._transitionEvent(from, into), callback);
    };

    StateMachine.prototype.onEnter = function(into, callback) {
      return this.on(this._enterEvent(into), callback);
    };

    StateMachine.prototype.onExit = function(from, callback) {
      return this.on(this._exitEvent(from), callback);
    };

    StateMachine.prototype.onBefore = function(into, callback) {
      return this.on(this._beforeEvent(into), callback);
    };

    StateMachine.prototype.offTransition = function(from, into, callback) {
      return this.off(this._transitionEvent(from, into), callback);
    };

    StateMachine.prototype.offEnter = function(into, callback) {
      return this.off(this._enterEvent(into), callback);
    };

    StateMachine.prototype.offExit = function(from, callback) {
      return this.off(this._exitEvent(from), callback);
    };

    StateMachine.prototype.offBefore = function(into, callback) {
      return this.off(this._beforeEvent(into), callback);
    };

    StateMachine.prototype.startTransition = Batman.Property.wrapTrackingPrevention(function(event) {
      var nextState, previousState;
      if (this.isTransitioning) {
        this.nextEvents.push(event);
        return;
      }
      previousState = this.get('state');
      nextState = this.nextStateForEvent(event);
      if (!nextState) {
        return false;
      }
      this.fire(this._beforeEvent(nextState));
      this.isTransitioning = true;
      this.fire(this._exitEvent(previousState));
      this.set('_state', nextState);
      this.fire(this._transitionEvent(previousState, nextState));
      this.fire(this._enterEvent(nextState));
      this.fire(event);
      this.isTransitioning = false;
      if (this.nextEvents.length > 0) {
        this.startTransition(this.nextEvents.shift());
      }
      return true;
    });

    StateMachine.prototype.canStartTransition = function(event, fromState) {
      if (fromState == null) {
        fromState = this.get('state');
      }
      return !!this.nextStateForEvent(event, fromState);
    };

    StateMachine.prototype.nextStateForEvent = function(event, fromState) {
      var _ref;
      if (fromState == null) {
        fromState = this.get('state');
      }
      return (_ref = this.transitionTable[event]) != null ? _ref[fromState] : void 0;
    };

    return StateMachine;

  })(Batman.Object);

  Batman.DelegatingStateMachine = (function(_super) {
    __extends(DelegatingStateMachine, _super);

    function DelegatingStateMachine(startState, base) {
      this.base = base;
      DelegatingStateMachine.__super__.constructor.call(this, startState);
    }

    DelegatingStateMachine.prototype.fire = function() {
      var result, _ref;
      result = DelegatingStateMachine.__super__.fire.apply(this, arguments);
      (_ref = this.base).fire.apply(_ref, arguments);
      return result;
    };

    return DelegatingStateMachine;

  })(Batman.StateMachine);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.Model = (function(_super) {
    var functionName, _i, _j, _len, _len1, _ref, _ref1, _ref2;

    __extends(Model, _super);

    Model.storageKey = null;

    Model.primaryKey = 'id';

    Model.persist = function() {
      var mechanism, options;
      mechanism = arguments[0], options = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      Batman.initializeObject(this.prototype);
      mechanism = mechanism.isStorageAdapter ? mechanism : new mechanism(this);
      if (options.length > 0) {
        Batman.mixin.apply(Batman, [mechanism].concat(__slice.call(options)));
      }
      this.prototype._batman.storage = mechanism;
      return mechanism;
    };

    Model.storageAdapter = function() {
      Batman.initializeObject(this.prototype);
      return this.prototype._batman.storage;
    };

    Model.encode = function() {
      var encoder, encoderForKey, encoderOrLastKey, key, keys, _base, _i, _j, _len;
      keys = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), encoderOrLastKey = arguments[_i++];
      Batman.initializeObject(this.prototype);
      (_base = this.prototype._batman).encoders || (_base.encoders = new Batman.SimpleHash);
      encoder = {};
      switch (Batman.typeOf(encoderOrLastKey)) {
        case 'String':
          keys.push(encoderOrLastKey);
          break;
        case 'Function':
          encoder.encode = encoderOrLastKey;
          break;
        default:
          encoder = encoderOrLastKey;
      }
      for (_j = 0, _len = keys.length; _j < _len; _j++) {
        key = keys[_j];
        encoderForKey = Batman.extend({
          as: key
        }, this.defaultEncoder, encoder);
        this.prototype._batman.encoders.set(key, encoderForKey);
      }
    };

    Model.defaultEncoder = {
      encode: function(x) {
        return x;
      },
      decode: function(x) {
        return x;
      }
    };

    Model.observeAndFire('primaryKey', function(newPrimaryKey, oldPrimaryKey) {
      this.encode(oldPrimaryKey, {
        encode: false,
        decode: false
      });
      return this.encode(newPrimaryKey, {
        encode: false,
        decode: this.defaultEncoder.decode
      });
    });

    Model.validate = function() {
      var keys, matches, optionsOrFunction, validatorClass, validators, _base, _i, _j, _len, _ref;
      keys = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), optionsOrFunction = arguments[_i++];
      Batman.initializeObject(this.prototype);
      validators = (_base = this.prototype._batman).validators || (_base.validators = []);
      if (typeof optionsOrFunction === 'function') {
        validators.push({
          keys: keys,
          callback: optionsOrFunction
        });
      } else {
        _ref = Batman.Validators;
        for (_j = 0, _len = _ref.length; _j < _len; _j++) {
          validatorClass = _ref[_j];
          if ((matches = validatorClass.matches(optionsOrFunction))) {
            validators.push({
              keys: keys,
              validator: new validatorClass(matches),
              "if": optionsOrFunction["if"],
              unless: optionsOrFunction.unless
            });
          }
        }
      }
    };

    Model.classAccessor('resourceName', {
      get: function() {
        if (this.resourceName != null) {
          return this.resourceName;
        } else if (this.prototype.resourceName != null) {
          if (Batman.config.minificationErrors) {
            Batman.developer.error("Please define the resourceName property of the " + (Batman.functionName(this)) + " on the constructor and not the prototype.");
          }
          return this.prototype.resourceName;
        } else {
          if (Batman.config.minificationErrors) {
            Batman.developer.error("Please define " + (Batman.functionName(this)) + ".resourceName in order for your model to be minification safe.");
          }
          return Batman.helpers.underscore(Batman.functionName(this));
        }
      }
    });

    Model.classAccessor('all', {
      get: function() {
        this._batman.check(this);
        if (this.prototype.hasStorage() && !this._batman.allLoadTriggered) {
          this.load();
          this._batman.allLoadTriggered = true;
        }
        return this.get('loaded');
      },
      set: function(k, v) {
        return this.set('loaded', v);
      }
    });

    Model.classAccessor('loaded', {
      get: function() {
        return this._loaded || (this._loaded = new Batman.Set);
      },
      set: function(k, v) {
        return this._loaded = v;
      }
    });

    Model.classAccessor('first', function() {
      return this.get('all').toArray()[0];
    });

    Model.classAccessor('last', function() {
      var x;
      x = this.get('all').toArray();
      return x[x.length - 1];
    });

    Model.clear = function() {
      var result, _ref;
      Batman.initializeObject(this);
      result = this.get('loaded').clear();
      if ((_ref = this._batman.get('associations')) != null) {
        _ref.reset();
      }
      this._resetPromises();
      return result;
    };

    Model.find = function(id, callback) {
      return this.findWithOptions(id, void 0, callback);
    };

    Model.findWithOptions = function(id, options, callback) {
      var record,
        _this = this;
      if (options == null) {
        options = {};
      }
      Batman.developer.assert(callback, "Must call find with a callback!");
      this._pending || (this._pending = {});
      record = this._loadIdentity(id) || this._pending[id];
      if (record == null) {
        record = new this;
        record._withoutDirtyTracking(function() {
          return this.set('id', id);
        });
        this._pending[id] = record;
      }
      record.loadWithOptions(options, function() {
        delete _this._pending[id];
        return callback.apply(_this, arguments);
      });
      return record;
    };

    Model.load = function(options, callback) {
      var _ref;
      if ((_ref = typeof options) === 'function' || _ref === 'undefined') {
        callback = options;
        options = {};
      } else {
        options = {
          data: options
        };
      }
      return this.loadWithOptions(options, callback);
    };

    Model.loadWithOptions = function(options, callback) {
      var _this = this;
      this.fire('loading', options);
      return this._doStorageOperation('readAll', options, function(err, records, env) {
        if (err != null) {
          _this.fire('error', err);
          return typeof callback === "function" ? callback(err, []) : void 0;
        } else {
          _this.fire('loaded', records, env);
          return typeof callback === "function" ? callback(err, records, env) : void 0;
        }
      });
    };

    Model.create = function(attrs, callback) {
      var record, _ref;
      if (!callback) {
        _ref = [{}, attrs], attrs = _ref[0], callback = _ref[1];
      }
      record = new this(attrs);
      record.save(callback);
      return record;
    };

    Model.findOrCreate = function(attrs, callback) {
      var record;
      record = this._loadIdentity(attrs[this.primaryKey]);
      if (record) {
        record.mixin(attrs);
        callback(void 0, record);
      } else {
        record = new this(attrs);
        record.save(callback);
      }
      return record;
    };

    Model.createFromJSON = function(json) {
      return this._makeOrFindRecordFromData(json);
    };

    Model.createMultipleFromJSON = function(array) {
      return this._makeOrFindRecordsFromData(array);
    };

    Model._loadIdentity = function(id) {
      return this.get('loaded.indexedByUnique.id').get(id);
    };

    Model._loadRecord = function(attributes) {
      var id, record;
      if (id = attributes[this.primaryKey]) {
        record = this._loadIdentity(id);
      }
      record || (record = new this);
      record._withoutDirtyTracking(function() {
        return this.fromJSON(attributes);
      });
      return record;
    };

    Model._makeOrFindRecordFromData = function(attributes) {
      var record;
      record = this._loadRecord(attributes);
      return this._mapIdentity(record);
    };

    Model._makeOrFindRecordsFromData = function(attributeSet) {
      var attributes, newRecords;
      newRecords = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = attributeSet.length; _i < _len; _i++) {
          attributes = attributeSet[_i];
          _results.push(this._loadRecord(attributes));
        }
        return _results;
      }).call(this);
      this._mapIdentities(newRecords);
      return newRecords;
    };

    Model._mapIdentity = function(record) {
      var existing, id, lifecycle;
      if ((id = record.get('id')) != null) {
        if (existing = this._loadIdentity(id)) {
          lifecycle = existing.get('lifecycle');
          lifecycle.load();
          existing._withoutDirtyTracking(function() {
            var attributes, _ref;
            attributes = (_ref = record.get('attributes')) != null ? _ref.toObject() : void 0;
            if (attributes) {
              return this.mixin(attributes);
            }
          });
          lifecycle.loaded();
          record = existing;
        } else {
          this.get('loaded').add(record);
        }
      }
      return record;
    };

    Model._mapIdentities = function(records) {
      var existing, id, index, lifecycle, newRecords, record, _i, _len, _ref;
      newRecords = [];
      for (index = _i = 0, _len = records.length; _i < _len; index = ++_i) {
        record = records[index];
        if ((id = record.get('id')) == null) {
          continue;
        } else if (existing = this._loadIdentity(id)) {
          lifecycle = existing.get('lifecycle');
          lifecycle.load();
          existing._withoutDirtyTracking(function() {
            var attributes, _ref;
            attributes = (_ref = record.get('attributes')) != null ? _ref.toObject() : void 0;
            if (attributes) {
              return this.mixin(attributes);
            }
          });
          lifecycle.loaded();
          records[index] = existing;
        } else {
          newRecords.push(record);
        }
      }
      if (newRecords.length) {
        (_ref = this.get('loaded')).add.apply(_ref, newRecords);
      }
      return records;
    };

    Model._doStorageOperation = function(operation, options, callback) {
      var adapter;
      Batman.developer.assert(this.prototype.hasStorage(), "Can't " + operation + " model " + (Batman.functionName(this.constructor)) + " without any storage adapters!");
      adapter = this.prototype._batman.get('storage');
      return adapter.perform(operation, this, options, callback);
    };

    _ref = ['find', 'load', 'create'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      functionName = _ref[_i];
      Model[functionName] = Batman.Property.wrapTrackingPrevention(Model[functionName]);
    }

    Model.InstanceLifecycleStateMachine = (function(_super1) {
      __extends(InstanceLifecycleStateMachine, _super1);

      function InstanceLifecycleStateMachine() {
        _ref1 = InstanceLifecycleStateMachine.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      InstanceLifecycleStateMachine.transitions({
        load: {
          from: ['dirty', 'clean'],
          to: 'loading'
        },
        create: {
          from: ['dirty', 'clean'],
          to: 'creating'
        },
        save: {
          from: ['dirty', 'clean'],
          to: 'saving'
        },
        destroy: {
          from: ['dirty', 'clean'],
          to: 'destroying'
        },
        failedValidation: {
          from: ['saving', 'creating'],
          to: 'dirty'
        },
        loaded: {
          loading: 'clean'
        },
        created: {
          creating: 'clean'
        },
        saved: {
          saving: 'clean'
        },
        destroyed: {
          destroying: 'destroyed'
        },
        set: {
          from: ['dirty', 'clean'],
          to: 'dirty'
        },
        error: {
          from: ['saving', 'creating', 'loading', 'destroying'],
          to: 'error'
        }
      });

      return InstanceLifecycleStateMachine;

    })(Batman.DelegatingStateMachine);

    function Model(idOrAttributes) {
      if (idOrAttributes == null) {
        idOrAttributes = {};
      }
      Batman.developer.assert(this instanceof Batman.Object, "constructors must be called with new");
      if (Batman.typeOf(idOrAttributes) === 'Object') {
        Model.__super__.constructor.call(this, idOrAttributes);
      } else {
        Model.__super__.constructor.call(this);
        this.set('id', idOrAttributes);
      }
    }

    Model.accessor('lifecycle', function() {
      return this.lifecycle || (this.lifecycle = new Batman.Model.InstanceLifecycleStateMachine('clean', this));
    });

    Model.accessor('attributes', function() {
      return this.attributes || (this.attributes = new Batman.Hash);
    });

    Model.accessor('dirtyKeys', function() {
      return this.dirtyKeys || (this.dirtyKeys = new Batman.Hash);
    });

    Model.accessor('_dirtiedKeys', function() {
      return this._dirtiedKeys || (this._dirtiedKeys = new Batman.SimpleSet);
    });

    Model.accessor('errors', function() {
      return this.errors || (this.errors = new Batman.ErrorsSet);
    });

    Model.accessor('isNew', function() {
      return this.isNew();
    });

    Model.accessor('isDirty', function() {
      return this.isDirty();
    });

    Model.accessor(Model.defaultAccessor = {
      get: function(k) {
        return Batman.getPath(this, ['attributes', k]);
      },
      set: function(k, v) {
        if (this._willSet(k)) {
          return this.get('attributes').set(k, v);
        } else {
          return this.get(k);
        }
      },
      unset: function(k) {
        return this.get('attributes').unset(k);
      }
    });

    Model.wrapAccessor('id', function(core) {
      return {
        get: function() {
          var primaryKey;
          primaryKey = this.constructor.primaryKey;
          if (primaryKey === 'id') {
            return core.get.apply(this, arguments);
          } else {
            return this.get(primaryKey);
          }
        },
        set: function(key, value) {
          var primaryKey;
          primaryKey = this.constructor.primaryKey;
          if (primaryKey === 'id') {
            this._willSet(key);
            return core.set.apply(this, arguments);
          } else {
            return this.set(primaryKey, value);
          }
        }
      };
    });

    Model.prototype.isNew = function() {
      return typeof this.get('id') === 'undefined';
    };

    Model.prototype.isDirty = function() {
      return this.get('lifecycle.state') === 'dirty';
    };

    Model.prototype.updateAttributes = function(attrs) {
      this.mixin(attrs);
      return this;
    };

    Model.prototype.toString = function() {
      return "" + (this.constructor.get('resourceName')) + ": " + (this.get('id'));
    };

    Model.prototype.toParam = function() {
      return this.get('id');
    };

    Model.prototype.toJSON = function() {
      var encoders, obj,
        _this = this;
      encoders = this._batman.get('encoders');
      if (!encoders || encoders.isEmpty()) {
        return {};
      }
      obj = {};
      encoders.forEach(function(key, encoder) {
        var encodedVal, val, _ref2;
        if (!encoder.encode || (val = _this.get(key)) === void 0) {
          return;
        }
        if ((encodedVal = encoder.encode(val, key, obj, _this)) !== void 0) {
          return obj[(_ref2 = typeof encoder.as === "function" ? encoder.as(key, val, obj, _this) : void 0) != null ? _ref2 : encoder.as] = encodedVal;
        }
      });
      return obj;
    };

    Model.prototype.fromJSON = function(data) {
      var encoders, key, obj, value,
        _this = this;
      obj = {};
      encoders = this._batman.get('encoders');
      if (!encoders || encoders.isEmpty() || !encoders.some(function(key, encoder) {
        return encoder.decode != null;
      })) {
        for (key in data) {
          value = data[key];
          obj[key] = value;
        }
      } else {
        encoders.forEach(function(key, encoder) {
          var as, _ref2;
          if (!encoder.decode) {
            return;
          }
          as = (_ref2 = typeof encoder.as === "function" ? encoder.as(key, data[key], obj, _this) : void 0) != null ? _ref2 : encoder.as;
          value = data[as];
          if (value === void 0 || (value === null && (_this._associationForAttribute(as) != null))) {
            return;
          }
          return obj[key] = encoder.decode(value, as, data, obj, _this);
        });
      }
      if (this.constructor.primaryKey !== 'id') {
        obj.id = data[this.constructor.primaryKey];
      }
      Batman.developer["do"](function() {
        if ((!encoders) || encoders.length <= 1) {
          return Batman.developer.warn("Warning: Model " + (Batman.functionName(_this.constructor)) + " has suspiciously few decoders!");
        }
      });
      return this.mixin(obj);
    };

    Model.prototype.hasStorage = function() {
      return this._batman.get('storage') != null;
    };

    Model.prototype.load = function(options, callback) {
      var _ref2;
      if (!callback) {
        _ref2 = [{}, options], options = _ref2[0], callback = _ref2[1];
      } else {
        options = {
          data: options
        };
      }
      return this.loadWithOptions(options, callback);
    };

    Model.prototype.loadWithOptions = function(options, callback) {
      var callbackQueue, hasOptions, _ref2,
        _this = this;
      hasOptions = Object.keys(options).length !== 0;
      if ((_ref2 = this.get('lifecycle.state')) === 'destroying' || _ref2 === 'destroyed') {
        if (typeof callback === "function") {
          callback(new Error("Can't load a destroyed record!"));
        }
        return;
      }
      if (this.get('lifecycle').load()) {
        callbackQueue = [];
        if (callback != null) {
          callbackQueue.push(callback);
        }
        if (!hasOptions) {
          this._currentLoad = callbackQueue;
        }
        return this._doStorageOperation('read', options, function(err, record, env) {
          var _j, _len1;
          if (!err) {
            _this.get('lifecycle').loaded();
            record = _this.constructor._mapIdentity(record);
            record.get('errors').clear();
          } else {
            _this.get('lifecycle').error();
          }
          if (!hasOptions) {
            _this._currentLoad = null;
          }
          for (_j = 0, _len1 = callbackQueue.length; _j < _len1; _j++) {
            callback = callbackQueue[_j];
            callback(err, record, env);
          }
        });
      } else {
        if (this.get('lifecycle.state') === 'loading' && !hasOptions) {
          if (callback != null) {
            return this._currentLoad.push(callback);
          }
        } else {
          return typeof callback === "function" ? callback(new Batman.StateMachine.InvalidTransitionError("Can't load while in state " + (this.get('lifecycle.state')))) : void 0;
        }
      }
    };

    Model.prototype.save = function(options, callback) {
      var endState, isNew, startState, storageOperation, _ref2, _ref3,
        _this = this;
      if (!callback) {
        _ref2 = [{}, options], options = _ref2[0], callback = _ref2[1];
      }
      isNew = this.isNew();
      _ref3 = isNew ? ['create', 'create', 'created'] : ['save', 'update', 'saved'], startState = _ref3[0], storageOperation = _ref3[1], endState = _ref3[2];
      if (this.get('lifecycle').startTransition(startState)) {
        return this.validate(function(error, errors) {
          var associations, payload;
          if (error || errors.length) {
            _this.get('lifecycle').failedValidation();
            return typeof callback === "function" ? callback(error || errors, _this) : void 0;
          }
          _this.fire('validated');
          associations = _this.constructor._batman.get('associations');
          _this._withoutDirtyTracking(function() {
            var _ref4,
              _this = this;
            return associations != null ? (_ref4 = associations.getByType('belongsTo')) != null ? _ref4.forEach(function(association, label) {
              return association.apply(_this);
            }) : void 0 : void 0;
          });
          payload = Batman.extend({}, options, {
            data: options
          });
          return _this._doStorageOperation(storageOperation, payload, function(err, record, env) {
            if (!err) {
              _this.get('dirtyKeys').clear();
              _this.get('_dirtiedKeys').clear();
              if (associations) {
                record._withoutDirtyTracking(function() {
                  var _ref4, _ref5;
                  if ((_ref4 = associations.getByType('hasOne')) != null) {
                    _ref4.forEach(function(association, label) {
                      return association.apply(err, record);
                    });
                  }
                  return (_ref5 = associations.getByType('hasMany')) != null ? _ref5.forEach(function(association, label) {
                    return association.apply(err, record);
                  }) : void 0;
                });
              }
              record = _this.constructor._mapIdentity(record);
              _this.get('lifecycle').startTransition(endState);
            } else {
              if (err instanceof Batman.ErrorsSet) {
                _this.get('lifecycle').failedValidation();
              } else {
                _this.get('lifecycle').error();
              }
            }
            return typeof callback === "function" ? callback(err, record || _this, env) : void 0;
          });
        });
      } else {
        return typeof callback === "function" ? callback(new Batman.StateMachine.InvalidTransitionError("Can't save while in state " + (this.get('lifecycle.state')))) : void 0;
      }
    };

    Model.prototype.destroy = function(options, callback) {
      var _ref2,
        _this = this;
      if (!callback) {
        _ref2 = [{}, options], options = _ref2[0], callback = _ref2[1];
      }
      if (this.get('lifecycle').destroy()) {
        return this._doStorageOperation('destroy', {
          data: options
        }, function(err, record, env) {
          if (!err) {
            _this.constructor.get('loaded').remove(_this);
            _this.get('lifecycle').destroyed();
          } else {
            _this.get('lifecycle').error();
          }
          return typeof callback === "function" ? callback(err, record, env) : void 0;
        });
      } else {
        return typeof callback === "function" ? callback(new Batman.StateMachine.InvalidTransitionError("Can't destroy while in state " + (this.get('lifecycle.state')))) : void 0;
      }
    };

    Model.prototype.validate = function(callback) {
      var args, condition, count, e, errors, finishedValidation, key, validator, validators, _j, _k, _len1, _len2, _ref2;
      errors = this.get('errors');
      errors.clear();
      validators = this._batman.get('validators') || [];
      if (!validators || validators.length === 0) {
        if (typeof callback === "function") {
          callback(void 0, errors);
        }
        return true;
      }
      count = validators.reduce((function(acc, validator) {
        return acc + validator.keys.length;
      }), 0);
      finishedValidation = function() {
        if (--count === 0) {
          return typeof callback === "function" ? callback(void 0, errors) : void 0;
        }
      };
      for (_j = 0, _len1 = validators.length; _j < _len1; _j++) {
        validator = validators[_j];
        if (validator["if"]) {
          condition = typeof validator["if"] === 'string' ? this.get(validator["if"]) : validator["if"].call(this, errors, this, key);
          if (!condition) {
            finishedValidation();
            continue;
          }
        }
        if (validator.unless) {
          condition = typeof validator.unless === 'string' ? this.get(validator.unless) : validator.unless.call(this, errors, this, key);
          if (condition) {
            finishedValidation();
            continue;
          }
        }
        _ref2 = validator.keys;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          key = _ref2[_k];
          args = [errors, this, key, finishedValidation];
          try {
            if (validator.validator) {
              validator.validator.validateEach.apply(validator.validator, args);
            } else {
              validator.callback.apply(validator, args);
            }
          } catch (_error) {
            e = _error;
            if (typeof callback === "function") {
              callback(e, errors);
            }
          }
        }
      }
    };

    Model.prototype.associationProxy = function(association) {
      var proxies, _base, _name;
      Batman.initializeObject(this);
      proxies = (_base = this._batman).associationProxies || (_base.associationProxies = {});
      proxies[_name = association.label] || (proxies[_name] = new association.proxyClass(association, this));
      return proxies[association.label];
    };

    Model.prototype._willSet = function(key) {
      if (this._pauseDirtyTracking) {
        return true;
      }
      if (this.get('lifecycle').startTransition('set')) {
        if (!this.get('_dirtiedKeys').has(key)) {
          this.set("dirtyKeys." + key, this.get(key));
          this.get('_dirtiedKeys').add(key);
        }
        return true;
      } else {
        return false;
      }
    };

    Model.prototype._associationForAttribute = function(attribute) {
      var _ref2;
      return (_ref2 = this.constructor._batman.get('associations')) != null ? _ref2.get(attribute) : void 0;
    };

    Model.prototype._doStorageOperation = function(operation, options, callback) {
      var adapter,
        _this = this;
      Batman.developer.assert(this.hasStorage(), "Can't " + operation + " model " + (Batman.functionName(this.constructor)) + " without any storage adapters!");
      adapter = this._batman.get('storage');
      return adapter.perform(operation, this, options, function() {
        return callback.apply(null, arguments);
      });
    };

    Model.prototype._withoutDirtyTracking = function(block) {
      var result;
      if (this._pauseDirtyTracking) {
        return block.call(this);
      }
      this._pauseDirtyTracking = true;
      result = block.call(this);
      this._pauseDirtyTracking = false;
      return result;
    };

    _ref2 = ['load', 'save', 'validate', 'destroy'];
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      functionName = _ref2[_j];
      Model.prototype[functionName] = Batman.Property.wrapTrackingPrevention(Model.prototype[functionName]);
    }

    Model.prototype.reflectOnAllAssociations = function(associationType) {
      var associations;
      associations = this.constructor._batman.get('associations');
      if (associationType != null) {
        return associations != null ? associations.getByType(associationType) : void 0;
      } else {
        return associations != null ? associations.getAll() : void 0;
      }
    };

    Model.prototype.reflectOnAssociation = function(associationLabel) {
      var _ref3;
      return (_ref3 = this.constructor._batman.get('associations')) != null ? _ref3.getByLabel(associationLabel) : void 0;
    };

    Model.prototype.transaction = function() {
      return this._transaction([], []);
    };

    Model.prototype._transaction = function(visited, stack) {
      var attributes, hasManys, index, key, label, newValues, transaction, value, _k, _len2, _ref3, _ref4;
      index = visited.indexOf(this);
      if (index !== -1) {
        return stack[index];
      }
      visited.push(this);
      stack.push(transaction = new this.constructor);
      if (hasManys = this.reflectOnAllAssociations('hasMany')) {
        hasManys = hasManys.filter(function(association) {
          return association.options.includeInTransaction;
        });
        _ref3 = hasManys.mapToProperty('label');
        for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
          label = _ref3[_k];
          this.get(label);
        }
      }
      attributes = this.get('attributes').toObject();
      for (key in attributes) {
        if (!__hasProp.call(attributes, key)) continue;
        value = attributes[key];
        if (value instanceof Batman.Model && !value.isTransaction) {
          attributes[key] = value._transaction(visited, stack);
        } else if (value instanceof Batman.AssociationSet && !value.isTransaction) {
          newValues = new Batman.TransactionAssociationSet(value, visited, stack);
          attributes[key] = newValues;
        } else if (Batman.typeOf(value) === 'Object') {
          Batman.developer.warn("You're passing a mutable object (" + key + ", " + value.constructor.name + ") in a " + this.constructor.name + " transaction:", value);
        }
      }
      transaction._withoutDirtyTracking(function() {
        return transaction.updateAttributes(attributes);
      });
      transaction._batman.base = this;
      _ref4 = Batman.Transaction;
      for (key in _ref4) {
        value = _ref4[key];
        transaction[key] = value;
      }
      transaction.accessor('isTransaction', function() {
        return this.isTransaction;
      });
      transaction.accessor('base', function() {
        return this.base();
      });
      return transaction;
    };

    return Model;

  }).call(this, Batman.Object);

}).call(this);

(function() {
  var k, _fn, _i, _len, _ref,
    _this = this;

  _ref = Batman.AssociationCurator.availableAssociations;
  _fn = function(k) {
    return Batman.Model[k] = function(label, scope) {
      var collection, _base;
      Batman.initializeObject(this);
      collection = (_base = this._batman).associations || (_base.associations = new Batman.AssociationCurator(this));
      return collection.add(new Batman["" + (Batman.helpers.titleize(k)) + "Association"](this, label, scope));
    };
  };
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    k = _ref[_i];
    _fn(k);
  }

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Proxy = (function(_super) {
    __extends(Proxy, _super);

    Proxy.prototype.isProxy = true;

    function Proxy(target) {
      Proxy.__super__.constructor.call(this);
      if (target != null) {
        this.set('target', target);
      }
    }

    Proxy.accessor('target', Batman.Property.defaultAccessor);

    Proxy.accessor({
      get: function(key) {
        var _ref;
        return (_ref = this.get('target')) != null ? _ref.get(key) : void 0;
      },
      set: function(key, value) {
        var _ref;
        return (_ref = this.get('target')) != null ? _ref.set(key, value) : void 0;
      },
      unset: function(key) {
        var _ref;
        return (_ref = this.get('target')) != null ? _ref.unset(key) : void 0;
      }
    });

    return Proxy;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.AssociationProxy = (function(_super) {
    __extends(AssociationProxy, _super);

    AssociationProxy.prototype.loaded = false;

    function AssociationProxy(association, model) {
      this.association = association;
      this.model = model;
      AssociationProxy.__super__.constructor.call(this);
    }

    AssociationProxy.prototype.toJSON = function() {
      var target;
      target = this.get('target');
      if (target != null) {
        return this.get('target').toJSON();
      }
    };

    AssociationProxy.prototype.load = function(callback) {
      var _this = this;
      this.fetch(function(err, proxiedRecord) {
        if (!err) {
          _this._setTarget(proxiedRecord);
        }
        return typeof callback === "function" ? callback(err, proxiedRecord) : void 0;
      });
      return this.get('target');
    };

    AssociationProxy.prototype.loadFromLocal = function() {
      var target;
      if (!this._canLoad()) {
        return;
      }
      if (target = this.fetchFromLocal()) {
        this._setTarget(target);
      }
      return target;
    };

    AssociationProxy.prototype.fetch = function(callback) {
      var record;
      if (!this._canLoad()) {
        return callback(void 0, void 0);
      }
      record = this.fetchFromLocal();
      if (record) {
        return callback(void 0, record);
      } else {
        return this.fetchFromRemote(callback);
      }
    };

    AssociationProxy.accessor('loaded', Batman.Property.defaultAccessor);

    AssociationProxy.accessor('target', {
      get: function() {
        return this.fetchFromLocal();
      },
      set: function(_, v) {
        return v;
      }
    });

    AssociationProxy.prototype._canLoad = function() {
      return (this.get('foreignValue') || this.get('primaryValue')) != null;
    };

    AssociationProxy.prototype._setTarget = function(target) {
      this.set('target', target);
      this.set('loaded', true);
      return this.fire('loaded', target);
    };

    return AssociationProxy;

  })(Batman.Proxy);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.HasOneProxy = (function(_super) {
    __extends(HasOneProxy, _super);

    function HasOneProxy() {
      _ref = HasOneProxy.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HasOneProxy.accessor('primaryValue', function() {
      return this.model.get(this.association.primaryKey);
    });

    HasOneProxy.prototype.fetchFromLocal = function() {
      return this.association.setIndex().get(this.get('primaryValue'));
    };

    HasOneProxy.prototype.fetchFromRemote = function(callback) {
      var loadOptions,
        _this = this;
      loadOptions = {
        data: {}
      };
      loadOptions.data[this.association.foreignKey] = this.get('primaryValue');
      if (this.association.options.url) {
        loadOptions.collectionUrl = this.association.options.url;
        loadOptions.urlContext = this.model;
      }
      return this.association.getRelatedModel().loadWithOptions(loadOptions, function(error, loadedRecords) {
        if (!loadedRecords || loadedRecords.length <= 0) {
          return callback(error || new Error("Couldn't find related record!"), void 0);
        } else {
          return callback(void 0, loadedRecords[0]);
        }
      });
    };

    return HasOneProxy;

  })(Batman.AssociationProxy);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.BelongsToProxy = (function(_super) {
    __extends(BelongsToProxy, _super);

    function BelongsToProxy() {
      _ref = BelongsToProxy.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BelongsToProxy.accessor('foreignValue', function() {
      return this.model.get(this.association.foreignKey);
    });

    BelongsToProxy.prototype.fetchFromLocal = function() {
      return this.association.setIndex().get(this.get('foreignValue'));
    };

    BelongsToProxy.prototype.fetchFromRemote = function(callback) {
      var loadOptions;
      loadOptions = {};
      if (this.association.options.url) {
        loadOptions.recordUrl = this.association.options.url;
      }
      return this.association.getRelatedModel().findWithOptions(this.get('foreignValue'), loadOptions, callback);
    };

    return BelongsToProxy;

  })(Batman.AssociationProxy);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PolymorphicBelongsToProxy = (function(_super) {
    __extends(PolymorphicBelongsToProxy, _super);

    function PolymorphicBelongsToProxy() {
      _ref = PolymorphicBelongsToProxy.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PolymorphicBelongsToProxy.accessor('foreignTypeValue', function() {
      return this.model.get(this.association.foreignTypeKey);
    });

    PolymorphicBelongsToProxy.prototype.fetchFromLocal = function() {
      return this.association.setIndexForType(this.get('foreignTypeValue')).get(this.get('foreignValue'));
    };

    PolymorphicBelongsToProxy.prototype.fetchFromRemote = function(callback) {
      var loadOptions;
      loadOptions = {};
      if (this.association.options.url) {
        loadOptions.recordUrl = this.association.options.url;
      }
      return this.association.getRelatedModelForType(this.get('foreignTypeValue')).findWithOptions(this.get('foreignValue'), loadOptions, callback);
    };

    return PolymorphicBelongsToProxy;

  })(Batman.BelongsToProxy);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Accessible = (function(_super) {
    __extends(Accessible, _super);

    function Accessible() {
      this.accessor.apply(this, arguments);
    }

    return Accessible;

  })(Batman.Object);

  Batman.TerminalAccessible = (function(_super) {
    __extends(TerminalAccessible, _super);

    function TerminalAccessible() {
      _ref = TerminalAccessible.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TerminalAccessible.prototype.propertyClass = Batman.Property;

    return TerminalAccessible;

  })(Batman.Accessible);

}).call(this);

(function() {
  Batman.URI = (function() {
    /*
    # URI parsing
    */

    var attributes, childKeyMatchers, decodeQueryComponent, encodeComponent, encodeQueryComponent, keyVal, nameParser, normalizeParams, plus, queryFromParams, r20, strictParser;

    strictParser = /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/;

    attributes = ["source", "protocol", "authority", "userInfo", "user", "password", "hostname", "port", "relative", "path", "directory", "file", "query", "hash"];

    function URI(str) {
      var i, matches;
      matches = strictParser.exec(str);
      i = 14;
      while (i--) {
        this[attributes[i]] = matches[i] || '';
      }
      this.queryParams = this.constructor.paramsFromQuery(this.query);
      delete this.authority;
      delete this.userInfo;
      delete this.relative;
      delete this.directory;
      delete this.file;
      delete this.query;
    }

    URI.prototype.queryString = function() {
      return this.constructor.queryFromParams(this.queryParams);
    };

    URI.prototype.toString = function() {
      return [this.protocol ? "" + this.protocol + ":" : void 0, this.authority() ? "//" : void 0, this.authority(), this.relative()].join("");
    };

    URI.prototype.userInfo = function() {
      return [this.user, this.password ? ":" + this.password : void 0].join("");
    };

    URI.prototype.authority = function() {
      return [this.userInfo(), this.user || this.password ? "@" : void 0, this.hostname, this.port ? ":" + this.port : void 0].join("");
    };

    URI.prototype.relative = function() {
      var query;
      query = this.queryString();
      return [this.path, query ? "?" + query : void 0, this.hash ? "#" + this.hash : void 0].join("");
    };

    URI.prototype.directory = function() {
      var splitPath;
      splitPath = this.path.split('/');
      if (splitPath.length > 1) {
        return splitPath.slice(0, splitPath.length - 1).join('/') + "/";
      } else {
        return "";
      }
    };

    URI.prototype.file = function() {
      var splitPath;
      splitPath = this.path.split("/");
      return splitPath[splitPath.length - 1];
    };

    /*
    # query parsing
    */


    URI.paramsFromQuery = function(query) {
      var matches, params, segment, _i, _len, _ref;
      params = {};
      _ref = query.split('&');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        segment = _ref[_i];
        if (matches = segment.match(keyVal)) {
          normalizeParams(params, decodeQueryComponent(matches[1]), decodeQueryComponent(matches[2]));
        } else {
          normalizeParams(params, decodeQueryComponent(segment), null);
        }
      }
      return params;
    };

    URI.decodeQueryComponent = decodeQueryComponent = function(str) {
      return decodeURIComponent(str.replace(plus, '%20'));
    };

    nameParser = /^[\[\]]*([^\[\]]+)\]*(.*)/;

    childKeyMatchers = [/^\[\]\[([^\[\]]+)\]$/, /^\[\](.+)$/];

    plus = /\+/g;

    r20 = /%20/g;

    keyVal = /^([^=]*)=(.*)/;

    normalizeParams = function(params, name, v) {
      var after, childKey, k, last, matches;
      if (matches = name.match(nameParser)) {
        k = matches[1];
        after = matches[2];
      } else {
        return;
      }
      if (after === '') {
        params[k] = v;
      } else if (after === '[]') {
        if (params[k] == null) {
          params[k] = [];
        }
        if (Batman.typeOf(params[k]) !== 'Array') {
          throw new Error("expected Array (got " + (Batman.typeOf(params[k])) + ") for param \"" + k + "\"");
        }
        params[k].push(v);
      } else if (matches = after.match(childKeyMatchers[0]) || after.match(childKeyMatchers[1])) {
        childKey = matches[1];
        if (params[k] == null) {
          params[k] = [];
        }
        if (Batman.typeOf(params[k]) !== 'Array') {
          throw new Error("expected Array (got " + (Batman.typeOf(params[k])) + ") for param \"" + k + "\"");
        }
        last = params[k][params[k].length - 1];
        if (Batman.typeOf(last) === 'Object' && !(childKey in last)) {
          normalizeParams(last, childKey, v);
        } else {
          params[k].push(normalizeParams({}, childKey, v));
        }
      } else {
        if (params[k] == null) {
          params[k] = {};
        }
        if (Batman.typeOf(params[k]) !== 'Object') {
          throw new Error("expected Object (got " + (Batman.typeOf(params[k])) + ") for param \"" + k + "\"");
        }
        params[k] = normalizeParams(params[k], after, v);
      }
      return params;
    };

    /*
    # query building
    */


    URI.queryFromParams = queryFromParams = function(value, prefix) {
      var arrayResults, k, v, valueType;
      if (value == null) {
        return prefix;
      }
      valueType = Batman.typeOf(value);
      if (!((prefix != null) || valueType === 'Object')) {
        throw new Error("value must be an Object");
      }
      switch (valueType) {
        case 'Array':
          return ((function() {
            var _i, _len;
            arrayResults = [];
            if (value.length === 0) {
              arrayResults.push(queryFromParams(null, "" + prefix + "[]"));
            } else {
              for (_i = 0, _len = value.length; _i < _len; _i++) {
                v = value[_i];
                arrayResults.push(queryFromParams(v, "" + prefix + "[]"));
              }
            }
            return arrayResults;
          })()).join("&");
        case 'Object':
          return ((function() {
            var _results;
            _results = [];
            for (k in value) {
              v = value[k];
              _results.push(queryFromParams(v, prefix ? "" + prefix + "[" + (encodeQueryComponent(k)) + "]" : encodeQueryComponent(k)));
            }
            return _results;
          })()).join("&");
        default:
          if (prefix != null) {
            return "" + prefix + "=" + (encodeQueryComponent(value));
          } else {
            return encodeQueryComponent(value);
          }
      }
    };

    URI.encodeComponent = encodeComponent = function(str) {
      if (str != null) {
        return encodeURIComponent(str);
      } else {
        return '';
      }
    };

    URI.encodeQueryComponent = encodeQueryComponent = function(str) {
      return encodeComponent(str).replace(r20, '+');
    };

    return URI;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Request = (function(_super) {
    var dataHasFileUploads;

    __extends(Request, _super);

    Request.objectToFormData = function(data) {
      var formData, key, pairForList, val, _i, _len, _ref, _ref1;
      pairForList = function(key, object, first) {
        var k, list, v;
        if (first == null) {
          first = false;
        }
        if (object instanceof Batman.container.File) {
          return [[key, object]];
        }
        return list = (function() {
          switch (Batman.typeOf(object)) {
            case 'Object':
              list = (function() {
                var _results;
                _results = [];
                for (k in object) {
                  v = object[k];
                  _results.push(pairForList((first ? k : "" + key + "[" + k + "]"), v));
                }
                return _results;
              })();
              return list.reduce(function(acc, list) {
                return acc.concat(list);
              }, []);
            case 'Array':
              return object.reduce(function(acc, element) {
                return acc.concat(pairForList("" + key + "[]", element));
              }, []);
            default:
              return [[key, object != null ? object : ""]];
          }
        })();
      };
      formData = new Batman.container.FormData();
      _ref = pairForList("", data, true);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], key = _ref1[0], val = _ref1[1];
        formData.append(key, val);
      }
      return formData;
    };

    Request.dataHasFileUploads = dataHasFileUploads = function(data) {
      var k, type, v, _i, _len;
      if ((typeof File !== "undefined" && File !== null) && data instanceof File) {
        return true;
      }
      type = Batman.typeOf(data);
      switch (type) {
        case 'Object':
          for (k in data) {
            v = data[k];
            if (dataHasFileUploads(v)) {
              return true;
            }
          }
          break;
        case 'Array':
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            v = data[_i];
            if (dataHasFileUploads(v)) {
              return true;
            }
          }
      }
      return false;
    };

    Request.wrapAccessor('method', function(core) {
      return {
        set: function(k, val) {
          return core.set.call(this, k, val != null ? typeof val.toUpperCase === "function" ? val.toUpperCase() : void 0 : void 0);
        }
      };
    });

    Request.prototype.method = 'GET';

    Request.prototype.hasFileUploads = function() {
      return dataHasFileUploads(this.data);
    };

    Request.prototype.contentType = 'application/x-www-form-urlencoded';

    Request.prototype.autosend = true;

    function Request(options) {
      var handler, handlers, k, _ref;
      handlers = {};
      for (k in options) {
        handler = options[k];
        if (!(k === 'success' || k === 'error' || k === 'loading' || k === 'loaded')) {
          continue;
        }
        handlers[k] = handler;
        delete options[k];
      }
      Request.__super__.constructor.call(this, options);
      for (k in handlers) {
        handler = handlers[k];
        this.on(k, handler);
      }
      if (((_ref = this.get('url')) != null ? _ref.length : void 0) > 0) {
        if (this.autosend) {
          this.send();
        }
      } else {
        this.observe('url', function(url) {
          if (url != null) {
            return this.send();
          }
        });
      }
    }

    Request.prototype.send = function(data) {
      return Batman.developer.error("You must add a platform library to implement Batman.Request (for example, batman.jquery)");
    };

    Request.set('pendingRequestCount', 0);

    Request.classAccessor('requestIsPending', function() {
      return this.get('pendingRequestCount') > 0;
    });

    Request.prototype.on('loading', function() {
      return Batman.Request.set('pendingRequestCount', Batman.Request.get('pendingRequestCount') + 1);
    });

    Request.prototype.on('loaded', function() {
      return Batman.Request.set('pendingRequestCount', Batman.Request.get('pendingRequestCount') - 1);
    });

    return Request;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.SetObserver = (function(_super) {
    __extends(SetObserver, _super);

    function SetObserver(base) {
      var _this = this;
      this.base = base;
      this._itemObservers = new Batman.SimpleHash;
      this._setObservers = new Batman.SimpleHash;
      this._setObservers.set("itemsWereAdded", function() {
        return _this.fire.apply(_this, ['itemsWereAdded'].concat(__slice.call(arguments)));
      });
      this._setObservers.set("itemsWereRemoved", function() {
        return _this.fire.apply(_this, ['itemsWereRemoved'].concat(__slice.call(arguments)));
      });
      this.on('itemsWereAdded', this.startObservingItems.bind(this));
      this.on('itemsWereRemoved', this.stopObservingItems.bind(this));
    }

    SetObserver.prototype.observedItemKeys = [];

    SetObserver.prototype.observerForItemAndKey = function(item, key) {};

    SetObserver.prototype._getOrSetObserverForItemAndKey = function(item, key) {
      var _this = this;
      return this._itemObservers.getOrSet(item, function() {
        var observersByKey;
        observersByKey = new Batman.SimpleHash;
        return observersByKey.getOrSet(key, function() {
          return _this.observerForItemAndKey(item, key);
        });
      });
    };

    SetObserver.prototype.startObserving = function() {
      this._manageItemObservers("observe");
      return this._manageSetObservers("addHandler");
    };

    SetObserver.prototype.stopObserving = function() {
      this._manageItemObservers("forget");
      return this._manageSetObservers("removeHandler");
    };

    SetObserver.prototype.startObservingItems = function(items) {
      var item, _i, _len;
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        this._manageObserversForItem(item, "observe");
      }
    };

    SetObserver.prototype.stopObservingItems = function(items) {
      var item, _i, _len;
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        this._manageObserversForItem(item, "forget");
      }
    };

    SetObserver.prototype._manageObserversForItem = function(item, method) {
      var key, _i, _len, _ref;
      if (item.isObservable) {
        _ref = this.observedItemKeys;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          item[method](key, this._getOrSetObserverForItemAndKey(item, key));
        }
        if (method === "forget") {
          return this._itemObservers.unset(item);
        }
      }
    };

    SetObserver.prototype._manageItemObservers = function(method) {
      var _this = this;
      return this.base.forEach(function(item) {
        return _this._manageObserversForItem(item, method);
      });
    };

    SetObserver.prototype._manageSetObservers = function(method) {
      var _this = this;
      if (this.base.isObservable) {
        return this._setObservers.forEach(function(key, observer) {
          return _this.base.event(key)[method](observer);
        });
      }
    };

    return SetObserver;

  })(Batman.Object);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.SetSort = (function(_super) {
    __extends(SetSort, _super);

    function SetSort(base, key, order) {
      var _this = this;
      this.key = key;
      if (order == null) {
        order = "asc";
      }
      this.compareElements = __bind(this.compareElements, this);
      SetSort.__super__.constructor.call(this, base);
      this.descending = order.toLowerCase() === "desc";
      this.isSorted = true;
      if (this.isCollectionEventEmitter) {
        this._setObserver.observedItemKeys = [this.key];
        this._setObserver.observerForItemAndKey = function(item) {
          return function(newValue, oldValue) {
            return _this._handleItemsModified(item, newValue, oldValue);
          };
        };
      }
      this._reIndex();
    }

    SetSort.prototype._handleItemsModified = function(item, newValue, oldValue) {
      var match, newIndex, newStorage, oldIndex, proxyItem, wrappedCompare, _ref, _ref1,
        _this = this;
      proxyItem = {};
      proxyItem[this.key] = oldValue;
      wrappedCompare = function(a, b) {
        if (a === item) {
          a = proxyItem;
        }
        if (b === item) {
          b = proxyItem;
        }
        return _this.compareElements(a, b);
      };
      newStorage = this._storage.slice();
      _ref = this.constructor._binarySearch(newStorage, item, wrappedCompare), match = _ref.match, oldIndex = _ref.index;
      if (!match) {
        return;
      }
      newStorage.splice(oldIndex, 1);
      _ref1 = this.constructor._binarySearch(newStorage, item, this.compareElements), match = _ref1.match, newIndex = _ref1.index;
      if (oldIndex === newIndex) {
        return;
      }
      newStorage.splice(newIndex, 0, item);
      this.set('_storage', newStorage);
      return this.fire('itemWasMoved', item, newIndex, oldIndex);
    };

    SetSort.prototype._handleItemsAdded = function(items) {
      var addedIndexes, addedItems, index, item, match, newStorage, _i, _len, _ref;
      newStorage = this._storage.slice();
      addedItems = [];
      addedIndexes = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _ref = this.constructor._binarySearch(newStorage, item, this.compareElements), match = _ref.match, index = _ref.index;
        if (!match) {
          newStorage.splice(index, 0, item);
          addedItems.push(item);
          addedIndexes.push(index);
        }
      }
      this.set('_storage', newStorage);
      this.set('length', this._storage.length);
      return this.fire('itemsWereAdded', addedItems, addedIndexes);
    };

    SetSort.prototype._handleItemsRemoved = function(items) {
      var index, item, match, newStorage, removedIndexes, removedItems, _i, _len, _ref;
      newStorage = this._storage.slice();
      removedItems = [];
      removedIndexes = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _ref = this.constructor._binarySearch(newStorage, item, this.compareElements), match = _ref.match, index = _ref.index;
        if (match) {
          newStorage.splice(index, 1);
          removedItems.push(item);
          removedIndexes.push(index);
        }
      }
      this.set('_storage', newStorage);
      this.set('length', this._storage.length);
      return this.fire('itemsWereRemoved', removedItems, removedIndexes);
    };

    SetSort.prototype.toArray = function() {
      var _base;
      if (typeof (_base = this.base).registerAsMutableSource === "function") {
        _base.registerAsMutableSource();
      }
      return this._storage.slice();
    };

    SetSort.prototype.forEach = function(iterator, ctx) {
      var e, i, _base, _i, _len, _ref;
      if (typeof (_base = this.base).registerAsMutableSource === "function") {
        _base.registerAsMutableSource();
      }
      _ref = this._storage;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        e = _ref[i];
        iterator.call(ctx, e, i, this);
      }
    };

    SetSort.prototype.find = function(block) {
      var item, _i, _len, _ref;
      this.base.registerAsMutableSource();
      _ref = this._storage;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (block(item)) {
          return item;
        }
      }
    };

    SetSort.prototype.merge = function(other) {
      this.base.registerAsMutableSource();
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Batman.Set, this._storage, function(){}).merge(other).sortedBy(this.key, this.order);
    };

    SetSort.prototype.compare = function(a, b) {
      if (a === b) {
        return 0;
      }
      if (a === void 0) {
        return 1;
      }
      if (b === void 0) {
        return -1;
      }
      if (a === null) {
        return 1;
      }
      if (b === null) {
        return -1;
      }
      if (a === false) {
        return 1;
      }
      if (b === false) {
        return -1;
      }
      if (a === true) {
        return 1;
      }
      if (b === true) {
        return -1;
      }
      if (a !== a) {
        if (b !== b) {
          return 0;
        } else {
          return 1;
        }
      }
      if (b !== b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    };

    SetSort.prototype.compareElements = function(a, b) {
      var multiple, valueA, valueB;
      valueA = this.key && (a != null) ? Batman.get(a, this.key) : a;
      if (typeof valueA === 'function') {
        valueA = valueA.call(a);
      }
      if (valueA != null) {
        valueA = valueA.valueOf();
      }
      valueB = this.key && (b != null) ? Batman.get(b, this.key) : b;
      if (typeof valueB === 'function') {
        valueB = valueB.call(b);
      }
      if (valueB != null) {
        valueB = valueB.valueOf();
      }
      multiple = this.descending ? -1 : 1;
      return this.compare(valueA, valueB) * multiple;
    };

    SetSort.prototype._reIndex = function() {
      var newOrder, _ref;
      newOrder = this.base.toArray().sort(this.compareElements);
      if ((_ref = this._setObserver) != null) {
        _ref.startObservingItems(newOrder);
      }
      return this.set('_storage', newOrder);
    };

    SetSort.prototype._indexOfItem = function(target) {
      var index, match, _ref;
      _ref = this.constructor._binarySearch(this._storage, target, this.compareElements), match = _ref.match, index = _ref.index;
      if (match) {
        return index;
      } else {
        return -1;
      }
    };

    SetSort._binarySearch = function(arr, target, compare) {
      var direction, end, i, index, matched, result, start;
      start = 0;
      end = arr.length - 1;
      result = {};
      while (end >= start) {
        index = ((end - start) >> 1) + start;
        direction = compare(target, arr[index]);
        if (direction > 0) {
          start = index + 1;
        } else if (direction < 0) {
          end = index - 1;
        } else {
          matched = false;
          i = index;
          while (i >= 0 && compare(target, arr[i]) === 0) {
            if (target === arr[i]) {
              index = i;
              matched = true;
              break;
            }
            i--;
          }
          if (!matched) {
            i = index + 1;
            while (i < arr.length && compare(target, arr[i]) === 0) {
              if (target === arr[i]) {
                index = i;
                matched = true;
                break;
              }
              i++;
            }
          }
          return {
            match: matched,
            index: index
          };
        }
      }
      return {
        match: false,
        index: start
      };
    };

    return SetSort;

  })(Batman.SetProxy);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.AssociationSet = (function(_super) {
    __extends(AssociationSet, _super);

    function AssociationSet(foreignKeyValue, association) {
      var base;
      this.foreignKeyValue = foreignKeyValue;
      this.association = association;
      base = new Batman.Set;
      AssociationSet.__super__.constructor.call(this, base, '_batmanID');
    }

    AssociationSet.prototype.loaded = false;

    AssociationSet.accessor('loaded', Batman.Property.defaultAccessor);

    AssociationSet.prototype.load = function(options, callback) {
      var loadOptions,
        _this = this;
      loadOptions = this._getLoadOptions();
      if (!callback) {
        callback = options;
      } else {
        loadOptions.data = Batman.extend(loadOptions.data, options);
      }
      if (this.foreignKeyValue == null) {
        return callback(void 0, this);
      }
      return this.association.getRelatedModel().loadWithOptions(loadOptions, function(err, records, env) {
        if (!err) {
          _this.markAsLoaded();
        }
        return callback(err, _this, env);
      });
    };

    AssociationSet.prototype._getLoadOptions = function() {
      var loadOptions;
      loadOptions = {
        data: {}
      };
      loadOptions.data[this.association.foreignKey] = this.foreignKeyValue;
      if (this.association.options.url) {
        loadOptions.collectionUrl = this.association.options.url;
        loadOptions.urlContext = this.association.parentSetIndex().get(this.foreignKeyValue);
      }
      return loadOptions;
    };

    AssociationSet.prototype.markAsLoaded = function() {
      this.set('loaded', true);
      return this.fire('loaded');
    };

    AssociationSet.accessor('parentRecord', function() {
      var parentClass, parentPrimaryKey, parentPrimaryKeyValue, query;
      parentClass = this.get('association.model');
      parentPrimaryKey = parentClass.get('primaryKey');
      parentPrimaryKeyValue = this.get('foreignKeyValue');
      query = {};
      query[parentPrimaryKey] = parentPrimaryKeyValue;
      return parentClass.createFromJSON(query);
    });

    AssociationSet.prototype.build = function(attrs) {
      var associatedClass, initParams, mixedAttrs, newObj, options, scope;
      if (attrs == null) {
        attrs = {};
      }
      initParams = {};
      initParams[this.get('association.foreignKey')] = this.get('foreignKeyValue');
      options = this.get('association.options');
      if (options.inverseOf != null) {
        initParams[options.inverseOf] = this.get('parentRecord');
      }
      scope = options.namespace || Batman.currentApp;
      associatedClass = scope[options.name];
      mixedAttrs = Batman.extend(attrs, initParams);
      newObj = new associatedClass(mixedAttrs);
      this.add(newObj);
      return newObj;
    };

    return AssociationSet;

  })(Batman.SetSort);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PolymorphicAssociationSet = (function(_super) {
    __extends(PolymorphicAssociationSet, _super);

    function PolymorphicAssociationSet(foreignKeyValue, foreignTypeKeyValue, association) {
      this.foreignKeyValue = foreignKeyValue;
      this.foreignTypeKeyValue = foreignTypeKeyValue;
      this.association = association;
      PolymorphicAssociationSet.__super__.constructor.call(this, this.foreignKeyValue, this.association);
    }

    PolymorphicAssociationSet.prototype._getLoadOptions = function() {
      var loadOptions;
      loadOptions = {
        data: {}
      };
      loadOptions.data[this.association.foreignKey] = this.foreignKeyValue;
      loadOptions.data[this.association.foreignTypeKey] = this.foreignTypeKeyValue;
      if (this.association.options.url) {
        loadOptions.collectionUrl = this.association.options.url;
        loadOptions.urlContext = this.association.parentSetIndex().get(this.foreignKeyValue);
      }
      return loadOptions;
    };

    return PolymorphicAssociationSet;

  })(Batman.AssociationSet);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.SetIndex = (function(_super) {
    __extends(SetIndex, _super);

    SetIndex.accessor('toArray', function() {
      return this.toArray();
    });

    Batman.extend(SetIndex.prototype, Batman.Enumerable);

    SetIndex.prototype.propertyClass = Batman.Property;

    function SetIndex(base, key) {
      var _this = this;
      this.base = base;
      this.key = key;
      SetIndex.__super__.constructor.call(this);
      this._storage = new Batman.Hash;
      if (this.base.isEventEmitter) {
        this._setObserver = new Batman.SetObserver(this.base);
        this._setObserver.observedItemKeys = [this.key];
        this._setObserver.observerForItemAndKey = this.observerForItemAndKey.bind(this);
        this._setObserver.on('itemsWereAdded', function(items) {
          return _this._addItems(items);
        });
        this._setObserver.on('itemsWereRemoved', function(items) {
          return _this._removeItems(items);
        });
      }
      this._addItems(this.base._storage);
      this.startObserving();
    }

    SetIndex.accessor(function(key) {
      return this._resultSetForKey(key);
    });

    SetIndex.prototype.startObserving = function() {
      var _ref;
      return (_ref = this._setObserver) != null ? _ref.startObserving() : void 0;
    };

    SetIndex.prototype.stopObserving = function() {
      var _ref;
      return (_ref = this._setObserver) != null ? _ref.stopObserving() : void 0;
    };

    SetIndex.prototype.observerForItemAndKey = function(item, key) {
      var _this = this;
      return function(newKey, oldKey) {
        _this._removeItemsFromKey(oldKey, [item]);
        return _this._addItemsToKey(newKey, [item]);
      };
    };

    SetIndex.prototype.forEach = function(iterator, ctx) {
      var _this = this;
      return this._storage.forEach(function(key, set) {
        if (set.get('length') > 0) {
          return iterator.call(ctx, key, set, _this);
        }
      });
    };

    SetIndex.prototype.toArray = function() {
      var results;
      results = [];
      this._storage.forEach(function(key, set) {
        if (set.get('length') > 0) {
          return results.push(key);
        }
      });
      return results;
    };

    SetIndex.prototype._addItems = function(items) {
      var index, item, itemsForKey, key, lastKey, _i, _len;
      if (!(items != null ? items.length : void 0)) {
        return;
      }
      lastKey = this._keyForItem(items[0]);
      itemsForKey = [];
      for (index = _i = 0, _len = items.length; _i < _len; index = ++_i) {
        item = items[index];
        if (Batman.SimpleHash.prototype.equality(lastKey, (key = this._keyForItem(item)))) {
          itemsForKey.push(item);
        } else {
          this._addItemsToKey(lastKey, itemsForKey);
          itemsForKey = [item];
          lastKey = key;
        }
      }
      if (itemsForKey.length) {
        return this._addItemsToKey(lastKey, itemsForKey);
      }
    };

    SetIndex.prototype._removeItems = function(items) {
      var index, item, itemsForKey, key, lastKey, _i, _len;
      if (!(items != null ? items.length : void 0)) {
        return;
      }
      lastKey = this._keyForItem(items[0]);
      itemsForKey = [];
      for (index = _i = 0, _len = items.length; _i < _len; index = ++_i) {
        item = items[index];
        if (Batman.SimpleHash.prototype.equality(lastKey, (key = this._keyForItem(item)))) {
          itemsForKey.push(item);
        } else {
          this._removeItemsFromKey(lastKey, itemsForKey);
          itemsForKey = [item];
          lastKey = key;
        }
      }
      if (itemsForKey.length) {
        return this._removeItemsFromKey(lastKey, itemsForKey);
      }
    };

    SetIndex.prototype._addItemsToKey = function(key, items) {
      var resultSet;
      resultSet = this._resultSetForKey(key);
      resultSet.add.apply(resultSet, items);
      return resultSet;
    };

    SetIndex.prototype._removeItemsFromKey = function(key, items) {
      var resultSet;
      resultSet = this._resultSetForKey(key);
      resultSet.remove.apply(resultSet, items);
      return resultSet;
    };

    SetIndex.prototype._resultSetForKey = function(key) {
      return this._storage.getOrSet(key, function() {
        return new Batman.Set;
      });
    };

    SetIndex.prototype._keyForItem = function(item) {
      return Batman.Keypath.forBaseAndKey(item, this.key).getValue();
    };

    return SetIndex;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PolymorphicAssociationSetIndex = (function(_super) {
    __extends(PolymorphicAssociationSetIndex, _super);

    function PolymorphicAssociationSetIndex(association, type, key) {
      this.association = association;
      this.type = type;
      PolymorphicAssociationSetIndex.__super__.constructor.call(this, this.association.getRelatedModel().get('loaded'), key);
    }

    PolymorphicAssociationSetIndex.prototype._resultSetForKey = function(key) {
      return this.association.setForKey(key);
    };

    PolymorphicAssociationSetIndex.prototype._addItemsToKey = function(key, items) {
      var filteredItems, item;
      filteredItems = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          if (this.association.modelType() === item.get(this.association.foreignTypeKey)) {
            _results.push(item);
          }
        }
        return _results;
      }).call(this);
      return PolymorphicAssociationSetIndex.__super__._addItemsToKey.call(this, key, filteredItems);
    };

    PolymorphicAssociationSetIndex.prototype._removeItemsFromKey = function(key, items) {
      var filteredItems, item;
      filteredItems = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          if (this.association.modelType() === item.get(this.association.foreignTypeKey)) {
            _results.push(item);
          }
        }
        return _results;
      }).call(this);
      return PolymorphicAssociationSetIndex.__super__._removeItemsFromKey.call(this, key, filteredItems);
    };

    return PolymorphicAssociationSetIndex;

  })(Batman.SetIndex);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.AssociationSetIndex = (function(_super) {
    __extends(AssociationSetIndex, _super);

    function AssociationSetIndex(association, key) {
      this.association = association;
      AssociationSetIndex.__super__.constructor.call(this, this.association.getRelatedModel().get('loaded'), key);
    }

    AssociationSetIndex.prototype._resultSetForKey = function(key) {
      return this.association.setForKey(key);
    };

    AssociationSetIndex.prototype.forEach = function(iterator, ctx) {
      var _this = this;
      return this.association.proxies.forEach(function(record, set) {
        var key;
        key = _this.association.indexValueForRecord(record);
        if (set.get('length') > 0) {
          return iterator.call(ctx, key, set, _this);
        }
      });
    };

    AssociationSetIndex.prototype.toArray = function() {
      var results;
      results = [];
      this.forEach(function(key) {
        return results.push(key);
      });
      return results;
    };

    return AssociationSetIndex;

  })(Batman.SetIndex);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.UniqueSetIndex = (function(_super) {
    __extends(UniqueSetIndex, _super);

    function UniqueSetIndex() {
      this._uniqueIndex = new Batman.Hash;
      UniqueSetIndex.__super__.constructor.apply(this, arguments);
    }

    UniqueSetIndex.accessor(function(key) {
      return this._uniqueIndex.get(key);
    });

    UniqueSetIndex.prototype._addItemsToKey = function(key, items) {
      UniqueSetIndex.__super__._addItemsToKey.apply(this, arguments);
      if (!this._uniqueIndex.hasKey(key)) {
        return this._uniqueIndex.set(key, items[0]);
      }
    };

    UniqueSetIndex.prototype._removeItemsFromKey = function(key, items) {
      var resultSet;
      resultSet = UniqueSetIndex.__super__._removeItemsFromKey.apply(this, arguments);
      if (resultSet.isEmpty()) {
        return this._uniqueIndex.unset(key);
      } else {
        return this._uniqueIndex.set(key, resultSet._storage[0]);
      }
    };

    return UniqueSetIndex;

  })(Batman.SetIndex);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.UniqueAssociationSetIndex = (function(_super) {
    __extends(UniqueAssociationSetIndex, _super);

    function UniqueAssociationSetIndex(association, key) {
      this.association = association;
      UniqueAssociationSetIndex.__super__.constructor.call(this, this.association.getRelatedModel().get('loaded'), key);
    }

    return UniqueAssociationSetIndex;

  })(Batman.UniqueSetIndex);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PolymorphicUniqueAssociationSetIndex = (function(_super) {
    __extends(PolymorphicUniqueAssociationSetIndex, _super);

    function PolymorphicUniqueAssociationSetIndex(association, type, key) {
      this.association = association;
      this.type = type;
      PolymorphicUniqueAssociationSetIndex.__super__.constructor.call(this, this.association.getRelatedModelForType(type).get('loaded'), key);
    }

    return PolymorphicUniqueAssociationSetIndex;

  })(Batman.UniqueSetIndex);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  Batman.Navigator = (function() {
    Navigator.forApp = function(app) {
      return new (this.defaultClass())(app);
    };

    Navigator.defaultClass = function() {
      if (Batman.config.usePushState && Batman.PushStateNavigator.isSupported()) {
        return Batman.PushStateNavigator;
      } else {
        return Batman.HashbangNavigator;
      }
    };

    function Navigator(app) {
      this.app = app;
      this.handleCurrentLocation = __bind(this.handleCurrentLocation, this);
    }

    Navigator.prototype.start = function() {
      var _this = this;
      if (typeof window === 'undefined') {
        return;
      }
      if (this.started) {
        return;
      }
      this.started = true;
      this.startWatching();
      Batman.currentApp.prevent('ready');
      return Batman.setImmediate(function() {
        if (_this.started && Batman.currentApp) {
          _this.checkInitialHash();
          _this.handleCurrentLocation();
          return Batman.currentApp.allowAndFire('ready');
        }
      });
    };

    Navigator.prototype.stop = function() {
      this.stopWatching();
      return this.started = false;
    };

    Navigator.prototype.checkInitialHash = function(location) {
      var hash, index, prefix;
      if (location == null) {
        location = window.location;
      }
      prefix = Batman.HashbangNavigator.prototype.hashPrefix;
      hash = location.hash;
      if (hash.length > prefix.length && hash.substr(0, prefix.length) !== prefix) {
        return this.initialHash = hash.substr(prefix.length - 1);
      } else if ((index = hash.indexOf("##BATMAN##")) !== -1) {
        this.initialHash = hash.substr(index + 10);
        return this.replaceState(null, '', hash.substr(prefix.length, index - prefix.length), location);
      }
    };

    Navigator.prototype.handleCurrentLocation = function() {
      return this.handleLocation(window.location);
    };

    Navigator.prototype.handleLocation = function(location) {
      var path;
      path = this.pathFromLocation(location);
      if (path === this.cachedPath) {
        return;
      }
      return this.dispatch(path);
    };

    Navigator.prototype.dispatch = function(params) {
      var dispatcher, paramsMixin;
      dispatcher = this.app.get('dispatcher');
      this.cachedPath = this.initialHash ? (paramsMixin = {
        initialHash: this.initialHash
      }, delete this.initialHash, dispatcher.dispatch(params, paramsMixin)) : dispatcher.dispatch(params);
      return this.cachedPath;
    };

    Navigator.prototype.redirect = function(params, replaceState) {
      var path, pathFromParams, _base;
      if (replaceState == null) {
        replaceState = false;
      }
      pathFromParams = typeof (_base = this.app.get('dispatcher')).pathFromParams === "function" ? _base.pathFromParams(params) : void 0;
      if (pathFromParams) {
        this._lastRedirect = pathFromParams;
      }
      path = this.dispatch(params);
      if (this._lastRedirect) {
        this.cachedPath = this._lastRedirect;
      }
      if (!this._lastRedirect || this._lastRedirect === path) {
        this[replaceState ? 'replaceState' : 'pushState'](null, '', path);
      }
      return path;
    };

    Navigator.prototype.push = function(params) {
      Batman.developer.deprecated("Navigator::push", "Please use Batman.redirect({}) instead.");
      return this.redirect(params);
    };

    Navigator.prototype.replace = function(params) {
      Batman.developer.deprecated("Navigator::replace", "Please use Batman.redirect({}, true) instead.");
      return this.redirect(params, true);
    };

    Navigator.prototype.normalizePath = function() {
      var i, seg, segments;
      segments = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      segments = (function() {
        var _i, _len, _results;
        _results = [];
        for (i = _i = 0, _len = segments.length; _i < _len; i = ++_i) {
          seg = segments[i];
          _results.push(("" + seg).replace(/^(?!\/)/, '/').replace(/\/+$/, ''));
        }
        return _results;
      })();
      return segments.join('') || '/';
    };

    Navigator.normalizePath = Navigator.prototype.normalizePath;

    return Navigator;

  })();

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PushStateNavigator = (function(_super) {
    __extends(PushStateNavigator, _super);

    function PushStateNavigator() {
      _ref = PushStateNavigator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PushStateNavigator.isSupported = function() {
      var _ref1;
      return (typeof window !== "undefined" && window !== null ? (_ref1 = window.history) != null ? _ref1.pushState : void 0 : void 0) != null;
    };

    PushStateNavigator.prototype.startWatching = function() {
      return Batman.DOM.addEventListener(window, 'popstate', this.handleCurrentLocation);
    };

    PushStateNavigator.prototype.stopWatching = function() {
      return Batman.DOM.removeEventListener(window, 'popstate', this.handleCurrentLocation);
    };

    PushStateNavigator.prototype.pushState = function(stateObject, title, path) {
      if (path !== this.pathFromLocation(window.location)) {
        return window.history.pushState(stateObject, title, this.linkTo(path));
      }
    };

    PushStateNavigator.prototype.replaceState = function(stateObject, title, path) {
      if (path !== this.pathFromLocation(window.location)) {
        return window.history.replaceState(stateObject, title, this.linkTo(path));
      }
    };

    PushStateNavigator.prototype.linkTo = function(url) {
      return this.normalizePath(Batman.config.pathToApp, url);
    };

    PushStateNavigator.prototype.pathFromLocation = function(location) {
      var fullPath, prefixPattern;
      fullPath = "" + (location.pathname || '') + (location.search || '');
      prefixPattern = new RegExp("^" + (this.normalizePath(Batman.config.pathToApp)));
      return this.normalizePath(fullPath.replace(prefixPattern, ''));
    };

    PushStateNavigator.prototype.handleLocation = function(location) {
      var hashbangPath, pushStatePath;
      pushStatePath = this.pathFromLocation(location);
      hashbangPath = Batman.HashbangNavigator.prototype.pathFromLocation(location);
      if (pushStatePath === '/' && hashbangPath !== '/') {
        return this.redirect(hashbangPath, true);
      } else {
        return PushStateNavigator.__super__.handleLocation.apply(this, arguments);
      }
    };

    return PushStateNavigator;

  })(Batman.Navigator);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.HashbangNavigator = (function(_super) {
    __extends(HashbangNavigator, _super);

    function HashbangNavigator() {
      this.detectHashChange = __bind(this.detectHashChange, this);
      this.handleHashChange = __bind(this.handleHashChange, this);
      _ref = HashbangNavigator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HashbangNavigator.prototype.hashPrefix = '#!';

    if ((typeof window !== "undefined" && window !== null) && 'onhashchange' in window) {
      HashbangNavigator.prototype.startWatching = function() {
        return Batman.DOM.addEventListener(window, 'hashchange', this.handleHashChange);
      };
      HashbangNavigator.prototype.stopWatching = function() {
        return Batman.DOM.removeEventListener(window, 'hashchange', this.handleHashChange);
      };
    } else {
      HashbangNavigator.prototype.startWatching = function() {
        return this.interval = setInterval(this.detectHashChange, 100);
      };
      HashbangNavigator.prototype.stopWatching = function() {
        return this.interval = clearInterval(this.interval);
      };
    }

    HashbangNavigator.prototype.handleHashChange = function() {
      if (this.ignoreHashChange) {
        return this.ignoreHashChange = false;
      }
      return this.handleCurrentLocation();
    };

    HashbangNavigator.prototype.detectHashChange = function() {
      if (this.previousHash === window.location.hash) {
        return;
      }
      this.previousHash = window.location.hash;
      return this.handleHashChange();
    };

    HashbangNavigator.prototype.pushState = function(stateObject, title, path) {
      var link;
      link = this.linkTo(path);
      if (link === window.location.hash) {
        return;
      }
      this.ignoreHashChange = true;
      return window.location.hash = link;
    };

    HashbangNavigator.prototype.replaceState = function(stateObject, title, path, loc) {
      var link;
      if (loc == null) {
        loc = window.location;
      }
      link = this.linkTo(path);
      if (link === loc.hash) {
        return;
      }
      this.ignoreHashChange = true;
      return loc.replace("" + (loc.pathname || '') + (loc.search || '') + (link || ''));
    };

    HashbangNavigator.prototype.linkTo = function(url) {
      return this.hashPrefix + url;
    };

    HashbangNavigator.prototype.pathFromLocation = function(location) {
      var hash, length;
      hash = location.hash;
      length = this.hashPrefix.length;
      if ((hash != null ? hash.substr(0, length) : void 0) === this.hashPrefix) {
        return this.normalizePath(hash.substr(length));
      } else {
        return '/';
      }
    };

    HashbangNavigator.prototype.handleLocation = function(location) {
      var pushStatePath;
      if (!Batman.config.usePushState) {
        return HashbangNavigator.__super__.handleLocation.apply(this, arguments);
      }
      pushStatePath = Batman.PushStateNavigator.prototype.pathFromLocation(location);
      if (pushStatePath !== '/') {
        return location.replace(this.normalizePath("" + Batman.config.pathToApp + (this.linkTo(pushStatePath)) + (this.initialHash ? '##BATMAN##' + this.initialHash : '')));
      } else {
        return HashbangNavigator.__super__.handleLocation.apply(this, arguments);
      }
    };

    return HashbangNavigator;

  })(Batman.Navigator);

}).call(this);

(function() {
  Batman.RouteMap = (function() {
    RouteMap.prototype.memberRoute = null;

    RouteMap.prototype.collectionRoute = null;

    function RouteMap() {
      this.childrenByOrder = [];
      this.childrenByName = {};
    }

    RouteMap.prototype.routeForParams = function(params) {
      var key, route, _i, _len, _ref;
      this._cachedRoutes || (this._cachedRoutes = {});
      key = this.cacheKey(params);
      if (this._cachedRoutes[key]) {
        return this._cachedRoutes[key];
      } else {
        _ref = this.childrenByOrder;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          route = _ref[_i];
          if (route.test(params)) {
            return (this._cachedRoutes[key] = route);
          }
        }
      }
    };

    RouteMap.prototype.addRoute = function(name, route) {
      var base, names,
        _this = this;
      this.childrenByOrder.push(route);
      if (name.length > 0 && (names = name.split('.')).length > 0) {
        base = names.shift();
        if (!this.childrenByName[base]) {
          this.childrenByName[base] = new Batman.RouteMap;
        }
        this.childrenByName[base].addRoute(names.join('.'), route);
      } else {
        if (route.get('member')) {
          Batman.developer["do"](function() {
            if (_this.memberRoute) {
              return Batman.developer.error("Member route with name " + name + " already exists!");
            }
          });
          this.memberRoute = route;
        } else {
          Batman.developer["do"](function() {
            if (_this.collectionRoute) {
              return Batman.developer.error("Collection route with name " + name + " already exists!");
            }
          });
          this.collectionRoute = route;
        }
      }
      return true;
    };

    RouteMap.prototype.cacheKey = function(params) {
      if (typeof params === 'string') {
        return params;
      } else if (params.path != null) {
        return params.path;
      } else {
        return "" + params.controller + "#" + params.action;
      }
    };

    return RouteMap;

  })();

}).call(this);

(function() {
  var __slice = [].slice;

  Batman.RouteMapBuilder = (function() {
    RouteMapBuilder.BUILDER_FUNCTIONS = ['resources', 'member', 'collection', 'route', 'root'];

    RouteMapBuilder.ROUTES = {
      index: {
        cardinality: 'collection',
        path: function(resource) {
          return resource;
        },
        name: function(resource) {
          return resource;
        }
      },
      "new": {
        cardinality: 'collection',
        path: function(resource) {
          return "" + resource + "/new";
        },
        name: function(resource) {
          return "" + resource + ".new";
        }
      },
      show: {
        cardinality: 'member',
        path: function(resource) {
          return "" + resource + "/:id";
        },
        name: function(resource) {
          return resource;
        }
      },
      edit: {
        cardinality: 'member',
        path: function(resource) {
          return "" + resource + "/:id/edit";
        },
        name: function(resource) {
          return "" + resource + ".edit";
        }
      },
      collection: {
        cardinality: 'collection',
        path: function(resource, name) {
          return "" + resource + "/" + name;
        },
        name: function(resource, name) {
          return "" + resource + "." + name;
        }
      },
      member: {
        cardinality: 'member',
        path: function(resource, name) {
          return "" + resource + "/:id/" + name;
        },
        name: function(resource, name) {
          return "" + resource + "." + name;
        }
      }
    };

    function RouteMapBuilder(app, routeMap, parent, baseOptions) {
      this.app = app;
      this.routeMap = routeMap;
      this.parent = parent;
      this.baseOptions = baseOptions != null ? baseOptions : {};
      if (this.parent) {
        this.rootPath = this.parent._nestingPath();
        this.rootName = this.parent._nestingName();
      } else {
        this.rootPath = '';
        this.rootName = '';
      }
    }

    RouteMapBuilder.prototype.resources = function() {
      var action, actions, arg, args, as, callback, childBuilder, controller, included, k, options, path, resourceName, resourceNames, resourceRoot, routeOptions, routeTemplate, v, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      resourceNames = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = args.length; _i < _len; _i++) {
          arg = args[_i];
          if (typeof arg === 'string') {
            _results.push(arg);
          }
        }
        return _results;
      })();
      if (typeof args[args.length - 1] === 'function') {
        callback = args.pop();
      }
      if (typeof args[args.length - 1] === 'object') {
        options = args.pop();
      } else {
        options = {};
      }
      actions = {
        index: true,
        "new": true,
        show: true,
        edit: true
      };
      if (options.except) {
        _ref = options.except;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          k = _ref[_i];
          actions[k] = false;
        }
        delete options.except;
      } else if (options.only) {
        for (k in actions) {
          v = actions[k];
          actions[k] = false;
        }
        _ref1 = options.only;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          k = _ref1[_j];
          actions[k] = true;
        }
        delete options.only;
      }
      for (_k = 0, _len2 = resourceNames.length; _k < _len2; _k++) {
        resourceName = resourceNames[_k];
        resourceRoot = Batman.helpers.pluralize(resourceName);
        controller = Batman.helpers.camelize(resourceRoot, true);
        childBuilder = this._childBuilder({
          controller: controller
        });
        if (callback != null) {
          callback.call(childBuilder);
        }
        for (action in actions) {
          included = actions[action];
          if (!(included)) {
            continue;
          }
          routeTemplate = this.constructor.ROUTES[action];
          as = routeTemplate.name(resourceRoot);
          path = routeTemplate.path(resourceRoot);
          routeOptions = Batman.extend({
            controller: controller,
            action: action,
            path: path,
            as: as
          }, options);
          childBuilder[routeTemplate.cardinality](action, routeOptions);
        }
      }
      return true;
    };

    RouteMapBuilder.prototype.member = function() {
      return this._addRoutesWithCardinality.apply(this, ['member'].concat(__slice.call(arguments)));
    };

    RouteMapBuilder.prototype.collection = function() {
      return this._addRoutesWithCardinality.apply(this, ['collection'].concat(__slice.call(arguments)));
    };

    RouteMapBuilder.prototype.root = function(signature, options) {
      if (options == null) {
        options = {};
      }
      return this.route('/', signature, options);
    };

    RouteMapBuilder.prototype.route = function(path, signature, options, callback) {
      if (!callback) {
        if (typeof options === 'function') {
          callback = options;
          options = void 0;
        } else if (typeof signature === 'function') {
          callback = signature;
          signature = void 0;
        }
      }
      if (!options) {
        if (typeof signature === 'string') {
          options = {
            signature: signature
          };
        } else {
          options = signature;
        }
        options || (options = {});
      } else {
        if (signature) {
          options.signature = signature;
        }
      }
      if (callback) {
        options.callback = callback;
      }
      options.as || (options.as = this._nameFromPath(path));
      options.path = path;
      return this._addRoute(options);
    };

    RouteMapBuilder.prototype._addRoutesWithCardinality = function() {
      var cardinality, name, names, options, resourceRoot, routeOptions, routeTemplate, _i, _j, _len;
      cardinality = arguments[0], names = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), options = arguments[_i++];
      if (typeof options === 'string') {
        names.push(options);
        options = {};
      }
      options = Batman.extend({}, this.baseOptions, options);
      options[cardinality] = true;
      routeTemplate = this.constructor.ROUTES[cardinality];
      resourceRoot = Batman.helpers.underscore(options.controller);
      for (_j = 0, _len = names.length; _j < _len; _j++) {
        name = names[_j];
        routeOptions = Batman.extend({
          action: name
        }, options);
        if (routeOptions.path == null) {
          routeOptions.path = routeTemplate.path(resourceRoot, name);
        }
        if (routeOptions.as == null) {
          routeOptions.as = routeTemplate.name(resourceRoot, name);
        }
        this._addRoute(routeOptions);
      }
      return true;
    };

    RouteMapBuilder.prototype._addRoute = function(options) {
      var klass, name, path, route;
      if (options == null) {
        options = {};
      }
      path = this.rootPath + options.path;
      name = this.rootName + Batman.helpers.camelize(options.as, true);
      delete options.as;
      delete options.path;
      klass = options.callback ? Batman.CallbackActionRoute : Batman.ControllerActionRoute;
      options.app = this.app;
      route = new klass(path, options);
      this.routeMap.addRoute(name, route);
      if (name === '') {
        return this.routeMap.addRoute('root', route);
      }
    };

    RouteMapBuilder.prototype._nameFromPath = function(path) {
      path = path.replace(Batman.Route.regexps.namedOrSplat, '').replace(/\/+/g, '.').replace(/(^\.)|(\.$)/g, '');
      return path;
    };

    RouteMapBuilder.prototype._nestingPath = function() {
      var nestingParam, nestingSegment;
      if (!this.parent) {
        return "";
      } else {
        nestingParam = ":" + Batman.helpers.singularize(this.baseOptions.controller) + "Id";
        nestingSegment = Batman.helpers.underscore(this.baseOptions.controller);
        return "" + (this.parent._nestingPath()) + nestingSegment + "/" + nestingParam + "/";
      }
    };

    RouteMapBuilder.prototype._nestingName = function() {
      if (!this.parent) {
        return "";
      } else {
        return this.parent._nestingName() + this.baseOptions.controller + ".";
      }
    };

    RouteMapBuilder.prototype._childBuilder = function(baseOptions) {
      if (baseOptions == null) {
        baseOptions = {};
      }
      return new Batman.RouteMapBuilder(this.app, this.routeMap, this, baseOptions);
    };

    return RouteMapBuilder;

  })();

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.App = (function(_super) {
    var name, _fn, _i, _len, _ref1,
      _this = this;

    __extends(App, _super);

    function App() {
      _ref = App.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    App.classAccessor('currentParams', {
      get: function() {
        return new Batman.Hash;
      },
      'final': true
    });

    App.classAccessor('paramsManager', {
      get: function() {
        var nav, params;
        if (!(nav = this.get('navigator'))) {
          return;
        }
        params = this.get('currentParams');
        return params.replacer = new Batman.ParamsReplacer(nav, params);
      },
      'final': true
    });

    App.classAccessor('paramsPusher', {
      get: function() {
        var nav, params;
        if (!(nav = this.get('navigator'))) {
          return;
        }
        params = this.get('currentParams');
        return params.pusher = new Batman.ParamsPusher(nav, params);
      },
      'final': true
    });

    App.classAccessor('routes', function() {
      return new Batman.NamedRouteQuery(this.get('routeMap'));
    });

    App.classAccessor('routeMap', function() {
      return new Batman.RouteMap;
    });

    App.classAccessor('routeMapBuilder', function() {
      return new Batman.RouteMapBuilder(this, this.get('routeMap'));
    });

    App.classAccessor('dispatcher', function() {
      return new Batman.Dispatcher(this, this.get('routeMap'));
    });

    App.classAccessor('controllers', function() {
      return this.get('dispatcher.controllers');
    });

    App.layout = void 0;

    App.shouldAllowEvent = {};

    _ref1 = Batman.RouteMapBuilder.BUILDER_FUNCTIONS;
    _fn = function(name) {
      return App[name] = function() {
        var _ref2;
        return (_ref2 = this.get('routeMapBuilder'))[name].apply(_ref2, arguments);
      };
    };
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      name = _ref1[_i];
      _fn(name);
    }

    App.event('ready').oneShot = true;

    App.event('run').oneShot = true;

    App.run = function() {
      var LayoutView, layout, layoutClass, _ref2,
        _this = this;
      if (Batman.currentApp) {
        if (Batman.currentApp === this) {
          return;
        }
        Batman.currentApp.stop();
      }
      if (this.hasRun) {
        return false;
      }
      if (this.isPrevented('run')) {
        this.wantsToRun = true;
        return false;
      } else {
        delete this.wantsToRun;
      }
      Batman.currentApp = this;
      Batman.App.set('current', this);
      if (this.get('dispatcher') == null) {
        this.set('dispatcher', new Batman.Dispatcher(this, this.get('routeMap')));
        this.set('controllers', this.get('dispatcher.controllers'));
      }
      if (this.get('navigator') == null) {
        this.set('navigator', Batman.Navigator.forApp(this));
        Batman.navigator = this.get('navigator');
        this.on('run', function() {
          if (Object.keys(_this.get('dispatcher').routeMap).length > 0) {
            return Batman.navigator.start();
          }
        });
      }
      this.observe('layout', function(layout) {
        return layout != null ? layout.on('ready', function() {
          return _this.fire('ready');
        }) : void 0;
      });
      layout = this.get('layout');
      if (layout) {
        if (typeof layout === 'string') {
          layoutClass = this[Batman.helpers.camelize(layout) + 'View'];
        }
      } else {
        if (layout !== null) {
          layoutClass = (LayoutView = (function(_super1) {
            __extends(LayoutView, _super1);

            function LayoutView() {
              _ref2 = LayoutView.__super__.constructor.apply(this, arguments);
              return _ref2;
            }

            return LayoutView;

          })(Batman.View));
        }
      }
      if (layoutClass) {
        layout = this.set('layout', new layoutClass({
          node: document.documentElement
        }));
        layout.propagateToSubviews('viewWillAppear');
        layout.initializeBindings();
        layout.propagateToSubviews('isInDOM', true);
        layout.propagateToSubviews('viewDidAppear');
      }
      if (Batman.config.translations) {
        this.set('t', Batman.I18N.get('translations'));
      }
      this.hasRun = true;
      this.fire('run');
      return this;
    };

    App.event('ready').oneShot = true;

    App.event('stop').oneShot = true;

    App.stop = function() {
      var _ref2;
      if ((_ref2 = this.navigator) != null) {
        _ref2.stop();
      }
      Batman.navigator = null;
      this.hasRun = false;
      this.fire('stop');
      return this;
    };

    return App;

  }).call(this, Batman.Object);

}).call(this);

(function() {
  Batman.Association = (function() {
    Association.prototype.associationType = '';

    Association.prototype.isPolymorphic = false;

    Association.prototype.defaultOptions = {
      saveInline: false,
      autoload: true,
      nestUrl: false,
      includeInTransaction: true
    };

    function Association(model, label, options) {
      var association, defaultOptions, encoder, encoderKey, getAccessor;
      this.model = model;
      this.label = label;
      if (options == null) {
        options = {};
      }
      defaultOptions = {
        namespace: Batman.currentApp,
        name: Batman.helpers.camelize(Batman.helpers.singularize(this.label))
      };
      this.options = Batman.extend(defaultOptions, this.defaultOptions, options);
      if (this.options.nestUrl) {
        if (this.model.urlNestsUnder == null) {
          Batman.developer.error("You must persist the the model " + this.model.constructor.name + " to use the url helpers on an association");
        }
        this.model.urlNestsUnder(Batman.helpers.underscore(this.getRelatedModel().get('resourceName')));
      }
      if (this.options.extend != null) {
        Batman.extend(this, this.options.extend);
      }
      encoder = {
        encode: this.options.saveInline ? this.encoder() : false,
        decode: this.decoder()
      };
      encoderKey = options.encoderKey || this.label;
      this.model.encode(encoderKey, encoder);
      association = this;
      getAccessor = function() {
        return association.getAccessor.call(this, association, this.model, this.label);
      };
      this.model.accessor(this.label, {
        get: getAccessor,
        set: model.defaultAccessor.set,
        unset: model.defaultAccessor.unset
      });
    }

    Association.prototype.getRelatedModel = function() {
      var className, relatedModel, scope;
      scope = this.options.namespace || Batman.currentApp;
      className = this.options.name;
      relatedModel = scope != null ? scope[className] : void 0;
      Batman.developer["do"](function() {
        if ((Batman.currentApp != null) && !relatedModel) {
          return Batman.developer.warn("Related model " + className + " hasn't loaded yet.");
        }
      });
      return relatedModel;
    };

    Association.prototype.getFromAttributes = function(record) {
      return record.get("attributes." + this.label);
    };

    Association.prototype.setIntoAttributes = function(record, value) {
      return record.get('attributes').set(this.label, value);
    };

    Association.prototype.inverse = function() {
      var inverse, relatedAssocs,
        _this = this;
      if (relatedAssocs = this.getRelatedModel()._batman.get('associations')) {
        if (this.options.inverseOf) {
          return relatedAssocs.getByLabel(this.options.inverseOf);
        }
        inverse = null;
        relatedAssocs.forEach(function(label, assoc) {
          if (assoc.getRelatedModel() === _this.model) {
            return inverse = assoc;
          }
        });
        return inverse;
      }
    };

    Association.prototype.reset = function() {
      delete this.index;
      return true;
    };

    return Association;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PluralAssociation = (function(_super) {
    __extends(PluralAssociation, _super);

    PluralAssociation.prototype.proxyClass = Batman.AssociationSet;

    PluralAssociation.prototype.isSingular = false;

    function PluralAssociation() {
      PluralAssociation.__super__.constructor.apply(this, arguments);
      this._resetSetHashes();
    }

    PluralAssociation.prototype.setForRecord = function(record) {
      var childModelSetIndex, indexValue,
        _this = this;
      indexValue = this.indexValueForRecord(record);
      childModelSetIndex = this.setIndex();
      Batman.Property.withoutTracking(function() {
        return _this._setsByRecord.getOrSet(record, function() {
          var existingValueSet, newSet;
          if (indexValue != null) {
            existingValueSet = _this._setsByValue.get(indexValue);
            if (existingValueSet != null) {
              return existingValueSet;
            }
          }
          newSet = _this.proxyClassInstanceForKey(indexValue);
          if (indexValue != null) {
            _this._setsByValue.set(indexValue, newSet);
          }
          return newSet;
        });
      });
      if (indexValue != null) {
        return childModelSetIndex.get(indexValue);
      } else {
        return this._setsByRecord.get(record);
      }
    };

    PluralAssociation.prototype.setForKey = Batman.Property.wrapTrackingPrevention(function(indexValue) {
      var foundSet,
        _this = this;
      foundSet = void 0;
      this._setsByRecord.forEach(function(record, set) {
        if (foundSet != null) {
          return;
        }
        if (_this.indexValueForRecord(record) === indexValue) {
          return foundSet = set;
        }
      });
      if (foundSet != null) {
        foundSet.foreignKeyValue = indexValue;
        return foundSet;
      }
      return this._setsByValue.getOrSet(indexValue, function() {
        return _this.proxyClassInstanceForKey(indexValue);
      });
    });

    PluralAssociation.prototype.proxyClassInstanceForKey = function(indexValue) {
      return new this.proxyClass(indexValue, this);
    };

    PluralAssociation.prototype.getAccessor = function(self, model, label) {
      var relatedRecords, setInAttributes,
        _this = this;
      if (!self.getRelatedModel()) {
        return;
      }
      if (setInAttributes = self.getFromAttributes(this)) {
        return setInAttributes;
      } else {
        relatedRecords = self.setForRecord(this);
        self.setIntoAttributes(this, relatedRecords);
        Batman.Property.withoutTracking(function() {
          if (self.options.autoload && !_this.isNew() && !relatedRecords.loaded) {
            return relatedRecords.load(function(error, records) {
              if (error) {
                throw error;
              }
            });
          }
        });
        return relatedRecords;
      }
    };

    PluralAssociation.prototype.parentSetIndex = function() {
      this.parentIndex || (this.parentIndex = this.model.get('loaded').indexedByUnique(this.primaryKey));
      return this.parentIndex;
    };

    PluralAssociation.prototype.setIndex = function() {
      this.index || (this.index = new Batman.AssociationSetIndex(this, this[this.indexRelatedModelOn]));
      return this.index;
    };

    PluralAssociation.prototype.indexValueForRecord = function(record) {
      return record.get(this.primaryKey);
    };

    PluralAssociation.prototype.reset = function() {
      PluralAssociation.__super__.reset.apply(this, arguments);
      return this._resetSetHashes();
    };

    PluralAssociation.prototype._resetSetHashes = function() {
      this._setsByRecord = new Batman.SimpleHash;
      return this._setsByValue = new Batman.SimpleHash;
    };

    return PluralAssociation;

  })(Batman.Association);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.HasManyAssociation = (function(_super) {
    __extends(HasManyAssociation, _super);

    HasManyAssociation.prototype.associationType = 'hasMany';

    HasManyAssociation.prototype.indexRelatedModelOn = 'foreignKey';

    function HasManyAssociation(model, label, options) {
      if (options != null ? options.as : void 0) {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(Batman.PolymorphicHasManyAssociation, arguments, function(){});
      }
      HasManyAssociation.__super__.constructor.apply(this, arguments);
      this.primaryKey = this.options.primaryKey || "id";
      this.foreignKey = this.options.foreignKey || ("" + (Batman.helpers.underscore(model.get('resourceName'))) + "_id");
    }

    HasManyAssociation.prototype.apply = function(baseSaveError, base) {
      var relations, set,
        _this = this;
      if (!baseSaveError) {
        if (relations = this.getFromAttributes(base)) {
          relations.forEach(function(model) {
            return model.set(_this.foreignKey, base.get(_this.primaryKey));
          });
        }
        base.set(this.label, set = this.setForRecord(base));
        if (base.lifecycle.get('state') === 'creating') {
          return set.markAsLoaded();
        }
      }
    };

    HasManyAssociation.prototype.encoder = function() {
      var association;
      association = this;
      return function(relationSet, _, __, record) {
        var jsonArray;
        if (relationSet != null) {
          jsonArray = [];
          relationSet.forEach(function(relation) {
            var relationJSON;
            relationJSON = relation.toJSON();
            if (!association.inverse() || association.inverse().options.encodeForeignKey) {
              relationJSON[association.foreignKey] = record.get(association.primaryKey);
            }
            return jsonArray.push(relationJSON);
          });
        }
        return jsonArray;
      };
    };

    HasManyAssociation.prototype.decoder = function() {
      var association;
      association = this;
      return function(data, key, _, __, parentRecord) {
        var children, id, jsonObject, newChildren, record, recordsToAdd, recordsToMap, relatedModel, _i, _len, _ref;
        if (!(relatedModel = association.getRelatedModel())) {
          Batman.developer.error("Can't decode model " + association.options.name + " because it hasn't been loaded yet!");
          return;
        }
        children = association.setForRecord(parentRecord);
        newChildren = children.filter(function(relation) {
          return relation.isNew();
        }).toArray();
        recordsToMap = [];
        recordsToAdd = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          jsonObject = data[_i];
          id = jsonObject[relatedModel.primaryKey];
          record = relatedModel._loadIdentity(id);
          if (record != null) {
            recordsToAdd.push(record);
          } else {
            if (newChildren.length > 0) {
              record = newChildren.shift();
              if (id != null) {
                recordsToMap.push(record);
              }
            } else {
              record = new relatedModel;
              if (id != null) {
                recordsToMap.push(record);
              }
              recordsToAdd.push(record);
            }
          }
          record._withoutDirtyTracking(function() {
            this.fromJSON(jsonObject);
            if (association.options.inverseOf) {
              return record.set(association.options.inverseOf, parentRecord);
            }
          });
        }
        (_ref = relatedModel.get('loaded')).add.apply(_ref, recordsToMap);
        children.add.apply(children, recordsToAdd);
        children.markAsLoaded();
        return children;
      };
    };

    return HasManyAssociation;

  })(Batman.PluralAssociation);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PolymorphicHasManyAssociation = (function(_super) {
    __extends(PolymorphicHasManyAssociation, _super);

    PolymorphicHasManyAssociation.prototype.proxyClass = Batman.PolymorphicAssociationSet;

    PolymorphicHasManyAssociation.prototype.isPolymorphic = true;

    function PolymorphicHasManyAssociation(model, label, options) {
      options.inverseOf = this.foreignLabel = options.as;
      delete options.as;
      options.foreignKey || (options.foreignKey = "" + this.foreignLabel + "_id");
      PolymorphicHasManyAssociation.__super__.constructor.call(this, model, label, options);
      this.foreignTypeKey = options.foreignTypeKey || ("" + this.foreignLabel + "_type");
      this.model.encode(this.foreignTypeKey);
    }

    PolymorphicHasManyAssociation.prototype.apply = function(baseSaveError, base) {
      var relations,
        _this = this;
      if (!baseSaveError) {
        if (relations = this.getFromAttributes(base)) {
          PolymorphicHasManyAssociation.__super__.apply.apply(this, arguments);
          relations.forEach(function(model) {
            return model.set(_this.foreignTypeKey, _this.modelType());
          });
        }
      }
    };

    PolymorphicHasManyAssociation.prototype.proxyClassInstanceForKey = function(indexValue) {
      return new this.proxyClass(indexValue, this.modelType(), this);
    };

    PolymorphicHasManyAssociation.prototype.getRelatedModelForType = function(type) {
      var relatedModel, scope;
      scope = this.options.namespace || Batman.currentApp;
      if (type) {
        relatedModel = scope != null ? scope[type] : void 0;
        relatedModel || (relatedModel = scope != null ? scope[Batman.helpers.camelize(type)] : void 0);
      } else {
        relatedModel = this.getRelatedModel();
      }
      Batman.developer["do"](function() {
        if ((Batman.currentApp != null) && !relatedModel) {
          return Batman.developer.warn("Related model " + type + " for hasMany polymorphic association " + this.label + " not found.");
        }
      });
      return relatedModel;
    };

    PolymorphicHasManyAssociation.prototype.modelType = function() {
      return this.model.get('resourceName');
    };

    PolymorphicHasManyAssociation.prototype.setIndex = function() {
      return this.typeIndex || (this.typeIndex = new Batman.PolymorphicAssociationSetIndex(this, this.modelType(), this[this.indexRelatedModelOn]));
    };

    PolymorphicHasManyAssociation.prototype.encoder = function() {
      var association;
      association = this;
      return function(relationSet, _, __, record) {
        var jsonArray;
        if (relationSet != null) {
          jsonArray = [];
          relationSet.forEach(function(relation) {
            var relationJSON;
            relationJSON = relation.toJSON();
            relationJSON[association.foreignKey] = record.get(association.primaryKey);
            relationJSON[association.foreignTypeKey] = association.modelType();
            return jsonArray.push(relationJSON);
          });
        }
        return jsonArray;
      };
    };

    PolymorphicHasManyAssociation.prototype.decoder = function() {
      var association;
      association = this;
      return function(data, key, _, __, parentRecord) {
        var children, id, jsonObject, newChildren, record, recordsToAdd, relatedModel, type, _i, _len;
        children = association.getFromAttributes(parentRecord) || association.setForRecord(parentRecord);
        newChildren = children.filter(function(relation) {
          return relation.isNew();
        }).toArray();
        recordsToAdd = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          jsonObject = data[_i];
          type = jsonObject[association.options.foreignTypeKey];
          if (!(relatedModel = association.getRelatedModelForType(type))) {
            Batman.developer.error("Can't decode model " + association.options.name + " because it hasn't been loaded yet!");
            return;
          }
          id = jsonObject[relatedModel.primaryKey];
          record = relatedModel._loadIdentity(id);
          if (record != null) {
            record._withoutDirtyTracking(function() {
              return this.fromJSON(jsonObject);
            });
            recordsToAdd.push(record);
          } else {
            if (newChildren.length > 0) {
              record = newChildren.shift();
              record._withoutDirtyTracking(function() {
                return this.fromJSON(jsonObject);
              });
              record = relatedModel._mapIdentity(record);
            } else {
              record = relatedModel._makeOrFindRecordFromData(jsonObject);
              recordsToAdd.push(record);
            }
          }
          if (association.options.inverseOf) {
            record._withoutDirtyTracking(function() {
              return record.set(association.options.inverseOf, parentRecord);
            });
          }
        }
        children.add.apply(children, recordsToAdd);
        children.markAsLoaded();
        return children;
      };
    };

    return PolymorphicHasManyAssociation;

  })(Batman.HasManyAssociation);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.SingularAssociation = (function(_super) {
    __extends(SingularAssociation, _super);

    function SingularAssociation() {
      _ref = SingularAssociation.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SingularAssociation.prototype.isSingular = true;

    SingularAssociation.prototype.getAccessor = function(association, model, label) {
      var proxy, record, recordInAttributes;
      if (recordInAttributes = association.getFromAttributes(this)) {
        return recordInAttributes;
      }
      if (association.getRelatedModel()) {
        proxy = this.associationProxy(association);
        record = false;
        if (!Batman.Property.withoutTracking(function() {
          return proxy.get('loaded');
        })) {
          if (association.options.autoload) {
            Batman.Property.withoutTracking(function() {
              return proxy.load();
            });
          } else {
            record = proxy.loadFromLocal();
          }
        }
        return record || proxy;
      }
    };

    SingularAssociation.prototype.setIndex = function() {
      return this.index || (this.index = new Batman.UniqueAssociationSetIndex(this, this[this.indexRelatedModelOn]));
    };

    return SingularAssociation;

  })(Batman.Association);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.HasOneAssociation = (function(_super) {
    __extends(HasOneAssociation, _super);

    HasOneAssociation.prototype.associationType = 'hasOne';

    HasOneAssociation.prototype.proxyClass = Batman.HasOneProxy;

    HasOneAssociation.prototype.indexRelatedModelOn = 'foreignKey';

    function HasOneAssociation() {
      HasOneAssociation.__super__.constructor.apply(this, arguments);
      this.primaryKey = this.options.primaryKey || "id";
      this.foreignKey = this.options.foreignKey || ("" + (Batman.helpers.underscore(this.model.get('resourceName'))) + "_id");
    }

    HasOneAssociation.prototype.apply = function(baseSaveError, base) {
      var relation;
      if (!baseSaveError) {
        if (relation = this.getFromAttributes(base)) {
          return relation.set(this.foreignKey, base.get(this.primaryKey));
        }
      }
    };

    HasOneAssociation.prototype.encoder = function() {
      var association;
      association = this;
      return function(val, key, object, record) {
        var json;
        if (!association.options.saveInline) {
          return;
        }
        if (json = val.toJSON()) {
          json[association.foreignKey] = record.get(association.primaryKey);
        }
        return json;
      };
    };

    HasOneAssociation.prototype.decoder = function() {
      var association;
      association = this;
      return function(data, _, __, ___, parentRecord) {
        var record, relatedModel;
        if (!data) {
          return;
        }
        relatedModel = association.getRelatedModel();
        record = relatedModel.createFromJSON(data);
        if (association.options.inverseOf) {
          record.set(association.options.inverseOf, parentRecord);
        }
        return record;
      };
    };

    return HasOneAssociation;

  })(Batman.SingularAssociation);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.BelongsToAssociation = (function(_super) {
    __extends(BelongsToAssociation, _super);

    BelongsToAssociation.prototype.associationType = 'belongsTo';

    BelongsToAssociation.prototype.proxyClass = Batman.BelongsToProxy;

    BelongsToAssociation.prototype.indexRelatedModelOn = 'primaryKey';

    BelongsToAssociation.prototype.defaultOptions = {
      saveInline: false,
      autoload: true,
      encodeForeignKey: true
    };

    function BelongsToAssociation(model, label, options) {
      if (options != null ? options.polymorphic : void 0) {
        delete options.polymorphic;
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(Batman.PolymorphicBelongsToAssociation, arguments, function(){});
      }
      BelongsToAssociation.__super__.constructor.apply(this, arguments);
      this.foreignKey = this.options.foreignKey || ("" + this.label + "_id");
      this.primaryKey = this.options.primaryKey || "id";
      if (this.options.encodeForeignKey) {
        this.model.encode(this.foreignKey);
      }
    }

    BelongsToAssociation.prototype.encoder = function() {
      return function(val) {
        return val.toJSON();
      };
    };

    BelongsToAssociation.prototype.decoder = function() {
      var association;
      association = this;
      return function(data, _, __, ___, childRecord) {
        var inverse, record, relatedModel;
        relatedModel = association.getRelatedModel();
        record = relatedModel.createFromJSON(data);
        if (association.options.inverseOf) {
          if (inverse = association.inverse()) {
            if (inverse instanceof Batman.HasManyAssociation) {
              childRecord.set(association.foreignKey, record.get(association.primaryKey));
            } else {
              record.set(inverse.label, childRecord);
            }
          }
        }
        childRecord.set(association.label, record);
        return record;
      };
    };

    BelongsToAssociation.prototype.apply = function(base) {
      var foreignValue, model;
      if (model = base.get(this.label)) {
        foreignValue = model.get(this.primaryKey);
        if (foreignValue !== void 0) {
          return base.set(this.foreignKey, foreignValue);
        }
      }
    };

    return BelongsToAssociation;

  })(Batman.SingularAssociation);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PolymorphicBelongsToAssociation = (function(_super) {
    __extends(PolymorphicBelongsToAssociation, _super);

    PolymorphicBelongsToAssociation.prototype.isPolymorphic = true;

    PolymorphicBelongsToAssociation.prototype.proxyClass = Batman.PolymorphicBelongsToProxy;

    PolymorphicBelongsToAssociation.prototype.defaultOptions = Batman.mixin({}, Batman.BelongsToAssociation.prototype.defaultOptions, {
      encodeForeignTypeKey: true
    });

    function PolymorphicBelongsToAssociation() {
      PolymorphicBelongsToAssociation.__super__.constructor.apply(this, arguments);
      this.foreignTypeKey = this.options.foreignTypeKey || ("" + this.label + "_type");
      if (this.options.encodeForeignTypeKey) {
        this.model.encode(this.foreignTypeKey);
      }
      this.typeIndices = {};
    }

    PolymorphicBelongsToAssociation.prototype.getRelatedModel = false;

    PolymorphicBelongsToAssociation.prototype.setIndex = false;

    PolymorphicBelongsToAssociation.prototype.inverse = false;

    PolymorphicBelongsToAssociation.prototype.apply = function(base) {
      var foreignTypeValue, instanceOrProxy;
      PolymorphicBelongsToAssociation.__super__.apply.apply(this, arguments);
      if (instanceOrProxy = base.get(this.label)) {
        foreignTypeValue = instanceOrProxy instanceof Batman.PolymorphicBelongsToProxy ? instanceOrProxy.get('foreignTypeValue') : instanceOrProxy.constructor.get('resourceName');
        return base.set(this.foreignTypeKey, foreignTypeValue);
      }
    };

    PolymorphicBelongsToAssociation.prototype.getAccessor = function(self, model, label) {
      var proxy, recordInAttributes;
      if (recordInAttributes = self.getFromAttributes(this)) {
        return recordInAttributes;
      }
      if (self.getRelatedModelForType(this.get(self.foreignTypeKey))) {
        proxy = this.associationProxy(self);
        Batman.Property.withoutTracking(function() {
          if (!proxy.get('loaded') && self.options.autoload) {
            return proxy.load();
          }
        });
        return proxy;
      }
    };

    PolymorphicBelongsToAssociation.prototype.url = function(recordOptions) {
      var ending, helper, id, inverse, root, type, _ref, _ref1;
      type = (_ref = recordOptions.data) != null ? _ref[this.foreignTypeKey] : void 0;
      if (type && (inverse = this.inverseForType(type))) {
        root = Batman.helpers.pluralize(type).toLowerCase();
        id = (_ref1 = recordOptions.data) != null ? _ref1[this.foreignKey] : void 0;
        helper = inverse.isSingular ? "singularize" : "pluralize";
        ending = Batman.helpers[helper](inverse.label);
        return "/" + root + "/" + id + "/" + ending;
      }
    };

    PolymorphicBelongsToAssociation.prototype.getRelatedModelForType = function(type) {
      var relatedModel, scope;
      scope = this.options.namespace || Batman.currentApp;
      if (type) {
        relatedModel = scope != null ? scope[type] : void 0;
        relatedModel || (relatedModel = scope != null ? scope[Batman.helpers.camelize(type)] : void 0);
      }
      Batman.developer["do"](function() {
        if ((Batman.currentApp != null) && !relatedModel) {
          return Batman.developer.warn("Related model " + type + " for belongsTo polymorphic association " + this.label + " not found.");
        }
      });
      return relatedModel;
    };

    PolymorphicBelongsToAssociation.prototype.setIndexForType = function(type) {
      var _base;
      (_base = this.typeIndices)[type] || (_base[type] = new Batman.PolymorphicUniqueAssociationSetIndex(this, type, this.primaryKey));
      return this.typeIndices[type];
    };

    PolymorphicBelongsToAssociation.prototype.inverseForType = function(type) {
      var inverse, relatedAssocs, _ref,
        _this = this;
      if (relatedAssocs = (_ref = this.getRelatedModelForType(type)) != null ? _ref._batman.get('associations') : void 0) {
        if (this.options.inverseOf) {
          return relatedAssocs.getByLabel(this.options.inverseOf);
        }
        inverse = null;
        relatedAssocs.forEach(function(label, assoc) {
          if (assoc.getRelatedModel() === _this.model) {
            return inverse = assoc;
          }
        });
        return inverse;
      }
    };

    PolymorphicBelongsToAssociation.prototype.decoder = function() {
      var association;
      association = this;
      return function(data, key, response, ___, childRecord) {
        var foreignTypeValue, inverse, record, relatedModel;
        foreignTypeValue = response[association.foreignTypeKey] || childRecord.get(association.foreignTypeKey);
        relatedModel = association.getRelatedModelForType(foreignTypeValue);
        record = relatedModel.createFromJSON(data);
        if (association.options.inverseOf) {
          if (inverse = association.inverseForType(foreignTypeValue)) {
            if (inverse instanceof Batman.PolymorphicHasManyAssociation) {
              childRecord.set(association.foreignKey, record.get(association.primaryKey));
              childRecord.set(association.foreignTypeKey, foreignTypeValue);
            } else {
              record.set(inverse.label, childRecord);
            }
          }
        }
        childRecord.set(association.label, record);
        return record;
      };
    };

    return PolymorphicBelongsToAssociation;

  })(Batman.BelongsToAssociation);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty;

  Batman.Transaction = {
    isTransaction: true,
    base: function() {
      return this._batman.base;
    },
    applyChanges: function(visited) {
      var attributes, base, key, updatedAssociationSet, value, _ref;
      if (visited == null) {
        visited = [];
      }
      if (visited.indexOf(this) !== -1) {
        return this.base();
      }
      visited.push(this);
      attributes = this.get('attributes').toObject();
      for (key in attributes) {
        if (!__hasProp.call(attributes, key)) continue;
        value = attributes[key];
        if (value instanceof Batman.Model && value.isTransaction) {
          value.applyChanges(visited);
          delete attributes[key];
        } else if (value instanceof Batman.TransactionAssociationSet) {
          updatedAssociationSet = value.applyChanges(visited);
          attributes[key] = updatedAssociationSet;
        }
      }
      base = this.base();
      base.mixin(attributes);
      return (_ref = typeof base.applyChanges === "function" ? base.applyChanges() : void 0) != null ? _ref : base;
    },
    save: function(options, callback) {
      var finish, validated, _ref,
        _this = this;
      if (!callback) {
        _ref = [{}, options], options = _ref[0], callback = _ref[1];
      }
      this.once('validated', validated = function() {
        return _this.applyChanges();
      });
      finish = function() {
        _this.off('validated', validated);
        return typeof callback === "function" ? callback.apply(null, arguments) : void 0;
      };
      return this.constructor.prototype.save.call(this, options, function(err, result) {
        if (!err) {
          result = _this.base();
          result.get('dirtyKeys').clear();
          result.get('_dirtiedKeys').clear();
          result.get('lifecycle').startTransition('save');
          result.get('lifecycle').startTransition('saved');
        }
        return finish(err, result);
      });
    }
  };

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.TransactionAssociationSet = (function(_super) {
    __extends(TransactionAssociationSet, _super);

    TransactionAssociationSet.prototype.isTransaction = true;

    function TransactionAssociationSet(associationSet, visited, stack) {
      this.set('associationSet', associationSet);
      this._loader = this._addFromAssociationSet.bind(this);
      associationSet.on('itemsWereAdded', this._loader);
      this._visited = visited;
      this._stack = stack;
      this._storage = [];
      this._originalStorage = [];
      this._removedStorage = [];
      this.add.apply(this, associationSet.toArray());
    }

    TransactionAssociationSet.delegate('association', 'foreignKeyValue', {
      to: 'associationSet'
    });

    TransactionAssociationSet.prototype._addFromAssociationSet = function(items, indexes) {
      return this.add.apply(this, items);
    };

    TransactionAssociationSet.prototype.add = TransactionAssociationSet.mutation(function() {
      var addedTransactions, item, items, originalIndex, removedIndex, transactionItem, _i, _len;
      items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      addedTransactions = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        if (!(item instanceof Batman.Model && !item.isTransaction)) {
          Batman.developer.warn("You tried to add a " + item.constructor.name + " to a TransactionAssociationSet (" + (this.get('association.label')) + ")", item);
          continue;
        }
        transactionItem = item._transaction(this._visited, this._stack);
        this._storage.push(transactionItem);
        addedTransactions.push(transactionItem);
        originalIndex = this._originalStorage.indexOf(item);
        if (originalIndex === -1) {
          this._originalStorage.push(item);
        }
        removedIndex = this._removedStorage.indexOf(item);
        if (removedIndex > -1) {
          this._removedStorage.splice(removedIndex, 1);
        }
      }
      this.length = this._storage.length;
      if (addedTransactions.length) {
        this.fire('itemsWereAdded', addedTransactions);
      }
      return addedTransactions;
    });

    TransactionAssociationSet.prototype.remove = TransactionAssociationSet.mutation(function() {
      var item, originalIndex, removedTransactions, transactionIndex, transactionItem, transactions, _i, _len;
      transactions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      removedTransactions = [];
      for (_i = 0, _len = transactions.length; _i < _len; _i++) {
        transactionItem = transactions[_i];
        if (!transactionItem.isTransaction) {
          throw "Tried to remove real item from transaction set: " + (t.toJSON());
        }
        transactionIndex = this._storage.indexOf(transactionItem);
        if (transactionIndex > -1) {
          this._storage.splice(transactionIndex, 1);
          removedTransactions.push(transactionItem);
        }
        item = transactionItem.base();
        originalIndex = this._originalStorage.indexOf(item);
        if (originalIndex > -1) {
          this._removedStorage.push(item);
          this._originalStorage.splice(originalIndex, 1);
        }
      }
      this.length = this._storage.length;
      if (removedTransactions.length) {
        this.fire('itemsWereRemoved', removedTransactions);
      }
      return removedTransactions;
    });

    TransactionAssociationSet.prototype.applyChanges = function(visited) {
      var originals, target, transactionItem, _i, _len, _ref;
      _ref = this._storage;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        transactionItem = _ref[_i];
        transactionItem.applyChanges(visited);
      }
      originals = (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Batman.Set, this._originalStorage, function(){});
      target = this.get('associationSet');
      target.off('itemsWereAdded', this._loader);
      target.replace(originals);
      target.set('removedItems', (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Batman.Set, this._removedStorage, function(){}));
      return target;
    };

    TransactionAssociationSet.accessor('length', function() {
      this.registerAsMutableSource();
      return this.length;
    });

    TransactionAssociationSet.prototype.build = Batman.AssociationSet.prototype.build;

    return TransactionAssociationSet;

  })(Batman.Set);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.Validator = (function(_super) {
    __extends(Validator, _super);

    Validator.triggers = function() {
      var triggers;
      triggers = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (this._triggers != null) {
        return this._triggers.concat(triggers);
      } else {
        return this._triggers = triggers;
      }
    };

    Validator.options = function() {
      var options;
      options = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (this._options != null) {
        return this._options.concat(options);
      } else {
        return this._options = options;
      }
    };

    Validator.matches = function(options) {
      var key, results, shouldReturn, value, _ref, _ref1;
      results = {};
      shouldReturn = false;
      for (key in options) {
        value = options[key];
        if (~((_ref = this._options) != null ? _ref.indexOf(key) : void 0)) {
          results[key] = value;
        }
        if (~((_ref1 = this._triggers) != null ? _ref1.indexOf(key) : void 0)) {
          results[key] = value;
          shouldReturn = true;
        }
      }
      if (shouldReturn) {
        return results;
      }
    };

    function Validator() {
      var mixins, options;
      options = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.options = options;
      Validator.__super__.constructor.apply(this, mixins);
    }

    Validator.prototype.validate = function(record) {
      return Batman.developer.error("You must override validate in Batman.Validator subclasses.");
    };

    Validator.prototype.format = function(key, messageKey, interpolations) {
      return Batman.t("errors.messages." + messageKey, interpolations);
    };

    Validator.prototype.handleBlank = function(value) {
      if (this.options.allowBlank && !Batman.PresenceValidator.prototype.isPresent(value)) {
        return true;
      }
    };

    return Validator;

  })(Batman.Object);

}).call(this);

(function() {
  Batman.Validators = [];

  Batman.extend(Batman.translate.messages, {
    errors: {
      base: {
        format: "%{message}"
      },
      format: "%{attribute} %{message}",
      messages: {
        too_short: "must be at least %{count} characters",
        too_long: "must be less than %{count} characters",
        wrong_length: "must be %{count} characters",
        blank: "can't be blank",
        not_numeric: "must be a number",
        greater_than: "must be greater than %{count}",
        greater_than_or_equal_to: "must be greater than or equal to %{count}",
        equal_to: "must be equal to %{count}",
        less_than: "must be less than %{count}",
        less_than_or_equal_to: "must be less than or equal to %{count}",
        not_an_integer: "must be an integer",
        not_matching: "is not valid",
        invalid_association: "is not valid",
        not_included_in_list: "is not included in the list",
        included_in_list: "is included in the list",
        not_an_email: "is not a valid email address"
      }
    }
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.RegExpValidator = (function(_super) {
    __extends(RegExpValidator, _super);

    RegExpValidator.triggers('regexp', 'pattern');

    RegExpValidator.options('allowBlank');

    function RegExpValidator(options) {
      var _ref;
      this.regexp = (_ref = options.regexp) != null ? _ref : options.pattern;
      RegExpValidator.__super__.constructor.apply(this, arguments);
    }

    RegExpValidator.prototype.validateEach = function(errors, record, key, callback) {
      var value;
      value = record.get(key);
      if (this.handleBlank(value)) {
        return callback();
      }
      if ((value == null) || value === '' || !this.regexp.test(value)) {
        errors.add(key, this.format(key, 'not_matching'));
      }
      return callback();
    };

    return RegExpValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.RegExpValidator);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PresenceValidator = (function(_super) {
    __extends(PresenceValidator, _super);

    function PresenceValidator() {
      _ref = PresenceValidator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PresenceValidator.triggers('presence');

    PresenceValidator.prototype.validateEach = function(errors, record, key, callback) {
      var value;
      value = record.get(key);
      if (!this.isPresent(value)) {
        errors.add(key, this.format(key, 'blank'));
      }
      return callback();
    };

    PresenceValidator.prototype.isPresent = function(value) {
      return (value != null) && value !== '';
    };

    return PresenceValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.PresenceValidator);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.NumericValidator = (function(_super) {
    __extends(NumericValidator, _super);

    function NumericValidator() {
      _ref = NumericValidator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    NumericValidator.triggers('numeric', 'greaterThan', 'greaterThanOrEqualTo', 'equalTo', 'lessThan', 'lessThanOrEqualTo', 'onlyInteger');

    NumericValidator.options('allowBlank');

    NumericValidator.prototype.validateEach = function(errors, record, key, callback) {
      var options, value;
      options = this.options;
      value = record.get(key);
      if (this.handleBlank(value)) {
        return callback();
      }
      if ((value == null) || !(this.isNumeric(value) || this.canCoerceToNumeric(value))) {
        errors.add(key, this.format(key, 'not_numeric'));
      } else if (options.onlyInteger && !this.isInteger(value)) {
        errors.add(key, this.format(key, 'not_an_integer'));
      } else {
        if ((options.greaterThan != null) && value <= options.greaterThan) {
          errors.add(key, this.format(key, 'greater_than', {
            count: options.greaterThan
          }));
        }
        if ((options.greaterThanOrEqualTo != null) && value < options.greaterThanOrEqualTo) {
          errors.add(key, this.format(key, 'greater_than_or_equal_to', {
            count: options.greaterThanOrEqualTo
          }));
        }
        if ((options.equalTo != null) && value !== options.equalTo) {
          errors.add(key, this.format(key, 'equal_to', {
            count: options.equalTo
          }));
        }
        if ((options.lessThan != null) && value >= options.lessThan) {
          errors.add(key, this.format(key, 'less_than', {
            count: options.lessThan
          }));
        }
        if ((options.lessThanOrEqualTo != null) && value > options.lessThanOrEqualTo) {
          errors.add(key, this.format(key, 'less_than_or_equal_to', {
            count: options.lessThanOrEqualTo
          }));
        }
      }
      return callback();
    };

    NumericValidator.prototype.isNumeric = function(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    };

    NumericValidator.prototype.isInteger = function(value) {
      return parseFloat(value) === (value | 0);
    };

    NumericValidator.prototype.canCoerceToNumeric = function(value) {
      return (value - 0) == value && value.length > 0;
    };

    return NumericValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.NumericValidator);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.LengthValidator = (function(_super) {
    __extends(LengthValidator, _super);

    LengthValidator.triggers('minLength', 'maxLength', 'length', 'lengthWithin', 'lengthIn');

    LengthValidator.options('allowBlank');

    function LengthValidator(options) {
      var range;
      if (range = options.lengthIn || options.lengthWithin) {
        options.minLength = range[0];
        options.maxLength = range[1] || -1;
        delete options.lengthWithin;
        delete options.lengthIn;
      }
      LengthValidator.__super__.constructor.apply(this, arguments);
    }

    LengthValidator.prototype.validateEach = function(errors, record, key, callback) {
      var options, value;
      options = this.options;
      value = record.get(key);
      if (this.handleBlank(value)) {
        return callback();
      }
      if (value == null) {
        value = [];
      }
      if (options.minLength && value.length < options.minLength) {
        errors.add(key, this.format(key, 'too_short', {
          count: options.minLength
        }));
      }
      if (options.maxLength && value.length > options.maxLength) {
        errors.add(key, this.format(key, 'too_long', {
          count: options.maxLength
        }));
      }
      if (options.length && value.length !== options.length) {
        errors.add(key, this.format(key, 'wrong_length', {
          count: options.length
        }));
      }
      return callback();
    };

    return LengthValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.LengthValidator);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.InclusionValidator = (function(_super) {
    __extends(InclusionValidator, _super);

    InclusionValidator.triggers('inclusion');

    InclusionValidator.options('allowBlank');

    function InclusionValidator(options) {
      this.acceptableValues = options.inclusion["in"];
      InclusionValidator.__super__.constructor.apply(this, arguments);
    }

    InclusionValidator.prototype.validateEach = function(errors, record, key, callback) {
      var value;
      value = record.get(key);
      if (!this.handleBlank(value) && this.acceptableValues.indexOf(value) === -1) {
        errors.add(key, this.format(key, 'not_included_in_list'));
      }
      return callback();
    };

    return InclusionValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.InclusionValidator);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.ExclusionValidator = (function(_super) {
    __extends(ExclusionValidator, _super);

    ExclusionValidator.triggers('exclusion');

    function ExclusionValidator(options) {
      this.unacceptableValues = options.exclusion["in"];
      ExclusionValidator.__super__.constructor.apply(this, arguments);
    }

    ExclusionValidator.prototype.validateEach = function(errors, record, key, callback) {
      if (this.unacceptableValues.indexOf(record.get(key)) >= 0) {
        errors.add(key, this.format(key, 'included_in_list'));
      }
      return callback();
    };

    return ExclusionValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.ExclusionValidator);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.EmailValidator = (function(_super) {
    __extends(EmailValidator, _super);

    function EmailValidator() {
      _ref = EmailValidator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    EmailValidator.triggers('email');

    EmailValidator.prototype.emailRegexp = /[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*/;

    EmailValidator.prototype.validateEach = function(errors, record, key, callback) {
      var value;
      value = record.get(key);
      if ((value == null) || value === '' || !this.emailRegexp.test(value)) {
        errors.add(key, this.format(key, 'not_an_email'));
      }
      return callback();
    };

    return EmailValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.EmailValidator);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.ConfirmationValidator = (function(_super) {
    __extends(ConfirmationValidator, _super);

    function ConfirmationValidator() {
      _ref = ConfirmationValidator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ConfirmationValidator.triggers('confirmation');

    ConfirmationValidator.prototype.validateEach = function(errors, record, key, callback) {
      var confirmation_key, confirmation_value, options, value;
      options = this.options;
      if (!options.confirmation) {
        return;
      }
      if (Batman.typeOf(this.options.confirmation) === "String") {
        confirmation_key = this.options.confirmation;
      } else {
        confirmation_key = key + "_confirmation";
      }
      value = record.get(key);
      confirmation_value = record.get(confirmation_key);
      if (value !== confirmation_value) {
        errors.add(key, 'and confirmation do not match');
      }
      return callback();
    };

    return ConfirmationValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.ConfirmationValidator);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.AssociatedValidator = (function(_super) {
    __extends(AssociatedValidator, _super);

    function AssociatedValidator() {
      _ref = AssociatedValidator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AssociatedValidator.triggers('associated');

    AssociatedValidator.prototype.validateEach = function(errors, record, key, callback) {
      var childFinished, count, value,
        _this = this;
      value = record.get(key);
      if (value != null) {
        if (value instanceof Batman.AssociationProxy) {
          value = typeof value.get === "function" ? value.get('target') : void 0;
        }
        count = 1;
        childFinished = function(err, childErrors) {
          if (childErrors.length > 0) {
            errors.add(key, _this.format(key, 'invalid_association'));
          }
          if (--count === 0) {
            return callback();
          }
        };
        if ((value != null ? value.forEach : void 0) != null) {
          value.forEach(function(record) {
            count += 1;
            return record.validate(childFinished);
          });
        } else if ((value != null ? value.validate : void 0) != null) {
          count += 1;
          value.validate(childFinished);
        }
        return childFinished(null, []);
      } else {
        return callback();
      }
    };

    return AssociatedValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.AssociatedValidator);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.AssociatedFieldValidator = (function(_super) {
    __extends(AssociatedFieldValidator, _super);

    function AssociatedFieldValidator() {
      _ref = AssociatedFieldValidator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AssociatedFieldValidator.triggers('associatedFields');

    AssociatedFieldValidator.prototype.validateEach = function(errors, record, key, callback) {
      var childFinished, count, value,
        _this = this;
      value = record.get(key);
      if (value != null) {
        if (value instanceof Batman.AssociationProxy) {
          value = typeof value.get === "function" ? value.get('target') : void 0;
        }
        count = 1;
        childFinished = function(err, childErrors) {
          if (childErrors != null) {
            childErrors.forEach(function(validationError) {
              return errors.add(validationError.get('attribute'), validationError.get('message'));
            });
          }
          if (--count === 0) {
            return callback();
          }
        };
        if ((value != null ? value.forEach : void 0) != null) {
          value.forEach(function(record) {
            count += 1;
            return record.validate(childFinished);
          });
        } else if ((value != null ? value.validate : void 0) != null) {
          count += 1;
          value.validate(childFinished);
        }
        return childFinished(null, []);
      } else {
        return callback();
      }
    };

    return AssociatedFieldValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.AssociatedFieldValidator);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.ControllerActionFrame = (function(_super) {
    __extends(ControllerActionFrame, _super);

    ControllerActionFrame.prototype.operationOccurred = false;

    ControllerActionFrame.prototype.remainingOperations = 0;

    ControllerActionFrame.prototype.event('complete').oneShot = true;

    function ControllerActionFrame(options, onComplete) {
      ControllerActionFrame.__super__.constructor.call(this, options);
      this.once('complete', onComplete);
    }

    ControllerActionFrame.prototype.startOperation = function(options) {
      if (options == null) {
        options = {};
      }
      if (!options.internal) {
        this.operationOccurred = true;
      }
      this._changeOperationsCounter(1);
      return true;
    };

    ControllerActionFrame.prototype.finishOperation = function() {
      this._changeOperationsCounter(-1);
      return true;
    };

    ControllerActionFrame.prototype.startAndFinishOperation = function(options) {
      this.startOperation(options);
      this.finishOperation(options);
      return true;
    };

    ControllerActionFrame.prototype._changeOperationsCounter = function(delta) {
      var _ref;
      this.remainingOperations += delta;
      if (this.remainingOperations === 0) {
        this.fire('complete');
      }
      if ((_ref = this.parentFrame) != null) {
        _ref._changeOperationsCounter(delta);
      }
    };

    return ControllerActionFrame;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.HTMLStore = (function(_super) {
    __extends(HTMLStore, _super);

    function HTMLStore() {
      HTMLStore.__super__.constructor.apply(this, arguments);
      this._htmlContents = {};
      this._requestedPaths = new Batman.SimpleSet;
    }

    HTMLStore.prototype.propertyClass = Batman.Property;

    HTMLStore.prototype.fetchHTML = function(path) {
      var _this = this;
      return new Batman.Request({
        url: Batman.Navigator.normalizePath(Batman.config.pathToHTML, "" + path + ".html"),
        type: 'html',
        success: function(response) {
          return _this.set(path, response);
        },
        error: function(response) {
          throw new Error("Could not load html from " + path);
        }
      });
    };

    HTMLStore.accessor({
      'final': true,
      get: function(path) {
        var contents;
        if (path.charAt(0) !== '/') {
          return this.get("/" + path);
        }
        if (this._htmlContents[path]) {
          return this._htmlContents[path];
        }
        if (this._requestedPaths.has(path)) {
          return;
        }
        if (contents = this._sourceFromDOM(path)) {
          return contents;
        }
        if (Batman.config.fetchRemoteHTML) {
          this.fetchHTML(path);
        } else {
          throw new Error("Couldn't find html source for \'" + path + "\'!");
        }
      },
      set: function(path, content) {
        if (path.charAt(0) !== '/') {
          return this.set("/" + path, content);
        }
        this._requestedPaths.add(path);
        return this._htmlContents[path] = content;
      }
    });

    HTMLStore.prototype.prefetch = function(path) {
      this.get(path);
      return true;
    };

    HTMLStore.prototype._sourceFromDOM = function(path) {
      var node, relativePath;
      relativePath = path.slice(1);
      if (node = Batman.DOM.querySelector(document, "[data-defineview*='" + relativePath + "']")) {
        Batman.setImmediate(function() {
          var _ref;
          return (_ref = node.parentNode) != null ? _ref.removeChild(node) : void 0;
        });
        return Batman.View.store.set(Batman.Navigator.normalizePath(path), node.innerHTML);
      }
    };

    return HTMLStore;

  })(Batman.Object);

}).call(this);

(function() {
  var _base, _base1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.View = (function(_super) {
    __extends(View, _super);

    View.store = new Batman.HTMLStore;

    View.option = function() {
      var keys, options;
      keys = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      Batman.initializeObject(this);
      if (options = this._batman.options) {
        keys = options.concat(keys);
      }
      return this._batman.set('options', keys);
    };

    View.filter = function(key, filter) {
      var filters;
      Batman.initializeObject(this.prototype);
      filters = this.prototype._batman.filters || {};
      filters[key] = filter;
      return this.prototype._batman.set('filters', filters);
    };

    View.viewForNode = function(node, climbTree) {
      var view;
      if (climbTree == null) {
        climbTree = true;
      }
      while (node) {
        if (view = Batman._data(node, 'view')) {
          return view;
        }
        if (!climbTree) {
          return;
        }
        node = node.parentNode;
      }
    };

    View.prototype.bindings = [];

    View.prototype.subviews = [];

    View.prototype.superview = null;

    View.prototype.controller = null;

    View.prototype.source = null;

    View.prototype.html = null;

    View.prototype.node = null;

    View.prototype.bindImmediately = true;

    View.prototype.isBound = false;

    View.prototype.isInDOM = false;

    View.prototype.isView = true;

    View.prototype.isDead = false;

    View.prototype.isBackingView = false;

    function View() {
      var superview,
        _this = this;
      this.bindings = [];
      this.subviews = new Batman.Set;
      this.subviews.on('itemsWereAdded', function(newSubviews) {
        var subview, _i, _len;
        for (_i = 0, _len = newSubviews.length; _i < _len; _i++) {
          subview = newSubviews[_i];
          _this._addSubview(subview);
        }
      });
      this.subviews.on('itemsWereRemoved', function(oldSubviews) {
        var subview, _i, _len;
        for (_i = 0, _len = oldSubviews.length; _i < _len; _i++) {
          subview = oldSubviews[_i];
          subview._removeFromSuperview();
        }
      });
      View.__super__.constructor.apply(this, arguments);
      if (superview = this.superview) {
        this.superview = null;
        superview.subviews.add(this);
      }
    }

    View.prototype._addChildBinding = function(binding) {
      return this.bindings.push(binding);
    };

    View.prototype._addSubview = function(subview) {
      var filters, subviewController, yieldName, yieldObject;
      subviewController = subview.controller;
      subview.removeFromSuperview();
      subview.set('controller', subviewController || this.controller);
      subview.set('superview', this);
      subview.fireAndCall('viewDidMoveToSuperview');
      if ((yieldName = subview.contentFor) && !subview.parentNode) {
        yieldObject = Batman.DOM.Yield.withName(yieldName);
        yieldObject.set('contentView', subview);
      }
      if (filters = this._batman.get('filters')) {
        subview._batman.set('filters', Batman.mixin({}, filters, subview._batman.get('filters')));
      }
      this.get('node');
      subview.get('node');
      this.observe('node', subview._nodesChanged);
      subview.observe('node', subview._nodesChanged);
      subview.observe('parentNode', subview._nodesChanged);
      return subview._nodesChanged();
    };

    View.prototype._removeFromSuperview = function() {
      var superview;
      if (!this.superview) {
        return;
      }
      this.fireAndCall('viewWillRemoveFromSuperview');
      this.forget('node', this._nodesChanged);
      this.forget('parentNode', this._nodesChanged);
      this.superview.forget('node', this._nodesChanged);
      superview = this.get('superview');
      this.removeFromParentNode();
      this.set('superview', null);
      return this.set('controller', null);
    };

    View.prototype.removeFromSuperview = function() {
      var _ref;
      return (_ref = this.superview) != null ? _ref.subviews.remove(this) : void 0;
    };

    View.prototype._nodesChanged = function() {
      var parentNode, superviewNode;
      if (!this.node) {
        return;
      }
      if (this.bindImmediately) {
        this.initializeBindings();
      }
      superviewNode = this.superview.get('node');
      parentNode = this.parentNode;
      if (typeof parentNode === 'string') {
        parentNode = Batman.DOM.querySelector(superviewNode, parentNode);
      }
      if (!parentNode) {
        parentNode = superviewNode;
      }
      if (parentNode) {
        return this.addToParentNode(parentNode);
      }
    };

    View.prototype.addToParentNode = function(parentNode) {
      var isInDOM;
      if (!this.get('node')) {
        return;
      }
      isInDOM = Batman.DOM.containsNode(parentNode);
      if (isInDOM) {
        this.propagateToSubviews('viewWillAppear');
      }
      this.insertIntoDOM(parentNode);
      this.propagateToSubviews('isInDOM', isInDOM);
      if (isInDOM) {
        return this.propagateToSubviews('viewDidAppear');
      }
    };

    View.prototype.insertIntoDOM = function(parentNode) {
      if (parentNode !== this.node) {
        return parentNode.appendChild(this.node);
      }
    };

    View.prototype.removeFromParentNode = function() {
      var isInDOM, node, _ref, _ref1, _ref2;
      node = this.get('node');
      isInDOM = (_ref = this.wasInDOM) != null ? _ref : Batman.DOM.containsNode(node);
      if (isInDOM) {
        this.propagateToSubviews('viewWillDisappear');
      }
      if ((_ref1 = this.node) != null) {
        if ((_ref2 = _ref1.parentNode) != null) {
          _ref2.removeChild(this.node);
        }
      }
      this.propagateToSubviews('isInDOM', false);
      if (isInDOM) {
        return this.propagateToSubviews('viewDidDisappear');
      }
    };

    View.prototype.propagateToSubviews = function(eventName, value) {
      var subview, _i, _len, _ref, _results;
      if (value != null) {
        this.set(eventName, value);
      } else {
        this.fireAndCall(eventName);
      }
      _ref = this.subviews._storage;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        subview = _ref[_i];
        _results.push(subview.propagateToSubviews(eventName, value));
      }
      return _results;
    };

    View.prototype.loadView = function(_node) {
      var html, node;
      if ((html = this.get('html')) != null) {
        node = _node || document.createElement('div');
        Batman.DOM.setInnerHTML(node, html);
        return node;
      }
    };

    View.accessor('html', {
      get: function() {
        var handler, property, source,
          _this = this;
        if (this.html != null) {
          return this.html;
        }
        if (!(source = this.get('source'))) {
          return;
        }
        source = Batman.Navigator.normalizePath(source);
        this.html = this.constructor.store.get(source);
        if (this.html == null) {
          property = this.property('html');
          handler = function(html) {
            if (html != null) {
              _this.set('html', html);
            }
            return property.removeHandler(handler);
          };
          property.addHandler(handler);
        }
        return this.html;
      },
      set: function(key, html) {
        this.destroyBindings();
        this.destroySubviews();
        this.html = html;
        if (this.node && (html != null)) {
          this.loadView(this.node);
        }
        if (this.bindImmediately) {
          return this.initializeBindings();
        }
      }
    });

    View.accessor('node', {
      get: function() {
        var node;
        if ((this.node == null) && !this.isDead) {
          node = this.loadView();
          if (node) {
            this.set('node', node);
          }
          this.fireAndCall('viewDidLoad');
        }
        return this.node;
      },
      set: function(key, node, oldNode) {
        var _this = this;
        if (oldNode) {
          Batman.removeData(oldNode, 'view', true);
        }
        if (node === this.node) {
          return;
        }
        this.destroyBindings();
        this.destroySubviews();
        this.node = node;
        if (!node) {
          return;
        }
        Batman._data(node, 'view', this);
        Batman.developer["do"](function() {
          var extraInfo, _base;
          extraInfo = _this.get('displayName') || _this.get('source');
          return typeof (_base = (node === document ? document.body : node)).setAttribute === "function" ? _base.setAttribute('batman-view', _this.constructor.name + (extraInfo ? ": " + extraInfo : '')) : void 0;
        });
        return node;
      }
    });

    View.prototype.event('ready').oneShot = true;

    View.prototype.initializeBindings = function() {
      if (this.isBound || !this.node) {
        return;
      }
      new Batman.BindingParser(this);
      this.set('isBound', true);
      return this.fireAndCall('ready');
    };

    View.prototype.destroyBindings = function() {
      var binding, _i, _len, _ref;
      _ref = this.bindings;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        binding.die();
      }
      this.bindings = [];
      return this.isBound = false;
    };

    View.prototype.destroySubviews = function() {
      var subview, _i, _len, _ref;
      if (this.isDead) {
        Batman.developer.warn("Tried to destroy the subviews of a dead view.");
        return;
      }
      _ref = this.subviews.toArray();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        subview = _ref[_i];
        subview.die();
      }
      return this.subviews.clear();
    };

    View.prototype.die = function() {
      var event, _, _ref, _ref1;
      if (this.isDead) {
        Batman.developer.warn("Tried to die() a view more than once.");
        return;
      }
      this.fireAndCall('destroy');
      this.destroyBindings();
      this.destroySubviews();
      if (this.node) {
        this.wasInDOM = Batman.DOM.containsNode(this.node);
        Batman.DOM.destroyNode(this.node);
      }
      this.removeFromSuperview();
      this.forget();
      if ((_ref = this._batman.properties) != null) {
        _ref.forEach(function(key, property) {
          return property.die();
        });
      }
      if (this._batman.events) {
        _ref1 = this._batman.events;
        for (_ in _ref1) {
          event = _ref1[_];
          event.clearHandlers();
        }
      }
      this.node = null;
      this.parentNode = null;
      this.subviews = null;
      return this.isDead = true;
    };

    View.prototype.baseForKeypath = function(keypath) {
      return keypath.split('.')[0].split('|')[0].trim();
    };

    View.prototype.prefixForKeypath = function(keypath) {
      var index;
      index = keypath.lastIndexOf('.');
      if (index !== -1) {
        return keypath.substr(0, index);
      } else {
        return keypath;
      }
    };

    View.prototype.targetForKeypath = function(keypath, forceTarget) {
      var controller, lookupNode, nearestNonBackingView, target;
      lookupNode = this;
      while (lookupNode) {
        if (target = this._testTargetForKeypath(lookupNode, keypath)) {
          return target;
        }
        if (forceTarget && !nearestNonBackingView && !lookupNode.isBackingView) {
          nearestNonBackingView = Batman.get(lookupNode, 'proxiedObject') || lookupNode;
        }
        if (!controller && lookupNode.isView && lookupNode.controller) {
          controller = lookupNode.controller;
        }
        if (lookupNode.isView && lookupNode.superview) {
          lookupNode = lookupNode.superview;
        } else if (controller) {
          lookupNode = controller;
          controller = null;
        } else if (!lookupNode.window) {
          if (Batman.currentApp && lookupNode !== Batman.currentApp) {
            lookupNode = Batman.currentApp;
          } else {
            lookupNode = {
              window: Batman.container
            };
          }
        } else {
          break;
        }
      }
      return nearestNonBackingView;
    };

    View.prototype._testTargetForKeypath = function(object, keypath) {
      var proxiedObject;
      if (proxiedObject = Batman.get(object, 'proxiedObject')) {
        if (typeof Batman.get(proxiedObject, keypath) !== 'undefined') {
          return proxiedObject;
        }
      }
      if (typeof Batman.get(object, keypath) !== 'undefined') {
        return object;
      }
    };

    View.prototype.lookupKeypath = function(keypath) {
      var base, target;
      base = this.baseForKeypath(keypath);
      target = this.targetForKeypath(base);
      if (target) {
        return Batman.get(target, keypath);
      }
    };

    View.prototype.setKeypath = function(keypath, value) {
      var prefix, target, _ref;
      prefix = this.prefixForKeypath(keypath);
      target = this.targetForKeypath(prefix, true);
      if (!target || target === Batman.container) {
        return;
      }
      return (_ref = Batman.Property.forBaseAndKey(target, keypath)) != null ? _ref.setValue(value) : void 0;
    };

    View.prototype.fireAndCall = function(key) {
      this.fire(key);
      return typeof this[key] === "function" ? this[key]() : void 0;
    };

    return View;

  })(Batman.Object);

  if ((_base = Batman.container).$context == null) {
    _base.$context = function(node) {
      var view;
      while (node) {
        if (view = Batman._data(node, 'backingView') || Batman._data(node, 'view')) {
          return view;
        }
        node = node.parentNode;
      }
    };
  }

  if ((_base1 = Batman.container).$subviews == null) {
    _base1.$subviews = function(view) {
      var subviews;
      if (view == null) {
        view = Batman.currentApp.layout;
      }
      subviews = [];
      view.subviews.forEach(function(subview) {
        var obj, _ref;
        obj = Batman.mixin({}, subview);
        obj.constructor = subview.constructor;
        obj.subviews = ((_ref = subview.subviews) != null ? _ref.length : void 0) ? $subviews(subview) : null;
        Batman.unmixin(obj, {
          '_batman': true
        });
        return subviews.push(obj);
      });
      return subviews;
    };
  }

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.AbstractBinding = (function(_super) {
    var get_dot_rx, get_rx, keypath_rx, onlyAll, onlyData, onlyNode;

    __extends(AbstractBinding, _super);

    keypath_rx = /(^|,)\s*(?:(true|false)|("[^"]*")|(\{[^\}]*\})|(([0-9\_\-]+[a-zA-Z\_\-]|[a-zA-Z])[\w\-\.\?\!\+]*))\s*(?=$|,)/g;

    get_dot_rx = /(?:\]\.)(.+?)(?=[\[\.]|\s*\||$)/;

    get_rx = /(?!^\s*)\[(.*?)\]/g;

    AbstractBinding.accessor('filteredValue', {
      get: function() {
        var result, self, unfilteredValue;
        unfilteredValue = this.get('unfilteredValue');
        self = this;
        if (this.filterFunctions.length > 0) {
          result = this.filterFunctions.reduce(function(value, fn, i) {
            var args;
            args = self.filterArguments[i].map(function(argument) {
              if (argument._keypath) {
                return self.view.lookupKeypath(argument._keypath);
              } else {
                return argument;
              }
            });
            args.unshift(value);
            while (args.length < (fn.length - 1)) {
              args.push(void 0);
            }
            args.push(self);
            return fn.apply(self.view, args);
          }, unfilteredValue);
          return result;
        } else {
          return unfilteredValue;
        }
      },
      set: function(_, newValue) {
        return this.set('unfilteredValue', newValue);
      }
    });

    AbstractBinding.accessor('unfilteredValue', {
      get: function() {
        return this._unfilteredValue(this.get('key'));
      },
      set: function(_, value) {
        var k;
        if (k = this.get('key')) {
          return this.view.setKeypath(k, value);
        } else {
          return this.set('value', value);
        }
      }
    });

    AbstractBinding.prototype._unfilteredValue = function(key) {
      if (key) {
        return this.view.lookupKeypath(key);
      } else {
        return this.get('value');
      }
    };

    onlyAll = Batman.BindingDefinitionOnlyObserve.All;

    onlyData = Batman.BindingDefinitionOnlyObserve.Data;

    onlyNode = Batman.BindingDefinitionOnlyObserve.Node;

    AbstractBinding.prototype.bindImmediately = true;

    AbstractBinding.prototype.shouldSet = true;

    AbstractBinding.prototype.isInputBinding = false;

    AbstractBinding.prototype.escapeValue = true;

    AbstractBinding.prototype.onlyObserve = onlyAll;

    AbstractBinding.prototype.skipParseFilter = false;

    function AbstractBinding(definition) {
      this._fireDataChange = __bind(this._fireDataChange, this);
      var viewClass;
      this.node = definition.node, this.keyPath = definition.keyPath, this.view = definition.view;
      if (definition.onlyObserve) {
        this.onlyObserve = definition.onlyObserve;
      }
      if (definition.skipParseFilter != null) {
        this.skipParseFilter = definition.skipParseFilter;
      }
      if (!this.skipParseFilter) {
        this.parseFilter();
      }
      if (typeof this.backWithView === 'function') {
        viewClass = this.backWithView;
      }
      if (this.backWithView) {
        this.setupBackingView(viewClass, definition.viewOptions);
      }
      if (this.bindImmediately) {
        this.bind();
      }
    }

    AbstractBinding.prototype.isTwoWay = function() {
      return (this.key != null) && this.filterFunctions.length === 0;
    };

    AbstractBinding.prototype.bind = function() {
      var _ref, _ref1;
      if (this.node && ((_ref = this.onlyObserve) === onlyAll || _ref === onlyNode) && Batman.DOM.nodeIsEditable(this.node)) {
        Batman.DOM.events.change(this.node, this._fireNodeChange.bind(this));
        if (this.onlyObserve === onlyNode) {
          this._fireNodeChange();
        }
      }
      if ((_ref1 = this.onlyObserve) === onlyAll || _ref1 === onlyData) {
        this.observeAndFire('filteredValue', this._fireDataChange);
      }
      return this.view._addChildBinding(this);
    };

    AbstractBinding.prototype._fireNodeChange = function(event) {
      var val;
      this.shouldSet = false;
      val = this.value || this.get('keyContext');
      if (typeof this.nodeChange === "function") {
        this.nodeChange(this.node, val, event);
      }
      this.fire('nodeChange', this.node, val);
      return this.shouldSet = true;
    };

    AbstractBinding.prototype._fireDataChange = function(value) {
      if (this.shouldSet) {
        if (typeof this.dataChange === "function") {
          this.dataChange(value, this.node);
        }
        return this.fire('dataChange', value, this.node);
      }
    };

    AbstractBinding.prototype.die = function() {
      var _ref;
      this.forget();
      if ((_ref = this._batman.properties) != null) {
        _ref.forEach(function(key, property) {
          return property.die();
        });
      }
      this.node = null;
      this.keyPath = null;
      this.view = null;
      this.backingView = null;
      return this.superview = null;
    };

    AbstractBinding.prototype.parseFilter = function() {
      var args, e, filter, filterName, filterString, filters, key, keyPath, orig, split, _ref, _ref1;
      this.filterFunctions = [];
      this.filterArguments = [];
      keyPath = this.keyPath;
      while (get_dot_rx.test(keyPath)) {
        keyPath = keyPath.replace(get_dot_rx, "]['$1']");
      }
      filters = keyPath.replace(get_rx, " | get $1 ").replace(/'/g, '"').split(/(?!")\s+\|\s+(?!")/);
      try {
        key = this.parseSegment(orig = filters.shift())[0];
      } catch (_error) {
        e = _error;
        Batman.developer.warn(e);
        Batman.developer.error("Error! Couldn't parse keypath in \"" + orig + "\". Parsing error above.");
      }
      if (key && key._keypath) {
        this.key = key._keypath;
      } else {
        this.value = key;
      }
      if (filters.length) {
        while (filterString = filters.shift()) {
          split = filterString.indexOf(' ');
          if (split === -1) {
            split = filterString.length;
          }
          filterName = filterString.substr(0, split);
          args = filterString.substr(split);
          if (!(filter = ((_ref = this.view) != null ? (_ref1 = _ref._batman.get('filters')) != null ? _ref1[filterName] : void 0 : void 0) || Batman.Filters[filterName])) {
            return Batman.developer.error("Unrecognized filter '" + filterName + "' in key \"" + this.keyPath + "\"!");
          }
          this.filterFunctions.push(filter);
          try {
            this.filterArguments.push(this.parseSegment(args));
          } catch (_error) {
            e = _error;
            Batman.developer.error("Bad filter arguments \"" + args + "\"!");
          }
        }
        return true;
      }
    };

    AbstractBinding.prototype.parseSegment = function(segment) {
      segment = segment.replace(keypath_rx, function(match, start, bool, string, object, keypath, offset) {
        var replacement;
        if (start == null) {
          start = '';
        }
        replacement = keypath ? '{"_keypath": "' + keypath + '"}' : bool || string || object;
        return start + replacement;
      });
      return JSON.parse("[" + segment + "]");
    };

    AbstractBinding.prototype.setupBackingView = function(viewClass, viewOptions) {
      if (this.backingView) {
        return this.backingView;
      }
      if (this.node && (this.backingView = Batman._data(this.node, 'view'))) {
        return this.backingView;
      }
      this.superview = this.view;
      viewOptions || (viewOptions = {});
      if (viewOptions.node == null) {
        viewOptions.node = this.node;
      }
      if (viewOptions.parentNode == null) {
        viewOptions.parentNode = this.node;
      }
      viewOptions.isBackingView = true;
      this.backingView = new (viewClass || Batman.BackingView)(viewOptions);
      this.superview.subviews.add(this.backingView);
      if (this.node) {
        Batman._data(this.node, 'view', this.backingView);
      }
      return this.backingView;
    };

    return AbstractBinding;

  })(Batman.Object);

  Batman.BackingView = (function(_super) {
    __extends(BackingView, _super);

    function BackingView() {
      _ref = BackingView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BackingView.prototype.isBackingView = true;

    BackingView.prototype.bindImmediately = false;

    return BackingView;

  })(Batman.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.ViewBinding = (function(_super) {
    __extends(ViewBinding, _super);

    ViewBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    ViewBinding.prototype.skipChildren = true;

    ViewBinding.prototype.bindImmediately = false;

    function ViewBinding(definition) {
      this.superview = definition.view;
      ViewBinding.__super__.constructor.apply(this, arguments);
    }

    ViewBinding.prototype.initialized = function() {
      return this.bind();
    };

    ViewBinding.prototype.dataChange = function(viewClassOrInstance) {
      var attributeName, definition, keyPath, option, options, _i, _len, _ref;
      if ((_ref = this.viewInstance) != null) {
        _ref.removeFromSuperview();
      }
      if (!viewClassOrInstance) {
        return;
      }
      if (viewClassOrInstance.isView) {
        this.fromViewClass = false;
        this.viewInstance = viewClassOrInstance;
        this.viewInstance.removeFromSuperview();
      } else {
        this.fromViewClass = true;
        this.viewInstance = new viewClassOrInstance;
      }
      this.node.removeAttribute('data-view');
      if (options = this.viewInstance.constructor._batman.get('options')) {
        for (_i = 0, _len = options.length; _i < _len; _i++) {
          option = options[_i];
          attributeName = "data-view-" + (option.toLowerCase());
          if (keyPath = this.node.getAttribute(attributeName)) {
            this.node.removeAttribute(attributeName);
            definition = new Batman.DOM.ReaderBindingDefinition(this.node, keyPath, this.superview);
            new Batman.DOM.ViewArgumentBinding(definition, option, this.viewInstance);
          }
        }
      }
      this.viewInstance.set('parentNode', this.node);
      this.viewInstance.set('node', this.node);
      this.viewInstance.loadView(this.node);
      return this.superview.subviews.add(this.viewInstance);
    };

    ViewBinding.prototype.die = function() {
      if (this.fromViewClass) {
        this.viewInstance.die();
      } else {
        this.viewInstance.removeFromSuperview();
      }
      this.superview = null;
      this.viewInstance = null;
      return ViewBinding.__super__.die.apply(this, arguments);
    };

    return ViewBinding;

  })(Batman.DOM.AbstractBinding);

  Batman.DOM.ViewArgumentBinding = (function(_super) {
    __extends(ViewArgumentBinding, _super);

    ViewArgumentBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    function ViewArgumentBinding(definition, option, targetView) {
      var _this = this;
      this.option = option;
      this.targetView = targetView;
      ViewArgumentBinding.__super__.constructor.call(this, definition);
      this.targetView.observe(this.option, this._updateValue = function(value) {
        if (_this.isDataChanging) {
          return;
        }
        return _this.view.setKeypath(_this.keyPath, value);
      });
    }

    ViewArgumentBinding.prototype.dataChange = function(value) {
      this.isDataChanging = true;
      this.targetView.set(this.option, value);
      return this.isDataChanging = false;
    };

    ViewArgumentBinding.prototype.die = function() {
      this.targetView.forget(this.option, this._updateValue);
      this.targetView = null;
      return ViewArgumentBinding.__super__.die.apply(this, arguments);
    };

    return ViewArgumentBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.ValueBinding = (function(_super) {
    __extends(ValueBinding, _super);

    function ValueBinding(definition) {
      var _ref;
      this.isInputBinding = (_ref = definition.node.nodeName.toLowerCase()) === 'input' || _ref === 'textarea';
      ValueBinding.__super__.constructor.apply(this, arguments);
    }

    ValueBinding.prototype.nodeChange = function(node, context) {
      if (this.isTwoWay()) {
        return this.set('filteredValue', this.node.value);
      }
    };

    ValueBinding.prototype.dataChange = function(value, node) {
      return Batman.DOM.valueForNode(this.node, value, this.escapeValue);
    };

    return ValueBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.ShowHideBinding = (function(_super) {
    __extends(ShowHideBinding, _super);

    ShowHideBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    function ShowHideBinding(definition) {
      var display;
      display = definition.node.style.display;
      if (!display || display === 'none') {
        display = '';
      }
      this.originalDisplay = display;
      this.invert = definition.invert;
      ShowHideBinding.__super__.constructor.apply(this, arguments);
    }

    ShowHideBinding.prototype.dataChange = function(value) {
      var view;
      view = Batman.View.viewForNode(this.node, false);
      if (!!value === !this.invert) {
        if (view != null) {
          view.fireAndCall('viewWillShow');
        }
        this.node.style.display = this.originalDisplay;
        return view != null ? view.fireAndCall('viewDidShow') : void 0;
      } else {
        if (view != null) {
          view.fireAndCall('viewWillHide');
        }
        Batman.DOM.setStyleProperty(this.node, 'display', 'none', 'important');
        return view != null ? view.fireAndCall('viewDidHide') : void 0;
      }
    };

    return ShowHideBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Batman.SelectView = (function(_super) {
    __extends(SelectView, _super);

    function SelectView() {
      _ref = SelectView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SelectView.prototype._addChildBinding = function(binding) {
      SelectView.__super__._addChildBinding.apply(this, arguments);
      return this.fire('childBindingAdded', binding);
    };

    return SelectView;

  })(Batman.BackingView);

  Batman.DOM.SelectBinding = (function(_super) {
    __extends(SelectBinding, _super);

    SelectBinding.prototype.backWithView = Batman.SelectView;

    SelectBinding.prototype.isInputBinding = true;

    SelectBinding.prototype.canSetImplicitly = true;

    SelectBinding.prototype.skipChildren = true;

    function SelectBinding(definition) {
      this.updateOptionBindings = __bind(this.updateOptionBindings, this);
      this.nodeChange = __bind(this.nodeChange, this);
      this.dataChange = __bind(this.dataChange, this);
      this.childBindingAdded = __bind(this.childBindingAdded, this);
      SelectBinding.__super__.constructor.apply(this, arguments);
      this.node.removeAttribute('data-bind');
      this.node.removeAttribute('data-source');
      this.node.removeAttribute('data-target');
      this.backingView.on('childBindingAdded', this.childBindingAdded);
      this.backingView.initializeBindings();
    }

    SelectBinding.prototype.die = function() {
      this.backingView.off('childBindingAdded', this.childBindingAdded);
      return SelectBinding.__super__.die.apply(this, arguments);
    };

    SelectBinding.prototype.childBindingAdded = function(binding) {
      var _this = this;
      if (binding instanceof Batman.DOM.CheckedBinding) {
        binding.on('dataChange', this.nodeChange);
      } else if (binding instanceof Batman.DOM.IteratorBinding) {
        binding.backingView.on('itemsWereRendered', function() {
          return _this._fireDataChange(_this.get('filteredValue'));
        });
      } else {
        return;
      }
      return this._fireDataChange(this.get('filteredValue'));
    };

    SelectBinding.prototype.lastKeyContext = null;

    SelectBinding.prototype.dataChange = function(newValue) {
      var child, matches, valueToChild, _i, _len, _name, _ref1,
        _this = this;
      this.lastKeyContext || (this.lastKeyContext = this.get('keyContext'));
      if (this.lastKeyContext !== this.get('keyContext')) {
        this.canSetImplicitly = true;
        this.lastKeyContext = this.get('keyContext');
      }
      if (newValue != null ? newValue.forEach : void 0) {
        valueToChild = {};
        _ref1 = this.node.children;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          child = _ref1[_i];
          child.selected = false;
          matches = valueToChild[_name = child.value] || (valueToChild[_name] = []);
          matches.push(child);
        }
        newValue.forEach(function(value) {
          var children, node, _j, _len1;
          if (children = valueToChild[value]) {
            for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
              node = children[_j];
              node.selected = true;
            }
          }
        });
      } else {
        if ((newValue == null) && this.canSetImplicitly) {
          if (this.node.value) {
            this.canSetImplicitly = false;
            this.set('unfilteredValue', this.node.value);
          }
        } else {
          this.canSetImplicitly = false;
          Batman.DOM.valueForNode(this.node, newValue, this.escapeValue);
        }
      }
      this.updateOptionBindings();
      this.fixSelectElementWidth();
    };

    SelectBinding.prototype.nodeChange = function() {
      var selections;
      if (this.isTwoWay()) {
        selections = Batman.DOM.valueForNode(this.node);
        if (typeof selections === Array && selections.length === 1) {
          selections = selections[0];
        }
        this.set('unfilteredValue', selections);
        this.updateOptionBindings();
      }
    };

    SelectBinding.prototype.updateOptionBindings = function() {
      var binding, _i, _len, _ref1;
      _ref1 = this.backingView.bindings;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        binding = _ref1[_i];
        if (binding instanceof Batman.DOM.CheckedBinding) {
          binding._fireNodeChange();
        }
      }
    };

    SelectBinding.prototype.fixSelectElementWidth = function() {
      var _this = this;
      if (window.navigator.userAgent.toLowerCase().indexOf('msie') === -1) {
        return;
      }
      if (this._fixWidthTimeout) {
        clearTimeout(this._fixWidthTimeout);
      }
      return this._fixWidthTimeout = setTimeout(function() {
        _this._fixWidthTimeout = null;
        return _this._fixSelectElementWidth();
      }, 100);
    };

    SelectBinding.prototype._fixSelectElementWidth = function() {
      var previousWidth, style, _ref1;
      style = (_ref1 = this.get('node')) != null ? _ref1.style : void 0;
      if (!style) {
        return;
      }
      previousWidth = this.get('node').currentStyle.width;
      style.width = '100%';
      return style.width = previousWidth != null ? previousWidth : '';
    };

    return SelectBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.RouteBinding = (function(_super) {
    __extends(RouteBinding, _super);

    RouteBinding.prototype.onAnchorTag = false;

    RouteBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    RouteBinding.accessor('dispatcher', function() {
      return this.view.lookupKeypath('dispatcher') || Batman.App.get('current.dispatcher');
    });

    function RouteBinding() {
      this.routeClick = __bind(this.routeClick, this);
      var definition, paramKeypath;
      RouteBinding.__super__.constructor.apply(this, arguments);
      if (paramKeypath = this.node.getAttribute('data-route-params')) {
        definition = new Batman.DOM.ReaderBindingDefinition(this.node, paramKeypath, this.view);
        this.set('queryParams', new Batman.DOM.RouteParamsBinding(definition, this));
      }
    }

    RouteBinding.prototype.bind = function() {
      var _ref;
      if ((_ref = this.node.nodeName) === 'a' || _ref === 'A') {
        this.onAnchorTag = true;
      }
      RouteBinding.__super__.bind.apply(this, arguments);
      if (this.onAnchorTag && this.node.getAttribute('target')) {
        return;
      }
      return Batman.DOM.events.primaryInteractionEvent(this.node, this.routeClick);
    };

    RouteBinding.prototype.routeClick = function(node, event) {
      var path;
      if (event.__batmanActionTaken) {
        return;
      }
      event.__batmanActionTaken = true;
      path = this.generatePath(this.get('filteredValue'), this.get('queryParams.filteredValue'));
      if (path != null) {
        return Batman.redirect(path);
      }
    };

    RouteBinding.prototype.dataChange = function(value, node, queryParams) {
      var path;
      if (value) {
        path = this.generatePath(value, queryParams || this.get('queryParams.filteredValue'));
      }
      if (this.onAnchorTag) {
        if (path && Batman.navigator) {
          path = Batman.navigator.linkTo(path);
        } else {
          path = "#";
        }
        return this.node.href = path;
      }
    };

    RouteBinding.prototype.generatePath = function(value, params) {
      var path, uri, _ref;
      path = (value != null ? value.isNamedRouteQuery : void 0) ? value.get('path') : (_ref = this.get('dispatcher')) != null ? _ref.pathFromParams(value) : void 0;
      if (!params || !path) {
        return path;
      }
      if (Batman.typeOf(params) === 'Object') {
        if (params.toObject != null) {
          params = params.toObject();
        }
      } else {
        params = Batman.URI.paramsFromQuery(params);
      }
      uri = new Batman.URI(path);
      uri.queryParams = params;
      return uri.toString();
    };

    return RouteBinding;

  })(Batman.DOM.AbstractBinding);

  Batman.DOM.RouteParamsBinding = (function(_super) {
    __extends(RouteParamsBinding, _super);

    RouteParamsBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    function RouteParamsBinding(definition, routeBinding) {
      this.routeBinding = routeBinding;
      RouteParamsBinding.__super__.constructor.call(this, definition);
    }

    RouteParamsBinding.prototype.dataChange = function(value) {
      return this.routeBinding.dataChange(this.routeBinding.get('filteredValue'), this.node, value);
    };

    return RouteParamsBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.RadioBinding = (function(_super) {
    __extends(RadioBinding, _super);

    function RadioBinding() {
      _ref = RadioBinding.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RadioBinding.accessor('parsedNodeValue', function() {
      return Batman.DOM.attrReaders._parseAttribute(this.node.value);
    });

    RadioBinding.prototype.firstBind = true;

    RadioBinding.prototype.dataChange = function(value) {
      var boundValue;
      boundValue = this.get('filteredValue');
      if (boundValue != null) {
        this.node.checked = boundValue === Batman.DOM.attrReaders._parseAttribute(this.node.value);
      } else {
        if (this.firstBind && this.node.checked) {
          this.set('filteredValue', this.get('parsedNodeValue'));
        }
      }
      return this.firstBind = false;
    };

    RadioBinding.prototype.nodeChange = function(node) {
      if (this.isTwoWay()) {
        return this.set('filteredValue', this.get('parsedNodeValue'));
      }
    };

    return RadioBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.FileBinding = (function(_super) {
    __extends(FileBinding, _super);

    FileBinding.prototype.isInputBinding = true;

    function FileBinding() {
      FileBinding.__super__.constructor.apply(this, arguments);
      this.view.set('fileAttributes', null);
    }

    FileBinding.prototype.nodeChange = function(node, subContext) {
      if (!this.isTwoWay()) {
        return;
      }
      if (node.hasAttribute('multiple')) {
        return this.set('filteredValue', Array.prototype.slice.call(node.files));
      } else {
        return this.set('filteredValue', node.files[0] || null);
      }
    };

    return FileBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DeferredRenderView = (function(_super) {
    __extends(DeferredRenderView, _super);

    function DeferredRenderView() {
      _ref = DeferredRenderView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DeferredRenderView.prototype.bindImmediately = false;

    return DeferredRenderView;

  })(Batman.View);

  Batman.DOM.DeferredRenderBinding = (function(_super) {
    __extends(DeferredRenderBinding, _super);

    DeferredRenderBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    DeferredRenderBinding.prototype.backWithView = Batman.DeferredRenderView;

    DeferredRenderBinding.prototype.skipChildren = true;

    function DeferredRenderBinding(definition) {
      this.invert = definition.invert;
      this.attributeName = this.invert ? 'data-deferif' : 'data-renderif';
      DeferredRenderBinding.__super__.constructor.apply(this, arguments);
    }

    DeferredRenderBinding.prototype.dataChange = function(value) {
      if (!!value === !this.invert && !this.backingView.isBound) {
        this.node.removeAttribute(this.attributeName);
        return this.backingView.initializeBindings();
      }
    };

    return DeferredRenderBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.developer["do"](function() {
    var DebuggerBinding;
    DebuggerBinding = (function(_super) {
      __extends(DebuggerBinding, _super);

      function DebuggerBinding() {
        DebuggerBinding.__super__.constructor.apply(this, arguments);
        debugger;
      }

      return DebuggerBinding;

    })(Batman.DOM.AbstractBinding);
    return Batman.DOM.readers.debug = function(definition) {
      return new DebuggerBinding(definition);
    };
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.AbstractAttributeBinding = (function(_super) {
    __extends(AbstractAttributeBinding, _super);

    function AbstractAttributeBinding(definition) {
      this.attributeName = definition.attr;
      AbstractAttributeBinding.__super__.constructor.apply(this, arguments);
    }

    return AbstractAttributeBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Tracking = {
    loadTracker: function() {
      if (Batman.Tracking.tracker) {
        return Batman.Tracking.tracker;
      }
      Batman.Tracking.tracker = Batman.currentApp.EventTracker ? new Batman.currentApp.EventTracker : (Batman.developer.warn("Define " + Batman.currentApp.name + ".EventTracker to use data-track"), {
        track: function() {}
      });
      return Batman.Tracking.tracker;
    },
    trackEvent: function(type, data, node) {
      return Batman.Tracking.loadTracker().track(type, data, node);
    }
  };

  Batman.DOM.ClickTrackingBinding = (function(_super) {
    __extends(ClickTrackingBinding, _super);

    ClickTrackingBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.None;

    ClickTrackingBinding.prototype.bindImmediately = false;

    function ClickTrackingBinding() {
      var callback,
        _this = this;
      ClickTrackingBinding.__super__.constructor.apply(this, arguments);
      callback = function() {
        return Batman.Tracking.trackEvent('click', _this.get('filteredValue'), _this.node);
      };
      Batman.DOM.events.click(this.node, callback, this.view, 'click', false);
      this.bind();
    }

    return ClickTrackingBinding;

  })(Batman.DOM.AbstractAttributeBinding);

  Batman.DOM.ViewTrackingBinding = (function(_super) {
    __extends(ViewTrackingBinding, _super);

    ViewTrackingBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.None;

    function ViewTrackingBinding() {
      ViewTrackingBinding.__super__.constructor.apply(this, arguments);
      Batman.Tracking.trackEvent('view', this.get('filteredValue'), this.node);
    }

    return ViewTrackingBinding;

  })(Batman.DOM.AbstractAttributeBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.EventBinding = (function(_super) {
    __extends(EventBinding, _super);

    EventBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.None;

    EventBinding.prototype.bindImmediately = false;

    function EventBinding() {
      var attacher, callback,
        _this = this;
      EventBinding.__super__.constructor.apply(this, arguments);
      callback = function() {
        var func, target;
        func = _this.get('filteredValue');
        target = _this.view.targetForKeypath(_this.functionPath || _this.unfilteredKey);
        if (target && _this.functionPath) {
          target = Batman.get(target, _this.functionPath);
        }
        return func != null ? func.apply(target, arguments) : void 0;
      };
      if (attacher = Batman.DOM.events[this.attributeName]) {
        attacher(this.node, callback, this.view);
      } else {
        Batman.DOM.events.other(this.node, this.attributeName, callback, this.view);
      }
      this.bind();
    }

    EventBinding.prototype._unfilteredValue = function(key) {
      var index, value;
      this.unfilteredKey = key;
      if (!this.functionName && (index = key.lastIndexOf('.')) !== -1) {
        this.functionPath = key.substr(0, index);
        this.functionName = key.substr(index + 1);
      }
      value = EventBinding.__super__._unfilteredValue.call(this, this.functionPath || key);
      if (this.functionName) {
        return value != null ? value[this.functionName] : void 0;
      } else {
        return value;
      }
    };

    return EventBinding;

  })(Batman.DOM.AbstractAttributeBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.ContextBinding = (function(_super) {
    __extends(ContextBinding, _super);

    ContextBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    ContextBinding.prototype.backWithView = true;

    ContextBinding.prototype.bindingName = 'context';

    function ContextBinding(definition) {
      var contextAttribute,
        _this = this;
      this.contextKeypath = definition.attr || 'proxiedObject';
      ContextBinding.__super__.constructor.apply(this, arguments);
      contextAttribute = this.attributeName ? "data-" + this.bindingName + "-" + this.attributeName : "data-" + this.bindingName;
      this.node.removeAttribute(contextAttribute);
      this.node.insertBefore(document.createComment("batman-" + contextAttribute + "=\"" + this.keyPath + "\""), this.node.firstChild);
      this.backingView.observe(this.contextKeypath, this._updateValue = function(value) {
        if (_this.isDataChanging) {
          return;
        }
        return _this.view.setKeypath(_this.keyPath, value);
      });
    }

    ContextBinding.prototype.dataChange = function(proxiedObject) {
      this.isDataChanging = true;
      this.backingView.set(this.contextKeypath, proxiedObject);
      return this.isDataChanging = false;
    };

    ContextBinding.prototype.die = function() {
      this.backingView.forget(this.contextKeypath, this._updateValue);
      this.backingView.unset(this.contextKeypath);
      return ContextBinding.__super__.die.apply(this, arguments);
    };

    return ContextBinding;

  })(Batman.DOM.AbstractAttributeBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.FormBinding = (function(_super) {
    __extends(FormBinding, _super);

    FormBinding.prototype.bindingName = 'formfor';

    FormBinding.prototype.errorClass = 'error';

    FormBinding.prototype.defaultErrorsListSelector = 'div.errors';

    function FormBinding(definition) {
      FormBinding.__super__.constructor.apply(this, arguments);
      this.initializeErrorsList();
      this.initializeChildBindings();
      Batman.DOM.events.submit(this.node, function(node, e) {
        return Batman.DOM.preventDefault(e);
      });
    }

    FormBinding.prototype.initializeChildBindings = function() {
      var attribute, attributeName, binding, errorsNode, field, index, keyPath, selectedNode, selectedNodes, selectors, _i, _len;
      keyPath = this.keyPath;
      attribute = this.attributeName;
      selectors = ['input', 'textarea', 'select'].map(function(nodeName) {
        return "" + nodeName + "[data-bind^=\"" + attribute + "\"]";
      });
      selectedNodes = Batman.DOM.querySelectorAll(this.node, selectors.join(', '));
      attributeName = "data-addclass-" + this.errorClass;
      for (_i = 0, _len = selectedNodes.length; _i < _len; _i++) {
        selectedNode = selectedNodes[_i];
        if (!(!selectedNode.getAttribute(attributeName))) {
          continue;
        }
        binding = selectedNode.getAttribute('data-bind');
        field = binding.substr(binding.indexOf(attribute) + attribute.length + 1);
        index = field.indexOf('|');
        if (index !== -1) {
          field = field.substr(0, index);
        }
        field = field.trim();
        selectedNode.setAttribute(attributeName, "" + attribute + ".errors." + field + ".length");
      }
      errorsNode = Batman.DOM.querySelector(this.node, '.errors');
      if (errorsNode && !errorsNode.getAttribute('data-showif')) {
        errorsNode.setAttribute('data-showif', "" + attribute + ".errors.length");
      }
    };

    FormBinding.prototype.initializeErrorsList = function() {
      var errorsNode, selector;
      selector = this.node.getAttribute('data-errors-list') || this.defaultErrorsListSelector;
      if (errorsNode = Batman.DOM.querySelector(this.node, selector)) {
        return Batman.DOM.setInnerHTML(errorsNode, this.errorsListHTML());
      }
    };

    FormBinding.prototype.errorsListHTML = function() {
      return "<ul>\n  <li data-foreach-error=\"" + this.attributeName + ".errors\" data-bind=\"error.fullMessage\"></li>\n</ul>";
    };

    return FormBinding;

  })(Batman.DOM.ContextBinding);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.NodeAttributeBinding = (function(_super) {
    __extends(NodeAttributeBinding, _super);

    function NodeAttributeBinding() {
      _ref = NodeAttributeBinding.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    NodeAttributeBinding.prototype.dataChange = function(value) {
      if (value == null) {
        value = "";
      }
      return this.node[this.attributeName] = value;
    };

    NodeAttributeBinding.prototype.nodeChange = function(node) {
      if (this.isTwoWay()) {
        return this.set('filteredValue', Batman.DOM.attrReaders._parseAttribute(node[this.attributeName]));
      }
    };

    return NodeAttributeBinding;

  })(Batman.DOM.AbstractAttributeBinding);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.CheckedBinding = (function(_super) {
    __extends(CheckedBinding, _super);

    function CheckedBinding() {
      _ref = CheckedBinding.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CheckedBinding.prototype.isInputBinding = true;

    CheckedBinding.prototype.dataChange = function(value) {
      return this.node[this.attributeName] = !!value;
    };

    return CheckedBinding;

  })(Batman.DOM.NodeAttributeBinding);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.AttributeBinding = (function(_super) {
    __extends(AttributeBinding, _super);

    function AttributeBinding() {
      _ref = AttributeBinding.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AttributeBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    AttributeBinding.prototype.dataChange = function(value) {
      return this.node.setAttribute(this.attributeName, value);
    };

    AttributeBinding.prototype.nodeChange = function(node) {
      if (this.isTwoWay()) {
        return this.set('filteredValue', Batman.DOM.attrReaders._parseAttribute(node.getAttribute(this.attributeName)));
      }
    };

    return AttributeBinding;

  })(Batman.DOM.AbstractAttributeBinding);

}).call(this);

(function() {
  var redundantWhitespaceRegex,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  redundantWhitespaceRegex = /[ \t]{2,}/g;

  Batman.DOM.AddClassBinding = (function(_super) {
    __extends(AddClassBinding, _super);

    AddClassBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    function AddClassBinding(definition) {
      var name;
      this.invert = definition.invert;
      this.classes = (function() {
        var _i, _len, _ref, _results;
        _ref = definition.attr.split('|');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          name = _ref[_i];
          _results.push({
            name: name,
            pattern: new RegExp("(?:^|\\s)" + name + "(?:$|\\s)", 'i')
          });
        }
        return _results;
      })();
      AddClassBinding.__super__.constructor.apply(this, arguments);
    }

    AddClassBinding.prototype.dataChange = function(value) {
      var currentName, includesClassName, name, pattern, _i, _len, _ref, _ref1;
      currentName = this.node.className;
      _ref = this.classes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], name = _ref1.name, pattern = _ref1.pattern;
        includesClassName = pattern.test(currentName);
        if (!!value === !this.invert) {
          if (!includesClassName) {
            currentName = "" + currentName + " " + name;
          }
        } else {
          if (includesClassName) {
            currentName = currentName.replace(pattern, ' ');
          }
        }
      }
      this.node.className = currentName.trim().replace(redundantWhitespaceRegex, ' ');
      return true;
    };

    return AddClassBinding;

  })(Batman.DOM.AbstractAttributeBinding);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.AbstractCollectionBinding = (function(_super) {
    __extends(AbstractCollectionBinding, _super);

    function AbstractCollectionBinding() {
      _ref = AbstractCollectionBinding.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AbstractCollectionBinding.prototype.dataChange = function(collection) {
      var items, _items;
      if (collection != null) {
        if (!this.bindCollection(collection)) {
          items = (collection != null ? collection.forEach : void 0) ? (_items = [], collection.forEach(function(item) {
            return _items.push(item);
          }), _items) : Object.keys(collection);
          this.handleArrayChanged(items);
        }
      } else {
        this.unbindCollection();
        this.collection = [];
        this.handleArrayChanged([]);
      }
    };

    AbstractCollectionBinding.prototype.bindCollection = function(newCollection) {
      var _ref1;
      if (newCollection instanceof Batman.Hash) {
        newCollection = newCollection.meta;
      }
      if (newCollection === this.collection) {
        return true;
      } else {
        this.unbindCollection();
        this.collection = newCollection;
        if (!((_ref1 = this.collection) != null ? _ref1.isObservable : void 0)) {
          return false;
        }
        if (this.collection.isCollectionEventEmitter && this.handleItemsAdded && this.handleItemsRemoved && this.handleItemMoved) {
          this.collection.on('itemsWereAdded', this.handleItemsAdded);
          this.collection.on('itemsWereRemoved', this.handleItemsRemoved);
          this.collection.on('itemWasMoved', this.handleItemMoved);
          this.handleArrayChanged(this.collection.toArray());
        } else {
          this.collection.observeAndFire('toArray', this.handleArrayChanged);
        }
        return true;
      }
    };

    AbstractCollectionBinding.prototype.unbindCollection = function() {
      var _ref1;
      if (!((_ref1 = this.collection) != null ? _ref1.isObservable : void 0)) {
        return;
      }
      if (this.collection.isCollectionEventEmitter && this.handleItemsAdded && this.handleItemsRemoved && this.handleItemMoved) {
        this.collection.off('itemsWereAdded', this.handleItemsAdded);
        this.collection.off('itemsWereRemoved', this.handleItemsRemoved);
        return this.collection.off('itemWasMoved', this.handleItemMoved);
      } else {
        return this.collection.forget('toArray', this.handleArrayChanged);
      }
    };

    AbstractCollectionBinding.prototype.handleArrayChanged = function() {};

    AbstractCollectionBinding.prototype.die = function() {
      this.unbindCollection();
      this.collection = null;
      return AbstractCollectionBinding.__super__.die.apply(this, arguments);
    };

    return AbstractCollectionBinding;

  })(Batman.DOM.AbstractAttributeBinding);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.DOM.StyleBinding = (function(_super) {
    __extends(StyleBinding, _super);

    StyleBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    function StyleBinding() {
      this.setStyle = __bind(this.setStyle, this);
      this.handleArrayChanged = __bind(this.handleArrayChanged, this);
      this.oldStyles = {};
      this.styleBindings = {};
      StyleBinding.__super__.constructor.apply(this, arguments);
    }

    StyleBinding.prototype.dataChange = function(value) {
      var colonSplitCSSValues, cssName, key, style, _i, _len, _ref, _ref1;
      if (!value) {
        this.resetStyles();
        return;
      }
      this.unbindCollection();
      if (typeof value === 'string') {
        this.resetStyles();
        _ref = value.split(';');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          style = _ref[_i];
          _ref1 = style.split(":"), cssName = _ref1[0], colonSplitCSSValues = 2 <= _ref1.length ? __slice.call(_ref1, 1) : [];
          this.setStyle(cssName, colonSplitCSSValues.join(":"));
        }
        return;
      }
      if (value instanceof Batman.Hash) {
        this.bindCollection(value);
      } else {
        if (value instanceof Batman.Object) {
          value = value.toJSON();
        }
        this.resetStyles();
        for (key in value) {
          if (!__hasProp.call(value, key)) continue;
          this.bindSingleAttribute(key, "" + this.keyPath + "." + key);
        }
      }
    };

    StyleBinding.prototype.handleArrayChanged = function(array) {
      var _this = this;
      return this.collection.forEach(function(key, value) {
        return _this.bindSingleAttribute(key, "" + _this.keyPath + "." + key);
      });
    };

    StyleBinding.prototype.bindSingleAttribute = function(attr, keyPath) {
      var definition;
      definition = new Batman.DOM.AttrReaderBindingDefinition(this.node, attr, keyPath, this.view);
      return this.styleBindings[attr] = new Batman.DOM.StyleBinding.SingleStyleBinding(definition, this);
    };

    StyleBinding.prototype.setStyle = function(key, value) {
      key = Batman.helpers.camelize(key.trim(), true);
      if (key === "") {
        return false;
      }
      if (this.oldStyles[key] == null) {
        this.oldStyles[key] = this.node.style[key] || "";
      }
      if (value != null ? value.trim : void 0) {
        value = value.trim();
      }
      if (value == null) {
        value = "";
      }
      return this.node.style[key] = value;
    };

    StyleBinding.prototype.resetStyles = function() {
      var cssName, cssValue, _ref;
      _ref = this.oldStyles;
      for (cssName in _ref) {
        if (!__hasProp.call(_ref, cssName)) continue;
        cssValue = _ref[cssName];
        this.setStyle(cssName, cssValue);
      }
    };

    StyleBinding.prototype.resetBindings = function() {
      var attribute, binding, _ref;
      _ref = this.styleBindings;
      for (attribute in _ref) {
        binding = _ref[attribute];
        binding._fireDataChange('');
        binding.die();
      }
      return this.styleBindings = {};
    };

    StyleBinding.prototype.unbindCollection = function() {
      this.resetBindings();
      return StyleBinding.__super__.unbindCollection.apply(this, arguments);
    };

    StyleBinding.SingleStyleBinding = (function(_super1) {
      __extends(SingleStyleBinding, _super1);

      SingleStyleBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

      SingleStyleBinding.prototype.isTwoWay = function() {
        return false;
      };

      function SingleStyleBinding(definition, parent) {
        this.parent = parent;
        SingleStyleBinding.__super__.constructor.call(this, definition);
      }

      SingleStyleBinding.prototype.dataChange = function(value) {
        return this.parent.setStyle(this.attributeName, value);
      };

      return SingleStyleBinding;

    })(Batman.DOM.AbstractAttributeBinding);

    return StyleBinding;

  })(Batman.DOM.AbstractCollectionBinding);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.ClassBinding = (function(_super) {
    __extends(ClassBinding, _super);

    ClassBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    function ClassBinding() {
      this.handleArrayChanged = __bind(this.handleArrayChanged, this);
      this.existingClasses = arguments[0].node.className.split(' ');
      ClassBinding.__super__.constructor.apply(this, arguments);
    }

    ClassBinding.prototype.dataChange = function(value) {
      var newClasses;
      if (value != null) {
        this.unbindCollection();
        if (typeof value === 'string') {
          newClasses = [value].concat(this.existingClasses);
          return this.node.className = newClasses.join(' ').trim();
        } else {
          this.bindCollection(value);
          return this.updateFromCollection();
        }
      }
    };

    ClassBinding.prototype.updateFromCollection = function() {
      var array, existingClasses, k, newClasses, v;
      if (this.collection) {
        array = this.collection.map ? this.collection.map(function(x) {
          return x;
        }) : (function() {
          var _ref, _results;
          _ref = this.collection;
          _results = [];
          for (k in _ref) {
            if (!__hasProp.call(_ref, k)) continue;
            v = _ref[k];
            _results.push(k);
          }
          return _results;
        }).call(this);
        if (array.toArray != null) {
          array = array.toArray();
        }
        existingClasses = this.existingClasses.slice(0);
        newClasses = array.filter(function(val) {
          return existingClasses.indexOf(val) === -1;
        });
        return this.node.className = existingClasses.concat(newClasses).join(' ').trim();
      }
    };

    ClassBinding.prototype.handleArrayChanged = function() {
      return this.updateFromCollection();
    };

    return ClassBinding;

  })(Batman.DOM.AbstractCollectionBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.InsertionBinding = (function(_super) {
    __extends(InsertionBinding, _super);

    InsertionBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    InsertionBinding.prototype.bindImmediately = false;

    function InsertionBinding(definition) {
      this.invert = definition.invert;
      InsertionBinding.__super__.constructor.apply(this, arguments);
      this.placeholderNode = document.createComment("batman-insertif=\"" + this.keyPath + "\"");
    }

    InsertionBinding.prototype.initialized = function() {
      return this.bind();
    };

    InsertionBinding.prototype.dataChange = function(value) {
      var parentNode, view;
      view = Batman.View.viewForNode(this.node, false);
      parentNode = this.placeholderNode.parentNode || this.node.parentNode;
      if (!!value === !this.invert) {
        if (view != null) {
          view.fireAndCall('viewWillShow');
        }
        if (this.node.parentNode == null) {
          parentNode.insertBefore(this.node, this.placeholderNode);
          parentNode.removeChild(this.placeholderNode);
        }
        return view != null ? view.fireAndCall('viewDidShow') : void 0;
      } else {
        if (view != null) {
          view.fireAndCall('viewWillHide');
        }
        if (this.node.parentNode != null) {
          parentNode.insertBefore(this.placeholderNode, this.node);
          parentNode.removeChild(this.node);
        }
        return view != null ? view.fireAndCall('viewDidHide') : void 0;
      }
    };

    InsertionBinding.prototype.die = function() {
      this.placeholderNode = null;
      return InsertionBinding.__super__.die.apply(this, arguments);
    };

    return InsertionBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.IteratorView = (function(_super) {
    __extends(IteratorView, _super);

    function IteratorView() {
      _ref = IteratorView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    IteratorView.prototype.loadView = function() {
      return document.createComment("batman-iterator-" + this.iteratorName + "=\"" + this.iteratorPath + "\"");
    };

    IteratorView.prototype.addItems = function(items, indexes) {
      var i, item, _i, _j, _len, _len1;
      this._beginAppendItems();
      if (indexes) {
        for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
          item = items[i];
          this._insertItem(item, indexes[i]);
        }
      } else {
        for (_j = 0, _len1 = items.length; _j < _len1; _j++) {
          item = items[_j];
          this._insertItem(item);
        }
      }
      return this._finishAppendItems();
    };

    IteratorView.prototype.removeItems = function(items, indexes) {
      var i, item, subview, _i, _j, _len, _len1, _results, _results1;
      if (indexes) {
        _results = [];
        for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
          item = items[i];
          _results.push(this.subviews.at(indexes[i]).die());
        }
        return _results;
      } else {
        _results1 = [];
        for (_j = 0, _len1 = items.length; _j < _len1; _j++) {
          item = items[_j];
          _results1.push((function() {
            var _k, _len2, _ref1, _results2;
            _ref1 = this.subviews._storage;
            _results2 = [];
            for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
              subview = _ref1[_k];
              if (!(subview.get(this.attributeName) === item)) {
                continue;
              }
              subview.unset(this.attributeName);
              subview.die();
              break;
            }
            return _results2;
          }).call(this));
        }
        return _results1;
      }
    };

    IteratorView.prototype.moveItem = function(oldIndex, newIndex) {
      var source, target;
      source = this.subviews.at(oldIndex);
      this.subviews._storage.splice(oldIndex, 1);
      target = this.subviews.at(newIndex);
      this.subviews._storage.splice(newIndex, 0, source);
      return this.node.parentNode.insertBefore(source.node, (target != null ? target.node : void 0) || this.node);
    };

    IteratorView.prototype._beginAppendItems = function() {
      var viewClassName;
      if (!this.iterationViewClass && (viewClassName = this.prototypeNode.getAttribute('data-view'))) {
        this.iterationViewClass = this.lookupKeypath(viewClassName);
        this.prototypeNode.removeAttribute('data-view');
      }
      this.iterationViewClass || (this.iterationViewClass = Batman.IterationView);
      this.fragment = document.createDocumentFragment();
      this.appendedViews = [];
      return this.get('node');
    };

    IteratorView.prototype._insertItem = function(item, targetIndex) {
      var iterationView;
      iterationView = new this.iterationViewClass({
        node: this.prototypeNode.cloneNode(true),
        parentNode: this.fragment
      });
      iterationView.set(this.iteratorName, item);
      if (targetIndex != null) {
        iterationView._targeted = true;
        this.subviews.insert([iterationView], [targetIndex]);
      } else {
        this.subviews.add(iterationView);
      }
      iterationView.parentNode = null;
      return this.appendedViews.push(iterationView);
    };

    IteratorView.prototype._finishAppendItems = function() {
      var index, isInDOM, sibling, subview, _i, _j, _k, _len, _len1, _ref1, _ref2, _ref3, _ref4;
      isInDOM = Batman.DOM.containsNode(this.node);
      if (isInDOM) {
        _ref1 = this.appendedViews;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          subview = _ref1[_i];
          subview.propagateToSubviews('viewWillAppear');
        }
      }
      _ref2 = this.subviews.toArray();
      for (index = _j = _ref2.length - 1; _j >= 0; index = _j += -1) {
        subview = _ref2[index];
        if (!subview._targeted) {
          continue;
        }
        if (sibling = (_ref3 = this.subviews.at(index + 1)) != null ? _ref3.get('node') : void 0) {
          sibling.parentNode.insertBefore(subview.get('node'), sibling);
        } else {
          this.fragment.appendChild(subview.get('node'));
        }
        delete subview._targeted;
      }
      this.node.parentNode.insertBefore(this.fragment, this.node);
      this.fire('itemsWereRendered');
      if (isInDOM) {
        _ref4 = this.appendedViews;
        for (_k = 0, _len1 = _ref4.length; _k < _len1; _k++) {
          subview = _ref4[_k];
          subview.propagateToSubviews('isInDOM', isInDOM);
          subview.propagateToSubviews('viewDidAppear');
        }
      }
      this.appendedViews = null;
      return this.fragment = null;
    };

    return IteratorView;

  })(Batman.View);

  Batman.IterationView = (function(_super) {
    __extends(IterationView, _super);

    function IterationView() {
      _ref1 = IterationView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return IterationView;

  })(Batman.View);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.IteratorBinding = (function(_super) {
    __extends(IteratorBinding, _super);

    IteratorBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    IteratorBinding.prototype.backWithView = Batman.IteratorView;

    IteratorBinding.prototype.skipChildren = true;

    IteratorBinding.prototype.bindImmediately = false;

    function IteratorBinding(definition) {
      this.handleItemMoved = __bind(this.handleItemMoved, this);
      this.handleItemsRemoved = __bind(this.handleItemsRemoved, this);
      this.handleItemsAdded = __bind(this.handleItemsAdded, this);
      this.handleArrayChanged = __bind(this.handleArrayChanged, this);
      var _this = this;
      this.iteratorName = definition.attr;
      this.prototypeNode = definition.node;
      this.prototypeNode.removeAttribute("data-foreach-" + this.iteratorName);
      definition.viewOptions = {
        prototypeNode: this.prototypeNode,
        iteratorName: this.iteratorName,
        iteratorPath: definition.keyPath
      };
      definition.node = null;
      IteratorBinding.__super__.constructor.apply(this, arguments);
      this.backingView.set('attributeName', this.attributeName);
      this.view.prevent('ready');
      this._handle = Batman.setImmediate(function() {
        var parentNode;
        if (_this.backingView.isDead) {
          Batman.developer.warn("IteratorBinding (data-foreach-" + _this.iteratorName + "='" + _this.keyPath + "') trying to insert dead backing view into DOM (" + _this.view.constructor.name + ")");
          return;
        }
        parentNode = _this.prototypeNode.parentNode;
        parentNode.insertBefore(_this.backingView.get('node'), _this.prototypeNode);
        parentNode.removeChild(_this.prototypeNode);
        _this.bind();
        return _this.view.allowAndFire('ready');
      });
    }

    IteratorBinding.prototype.handleArrayChanged = function(newItems) {
      if (!this.backingView.isDead) {
        this.backingView.destroySubviews();
        if (newItems != null ? newItems.length : void 0) {
          return this.handleItemsAdded(newItems);
        }
      }
    };

    IteratorBinding.prototype.handleItemsAdded = function(addedItems, addedIndexes) {
      if (!this.backingView.isDead) {
        return this.backingView.addItems(addedItems, addedIndexes);
      }
    };

    IteratorBinding.prototype.handleItemsRemoved = function(removedItems, removedIndexes) {
      if (this.backingView.isDead) {
        return;
      }
      if (this.collection.length) {
        return this.backingView.removeItems(removedItems, removedIndexes);
      } else {
        return this.backingView.destroySubviews();
      }
    };

    IteratorBinding.prototype.handleItemMoved = function(item, newIndex, oldIndex) {
      if (!this.backingView.isDead) {
        return this.backingView.moveItem(oldIndex, newIndex);
      }
    };

    IteratorBinding.prototype.die = function() {
      if (this._handle) {
        Batman.clearImmediate(this._handle);
      }
      this.prototypeNode = null;
      return IteratorBinding.__super__.die.apply(this, arguments);
    };

    return IteratorBinding;

  })(Batman.DOM.AbstractCollectionBinding);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.StyleAttributeBinding = (function(_super) {
    __extends(StyleAttributeBinding, _super);

    function StyleAttributeBinding() {
      _ref = StyleAttributeBinding.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    StyleAttributeBinding.prototype.dataChange = function(value) {
      return this.node.style[Batman.Filters.camelize(this.attributeName, true)] = value;
    };

    return StyleAttributeBinding;

  })(Batman.DOM.NodeAttributeBinding);

}).call(this);

(function() {
  var isEmptyDataObject;

  isEmptyDataObject = function(obj) {
    var name;
    for (name in obj) {
      return false;
    }
    return true;
  };

  Batman.extend(Batman, {
    cache: {},
    uuid: 0,
    expando: "batman" + Math.random().toString().replace(/\D/g, ''),
    canDeleteExpando: (function() {
      var div, e;
      try {
        div = document.createElement('div');
        return delete div.test;
      } catch (_error) {
        e = _error;
        return Batman.canDeleteExpando = false;
      }
    })(),
    noData: {
      "embed": true,
      "EMBED": true,
      "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      "OBJECT": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      "applet": true,
      "APPLET": true
    },
    hasData: function(elem) {
      elem = (elem.nodeType ? Batman.cache[elem[Batman.expando]] : elem[Batman.expando]);
      return !!elem && !isEmptyDataObject(elem);
    },
    data: function(elem, name, data, pvt) {
      var cache, getByName, id, internalKey, ret, thisCache;
      if (!Batman.acceptData(elem)) {
        return;
      }
      internalKey = Batman.expando;
      getByName = typeof name === "string";
      cache = Batman.cache;
      id = elem[Batman.expando];
      if ((!id || (pvt && id && (cache[id] && !cache[id][internalKey]))) && getByName && data === void 0) {
        return;
      }
      if (!id) {
        if (elem.nodeType !== 3) {
          elem[Batman.expando] = id = ++Batman.uuid;
        } else {
          id = Batman.expando;
        }
      }
      if (!cache[id]) {
        cache[id] = {};
      }
      if (typeof name === "object" || typeof name === "function") {
        if (pvt) {
          cache[id][internalKey] = Batman.extend(cache[id][internalKey], name);
        } else {
          cache[id] = Batman.extend(cache[id], name);
        }
      }
      thisCache = cache[id];
      if (pvt) {
        thisCache[internalKey] || (thisCache[internalKey] = {});
        thisCache = thisCache[internalKey];
      }
      if (data !== void 0) {
        thisCache[name] = data;
      }
      if (getByName) {
        ret = thisCache[name];
      } else {
        ret = thisCache;
      }
      return ret;
    },
    removeData: function(elem, name, pvt, all) {
      var cache, id, internalCache, internalKey, isNode, thisCache;
      if (!Batman.acceptData(elem)) {
        return;
      }
      internalKey = Batman.expando;
      isNode = elem.nodeType;
      cache = Batman.cache;
      id = elem[Batman.expando];
      if (!cache[id]) {
        return;
      }
      if (name) {
        thisCache = pvt ? cache[id][internalKey] : cache[id];
        if (thisCache) {
          delete thisCache[name];
          if (!isEmptyDataObject(thisCache)) {
            return;
          }
        }
      }
      if (pvt) {
        delete cache[id][internalKey];
        if (!isEmptyDataObject(cache[id])) {
          return;
        }
      }
      internalCache = cache[id][internalKey];
      if (Batman.canDeleteExpando || !cache.setInterval) {
        delete cache[id];
      } else {
        cache[id] = null;
      }
      if (internalCache && !all) {
        cache[id] = {};
        return cache[id][internalKey] = internalCache;
      } else {
        if (Batman.canDeleteExpando) {
          return delete elem[Batman.expando];
        } else if (elem.removeAttribute) {
          return elem.removeAttribute(Batman.expando);
        } else {
          return elem[Batman.expando] = null;
        }
      }
    },
    _data: function(elem, name, data) {
      return Batman.data(elem, name, data, true);
    },
    acceptData: function(elem) {
      var match;
      if (!elem) {
        return;
      }
      return elem.___acceptData || (elem.___acceptData = elem.nodeName ? (match = Batman.noData[elem.nodeName], match ? !(match === true || elem.getAttribute("classid") !== match) : true) : true);
    }
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.Yield = (function(_super) {
    __extends(Yield, _super);

    Yield.yields = {};

    Yield.reset = function() {
      return this.yields = {};
    };

    Yield.withName = function(name) {
      var _base;
      return (_base = this.yields)[name] || (_base[name] = new this(name));
    };

    function Yield(name) {
      this.name = name;
    }

    Yield.accessor('contentView', {
      get: function() {
        return this.contentView;
      },
      set: function(key, view) {
        if (this.contentView === view) {
          return;
        }
        if (this.contentView) {
          this.contentView.removeFromSuperview();
        }
        this.contentView = view;
        if (this.containerNode && view) {
          return view.set('parentNode', this.containerNode);
        }
      }
    });

    Yield.accessor('containerNode', {
      get: function() {
        return this.containerNode;
      },
      set: function(key, node) {
        if (this.containerNode === node) {
          return;
        }
        this.containerNode = node;
        if (this.contentView) {
          return this.contentView.set('parentNode', node);
        }
      }
    });

    return Yield;

  })(Batman.Object);

}).call(this);

(function() {
  var buntUndefined, defaultAndOr,
    __slice = [].slice;

  buntUndefined = function(f) {
    return function(value) {
      if (value == null) {
        return void 0;
      } else {
        return f.apply(this, arguments);
      }
    };
  };

  defaultAndOr = function(lhs, rhs) {
    return lhs || rhs;
  };

  Batman.Filters = {
    raw: buntUndefined(function(value, binding) {
      binding.escapeValue = false;
      return value;
    }),
    get: buntUndefined(function(value, key) {
      if (value.get != null) {
        return value.get(key);
      } else {
        return value[key];
      }
    }),
    equals: buntUndefined(function(lhs, rhs, binding) {
      return lhs === rhs;
    }),
    eq: function(lhs, rhs) {
      return lhs === rhs;
    },
    neq: function(lhs, rhs) {
      return lhs !== rhs;
    },
    lt: buntUndefined(function(lhs, rhs) {
      return lhs < rhs;
    }),
    gt: buntUndefined(function(lhs, rhs) {
      return lhs > rhs;
    }),
    lteq: buntUndefined(function(lhs, rhs) {
      return lhs <= rhs;
    }),
    gteq: buntUndefined(function(lhs, rhs) {
      return lhs >= rhs;
    }),
    and: function(lhs, rhs) {
      return lhs && rhs;
    },
    or: function(lhs, rhs, binding) {
      return lhs || rhs;
    },
    not: function(value, binding) {
      return !value;
    },
    ceil: function(value) {
      return Math.ceil(value);
    },
    floor: function(value) {
      return Math.floor(value);
    },
    round: function(value) {
      return Math.round(value);
    },
    precision: function(value, p) {
      return parseFloat(value).toPrecision(p);
    },
    fixed: function(value, f) {
      return parseFloat(value).toFixed(f);
    },
    delimitNumber: function(value) {
      value = value.toString();
      return value.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
        return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
      });
    },
    trim: buntUndefined(function(value, binding) {
      return value.trim();
    }),
    matches: buntUndefined(function(value, searchFor) {
      return value.indexOf(searchFor) !== -1;
    }),
    truncate: buntUndefined(function(value, length, end, binding) {
      if (end == null) {
        end = "...";
      }
      if (!binding) {
        binding = end;
        end = "...";
      }
      if (value.length > length) {
        value = value.substr(0, length - end.length) + end;
      }
      return value;
    }),
    "default": function(value, defaultValue, binding) {
      if ((value != null) && value !== '') {
        return value;
      } else {
        return defaultValue;
      }
    },
    prepend: function(value, string, binding) {
      return (string != null ? string : '') + (value != null ? value : '');
    },
    append: function(value, string, binding) {
      return (value != null ? value : '') + (string != null ? string : '');
    },
    replace: buntUndefined(function(value, searchFor, replaceWith, flags, binding) {
      if (!binding) {
        binding = flags;
        flags = void 0;
      }
      if (flags === void 0) {
        return value.replace(searchFor, replaceWith);
      } else {
        return value.replace(searchFor, replaceWith, flags);
      }
    }),
    downcase: buntUndefined(function(value) {
      return value.toLowerCase();
    }),
    upcase: buntUndefined(function(value) {
      return value.toUpperCase();
    }),
    pluralize: buntUndefined(function(string, count, includeCount, binding) {
      if (!binding) {
        binding = includeCount;
        includeCount = true;
        if (!binding) {
          binding = count;
          count = void 0;
        }
      }
      if (count != null) {
        return Batman.helpers.pluralize(count, string, void 0, includeCount);
      } else {
        return Batman.helpers.pluralize(string);
      }
    }),
    humanize: buntUndefined(function(string, binding) {
      return Batman.helpers.humanize(string);
    }),
    join: buntUndefined(function(value, withWhat, binding) {
      if (withWhat == null) {
        withWhat = '';
      }
      if (!binding) {
        binding = withWhat;
        withWhat = '';
      }
      return value.join(withWhat);
    }),
    sort: buntUndefined(function(value) {
      return value.sort();
    }),
    map: buntUndefined(function(value, key) {
      return value.map(function(x) {
        return Batman.get(x, key);
      });
    }),
    has: function(set, item) {
      if (set == null) {
        return false;
      }
      return Batman.contains(set, item);
    },
    first: buntUndefined(function(value) {
      return value[0];
    }),
    meta: buntUndefined(function(value, keypath) {
      Batman.developer.assert(value.meta, "Error, value doesn't have a meta to filter on!");
      return value.meta.get(keypath);
    }),
    interpolate: function(string, interpolationKeypaths, binding) {
      var k, v, values;
      if (!binding) {
        binding = interpolationKeypaths;
        interpolationKeypaths = void 0;
      }
      if (!string) {
        return;
      }
      values = {};
      for (k in interpolationKeypaths) {
        v = interpolationKeypaths[k];
        values[k] = this.lookupKeypath(v);
        if (values[k] == null) {
          Batman.developer.warn("Warning! Undefined interpolation key " + k + " for interpolation", string);
          values[k] = '';
        }
      }
      return Batman.helpers.interpolate(string, values);
    },
    withArguments: function() {
      var binding, block, curryArgs, _i;
      block = arguments[0], curryArgs = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), binding = arguments[_i++];
      if (!block) {
        return;
      }
      return function() {
        var regularArgs;
        regularArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return block.call.apply(block, [this].concat(__slice.call(curryArgs), __slice.call(regularArgs)));
      };
    },
    escape: buntUndefined(Batman.escapeHTML)
  };

  (function() {
    var k, _i, _len, _ref, _results;
    _ref = ['capitalize', 'singularize', 'underscore', 'camelize'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      _results.push(Batman.Filters[k] = buntUndefined(Batman.helpers[k]));
    }
    return _results;
  })();

  Batman.developer.addFilters();

}).call(this);

(function() {


}).call(this);

/**
 * Zest (https://github.com/chjj/zest)
 * A css selector engine.
 * Copyright (c) 2011-2012, Christopher Jeffrey. (MIT Licensed)
 */

// TODO
// - Recognize the TR subject selector when parsing.
// - Pass context to scope.
// - Add :column pseudo-classes.

;(function() {

/**
 * Shared
 */

var window = this
  , document = this.document
  , old = this.zest;

/**
 * Helpers
 */

var compareDocumentPosition = (function() {
  if (document.compareDocumentPosition) {
    return function(a, b) {
      return a.compareDocumentPosition(b);
    };
  }
  return function(a, b) {
    var el = a.ownerDocument.getElementsByTagName('*')
      , i = el.length;

    while (i--) {
      if (el[i] === a) return 2;
      if (el[i] === b) return 4;
    }

    return 1;
  };
})();

var order = function(a, b) {
  return compareDocumentPosition(a, b) & 2 ? 1 : -1;
};

var next = function(el) {
  while ((el = el.nextSibling)
         && el.nodeType !== 1);
  return el;
};

var prev = function(el) {
  while ((el = el.previousSibling)
         && el.nodeType !== 1);
  return el;
};

var child = function(el) {
  if (el = el.firstChild) {
    while (el.nodeType !== 1
           && (el = el.nextSibling));
  }
  return el;
};

var lastChild = function(el) {
  if (el = el.lastChild) {
    while (el.nodeType !== 1
           && (el = el.previousSibling));
  }
  return el;
};

var unquote = function(str) {
  if (!str) return str;
  var ch = str[0];
  return ch === '"' || ch === '\''
    ? str.slice(1, -1)
    : str;
};

var indexOf = (function() {
  if (Array.prototype.indexOf) {
    return Array.prototype.indexOf;
  }
  return function(obj, item) {
    var i = this.length;
    while (i--) {
      if (this[i] === item) return i;
    }
    return -1;
  };
})();

var makeInside = function(start, end) {
  var regex = rules.inside.source
    .replace(/</g, start)
    .replace(/>/g, end);

  return new RegExp(regex);
};

var replace = function(regex, name, val) {
  regex = regex.source;
  regex = regex.replace(name, val.source || val);
  return new RegExp(regex);
};

var truncateUrl = function(url, num) {
  return url
    .replace(/^(?:\w+:\/\/|\/+)/, '')
    .replace(/(?:\/+|\/*#.*?)$/, '')
    .split('/', num)
    .join('/');
};

/**
 * Handle `nth` Selectors
 */

var parseNth = function(param, test) {
  var param = param.replace(/\s+/g, '')
    , cap;

  if (param === 'even') {
    param = '2n+0';
  } else if (param === 'odd') {
    param = '2n+1';
  } else if (!~param.indexOf('n')) {
    param = '0n' + param;
  }

  cap = /^([+-])?(\d+)?n([+-])?(\d+)?$/.exec(param);

  return {
    group: cap[1] === '-'
      ? -(cap[2] || 1)
      : +(cap[2] || 1),
    offset: cap[4]
      ? (cap[3] === '-' ? -cap[4] : +cap[4])
      : 0
  };
};

var nth = function(param, test, last) {
  var param = parseNth(param)
    , group = param.group
    , offset = param.offset
    , find = !last ? child : lastChild
    , advance = !last ? next : prev;

  return function(el) {
    if (el.parentNode.nodeType !== 1) return;

    var rel = find(el.parentNode)
      , pos = 0;

    while (rel) {
      if (test(rel, el)) pos++;
      if (rel === el) {
        pos -= offset;
        return group && pos
          ? !(pos % group) && (pos < 0 === group < 0)
          : !pos;
      }
      rel = advance(rel);
    }
  };
};

/**
 * Simple Selectors
 */

var selectors = {
  '*': (function() {
    if (function() {
      var el = document.createElement('div');
      el.appendChild(document.createComment(''));
      return !!el.getElementsByTagName('*')[0];
    }()) {
      return function(el) {
        if (el.nodeType === 1) return true;
      };
    }
    return function() {
      return true;
    };
  })(),
  'type': function(type) {
    type = type.toLowerCase();
    return function(el) {
      return el.nodeName.toLowerCase() === type;
    };
  },
  'attr': function(key, op, val, i) {
    op = operators[op];
    return function(el) {
      var attr;
      switch (key) {
        case 'for':
          attr = el.htmlFor;
          break;
        case 'class':
          // className is '' when non-existent
          // getAttribute('class') is null
          attr = el.className;
          if (attr === '' && el.getAttribute('class') == null) {
            attr = null;
          }
          break;
        case 'href':
          attr = el.getAttribute('href', 2);
          break;
        case 'title':
          // getAttribute('title') can be '' when non-existent sometimes?
          attr = el.getAttribute('title') || null;
          break;
        case 'id':
          if (el.getAttribute) {
            attr = el.getAttribute('id');
            break;
          }
        default:
          attr = el[key] != null
            ? el[key]
            : el.getAttribute && el.getAttribute(key);
          break;
      }
      if (attr == null) return;
      attr = attr + '';
      if (i) {
        attr = attr.toLowerCase();
        val = val.toLowerCase();
      }
      return op(attr, val);
    };
  },
  ':first-child': function(el) {
    return !prev(el) && el.parentNode.nodeType === 1;
  },
  ':last-child': function(el) {
    return !next(el) && el.parentNode.nodeType === 1;
  },
  ':only-child': function(el) {
    return !prev(el) && !next(el)
      && el.parentNode.nodeType === 1;
  },
  ':nth-child': function(param, last) {
    return nth(param, function() {
      return true;
    }, last);
  },
  ':nth-last-child': function(param) {
    return selectors[':nth-child'](param, true);
  },
  ':root': function(el) {
    return el.ownerDocument.documentElement === el;
  },
  ':empty': function(el) {
    return !el.firstChild;
  },
  ':not': function(sel) {
    var test = compileGroup(sel);
    return function(el) {
      return !test(el);
    };
  },
  ':first-of-type': function(el) {
    if (el.parentNode.nodeType !== 1) return;
    var type = el.nodeName;
    while (el = prev(el)) {
      if (el.nodeName === type) return;
    }
    return true;
  },
  ':last-of-type': function(el) {
    if (el.parentNode.nodeType !== 1) return;
    var type = el.nodeName;
    while (el = next(el)) {
      if (el.nodeName === type) return;
    }
    return true;
  },
  ':only-of-type': function(el) {
    return selectors[':first-of-type'](el)
        && selectors[':last-of-type'](el);
  },
  ':nth-of-type': function(param, last) {
    return nth(param, function(rel, el) {
      return rel.nodeName === el.nodeName;
    }, last);
  },
  ':nth-last-of-type': function(param) {
    return selectors[':nth-of-type'](param, true);
  },
  ':checked': function(el) {
    return !!(el.checked || el.selected);
  },
  ':indeterminate': function(el) {
    return !selectors[':checked'](el);
  },
  ':enabled': function(el) {
    return !el.disabled && el.type !== 'hidden';
  },
  ':disabled': function(el) {
    return !!el.disabled;
  },
  ':target': function(el) {
    return el.id === window.location.hash.substring(1);
  },
  ':focus': function(el) {
    return el === el.ownerDocument.activeElement;
  },
  ':matches': function(sel) {
    return compileGroup(sel);
  },
  ':nth-match': function(param, last) {
    var args = param.split(/\s*,\s*/)
      , arg = args.shift()
      , test = compileGroup(args.join(','));

    return nth(arg, test, last);
  },
  ':nth-last-match': function(param) {
    return selectors[':nth-match'](param, true);
  },
  ':links-here': function(el) {
    return el + '' === window.location + '';
  },
  ':lang': function(param) {
    return function(el) {
      while (el) {
        if (el.lang) return el.lang.indexOf(param) === 0;
        el = el.parentNode;
      }
    };
  },
  ':dir': function(param) {
    return function(el) {
      while (el) {
        if (el.dir) return el.dir === param;
        el = el.parentNode;
      }
    };
  },
  ':scope': function(el, con) {
    var context = con || el.ownerDocument;
    if (context.nodeType === 9) {
      return el === context.documentElement;
    }
    return el === context;
  },
  ':any-link': function(el) {
    return typeof el.href === 'string';
  },
  ':local-link': function(el) {
    if (el.nodeName) {
      return el.href && el.host === window.location.host;
    }
    var param = +el + 1;
    return function(el) {
      if (!el.href) return;

      var url = window.location + ''
        , href = el + '';

      return truncateUrl(url, param) === truncateUrl(href, param);
    };
  },
  ':default': function(el) {
    return !!el.defaultSelected;
  },
  ':valid': function(el) {
    return el.willValidate || (el.validity && el.validity.valid);
  },
  ':invalid': function(el) {
    return !selectors[':valid'](el);
  },
  ':in-range': function(el) {
    return el.value > el.min && el.value <= el.max;
  },
  ':out-of-range': function(el) {
    return !selectors[':in-range'](el);
  },
  ':required': function(el) {
    return !!el.required;
  },
  ':optional': function(el) {
    return !el.required;
  },
  ':read-only': function(el) {
    if (el.readOnly) return true;

    var attr = el.getAttribute('contenteditable')
      , prop = el.contentEditable
      , name = el.nodeName.toLowerCase();

    name = name !== 'input' && name !== 'textarea';

    return (name || el.disabled) && attr == null && prop !== 'true';
  },
  ':read-write': function(el) {
    return !selectors[':read-only'](el);
  },
  ':hover': function() {
    throw new Error(':hover is not supported.');
  },
  ':active': function() {
    throw new Error(':active is not supported.');
  },
  ':link': function() {
    throw new Error(':link is not supported.');
  },
  ':visited': function() {
    throw new Error(':visited is not supported.');
  },
  ':column': function() {
    throw new Error(':column is not supported.');
  },
  ':nth-column': function() {
    throw new Error(':nth-column is not supported.');
  },
  ':nth-last-column': function() {
    throw new Error(':nth-last-column is not supported.');
  },
  ':current': function() {
    throw new Error(':current is not supported.');
  },
  ':past': function() {
    throw new Error(':past is not supported.');
  },
  ':future': function() {
    throw new Error(':future is not supported.');
  },
  // Non-standard, for compatibility purposes.
  ':contains': function(param) {
    return function(el) {
      var text = el.innerText || el.textContent || el.value || '';
      return !!~text.indexOf(param);
    };
  },
  ':has': function(param) {
    return function(el) {
      return zest(param, el).length > 0;
    };
  }
  // Potentially add more pseudo selectors for
  // compatibility with sizzle and most other
  // selector engines (?).
};

/**
 * Attribute Operators
 */

var operators = {
  '-': function() {
    return true;
  },
  '=': function(attr, val) {
    return attr === val;
  },
  '*=': function(attr, val) {
    return attr.indexOf(val) !== -1;
  },
  '~=': function(attr, val) {
    var i = attr.indexOf(val)
      , f
      , l;

    if (i === -1) return;
    f = attr[i - 1];
    l = attr[i + val.length];

    return (!f || f === ' ') && (!l || l === ' ');
  },
  '|=': function(attr, val) {
    var i = attr.indexOf(val)
      , l;

    if (i !== 0) return;
    l = attr[i + val.length];

    return l === '-' || !l;
  },
  '^=': function(attr, val) {
    return attr.indexOf(val) === 0;
  },
  '$=': function(attr, val) {
    return attr.indexOf(val) + val.length === attr.length;
  },
  // non-standard
  '!=': function(attr, val) {
    return attr !== val;
  }
};

/**
 * Combinator Logic
 */

var combinators = {
  ' ': function(test) {
    return function(el) {
      while (el = el.parentNode) {
        if (test(el)) return el;
      }
    };
  },
  '>': function(test) {
    return function(el) {
      return test(el = el.parentNode) && el;
    };
  },
  '+': function(test) {
    return function(el) {
      return test(el = prev(el)) && el;
    };
  },
  '~': function(test) {
    return function(el) {
      while (el = prev(el)) {
        if (test(el)) return el;
      }
    };
  },
  'noop': function(test) {
    return function(el) {
      return test(el) && el;
    };
  },
  'ref': function(test, name) {
    var node;

    function ref(el) {
      var doc = el.ownerDocument
        , nodes = doc.getElementsByTagName('*')
        , i = nodes.length;

      while (i--) {
        node = nodes[i];
        if (ref.test(el)) {
          node = null;
          return true;
        }
      }

      node = null;
    }

    ref.combinator = function(el) {
      if (!node || !node.getAttribute) return;

      var attr = node.getAttribute(name) || '';
      if (attr[0] === '#') attr = attr.substring(1);

      if (attr === el.id && test(node)) {
        return node;
      }
    };

    return ref;
  }
};

/**
 * Grammar
 */

var rules = {
  qname: /^ *([\w\-]+|\*)/,
  simple: /^(?:([.#][\w\-]+)|pseudo|attr)/,
  ref: /^ *\/([\w\-]+)\/ */,
  combinator: /^(?: +([^ \w*]) +|( )+|([^ \w*]))(?! *$)/,
  attr: /^\[([\w\-]+)(?:([^\w]?=)(inside))?\]/,
  pseudo: /^(:[\w\-]+)(?:\((inside)\))?/,
  inside: /(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|<[^"'>]*>|\\["'>]|[^"'>])*/
};

rules.inside = replace(rules.inside, '[^"\'>]*', rules.inside);
rules.attr = replace(rules.attr, 'inside', makeInside('\\[', '\\]'));
rules.pseudo = replace(rules.pseudo, 'inside', makeInside('\\(', '\\)'));
rules.simple = replace(rules.simple, 'pseudo', rules.pseudo);
rules.simple = replace(rules.simple, 'attr', rules.attr);

/**
 * Compiling
 */

var compile = function(sel) {
  var sel = sel.replace(/^\s+|\s+$/g, '')
    , test
    , filter = []
    , buff = []
    , subject
    , qname
    , cap
    , op
    , ref;

  while (sel) {
    if (cap = rules.qname.exec(sel)) {
      sel = sel.substring(cap[0].length);
      qname = cap[1];
      buff.push(tok(qname, true));
    } else if (cap = rules.simple.exec(sel)) {
      sel = sel.substring(cap[0].length);
      qname = '*';
      buff.push(tok(qname, true));
      buff.push(tok(cap));
    } else {
      throw new Error('Invalid selector.');
    }

    while (cap = rules.simple.exec(sel)) {
      sel = sel.substring(cap[0].length);
      buff.push(tok(cap));
    }

    if (sel[0] === '!') {
      sel = sel.substring(1);
      subject = makeSubject();
      subject.qname = qname;
      buff.push(subject.simple);
    }

    if (cap = rules.ref.exec(sel)) {
      sel = sel.substring(cap[0].length);
      ref = combinators.ref(makeSimple(buff), cap[1]);
      filter.push(ref.combinator);
      buff = [];
      continue;
    }

    if (cap = rules.combinator.exec(sel)) {
      sel = sel.substring(cap[0].length);
      op = cap[1] || cap[2] || cap[3];
      if (op === ',') {
        filter.push(combinators.noop(makeSimple(buff)));
        break;
      }
    } else {
      op = 'noop';
    }

    filter.push(combinators[op](makeSimple(buff)));
    buff = [];
  }

  test = makeTest(filter);
  test.qname = qname;
  test.sel = sel;

  if (subject) {
    subject.lname = test.qname;

    subject.test = test;
    subject.qname = subject.qname;
    subject.sel = test.sel;
    test = subject;
  }

  if (ref) {
    ref.test = test;
    ref.qname = test.qname;
    ref.sel = test.sel;
    test = ref;
  }

  return test;
};

var tok = function(cap, qname) {
  // qname
  if (qname) {
    return cap === '*'
      ? selectors['*']
      : selectors.type(cap);
  }

  // class/id
  if (cap[1]) {
    return cap[1][0] === '.'
      ? selectors.attr('class', '~=', cap[1].substring(1))
      : selectors.attr('id', '=', cap[1].substring(1));
  }

  // pseudo-name
  // inside-pseudo
  if (cap[2]) {
    return cap[3]
      ? selectors[cap[2]](unquote(cap[3]))
      : selectors[cap[2]];
  }

  // attr name
  // attr op
  // attr value
  if (cap[4]) {
    var i;
    if (cap[6]) {
      i = cap[6].length;
      cap[6] = cap[6].replace(/ +i$/, '');
      i = i > cap[6].length;
    }
    return selectors.attr(cap[4], cap[5] || '-', unquote(cap[6]), i);
  }

  throw new Error('Unknown Selector.');
};

var makeSimple = function(func) {
  var l = func.length
    , i;

  // Potentially make sure
  // `el` is truthy.
  if (l < 2) return func[0];

  return function(el) {
    if (!el) return;
    for (i = 0; i < l; i++) {
      if (!func[i](el)) return;
    }
    return true;
  };
};

var makeTest = function(func) {
  if (func.length < 2) {
    return function(el) {
      return !!func[0](el);
    };
  }
  return function(el) {
    var i = func.length;
    while (i--) {
      if (!(el = func[i](el))) return;
    }
    return true;
  };
};

var makeSubject = function() {
  var target;

  function subject(el) {
    var node = el.ownerDocument
      , scope = node.getElementsByTagName(subject.lname)
      , i = scope.length;

    while (i--) {
      if (subject.test(scope[i]) && target === el) {
        target = null;
        return true;
      }
    }

    target = null;
  }

  subject.simple = function(el) {
    target = el;
    return true;
  };

  return subject;
};

var compileGroup = function(sel) {
  var test = compile(sel)
    , tests = [ test ];

  while (test.sel) {
    test = compile(test.sel);
    tests.push(test);
  }

  if (tests.length < 2) return test;

  return function(el) {
    var l = tests.length
      , i = 0;

    for (; i < l; i++) {
      if (tests[i](el)) return true;
    }
  };
};

/**
 * Selection
 */

var find = function(sel, node) {
  var results = []
    , test = compile(sel)
    , scope = node.getElementsByTagName(test.qname)
    , i = 0
    , el;

  while (el = scope[i++]) {
    if (test(el)) results.push(el);
  }

  if (test.sel) {
    while (test.sel) {
      test = compile(test.sel);
      scope = node.getElementsByTagName(test.qname);
      i = 0;
      while (el = scope[i++]) {
        if (test(el) && !~indexOf.call(results, el)) {
          results.push(el);
        }
      }
    }
    results.sort(order);
  }

  return results;
};

/**
 * Native
 */

var select = (function() {
  var slice = (function() {
    try {
      Array.prototype.slice.call(document.getElementsByTagName('zest'));
      return Array.prototype.slice;
    } catch(e) {
      e = null;
      return function() {
        var a = [], i = 0, l = this.length;
        for (; i < l; i++) a.push(this[i]);
        return a;
      };
    }
  })();

  if (document.querySelectorAll) {
    return function(sel, node) {
      try {
        return slice.call(node.querySelectorAll(sel));
      } catch(e) {
        return find(sel, node);
      }
    };
  }

  return function(sel, node) {
    try {
      if (sel[0] === '#' && /^#[\w\-]+$/.test(sel)) {
        return [node.getElementById(sel.substring(1))];
      }
      if (sel[0] === '.' && /^\.[\w\-]+$/.test(sel)) {
        sel = node.getElementsByClassName(sel.substring(1));
        return slice.call(sel);
      }
      if (/^[\w\-]+$/.test(sel)) {
        return slice.call(node.getElementsByTagName(sel));
      }
    } catch(e) {
      ;
    }
    return find(sel, node);
  };
})();

/**
 * Zest
 */

var zest = function(sel, node) {
  try {
    sel = select(sel, node || document);
  } catch(e) {
    if (window.ZEST_DEBUG) {
      console.log(e.stack || e + '');
    }
    sel = [];
  }
  return sel;
};

/**
 * Expose
 */

zest.selectors = selectors;
zest.operators = operators;
zest.combinators = combinators;
zest.compile = compileGroup;

zest.matches = function(el, sel) {
  return !!compileGroup(sel)(el);
};

zest.cache = function() {
  if (compile.raw) return;

  var raw = compile
    , cache = {};

  compile = function(sel) {
    return cache[sel]
      || (cache[sel] = raw(sel));
  };

  compile.raw = raw;
  zest._cache = cache;
};

zest.noCache = function() {
  if (!compile.raw) return;
  compile = compile.raw;
  delete zest._cache;
};

zest.noConflict = function() {
  window.zest = old;
  return zest;
};

zest.noNative = function() {
  select = find;
};

if (typeof module !== 'undefined') {
  module.exports = zest;
} else {
  this.zest = zest;
}

if (window.ZEST_DEBUG) {
  zest.noNative();
} else {
  zest.cache();
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

/*!
  * Reqwest! A general purpose XHR connection manager
  * (c) Dustin Diaz 2011
  * https://github.com/ded/reqwest
  * license MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else this[name] = definition()
}('reqwest', function () {

  var context = this
    , win = window
    , doc = document
    , old = context.reqwest
    , twoHundo = /^20\d$/
    , byTag = 'getElementsByTagName'
    , readyState = 'readyState'
    , contentType = 'Content-Type'
    , requestedWith = 'X-Requested-With'
    , head = doc[byTag]('head')[0]
    , uniqid = 0
    , lastValue // data stored by the most recent JSONP callback
    , xmlHttpRequest = 'XMLHttpRequest'
    , isArray = typeof Array.isArray == 'function' ? Array.isArray : function (a) {
        return a instanceof Array
      }
    , defaultHeaders = {
          contentType: 'application/x-www-form-urlencoded'
        , accept: {
              '*':  'text/javascript, text/html, application/xml, text/xml, */*'
            , xml:  'application/xml, text/xml'
            , html: 'text/html'
            , text: 'text/plain'
            , json: 'application/json, text/javascript'
            , js:   'application/javascript, text/javascript'
          }
        , requestedWith: xmlHttpRequest
      }
    , xhr = win[xmlHttpRequest] ?
        function () {
          return new XMLHttpRequest()
        } :
        function () {
          return new ActiveXObject('Microsoft.XMLHTTP')
        }

  function handleReadyState(o, success, error) {
    return function () {
      if (o && o[readyState] == 4) {
        if (twoHundo.test(o.status)) {
          success(o)
        } else {
          error(o)
        }
      }
    }
  }

  function setHeaders(http, o) {
    var headers = o.headers || {}, h
    headers.Accept = headers.Accept || defaultHeaders.accept[o.type] || defaultHeaders.accept['*']
    // breaks cross-origin requests with legacy browsers
    if (!o.crossOrigin && !headers[requestedWith]) headers[requestedWith] = defaultHeaders.requestedWith
    if (!headers[contentType]) headers[contentType] = o.contentType || defaultHeaders.contentType
    for (h in headers) {
      headers.hasOwnProperty(h) && http.setRequestHeader(h, headers[h])
    }
  }

  function generalCallback(data) {
    lastValue = data
  }

  function urlappend(url, s) {
    return url + (/\?/.test(url) ? '&' : '?') + s
  }

  function handleJsonp(o, fn, err, url) {
    var reqId = uniqid++
      , cbkey = o.jsonpCallback || 'callback' // the 'callback' key
      , cbval = o.jsonpCallbackName || ('reqwest_' + reqId) // the 'callback' value
      , cbreg = new RegExp('((^|\\?|&)' + cbkey + ')=([^&]+)')
      , match = url.match(cbreg)
      , script = doc.createElement('script')
      , loaded = 0

    if (match) {
      if (match[3] === '?') {
        url = url.replace(cbreg, '$1=' + cbval) // wildcard callback func name
      } else {
        cbval = match[3] // provided callback func name
      }
    } else {
      url = urlappend(url, cbkey + '=' + cbval) // no callback details, add 'em
    }

    win[cbval] = generalCallback

    script.type = 'text/javascript'
    script.src = url
    script.async = true
    if (typeof script.onreadystatechange !== 'undefined') {
        // need this for IE due to out-of-order onreadystatechange(), binding script
        // execution to an event listener gives us control over when the script
        // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
        script.event = 'onclick'
        script.htmlFor = script.id = '_reqwest_' + reqId
    }

    script.onload = script.onreadystatechange = function () {
      if ((script[readyState] && script[readyState] !== 'complete' && script[readyState] !== 'loaded') || loaded) {
        return false
      }
      script.onload = script.onreadystatechange = null
      script.onclick && script.onclick()
      // Call the user callback with the last value stored and clean up values and scripts.
      o.success && o.success(lastValue)
      lastValue = undefined
      head.removeChild(script)
      loaded = 1
    }

    // Add the script to the DOM head
    head.appendChild(script)
  }

  function getRequest(o, fn, err) {
    var method = (o.method || 'GET').toUpperCase()
      , url = typeof o === 'string' ? o : o.url
      // convert non-string objects to query-string form unless o.processData is false
      , data = (o.processData !== false && o.data && typeof o.data !== 'string')
        ? reqwest.toQueryString(o.data)
        : (o.data || null)
      , http

    // if we're working on a GET request and we have data then we should append
    // query string to end of URL and not post data
    if ((o.type == 'jsonp' || method == 'GET') && data) {
      url = urlappend(url, data)
      data = null
    }

    if (o.type == 'jsonp') return handleJsonp(o, fn, err, url)

    http = xhr()
    http.open(method, url, true)
    setHeaders(http, o)
    http.onreadystatechange = handleReadyState(http, fn, err)
    o.before && o.before(http)
    http.send(data)
    return http
  }

  function Reqwest(o, fn) {
    this.o = o
    this.fn = fn
    init.apply(this, arguments)
  }

  function setType(url) {
    var m = url.match(/\.(json|jsonp|html|xml)(\?|$)/)
    return m ? m[1] : 'js'
  }

  function init(o, fn) {
    this.url = typeof o == 'string' ? o : o.url
    this.timeout = null
    var type = o.type || setType(this.url)
      , self = this
    fn = fn || function () {}

    if (o.timeout) {
      this.timeout = setTimeout(function () {
        self.abort()
      }, o.timeout)
    }

    function complete(resp) {
      o.timeout && clearTimeout(self.timeout)
      self.timeout = null
      o.complete && o.complete(resp)
    }

    function success(resp) {
      var r = resp.responseText
      if (r) {
        switch (type) {
        case 'json':
          try {
            resp = win.JSON ? win.JSON.parse(r) : eval('(' + r + ')')
          } catch (err) {
            return error(resp, 'Could not parse JSON in response', err)
          }
          break;
        case 'js':
          resp = eval(r)
          break;
        case 'html':
          resp = r
          break;
        }
      }

      fn(resp)
      o.success && o.success(resp)

      complete(resp)
    }

    function error(resp, msg, t) {
      o.error && o.error(resp, msg, t)
      complete(resp)
    }

    this.request = getRequest(o, success, error)
  }

  Reqwest.prototype = {
    abort: function () {
      this.request.abort()
    }

  , retry: function () {
      init.call(this, this.o, this.fn)
    }
  }

  function reqwest(o, fn) {
    return new Reqwest(o, fn)
  }

  // normalize newline variants according to spec -> CRLF
  function normalize(s) {
    return s ? s.replace(/\r?\n/g, '\r\n') : ''
  }

  function serial(el, cb) {
    var n = el.name
      , t = el.tagName.toLowerCase()
      , optCb = function(o) {
          // IE gives value="" even where there is no value attribute
          // 'specified' ref: http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-862529273
          if (o && !o.disabled)
            cb(n, normalize(o.attributes.value && o.attributes.value.specified ? o.value : o.text))
        }

    // don't serialize elements that are disabled or without a name
    if (el.disabled || !n) return;

    switch (t) {
    case 'input':
      if (!/reset|button|image|file/i.test(el.type)) {
        var ch = /checkbox/i.test(el.type)
          , ra = /radio/i.test(el.type)
          , val = el.value;
        // WebKit gives us "" instead of "on" if a checkbox has no value, so correct it here
        (!(ch || ra) || el.checked) && cb(n, normalize(ch && val === '' ? 'on' : val))
      }
      break;
    case 'textarea':
      cb(n, normalize(el.value))
      break;
    case 'select':
      if (el.type.toLowerCase() === 'select-one') {
        optCb(el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null)
      } else {
        for (var i = 0; el.length && i < el.length; i++) {
          el.options[i].selected && optCb(el.options[i])
        }
      }
      break;
    }
  }

  // collect up all form elements found from the passed argument elements all
  // the way down to child elements; pass a '<form>' or form fields.
  // called with 'this'=callback to use for serial() on each element
  function eachFormElement() {
    var cb = this
      , e, i, j
      , serializeSubtags = function(e, tags) {
        for (var i = 0; i < tags.length; i++) {
          var fa = e[byTag](tags[i])
          for (j = 0; j < fa.length; j++) serial(fa[j], cb)
        }
      }

    for (i = 0; i < arguments.length; i++) {
      e = arguments[i]
      if (/input|select|textarea/i.test(e.tagName)) serial(e, cb)
      serializeSubtags(e, [ 'input', 'select', 'textarea' ])
    }
  }

  // standard query string style serialization
  function serializeQueryString() {
    return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
  }

  // { 'name': 'value', ... } style serialization
  function serializeHash() {
    var hash = {}
    eachFormElement.apply(function (name, value) {
      if (name in hash) {
        hash[name] && !isArray(hash[name]) && (hash[name] = [hash[name]])
        hash[name].push(value)
      } else hash[name] = value
    }, arguments)
    return hash
  }

  // [ { name: 'name', value: 'value' }, ... ] style serialization
  reqwest.serializeArray = function () {
    var arr = []
    eachFormElement.apply(function(name, value) {
      arr.push({name: name, value: value})
    }, arguments)
    return arr
  }

  reqwest.serialize = function () {
    if (arguments.length === 0) return ''
    var opt, fn
      , args = Array.prototype.slice.call(arguments, 0)

    opt = args.pop()
    opt && opt.nodeType && args.push(opt) && (opt = null)
    opt && (opt = opt.type)

    if (opt == 'map') fn = serializeHash
    else if (opt == 'array') fn = reqwest.serializeArray
    else fn = serializeQueryString

    return fn.apply(null, args)
  }

  reqwest.toQueryString = function (o) {
    var qs = '', i
      , enc = encodeURIComponent
      , push = function (k, v) {
          qs += enc(k) + '=' + enc(v) + '&'
        }

    if (isArray(o)) {
      for (i = 0; o && i < o.length; i++) push(o[i].name, o[i].value)
    } else {
      for (var k in o) {
        if (!Object.hasOwnProperty.call(o, k)) continue;
        var v = o[k]
        if (isArray(v)) {
          for (i = 0; i < v.length; i++) push(k, v[i])
        } else push(k, o[k])
      }
    }

    // spaces should be + according to spec
    return qs.replace(/&$/, '').replace(/%20/g,'+')
  }

  // jQuery and Zepto compatibility, differences can be remapped here so you can call
  // .ajax.compat(options, callback)
  reqwest.compat = function (o, fn) {
    if (o) {
      o.type && (o.method = o.type) && delete o.type
      o.dataType && (o.type = o.dataType)
      o.jsonpCallback && (o.jsonpCallbackName = o.jsonpCallback) && delete o.jsonpCallback
      o.jsonp && (o.jsonpCallback = o.jsonp)
    }
    return new Reqwest(o, fn)
  }

  return reqwest
});

(function() {
  var SAFARI_CONTAINS_IS_BROKEN, version;

  if (/Safari/.test(navigator.userAgent)) {
    version = /WebKit\/(\S+)/.exec(navigator.userAgent);
    if (version && parseFloat(version) < 540) {
      SAFARI_CONTAINS_IS_BROKEN = true;
    }
  }

  (typeof window !== "undefined" && window !== null ? window : global).containsNode = function(parent, child) {
    if (parent === child) {
      return true;
    }
    if (parent.contains && !SAFARI_CONTAINS_IS_BROKEN) {
      return parent.contains(child);
    }
    if (parent.compareDocumentPosition) {
      return !!(parent.compareDocumentPosition(child) & 16);
    }
    while (child && parent !== child) {
      child = child.parentNode;
    }
    return child === parent;
  };

}).call(this);

(function() {
  Batman.extend(Batman.DOM, {
    querySelectorAll: function(node, selector) {
      return zest(selector, node);
    },
    querySelector: function(node, selector) {
      return zest(selector, node)[0];
    },
    setInnerHTML: function(node, html) {
      return node != null ? node.innerHTML = html : void 0;
    },
    containsNode: function(parent, child) {
      if (!child) {
        child = parent;
        parent = document.body;
      }
      return window.containsNode(parent, child);
    },
    textContent: function(node) {
      var _ref;
      return (_ref = node.textContent) != null ? _ref : node.innerText;
    },
    destroyNode: function(node) {
      var _ref;
      Batman.DOM.cleanupNode(node);
      return node != null ? (_ref = node.parentNode) != null ? _ref.removeChild(node) : void 0 : void 0;
    }
  });

  Batman.extend(Batman.Request.prototype, {
    _parseResponseHeaders: function(xhr) {
      var headers;
      return headers = xhr.getAllResponseHeaders().split('\n').reduce(function(acc, header) {
        var key, matches, value;
        if (matches = header.match(/([^:]*):\s*(.*)/)) {
          key = matches[1];
          value = matches[2];
          acc[key] = value;
        }
        return acc;
      }, {});
    },
    send: function(data) {
      var options, xhr, _ref,
        _this = this;
      if (data == null) {
        data = this.get('data');
      }
      this.fire('loading');
      options = {
        url: this.get('url'),
        method: this.get('method'),
        type: this.get('type'),
        headers: this.get('headers'),
        success: function(response) {
          _this.mixin({
            xhr: xhr,
            response: response,
            status: typeof xhr !== "undefined" && xhr !== null ? xhr.status : void 0,
            responseHeaders: _this._parseResponseHeaders(xhr)
          });
          return _this.fire('success', response);
        },
        error: function(xhr) {
          _this.mixin({
            xhr: xhr,
            response: xhr.responseText || xhr.content,
            status: xhr.status,
            responseHeaders: _this._parseResponseHeaders(xhr)
          });
          xhr.request = _this;
          return _this.fire('error', xhr);
        },
        complete: function() {
          return _this.fire('loaded');
        }
      };
      if ((_ref = options.method) === 'PUT' || _ref === 'POST') {
        if (this.hasFileUploads()) {
          options.data = this.constructor.objectToFormData(data);
        } else {
          options.contentType = this.get('contentType');
          options.data = Batman.URI.queryFromParams(data);
        }
      } else {
        options.data = data;
      }
      return xhr = (reqwest(options)).request;
    }
  });

}).call(this);

(function() {


}).call(this);

(function() {
  Batman.extend(Batman.DOM, {
    querySelectorAll: function(node, selector) {
      return jQuery(selector, node);
    },
    querySelector: function(node, selector) {
      return jQuery(selector, node)[0];
    },
    setInnerHTML: function(node, html) {
      return jQuery(node).html(html);
    },
    destroyNode: function(node) {
      Batman.DOM.cleanupNode(node);
      jQuery(node).remove();
    },
    containsNode: function(parent, child) {
      if (!child) {
        child = parent;
        parent = document.body;
      }
      return $.contains(parent, child);
    },
    textContent: function(node) {
      return jQuery(node).text();
    },
    addEventListener: function(node, eventName, callback) {
      return $(node).on(eventName, callback);
    },
    removeEventListener: function(node, eventName, callback) {
      return $(node).off(eventName, callback);
    }
  });

  Batman.View.accessor('$node', function() {
    if (this.get('node')) {
      return $(this.node);
    }
  });

  Batman.extend(Batman.Request.prototype, {
    _parseResponseHeaders: function(xhr) {
      var headers;
      return headers = xhr.getAllResponseHeaders().split('\n').reduce(function(acc, header) {
        var key, matches, value;
        if (matches = header.match(/([^:]*):\s*(.*)/)) {
          key = matches[1];
          value = matches[2];
          acc[key] = value;
        }
        return acc;
      }, {});
    },
    _prepareOptions: function(data) {
      var options, _ref,
        _this = this;
      options = {
        url: this.get('url'),
        type: this.get('method'),
        dataType: this.get('type'),
        data: data || this.get('data'),
        username: this.get('username'),
        password: this.get('password'),
        headers: this.get('headers'),
        beforeSend: function() {
          return _this.fire('loading');
        },
        success: function(response, textStatus, xhr) {
          _this.mixin({
            xhr: xhr,
            status: xhr.status,
            response: response,
            responseHeaders: _this._parseResponseHeaders(xhr)
          });
          return _this.fire('success', response);
        },
        error: function(xhr, status, error) {
          _this.mixin({
            xhr: xhr,
            status: xhr.status,
            response: xhr.responseText,
            responseHeaders: _this._parseResponseHeaders(xhr)
          });
          xhr.request = _this;
          return _this.fire('error', xhr);
        },
        complete: function() {
          return _this.fire('loaded');
        }
      };
      if ((_ref = this.get('method')) === 'PUT' || _ref === 'POST') {
        if (!this.hasFileUploads()) {
          options.contentType = this.get('contentType');
          if (typeof options.data === 'object') {
            options.processData = false;
            options.data = Batman.URI.queryFromParams(options.data);
          }
        } else {
          options.contentType = false;
          options.processData = false;
          options.data = this.constructor.objectToFormData(options.data);
        }
      }
      return options;
    },
    send: function(data) {
      return jQuery.ajax(this._prepareOptions(data));
    }
  });

}).call(this);

(function() {


}).call(this);

/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(jQuery),+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.isLoading=!1};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",f.resetText||d.data("resetText",d[e]()),d[e](f[b]||this.options[b]),setTimeout(a.proxy(function(){"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},b.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});return this.$element.trigger(j),j.isDefaultPrevented()?void 0:(this.sliding=!0,f&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid.bs.carousel",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(1e3*d.css("transition-duration").slice(0,-1))):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid.bs.carousel")),f&&this.cycle(),this)};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?void this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);!e&&f.toggle&&"show"==c&&(c=!c),e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(jQuery),+function(a){"use strict";function b(b){a(d).remove(),a(e).each(function(){var d=c(a(this)),e={relatedTarget:this};d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown",e)),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown",e))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e="[data-toggle=dropdown]",f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown",h),e.focus()}return!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).focus(),d.click();var h=" li:not(.divider):visible a",i=f.find("[role=menu]"+h+", [role=listbox]"+h);if(i.length){var j=i.index(i.filter(":focus"));38==b.keyCode&&j>0&&j--,40==b.keyCode&&j<i.length-1&&j++,~j||(j=0),i.eq(j).focus()}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+", [role=menu], [role=listbox]",f.prototype.keydown)}(jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),"object"==typeof c&&c);f||e.data("bs.modal",f=new b(this,g)),"string"==typeof c?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());c.is("a")&&b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this,d=this.tip();this.setContent(),this.options.animation&&d.addClass("fade");var e="function"==typeof this.options.placement?this.options.placement.call(this,d[0],this.$element[0]):this.options.placement,f=/\s?auto?\s?/i,g=f.test(e);g&&(e=e.replace(f,"")||"top"),d.detach().css({top:0,left:0,display:"block"}).addClass(e),this.options.container?d.appendTo(this.options.container):d.insertAfter(this.$element);var h=this.getPosition(),i=d[0].offsetWidth,j=d[0].offsetHeight;if(g){var k=this.$element.parent(),l=e,m=document.documentElement.scrollTop||document.body.scrollTop,n="body"==this.options.container?window.innerWidth:k.outerWidth(),o="body"==this.options.container?window.innerHeight:k.outerHeight(),p="body"==this.options.container?0:k.offset().left;e="bottom"==e&&h.top+h.height+j-m>o?"top":"top"==e&&h.top-m-j<0?"bottom":"right"==e&&h.right+i>n?"left":"left"==e&&h.left-i<p?"right":e,d.removeClass(l).addClass(e)}var q=this.getCalculatedOffset(e,h,i,j);this.applyPlacement(q,e),this.hoverState=null;var r=function(){c.$element.trigger("shown.bs."+c.type)};a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,r).emulateTransitionEnd(150):r()}},b.prototype.applyPlacement=function(b,c){var d,e=this.tip(),f=e[0].offsetWidth,g=e[0].offsetHeight,h=parseInt(e.css("margin-top"),10),i=parseInt(e.css("margin-left"),10);isNaN(h)&&(h=0),isNaN(i)&&(i=0),b.top=b.top+h,b.left=b.left+i,a.offset.setOffset(e[0],a.extend({using:function(a){e.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),e.addClass("in");var j=e[0].offsetWidth,k=e[0].offsetHeight;if("top"==c&&k!=g&&(d=!0,b.top=b.top+g-k),/bottom|top/.test(c)){var l=0;b.left<0&&(l=-2*b.left,b.left=0,e.offset(b),j=e[0].offsetWidth,k=e[0].offsetHeight),this.replaceArrow(l-f+j,j,"left")}else this.replaceArrow(k-g,k,"top");d&&e.offset(b)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach(),c.$element.trigger("hidden.bs."+c.type)}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,b).emulateTransitionEnd(150):b(),this.hoverState=null,this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(jQuery),+function(a){"use strict";function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(a(c).is("body")?window:c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);{var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})}},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(b.RESET).addClass("affix");var a=this.$window.scrollTop(),c=this.$element.offset();return this.pinnedOffset=c.top-a},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"top"==this.affixed&&(e.top+=d),"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.$element)),"function"==typeof h&&(h=f.bottom(this.$element));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;if(this.affixed!==i){this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k),k.isDefaultPrevented()||(this.affixed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),"bottom"==i&&this.$element.offset({top:c-h-this.$element.height()}))}}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(jQuery);
/*
 Leaflet, a JavaScript library for mobile-friendly interactive maps. http://leafletjs.com
 (c) 2010-2013, Vladimir Agafonkin
 (c) 2010-2011, CloudMade
*/
!function(t,e,i){var n=t.L,o={};o.version="0.7.2","object"==typeof module&&"object"==typeof module.exports?module.exports=o:"function"==typeof define&&define.amd&&define(o),o.noConflict=function(){return t.L=n,this},t.L=o,o.Util={extend:function(t){var e,i,n,o,s=Array.prototype.slice.call(arguments,1);for(i=0,n=s.length;n>i;i++){o=s[i]||{};for(e in o)o.hasOwnProperty(e)&&(t[e]=o[e])}return t},bind:function(t,e){var i=arguments.length>2?Array.prototype.slice.call(arguments,2):null;return function(){return t.apply(e,i||arguments)}},stamp:function(){var t=0,e="_leaflet_id";return function(i){return i[e]=i[e]||++t,i[e]}}(),invokeEach:function(t,e,i){var n,o;if("object"==typeof t){o=Array.prototype.slice.call(arguments,3);for(n in t)e.apply(i,[n,t[n]].concat(o));return!0}return!1},limitExecByInterval:function(t,e,i){var n,o;return function s(){var a=arguments;return n?(o=!0,void 0):(n=!0,setTimeout(function(){n=!1,o&&(s.apply(i,a),o=!1)},e),t.apply(i,a),void 0)}},falseFn:function(){return!1},formatNum:function(t,e){var i=Math.pow(10,e||5);return Math.round(t*i)/i},trim:function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")},splitWords:function(t){return o.Util.trim(t).split(/\s+/)},setOptions:function(t,e){return t.options=o.extend({},t.options,e),t.options},getParamString:function(t,e,i){var n=[];for(var o in t)n.push(encodeURIComponent(i?o.toUpperCase():o)+"="+encodeURIComponent(t[o]));return(e&&-1!==e.indexOf("?")?"&":"?")+n.join("&")},template:function(t,e){return t.replace(/\{ *([\w_]+) *\}/g,function(t,n){var o=e[n];if(o===i)throw new Error("No value provided for variable "+t);return"function"==typeof o&&(o=o(e)),o})},isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},emptyImageUrl:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="},function(){function e(e){var i,n,o=["webkit","moz","o","ms"];for(i=0;i<o.length&&!n;i++)n=t[o[i]+e];return n}function i(e){var i=+new Date,o=Math.max(0,16-(i-n));return n=i+o,t.setTimeout(e,o)}var n=0,s=t.requestAnimationFrame||e("RequestAnimationFrame")||i,a=t.cancelAnimationFrame||e("CancelAnimationFrame")||e("CancelRequestAnimationFrame")||function(e){t.clearTimeout(e)};o.Util.requestAnimFrame=function(e,n,a,r){return e=o.bind(e,n),a&&s===i?(e(),void 0):s.call(t,e,r)},o.Util.cancelAnimFrame=function(e){e&&a.call(t,e)}}(),o.extend=o.Util.extend,o.bind=o.Util.bind,o.stamp=o.Util.stamp,o.setOptions=o.Util.setOptions,o.Class=function(){},o.Class.extend=function(t){var e=function(){this.initialize&&this.initialize.apply(this,arguments),this._initHooks&&this.callInitHooks()},i=function(){};i.prototype=this.prototype;var n=new i;n.constructor=e,e.prototype=n;for(var s in this)this.hasOwnProperty(s)&&"prototype"!==s&&(e[s]=this[s]);t.statics&&(o.extend(e,t.statics),delete t.statics),t.includes&&(o.Util.extend.apply(null,[n].concat(t.includes)),delete t.includes),t.options&&n.options&&(t.options=o.extend({},n.options,t.options)),o.extend(n,t),n._initHooks=[];var a=this;return e.__super__=a.prototype,n.callInitHooks=function(){if(!this._initHooksCalled){a.prototype.callInitHooks&&a.prototype.callInitHooks.call(this),this._initHooksCalled=!0;for(var t=0,e=n._initHooks.length;e>t;t++)n._initHooks[t].call(this)}},e},o.Class.include=function(t){o.extend(this.prototype,t)},o.Class.mergeOptions=function(t){o.extend(this.prototype.options,t)},o.Class.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),i="function"==typeof t?t:function(){this[t].apply(this,e)};this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(i)};var s="_leaflet_events";o.Mixin={},o.Mixin.Events={addEventListener:function(t,e,i){if(o.Util.invokeEach(t,this.addEventListener,this,e,i))return this;var n,a,r,h,l,u,c,d=this[s]=this[s]||{},p=i&&i!==this&&o.stamp(i);for(t=o.Util.splitWords(t),n=0,a=t.length;a>n;n++)r={action:e,context:i||this},h=t[n],p?(l=h+"_idx",u=l+"_len",c=d[l]=d[l]||{},c[p]||(c[p]=[],d[u]=(d[u]||0)+1),c[p].push(r)):(d[h]=d[h]||[],d[h].push(r));return this},hasEventListeners:function(t){var e=this[s];return!!e&&(t in e&&e[t].length>0||t+"_idx"in e&&e[t+"_idx_len"]>0)},removeEventListener:function(t,e,i){if(!this[s])return this;if(!t)return this.clearAllEventListeners();if(o.Util.invokeEach(t,this.removeEventListener,this,e,i))return this;var n,a,r,h,l,u,c,d,p,_=this[s],m=i&&i!==this&&o.stamp(i);for(t=o.Util.splitWords(t),n=0,a=t.length;a>n;n++)if(r=t[n],u=r+"_idx",c=u+"_len",d=_[u],e){if(h=m&&d?d[m]:_[r]){for(l=h.length-1;l>=0;l--)h[l].action!==e||i&&h[l].context!==i||(p=h.splice(l,1),p[0].action=o.Util.falseFn);i&&d&&0===h.length&&(delete d[m],_[c]--)}}else delete _[r],delete _[u],delete _[c];return this},clearAllEventListeners:function(){return delete this[s],this},fireEvent:function(t,e){if(!this.hasEventListeners(t))return this;var i,n,a,r,h,l=o.Util.extend({},e,{type:t,target:this}),u=this[s];if(u[t])for(i=u[t].slice(),n=0,a=i.length;a>n;n++)i[n].action.call(i[n].context,l);r=u[t+"_idx"];for(h in r)if(i=r[h].slice())for(n=0,a=i.length;a>n;n++)i[n].action.call(i[n].context,l);return this},addOneTimeEventListener:function(t,e,i){if(o.Util.invokeEach(t,this.addOneTimeEventListener,this,e,i))return this;var n=o.bind(function(){this.removeEventListener(t,e,i).removeEventListener(t,n,i)},this);return this.addEventListener(t,e,i).addEventListener(t,n,i)}},o.Mixin.Events.on=o.Mixin.Events.addEventListener,o.Mixin.Events.off=o.Mixin.Events.removeEventListener,o.Mixin.Events.once=o.Mixin.Events.addOneTimeEventListener,o.Mixin.Events.fire=o.Mixin.Events.fireEvent,function(){var n="ActiveXObject"in t,s=n&&!e.addEventListener,a=navigator.userAgent.toLowerCase(),r=-1!==a.indexOf("webkit"),h=-1!==a.indexOf("chrome"),l=-1!==a.indexOf("phantom"),u=-1!==a.indexOf("android"),c=-1!==a.search("android [23]"),d=-1!==a.indexOf("gecko"),p=typeof orientation!=i+"",_=t.navigator&&t.navigator.msPointerEnabled&&t.navigator.msMaxTouchPoints&&!t.PointerEvent,m=t.PointerEvent&&t.navigator.pointerEnabled&&t.navigator.maxTouchPoints||_,f="devicePixelRatio"in t&&t.devicePixelRatio>1||"matchMedia"in t&&t.matchMedia("(min-resolution:144dpi)")&&t.matchMedia("(min-resolution:144dpi)").matches,g=e.documentElement,v=n&&"transition"in g.style,y="WebKitCSSMatrix"in t&&"m11"in new t.WebKitCSSMatrix&&!c,P="MozPerspective"in g.style,L="OTransition"in g.style,x=!t.L_DISABLE_3D&&(v||y||P||L)&&!l,w=!t.L_NO_TOUCH&&!l&&function(){var t="ontouchstart";if(m||t in g)return!0;var i=e.createElement("div"),n=!1;return i.setAttribute?(i.setAttribute(t,"return;"),"function"==typeof i[t]&&(n=!0),i.removeAttribute(t),i=null,n):!1}();o.Browser={ie:n,ielt9:s,webkit:r,gecko:d&&!r&&!t.opera&&!n,android:u,android23:c,chrome:h,ie3d:v,webkit3d:y,gecko3d:P,opera3d:L,any3d:x,mobile:p,mobileWebkit:p&&r,mobileWebkit3d:p&&y,mobileOpera:p&&t.opera,touch:w,msPointer:_,pointer:m,retina:f}}(),o.Point=function(t,e,i){this.x=i?Math.round(t):t,this.y=i?Math.round(e):e},o.Point.prototype={clone:function(){return new o.Point(this.x,this.y)},add:function(t){return this.clone()._add(o.point(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(o.point(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},distanceTo:function(t){t=o.point(t);var e=t.x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i)},equals:function(t){return t=o.point(t),t.x===this.x&&t.y===this.y},contains:function(t){return t=o.point(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+o.Util.formatNum(this.x)+", "+o.Util.formatNum(this.y)+")"}},o.point=function(t,e,n){return t instanceof o.Point?t:o.Util.isArray(t)?new o.Point(t[0],t[1]):t===i||null===t?t:new o.Point(t,e,n)},o.Bounds=function(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;o>n;n++)this.extend(i[n])},o.Bounds.prototype={extend:function(t){return t=o.point(t),this.min||this.max?(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(t.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(t.y,this.max.y)):(this.min=t.clone(),this.max=t.clone()),this},getCenter:function(t){return new o.Point((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return new o.Point(this.min.x,this.max.y)},getTopRight:function(){return new o.Point(this.max.x,this.min.y)},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,i;return t="number"==typeof t[0]||t instanceof o.Point?o.point(t):o.bounds(t),t instanceof o.Bounds?(e=t.min,i=t.max):e=i=t,e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y},intersects:function(t){t=o.bounds(t);var e=this.min,i=this.max,n=t.min,s=t.max,a=s.x>=e.x&&n.x<=i.x,r=s.y>=e.y&&n.y<=i.y;return a&&r},isValid:function(){return!(!this.min||!this.max)}},o.bounds=function(t,e){return!t||t instanceof o.Bounds?t:new o.Bounds(t,e)},o.Transformation=function(t,e,i,n){this._a=t,this._b=e,this._c=i,this._d=n},o.Transformation.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return e=e||1,new o.Point((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c)}},o.DomUtil={get:function(t){return"string"==typeof t?e.getElementById(t):t},getStyle:function(t,i){var n=t.style[i];if(!n&&t.currentStyle&&(n=t.currentStyle[i]),(!n||"auto"===n)&&e.defaultView){var o=e.defaultView.getComputedStyle(t,null);n=o?o[i]:null}return"auto"===n?null:n},getViewportOffset:function(t){var i,n=0,s=0,a=t,r=e.body,h=e.documentElement;do{if(n+=a.offsetTop||0,s+=a.offsetLeft||0,n+=parseInt(o.DomUtil.getStyle(a,"borderTopWidth"),10)||0,s+=parseInt(o.DomUtil.getStyle(a,"borderLeftWidth"),10)||0,i=o.DomUtil.getStyle(a,"position"),a.offsetParent===r&&"absolute"===i)break;if("fixed"===i){n+=r.scrollTop||h.scrollTop||0,s+=r.scrollLeft||h.scrollLeft||0;break}if("relative"===i&&!a.offsetLeft){var l=o.DomUtil.getStyle(a,"width"),u=o.DomUtil.getStyle(a,"max-width"),c=a.getBoundingClientRect();("none"!==l||"none"!==u)&&(s+=c.left+a.clientLeft),n+=c.top+(r.scrollTop||h.scrollTop||0);break}a=a.offsetParent}while(a);a=t;do{if(a===r)break;n-=a.scrollTop||0,s-=a.scrollLeft||0,a=a.parentNode}while(a);return new o.Point(s,n)},documentIsLtr:function(){return o.DomUtil._docIsLtrCached||(o.DomUtil._docIsLtrCached=!0,o.DomUtil._docIsLtr="ltr"===o.DomUtil.getStyle(e.body,"direction")),o.DomUtil._docIsLtr},create:function(t,i,n){var o=e.createElement(t);return o.className=i,n&&n.appendChild(o),o},hasClass:function(t,e){if(t.classList!==i)return t.classList.contains(e);var n=o.DomUtil._getClass(t);return n.length>0&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(n)},addClass:function(t,e){if(t.classList!==i)for(var n=o.Util.splitWords(e),s=0,a=n.length;a>s;s++)t.classList.add(n[s]);else if(!o.DomUtil.hasClass(t,e)){var r=o.DomUtil._getClass(t);o.DomUtil._setClass(t,(r?r+" ":"")+e)}},removeClass:function(t,e){t.classList!==i?t.classList.remove(e):o.DomUtil._setClass(t,o.Util.trim((" "+o.DomUtil._getClass(t)+" ").replace(" "+e+" "," ")))},_setClass:function(t,e){t.className.baseVal===i?t.className=e:t.className.baseVal=e},_getClass:function(t){return t.className.baseVal===i?t.className:t.className.baseVal},setOpacity:function(t,e){if("opacity"in t.style)t.style.opacity=e;else if("filter"in t.style){var i=!1,n="DXImageTransform.Microsoft.Alpha";try{i=t.filters.item(n)}catch(o){if(1===e)return}e=Math.round(100*e),i?(i.Enabled=100!==e,i.Opacity=e):t.style.filter+=" progid:"+n+"(opacity="+e+")"}},testProp:function(t){for(var i=e.documentElement.style,n=0;n<t.length;n++)if(t[n]in i)return t[n];return!1},getTranslateString:function(t){var e=o.Browser.webkit3d,i="translate"+(e?"3d":"")+"(",n=(e?",0":"")+")";return i+t.x+"px,"+t.y+"px"+n},getScaleString:function(t,e){var i=o.DomUtil.getTranslateString(e.add(e.multiplyBy(-1*t))),n=" scale("+t+") ";return i+n},setPosition:function(t,e,i){t._leaflet_pos=e,!i&&o.Browser.any3d?t.style[o.DomUtil.TRANSFORM]=o.DomUtil.getTranslateString(e):(t.style.left=e.x+"px",t.style.top=e.y+"px")},getPosition:function(t){return t._leaflet_pos}},o.DomUtil.TRANSFORM=o.DomUtil.testProp(["transform","WebkitTransform","OTransform","MozTransform","msTransform"]),o.DomUtil.TRANSITION=o.DomUtil.testProp(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),o.DomUtil.TRANSITION_END="webkitTransition"===o.DomUtil.TRANSITION||"OTransition"===o.DomUtil.TRANSITION?o.DomUtil.TRANSITION+"End":"transitionend",function(){if("onselectstart"in e)o.extend(o.DomUtil,{disableTextSelection:function(){o.DomEvent.on(t,"selectstart",o.DomEvent.preventDefault)},enableTextSelection:function(){o.DomEvent.off(t,"selectstart",o.DomEvent.preventDefault)}});else{var i=o.DomUtil.testProp(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);o.extend(o.DomUtil,{disableTextSelection:function(){if(i){var t=e.documentElement.style;this._userSelect=t[i],t[i]="none"}},enableTextSelection:function(){i&&(e.documentElement.style[i]=this._userSelect,delete this._userSelect)}})}o.extend(o.DomUtil,{disableImageDrag:function(){o.DomEvent.on(t,"dragstart",o.DomEvent.preventDefault)},enableImageDrag:function(){o.DomEvent.off(t,"dragstart",o.DomEvent.preventDefault)}})}(),o.LatLng=function(t,e,n){if(t=parseFloat(t),e=parseFloat(e),isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=t,this.lng=e,n!==i&&(this.alt=parseFloat(n))},o.extend(o.LatLng,{DEG_TO_RAD:Math.PI/180,RAD_TO_DEG:180/Math.PI,MAX_MARGIN:1e-9}),o.LatLng.prototype={equals:function(t){if(!t)return!1;t=o.latLng(t);var e=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng));return e<=o.LatLng.MAX_MARGIN},toString:function(t){return"LatLng("+o.Util.formatNum(this.lat,t)+", "+o.Util.formatNum(this.lng,t)+")"},distanceTo:function(t){t=o.latLng(t);var e=6378137,i=o.LatLng.DEG_TO_RAD,n=(t.lat-this.lat)*i,s=(t.lng-this.lng)*i,a=this.lat*i,r=t.lat*i,h=Math.sin(n/2),l=Math.sin(s/2),u=h*h+l*l*Math.cos(a)*Math.cos(r);return 2*e*Math.atan2(Math.sqrt(u),Math.sqrt(1-u))},wrap:function(t,e){var i=this.lng;return t=t||-180,e=e||180,i=(i+e)%(e-t)+(t>i||i===e?e:t),new o.LatLng(this.lat,i)}},o.latLng=function(t,e){return t instanceof o.LatLng?t:o.Util.isArray(t)?"number"==typeof t[0]||"string"==typeof t[0]?new o.LatLng(t[0],t[1],t[2]):null:t===i||null===t?t:"object"==typeof t&&"lat"in t?new o.LatLng(t.lat,"lng"in t?t.lng:t.lon):e===i?null:new o.LatLng(t,e)},o.LatLngBounds=function(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;o>n;n++)this.extend(i[n])},o.LatLngBounds.prototype={extend:function(t){if(!t)return this;var e=o.latLng(t);return t=null!==e?e:o.latLngBounds(t),t instanceof o.LatLng?this._southWest||this._northEast?(this._southWest.lat=Math.min(t.lat,this._southWest.lat),this._southWest.lng=Math.min(t.lng,this._southWest.lng),this._northEast.lat=Math.max(t.lat,this._northEast.lat),this._northEast.lng=Math.max(t.lng,this._northEast.lng)):(this._southWest=new o.LatLng(t.lat,t.lng),this._northEast=new o.LatLng(t.lat,t.lng)):t instanceof o.LatLngBounds&&(this.extend(t._southWest),this.extend(t._northEast)),this},pad:function(t){var e=this._southWest,i=this._northEast,n=Math.abs(e.lat-i.lat)*t,s=Math.abs(e.lng-i.lng)*t;return new o.LatLngBounds(new o.LatLng(e.lat-n,e.lng-s),new o.LatLng(i.lat+n,i.lng+s))},getCenter:function(){return new o.LatLng((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new o.LatLng(this.getNorth(),this.getWest())},getSouthEast:function(){return new o.LatLng(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){t="number"==typeof t[0]||t instanceof o.LatLng?o.latLng(t):o.latLngBounds(t);var e,i,n=this._southWest,s=this._northEast;return t instanceof o.LatLngBounds?(e=t.getSouthWest(),i=t.getNorthEast()):e=i=t,e.lat>=n.lat&&i.lat<=s.lat&&e.lng>=n.lng&&i.lng<=s.lng},intersects:function(t){t=o.latLngBounds(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),a=s.lat>=e.lat&&n.lat<=i.lat,r=s.lng>=e.lng&&n.lng<=i.lng;return a&&r},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t){return t?(t=o.latLngBounds(t),this._southWest.equals(t.getSouthWest())&&this._northEast.equals(t.getNorthEast())):!1},isValid:function(){return!(!this._southWest||!this._northEast)}},o.latLngBounds=function(t,e){return!t||t instanceof o.LatLngBounds?t:new o.LatLngBounds(t,e)},o.Projection={},o.Projection.SphericalMercator={MAX_LATITUDE:85.0511287798,project:function(t){var e=o.LatLng.DEG_TO_RAD,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),s=t.lng*e,a=n*e;return a=Math.log(Math.tan(Math.PI/4+a/2)),new o.Point(s,a)},unproject:function(t){var e=o.LatLng.RAD_TO_DEG,i=t.x*e,n=(2*Math.atan(Math.exp(t.y))-Math.PI/2)*e;return new o.LatLng(n,i)}},o.Projection.LonLat={project:function(t){return new o.Point(t.lng,t.lat)},unproject:function(t){return new o.LatLng(t.y,t.x)}},o.CRS={latLngToPoint:function(t,e){var i=this.projection.project(t),n=this.scale(e);return this.transformation._transform(i,n)},pointToLatLng:function(t,e){var i=this.scale(e),n=this.transformation.untransform(t,i);return this.projection.unproject(n)},project:function(t){return this.projection.project(t)},scale:function(t){return 256*Math.pow(2,t)},getSize:function(t){var e=this.scale(t);return o.point(e,e)}},o.CRS.Simple=o.extend({},o.CRS,{projection:o.Projection.LonLat,transformation:new o.Transformation(1,0,-1,0),scale:function(t){return Math.pow(2,t)}}),o.CRS.EPSG3857=o.extend({},o.CRS,{code:"EPSG:3857",projection:o.Projection.SphericalMercator,transformation:new o.Transformation(.5/Math.PI,.5,-.5/Math.PI,.5),project:function(t){var e=this.projection.project(t),i=6378137;return e.multiplyBy(i)}}),o.CRS.EPSG900913=o.extend({},o.CRS.EPSG3857,{code:"EPSG:900913"}),o.CRS.EPSG4326=o.extend({},o.CRS,{code:"EPSG:4326",projection:o.Projection.LonLat,transformation:new o.Transformation(1/360,.5,-1/360,.5)}),o.Map=o.Class.extend({includes:o.Mixin.Events,options:{crs:o.CRS.EPSG3857,fadeAnimation:o.DomUtil.TRANSITION&&!o.Browser.android23,trackResize:!0,markerZoomAnimation:o.DomUtil.TRANSITION&&o.Browser.any3d},initialize:function(t,e){e=o.setOptions(this,e),this._initContainer(t),this._initLayout(),this._onResize=o.bind(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),e.center&&e.zoom!==i&&this.setView(o.latLng(e.center),e.zoom,{reset:!0}),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._tileLayersNum=0,this.callInitHooks(),this._addLayers(e.layers)},setView:function(t,e){return e=e===i?this.getZoom():e,this._resetView(o.latLng(t),this._limitZoom(e)),this},setZoom:function(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=this._limitZoom(t),this)},zoomIn:function(t,e){return this.setZoom(this._zoom+(t||1),e)},zoomOut:function(t,e){return this.setZoom(this._zoom-(t||1),e)},setZoomAround:function(t,e,i){var n=this.getZoomScale(e),s=this.getSize().divideBy(2),a=t instanceof o.Point?t:this.latLngToContainerPoint(t),r=a.subtract(s).multiplyBy(1-1/n),h=this.containerPointToLatLng(s.add(r));return this.setView(h,e,{zoom:i})},fitBounds:function(t,e){e=e||{},t=t.getBounds?t.getBounds():o.latLngBounds(t);var i=o.point(e.paddingTopLeft||e.padding||[0,0]),n=o.point(e.paddingBottomRight||e.padding||[0,0]),s=this.getBoundsZoom(t,!1,i.add(n)),a=n.subtract(i).divideBy(2),r=this.project(t.getSouthWest(),s),h=this.project(t.getNorthEast(),s),l=this.unproject(r.add(h).divideBy(2).add(a),s);return s=e&&e.maxZoom?Math.min(e.maxZoom,s):s,this.setView(l,s,e)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t){return this.fire("movestart"),this._rawPanBy(o.point(t)),this.fire("move"),this.fire("moveend")},setMaxBounds:function(t){return t=o.latLngBounds(t),this.options.maxBounds=t,t?(this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds,this)):this.off("moveend",this._panInsideMaxBounds,this)},panInsideBounds:function(t,e){var i=this.getCenter(),n=this._limitCenter(i,this._zoom,t);return i.equals(n)?this:this.panTo(n,e)},addLayer:function(t){var e=o.stamp(t);return this._layers[e]?this:(this._layers[e]=t,!t.options||isNaN(t.options.maxZoom)&&isNaN(t.options.minZoom)||(this._zoomBoundLayers[e]=t,this._updateZoomLevels()),this.options.zoomAnimation&&o.TileLayer&&t instanceof o.TileLayer&&(this._tileLayersNum++,this._tileLayersToLoad++,t.on("load",this._onTileLayerLoad,this)),this._loaded&&this._layerAdd(t),this)},removeLayer:function(t){var e=o.stamp(t);return this._layers[e]?(this._loaded&&t.onRemove(this),delete this._layers[e],this._loaded&&this.fire("layerremove",{layer:t}),this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels()),this.options.zoomAnimation&&o.TileLayer&&t instanceof o.TileLayer&&(this._tileLayersNum--,this._tileLayersToLoad--,t.off("load",this._onTileLayerLoad,this)),this):this},hasLayer:function(t){return t?o.stamp(t)in this._layers:!1},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},invalidateSize:function(t){if(!this._loaded)return this;t=o.extend({animate:!1,pan:!0},t===!0?{animate:!0}:t);var e=this.getSize();this._sizeChanged=!0,this._initialCenter=null;var i=this.getSize(),n=e.divideBy(2).round(),s=i.divideBy(2).round(),a=n.subtract(s);return a.x||a.y?(t.animate&&t.pan?this.panBy(a):(t.pan&&this._rawPanBy(a),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(o.bind(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:i})):this},addHandler:function(t,e){if(!e)return this;var i=this[t]=new e(this);return this._handlers.push(i),this.options[t]&&i.enable(),this},remove:function(){this._loaded&&this.fire("unload"),this._initEvents("off");try{delete this._container._leaflet}catch(t){this._container._leaflet=i}return this._clearPanes(),this._clearControlPos&&this._clearControlPos(),this._clearHandlers(),this},getCenter:function(){return this._checkIfLoaded(),this._initialCenter&&!this._moved()?this._initialCenter:this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),e=this.unproject(t.getBottomLeft()),i=this.unproject(t.getTopRight());return new o.LatLngBounds(e,i)},getMinZoom:function(){return this.options.minZoom===i?this._layersMinZoom===i?0:this._layersMinZoom:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===i?this._layersMaxZoom===i?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,e,i){t=o.latLngBounds(t);var n,s=this.getMinZoom()-(e?1:0),a=this.getMaxZoom(),r=this.getSize(),h=t.getNorthWest(),l=t.getSouthEast(),u=!0;i=o.point(i||[0,0]);do s++,n=this.project(l,s).subtract(this.project(h,s)).add(i),u=e?n.x<r.x||n.y<r.y:r.contains(n);while(u&&a>=s);return u&&e?null:e?s:s-1},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new o.Point(this._container.clientWidth,this._container.clientHeight),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(){var t=this._getTopLeftPoint();return new o.Bounds(t,t.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._initialTopLeftPoint},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t){var e=this.options.crs;return e.scale(t)/e.scale(this._zoom)},getScaleZoom:function(t){return this._zoom+Math.log(t)/Math.LN2},project:function(t,e){return e=e===i?this._zoom:e,this.options.crs.latLngToPoint(o.latLng(t),e)},unproject:function(t,e){return e=e===i?this._zoom:e,this.options.crs.pointToLatLng(o.point(t),e)},layerPointToLatLng:function(t){var e=o.point(t).add(this.getPixelOrigin());return this.unproject(e)},latLngToLayerPoint:function(t){var e=this.project(o.latLng(t))._round();return e._subtract(this.getPixelOrigin())},containerPointToLayerPoint:function(t){return o.point(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return o.point(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var e=this.containerPointToLayerPoint(o.point(t));return this.layerPointToLatLng(e)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(o.latLng(t)))},mouseEventToContainerPoint:function(t){return o.DomEvent.getMousePosition(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var e=this._container=o.DomUtil.get(t);if(!e)throw new Error("Map container not found.");if(e._leaflet)throw new Error("Map container is already initialized.");e._leaflet=!0},_initLayout:function(){var t=this._container;o.DomUtil.addClass(t,"leaflet-container"+(o.Browser.touch?" leaflet-touch":"")+(o.Browser.retina?" leaflet-retina":"")+(o.Browser.ielt9?" leaflet-oldie":"")+(this.options.fadeAnimation?" leaflet-fade-anim":""));var e=o.DomUtil.getStyle(t,"position");"absolute"!==e&&"relative"!==e&&"fixed"!==e&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._mapPane=t.mapPane=this._createPane("leaflet-map-pane",this._container),this._tilePane=t.tilePane=this._createPane("leaflet-tile-pane",this._mapPane),t.objectsPane=this._createPane("leaflet-objects-pane",this._mapPane),t.shadowPane=this._createPane("leaflet-shadow-pane"),t.overlayPane=this._createPane("leaflet-overlay-pane"),t.markerPane=this._createPane("leaflet-marker-pane"),t.popupPane=this._createPane("leaflet-popup-pane");var e=" leaflet-zoom-hide";this.options.markerZoomAnimation||(o.DomUtil.addClass(t.markerPane,e),o.DomUtil.addClass(t.shadowPane,e),o.DomUtil.addClass(t.popupPane,e))},_createPane:function(t,e){return o.DomUtil.create("div",t,e||this._panes.objectsPane)},_clearPanes:function(){this._container.removeChild(this._mapPane)},_addLayers:function(t){t=t?o.Util.isArray(t)?t:[t]:[];for(var e=0,i=t.length;i>e;e++)this.addLayer(t[e])},_resetView:function(t,e,i,n){var s=this._zoom!==e;n||(this.fire("movestart"),s&&this.fire("zoomstart")),this._zoom=e,this._initialCenter=t,this._initialTopLeftPoint=this._getNewTopLeftPoint(t),i?this._initialTopLeftPoint._add(this._getMapPanePos()):o.DomUtil.setPosition(this._mapPane,new o.Point(0,0)),this._tileLayersToLoad=this._tileLayersNum;var a=!this._loaded;this._loaded=!0,a&&(this.fire("load"),this.eachLayer(this._layerAdd,this)),this.fire("viewreset",{hard:!i}),this.fire("move"),(s||n)&&this.fire("zoomend"),this.fire("moveend",{hard:!i})},_rawPanBy:function(t){o.DomUtil.setPosition(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_updateZoomLevels:function(){var t,e=1/0,n=-1/0,o=this._getZoomSpan();for(t in this._zoomBoundLayers){var s=this._zoomBoundLayers[t];isNaN(s.options.minZoom)||(e=Math.min(e,s.options.minZoom)),isNaN(s.options.maxZoom)||(n=Math.max(n,s.options.maxZoom))}t===i?this._layersMaxZoom=this._layersMinZoom=i:(this._layersMaxZoom=n,this._layersMinZoom=e),o!==this._getZoomSpan()&&this.fire("zoomlevelschange")},_panInsideMaxBounds:function(){this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(e){if(o.DomEvent){e=e||"on",o.DomEvent[e](this._container,"click",this._onMouseClick,this);var i,n,s=["dblclick","mousedown","mouseup","mouseenter","mouseleave","mousemove","contextmenu"];for(i=0,n=s.length;n>i;i++)o.DomEvent[e](this._container,s[i],this._fireMouseEvent,this);this.options.trackResize&&o.DomEvent[e](t,"resize",this._onResize,this)}},_onResize:function(){o.Util.cancelAnimFrame(this._resizeRequest),this._resizeRequest=o.Util.requestAnimFrame(function(){this.invalidateSize({debounceMoveend:!0})},this,!1,this._container)},_onMouseClick:function(t){!this._loaded||!t._simulated&&(this.dragging&&this.dragging.moved()||this.boxZoom&&this.boxZoom.moved())||o.DomEvent._skipped(t)||(this.fire("preclick"),this._fireMouseEvent(t))},_fireMouseEvent:function(t){if(this._loaded&&!o.DomEvent._skipped(t)){var e=t.type;if(e="mouseenter"===e?"mouseover":"mouseleave"===e?"mouseout":e,this.hasEventListeners(e)){"contextmenu"===e&&o.DomEvent.preventDefault(t);var i=this.mouseEventToContainerPoint(t),n=this.containerPointToLayerPoint(i),s=this.layerPointToLatLng(n);this.fire(e,{latlng:s,layerPoint:n,containerPoint:i,originalEvent:t})}}},_onTileLayerLoad:function(){this._tileLayersToLoad--,this._tileLayersNum&&!this._tileLayersToLoad&&this.fire("tilelayersload")},_clearHandlers:function(){for(var t=0,e=this._handlers.length;e>t;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,this):this.on("load",t,e),this},_layerAdd:function(t){t.onAdd(this),this.fire("layeradd",{layer:t})},_getMapPanePos:function(){return o.DomUtil.getPosition(this._mapPane)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(){return this.getPixelOrigin().subtract(this._getMapPanePos())},_getNewTopLeftPoint:function(t,e){var i=this.getSize()._divideBy(2);return this.project(t,e)._subtract(i)._round()},_latLngToNewLayerPoint:function(t,e,i){var n=this._getNewTopLeftPoint(i,e).add(this._getMapPanePos());return this.project(t,e)._subtract(n)},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,e,i){if(!i)return t;var n=this.project(t,e),s=this.getSize().divideBy(2),a=new o.Bounds(n.subtract(s),n.add(s)),r=this._getBoundsOffset(a,i,e);return this.unproject(n.add(r),e)},_limitOffset:function(t,e){if(!e)return t;var i=this.getPixelBounds(),n=new o.Bounds(i.min.add(t),i.max.add(t));return t.add(this._getBoundsOffset(n,e))},_getBoundsOffset:function(t,e,i){var n=this.project(e.getNorthWest(),i).subtract(t.min),s=this.project(e.getSouthEast(),i).subtract(t.max),a=this._rebound(n.x,-s.x),r=this._rebound(n.y,-s.y);return new o.Point(a,r)},_rebound:function(t,e){return t+e>0?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e))},_limitZoom:function(t){var e=this.getMinZoom(),i=this.getMaxZoom();return Math.max(e,Math.min(i,t))}}),o.map=function(t,e){return new o.Map(t,e)},o.Projection.Mercator={MAX_LATITUDE:85.0840591556,R_MINOR:6356752.314245179,R_MAJOR:6378137,project:function(t){var e=o.LatLng.DEG_TO_RAD,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),s=this.R_MAJOR,a=this.R_MINOR,r=t.lng*e*s,h=n*e,l=a/s,u=Math.sqrt(1-l*l),c=u*Math.sin(h);c=Math.pow((1-c)/(1+c),.5*u);var d=Math.tan(.5*(.5*Math.PI-h))/c;return h=-s*Math.log(d),new o.Point(r,h)},unproject:function(t){for(var e,i=o.LatLng.RAD_TO_DEG,n=this.R_MAJOR,s=this.R_MINOR,a=t.x*i/n,r=s/n,h=Math.sqrt(1-r*r),l=Math.exp(-t.y/n),u=Math.PI/2-2*Math.atan(l),c=15,d=1e-7,p=c,_=.1;Math.abs(_)>d&&--p>0;)e=h*Math.sin(u),_=Math.PI/2-2*Math.atan(l*Math.pow((1-e)/(1+e),.5*h))-u,u+=_;
return new o.LatLng(u*i,a)}},o.CRS.EPSG3395=o.extend({},o.CRS,{code:"EPSG:3395",projection:o.Projection.Mercator,transformation:function(){var t=o.Projection.Mercator,e=t.R_MAJOR,i=.5/(Math.PI*e);return new o.Transformation(i,.5,-i,.5)}()}),o.TileLayer=o.Class.extend({includes:o.Mixin.Events,options:{minZoom:0,maxZoom:18,tileSize:256,subdomains:"abc",errorTileUrl:"",attribution:"",zoomOffset:0,opacity:1,unloadInvisibleTiles:o.Browser.mobile,updateWhenIdle:o.Browser.mobile},initialize:function(t,e){e=o.setOptions(this,e),e.detectRetina&&o.Browser.retina&&e.maxZoom>0&&(e.tileSize=Math.floor(e.tileSize/2),e.zoomOffset++,e.minZoom>0&&e.minZoom--,this.options.maxZoom--),e.bounds&&(e.bounds=o.latLngBounds(e.bounds)),this._url=t;var i=this.options.subdomains;"string"==typeof i&&(this.options.subdomains=i.split(""))},onAdd:function(t){this._map=t,this._animated=t._zoomAnimated,this._initContainer(),t.on({viewreset:this._reset,moveend:this._update},this),this._animated&&t.on({zoomanim:this._animateZoom,zoomend:this._endZoomAnim},this),this.options.updateWhenIdle||(this._limitedUpdate=o.Util.limitExecByInterval(this._update,150,this),t.on("move",this._limitedUpdate,this)),this._reset(),this._update()},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){this._container.parentNode.removeChild(this._container),t.off({viewreset:this._reset,moveend:this._update},this),this._animated&&t.off({zoomanim:this._animateZoom,zoomend:this._endZoomAnim},this),this.options.updateWhenIdle||t.off("move",this._limitedUpdate,this),this._container=null,this._map=null},bringToFront:function(){var t=this._map._panes.tilePane;return this._container&&(t.appendChild(this._container),this._setAutoZIndex(t,Math.max)),this},bringToBack:function(){var t=this._map._panes.tilePane;return this._container&&(t.insertBefore(this._container,t.firstChild),this._setAutoZIndex(t,Math.min)),this},getAttribution:function(){return this.options.attribution},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},setUrl:function(t,e){return this._url=t,e||this.redraw(),this},redraw:function(){return this._map&&(this._reset({hard:!0}),this._update()),this},_updateZIndex:function(){this._container&&this.options.zIndex!==i&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t,e){var i,n,o,s=t.children,a=-e(1/0,-1/0);for(n=0,o=s.length;o>n;n++)s[n]!==this._container&&(i=parseInt(s[n].style.zIndex,10),isNaN(i)||(a=e(a,i)));this.options.zIndex=this._container.style.zIndex=(isFinite(a)?a:0)+e(1,-1)},_updateOpacity:function(){var t,e=this._tiles;if(o.Browser.ielt9)for(t in e)o.DomUtil.setOpacity(e[t],this.options.opacity);else o.DomUtil.setOpacity(this._container,this.options.opacity)},_initContainer:function(){var t=this._map._panes.tilePane;if(!this._container){if(this._container=o.DomUtil.create("div","leaflet-layer"),this._updateZIndex(),this._animated){var e="leaflet-tile-container";this._bgBuffer=o.DomUtil.create("div",e,this._container),this._tileContainer=o.DomUtil.create("div",e,this._container)}else this._tileContainer=this._container;t.appendChild(this._container),this.options.opacity<1&&this._updateOpacity()}},_reset:function(t){for(var e in this._tiles)this.fire("tileunload",{tile:this._tiles[e]});this._tiles={},this._tilesToLoad=0,this.options.reuseTiles&&(this._unusedTiles=[]),this._tileContainer.innerHTML="",this._animated&&t&&t.hard&&this._clearBgBuffer(),this._initContainer()},_getTileSize:function(){var t=this._map,e=t.getZoom()+this.options.zoomOffset,i=this.options.maxNativeZoom,n=this.options.tileSize;return i&&e>i&&(n=Math.round(t.getZoomScale(e)/t.getZoomScale(i)*n)),n},_update:function(){if(this._map){var t=this._map,e=t.getPixelBounds(),i=t.getZoom(),n=this._getTileSize();if(!(i>this.options.maxZoom||i<this.options.minZoom)){var s=o.bounds(e.min.divideBy(n)._floor(),e.max.divideBy(n)._floor());this._addTilesFromCenterOut(s),(this.options.unloadInvisibleTiles||this.options.reuseTiles)&&this._removeOtherTiles(s)}}},_addTilesFromCenterOut:function(t){var i,n,s,a=[],r=t.getCenter();for(i=t.min.y;i<=t.max.y;i++)for(n=t.min.x;n<=t.max.x;n++)s=new o.Point(n,i),this._tileShouldBeLoaded(s)&&a.push(s);var h=a.length;if(0!==h){a.sort(function(t,e){return t.distanceTo(r)-e.distanceTo(r)});var l=e.createDocumentFragment();for(this._tilesToLoad||this.fire("loading"),this._tilesToLoad+=h,n=0;h>n;n++)this._addTile(a[n],l);this._tileContainer.appendChild(l)}},_tileShouldBeLoaded:function(t){if(t.x+":"+t.y in this._tiles)return!1;var e=this.options;if(!e.continuousWorld){var i=this._getWrapTileNum();if(e.noWrap&&(t.x<0||t.x>=i.x)||t.y<0||t.y>=i.y)return!1}if(e.bounds){var n=e.tileSize,o=t.multiplyBy(n),s=o.add([n,n]),a=this._map.unproject(o),r=this._map.unproject(s);if(e.continuousWorld||e.noWrap||(a=a.wrap(),r=r.wrap()),!e.bounds.intersects([a,r]))return!1}return!0},_removeOtherTiles:function(t){var e,i,n,o;for(o in this._tiles)e=o.split(":"),i=parseInt(e[0],10),n=parseInt(e[1],10),(i<t.min.x||i>t.max.x||n<t.min.y||n>t.max.y)&&this._removeTile(o)},_removeTile:function(t){var e=this._tiles[t];this.fire("tileunload",{tile:e,url:e.src}),this.options.reuseTiles?(o.DomUtil.removeClass(e,"leaflet-tile-loaded"),this._unusedTiles.push(e)):e.parentNode===this._tileContainer&&this._tileContainer.removeChild(e),o.Browser.android||(e.onload=null,e.src=o.Util.emptyImageUrl),delete this._tiles[t]},_addTile:function(t,e){var i=this._getTilePos(t),n=this._getTile();o.DomUtil.setPosition(n,i,o.Browser.chrome),this._tiles[t.x+":"+t.y]=n,this._loadTile(n,t),n.parentNode!==this._tileContainer&&e.appendChild(n)},_getZoomForUrl:function(){var t=this.options,e=this._map.getZoom();return t.zoomReverse&&(e=t.maxZoom-e),e+=t.zoomOffset,t.maxNativeZoom?Math.min(e,t.maxNativeZoom):e},_getTilePos:function(t){var e=this._map.getPixelOrigin(),i=this._getTileSize();return t.multiplyBy(i).subtract(e)},getTileUrl:function(t){return o.Util.template(this._url,o.extend({s:this._getSubdomain(t),z:t.z,x:t.x,y:t.y},this.options))},_getWrapTileNum:function(){var t=this._map.options.crs,e=t.getSize(this._map.getZoom());return e.divideBy(this._getTileSize())._floor()},_adjustTilePoint:function(t){var e=this._getWrapTileNum();this.options.continuousWorld||this.options.noWrap||(t.x=(t.x%e.x+e.x)%e.x),this.options.tms&&(t.y=e.y-t.y-1),t.z=this._getZoomForUrl()},_getSubdomain:function(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[e]},_getTile:function(){if(this.options.reuseTiles&&this._unusedTiles.length>0){var t=this._unusedTiles.pop();return this._resetTile(t),t}return this._createTile()},_resetTile:function(){},_createTile:function(){var t=o.DomUtil.create("img","leaflet-tile");return t.style.width=t.style.height=this._getTileSize()+"px",t.galleryimg="no",t.onselectstart=t.onmousemove=o.Util.falseFn,o.Browser.ielt9&&this.options.opacity!==i&&o.DomUtil.setOpacity(t,this.options.opacity),o.Browser.mobileWebkit3d&&(t.style.WebkitBackfaceVisibility="hidden"),t},_loadTile:function(t,e){t._layer=this,t.onload=this._tileOnLoad,t.onerror=this._tileOnError,this._adjustTilePoint(e),t.src=this.getTileUrl(e),this.fire("tileloadstart",{tile:t,url:t.src})},_tileLoaded:function(){this._tilesToLoad--,this._animated&&o.DomUtil.addClass(this._tileContainer,"leaflet-zoom-animated"),this._tilesToLoad||(this.fire("load"),this._animated&&(clearTimeout(this._clearBgBufferTimer),this._clearBgBufferTimer=setTimeout(o.bind(this._clearBgBuffer,this),500)))},_tileOnLoad:function(){var t=this._layer;this.src!==o.Util.emptyImageUrl&&(o.DomUtil.addClass(this,"leaflet-tile-loaded"),t.fire("tileload",{tile:this,url:this.src})),t._tileLoaded()},_tileOnError:function(){var t=this._layer;t.fire("tileerror",{tile:this,url:this.src});var e=t.options.errorTileUrl;e&&(this.src=e),t._tileLoaded()}}),o.tileLayer=function(t,e){return new o.TileLayer(t,e)},o.TileLayer.WMS=o.TileLayer.extend({defaultWmsParams:{service:"WMS",request:"GetMap",version:"1.1.1",layers:"",styles:"",format:"image/jpeg",transparent:!1},initialize:function(t,e){this._url=t;var i=o.extend({},this.defaultWmsParams),n=e.tileSize||this.options.tileSize;i.width=i.height=e.detectRetina&&o.Browser.retina?2*n:n;for(var s in e)this.options.hasOwnProperty(s)||"crs"===s||(i[s]=e[s]);this.wmsParams=i,o.setOptions(this,e)},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var e=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[e]=this._crs.code,o.TileLayer.prototype.onAdd.call(this,t)},getTileUrl:function(t){var e=this._map,i=this.options.tileSize,n=t.multiplyBy(i),s=n.add([i,i]),a=this._crs.project(e.unproject(n,t.z)),r=this._crs.project(e.unproject(s,t.z)),h=this._wmsVersion>=1.3&&this._crs===o.CRS.EPSG4326?[r.y,a.x,a.y,r.x].join(","):[a.x,r.y,r.x,a.y].join(","),l=o.Util.template(this._url,{s:this._getSubdomain(t)});return l+o.Util.getParamString(this.wmsParams,l,!0)+"&BBOX="+h},setParams:function(t,e){return o.extend(this.wmsParams,t),e||this.redraw(),this}}),o.tileLayer.wms=function(t,e){return new o.TileLayer.WMS(t,e)},o.TileLayer.Canvas=o.TileLayer.extend({options:{async:!1},initialize:function(t){o.setOptions(this,t)},redraw:function(){this._map&&(this._reset({hard:!0}),this._update());for(var t in this._tiles)this._redrawTile(this._tiles[t]);return this},_redrawTile:function(t){this.drawTile(t,t._tilePoint,this._map._zoom)},_createTile:function(){var t=o.DomUtil.create("canvas","leaflet-tile");return t.width=t.height=this.options.tileSize,t.onselectstart=t.onmousemove=o.Util.falseFn,t},_loadTile:function(t,e){t._layer=this,t._tilePoint=e,this._redrawTile(t),this.options.async||this.tileDrawn(t)},drawTile:function(){},tileDrawn:function(t){this._tileOnLoad.call(t)}}),o.tileLayer.canvas=function(t){return new o.TileLayer.Canvas(t)},o.ImageOverlay=o.Class.extend({includes:o.Mixin.Events,options:{opacity:1},initialize:function(t,e,i){this._url=t,this._bounds=o.latLngBounds(e),o.setOptions(this,i)},onAdd:function(t){this._map=t,this._image||this._initImage(),t._panes.overlayPane.appendChild(this._image),t.on("viewreset",this._reset,this),t.options.zoomAnimation&&o.Browser.any3d&&t.on("zoomanim",this._animateZoom,this),this._reset()},onRemove:function(t){t.getPanes().overlayPane.removeChild(this._image),t.off("viewreset",this._reset,this),t.options.zoomAnimation&&t.off("zoomanim",this._animateZoom,this)},addTo:function(t){return t.addLayer(this),this},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},bringToFront:function(){return this._image&&this._map._panes.overlayPane.appendChild(this._image),this},bringToBack:function(){var t=this._map._panes.overlayPane;return this._image&&t.insertBefore(this._image,t.firstChild),this},setUrl:function(t){this._url=t,this._image.src=this._url},getAttribution:function(){return this.options.attribution},_initImage:function(){this._image=o.DomUtil.create("img","leaflet-image-layer"),this._map.options.zoomAnimation&&o.Browser.any3d?o.DomUtil.addClass(this._image,"leaflet-zoom-animated"):o.DomUtil.addClass(this._image,"leaflet-zoom-hide"),this._updateOpacity(),o.extend(this._image,{galleryimg:"no",onselectstart:o.Util.falseFn,onmousemove:o.Util.falseFn,onload:o.bind(this._onImageLoad,this),src:this._url})},_animateZoom:function(t){var e=this._map,i=this._image,n=e.getZoomScale(t.zoom),s=this._bounds.getNorthWest(),a=this._bounds.getSouthEast(),r=e._latLngToNewLayerPoint(s,t.zoom,t.center),h=e._latLngToNewLayerPoint(a,t.zoom,t.center)._subtract(r),l=r._add(h._multiplyBy(.5*(1-1/n)));i.style[o.DomUtil.TRANSFORM]=o.DomUtil.getTranslateString(l)+" scale("+n+") "},_reset:function(){var t=this._image,e=this._map.latLngToLayerPoint(this._bounds.getNorthWest()),i=this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(e);o.DomUtil.setPosition(t,e),t.style.width=i.x+"px",t.style.height=i.y+"px"},_onImageLoad:function(){this.fire("load")},_updateOpacity:function(){o.DomUtil.setOpacity(this._image,this.options.opacity)}}),o.imageOverlay=function(t,e,i){return new o.ImageOverlay(t,e,i)},o.Icon=o.Class.extend({options:{className:""},initialize:function(t){o.setOptions(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,e){var i=this._getIconUrl(t);if(!i){if("icon"===t)throw new Error("iconUrl not set in Icon options (see the docs).");return null}var n;return n=e&&"IMG"===e.tagName?this._createImg(i,e):this._createImg(i),this._setIconStyles(n,t),n},_setIconStyles:function(t,e){var i,n=this.options,s=o.point(n[e+"Size"]);i="shadow"===e?o.point(n.shadowAnchor||n.iconAnchor):o.point(n.iconAnchor),!i&&s&&(i=s.divideBy(2,!0)),t.className="leaflet-marker-"+e+" "+n.className,i&&(t.style.marginLeft=-i.x+"px",t.style.marginTop=-i.y+"px"),s&&(t.style.width=s.x+"px",t.style.height=s.y+"px")},_createImg:function(t,i){return i=i||e.createElement("img"),i.src=t,i},_getIconUrl:function(t){return o.Browser.retina&&this.options[t+"RetinaUrl"]?this.options[t+"RetinaUrl"]:this.options[t+"Url"]}}),o.icon=function(t){return new o.Icon(t)},o.Icon.Default=o.Icon.extend({options:{iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]},_getIconUrl:function(t){var e=t+"Url";if(this.options[e])return this.options[e];o.Browser.retina&&"icon"===t&&(t+="-2x");var i=o.Icon.Default.imagePath;if(!i)throw new Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");return i+"/marker-"+t+".png"}}),o.Icon.Default.imagePath=function(){var t,i,n,o,s,a=e.getElementsByTagName("script"),r=/[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;for(t=0,i=a.length;i>t;t++)if(n=a[t].src,o=n.match(r))return s=n.split(r)[0],(s?s+"/":"")+"images"}(),o.Marker=o.Class.extend({includes:o.Mixin.Events,options:{icon:new o.Icon.Default,title:"",alt:"",clickable:!0,draggable:!1,keyboard:!0,zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250},initialize:function(t,e){o.setOptions(this,e),this._latlng=o.latLng(t)},onAdd:function(t){this._map=t,t.on("viewreset",this.update,this),this._initIcon(),this.update(),this.fire("add"),t.options.zoomAnimation&&t.options.markerZoomAnimation&&t.on("zoomanim",this._animateZoom,this)},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){this.dragging&&this.dragging.disable(),this._removeIcon(),this._removeShadow(),this.fire("remove"),t.off({viewreset:this.update,zoomanim:this._animateZoom},this),this._map=null},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=o.latLng(t),this.update(),this.fire("move",{latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update(),this},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup),this},update:function(){if(this._icon){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,e=this._map,i=e.options.zoomAnimation&&e.options.markerZoomAnimation,n=i?"leaflet-zoom-animated":"leaflet-zoom-hide",s=t.icon.createIcon(this._icon),a=!1;s!==this._icon&&(this._icon&&this._removeIcon(),a=!0,t.title&&(s.title=t.title),t.alt&&(s.alt=t.alt)),o.DomUtil.addClass(s,n),t.keyboard&&(s.tabIndex="0"),this._icon=s,this._initInteraction(),t.riseOnHover&&o.DomEvent.on(s,"mouseover",this._bringToFront,this).on(s,"mouseout",this._resetZIndex,this);var r=t.icon.createShadow(this._shadow),h=!1;r!==this._shadow&&(this._removeShadow(),h=!0),r&&o.DomUtil.addClass(r,n),this._shadow=r,t.opacity<1&&this._updateOpacity();var l=this._map._panes;a&&l.markerPane.appendChild(this._icon),r&&h&&l.shadowPane.appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&o.DomEvent.off(this._icon,"mouseover",this._bringToFront).off(this._icon,"mouseout",this._resetZIndex),this._map._panes.markerPane.removeChild(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&this._map._panes.shadowPane.removeChild(this._shadow),this._shadow=null},_setPos:function(t){o.DomUtil.setPosition(this._icon,t),this._shadow&&o.DomUtil.setPosition(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon.style.zIndex=this._zIndex+t},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(e)},_initInteraction:function(){if(this.options.clickable){var t=this._icon,e=["dblclick","mousedown","mouseover","mouseout","contextmenu"];o.DomUtil.addClass(t,"leaflet-clickable"),o.DomEvent.on(t,"click",this._onMouseClick,this),o.DomEvent.on(t,"keypress",this._onKeyPress,this);for(var i=0;i<e.length;i++)o.DomEvent.on(t,e[i],this._fireMouseEvent,this);o.Handler.MarkerDrag&&(this.dragging=new o.Handler.MarkerDrag(this),this.options.draggable&&this.dragging.enable())}},_onMouseClick:function(t){var e=this.dragging&&this.dragging.moved();(this.hasEventListeners(t.type)||e)&&o.DomEvent.stopPropagation(t),e||(this.dragging&&this.dragging._enabled||!this._map.dragging||!this._map.dragging.moved())&&this.fire(t.type,{originalEvent:t,latlng:this._latlng})},_onKeyPress:function(t){13===t.keyCode&&this.fire("click",{originalEvent:t,latlng:this._latlng})},_fireMouseEvent:function(t){this.fire(t.type,{originalEvent:t,latlng:this._latlng}),"contextmenu"===t.type&&this.hasEventListeners(t.type)&&o.DomEvent.preventDefault(t),"mousedown"!==t.type?o.DomEvent.stopPropagation(t):o.DomEvent.preventDefault(t)},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){o.DomUtil.setOpacity(this._icon,this.options.opacity),this._shadow&&o.DomUtil.setOpacity(this._shadow,this.options.opacity)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)}}),o.marker=function(t,e){return new o.Marker(t,e)},o.DivIcon=o.Icon.extend({options:{iconSize:[12,12],className:"leaflet-div-icon",html:!1},createIcon:function(t){var i=t&&"DIV"===t.tagName?t:e.createElement("div"),n=this.options;return i.innerHTML=n.html!==!1?n.html:"",n.bgPos&&(i.style.backgroundPosition=-n.bgPos.x+"px "+-n.bgPos.y+"px"),this._setIconStyles(i,"icon"),i},createShadow:function(){return null}}),o.divIcon=function(t){return new o.DivIcon(t)},o.Map.mergeOptions({closePopupOnClick:!0}),o.Popup=o.Class.extend({includes:o.Mixin.Events,options:{minWidth:50,maxWidth:300,autoPan:!0,closeButton:!0,offset:[0,7],autoPanPadding:[5,5],keepInView:!1,className:"",zoomAnimation:!0},initialize:function(t,e){o.setOptions(this,t),this._source=e,this._animated=o.Browser.any3d&&this.options.zoomAnimation,this._isOpen=!1},onAdd:function(t){this._map=t,this._container||this._initLayout();var e=t.options.fadeAnimation;e&&o.DomUtil.setOpacity(this._container,0),t._panes.popupPane.appendChild(this._container),t.on(this._getEvents(),this),this.update(),e&&o.DomUtil.setOpacity(this._container,1),this.fire("open"),t.fire("popupopen",{popup:this}),this._source&&this._source.fire("popupopen",{popup:this})},addTo:function(t){return t.addLayer(this),this},openOn:function(t){return t.openPopup(this),this},onRemove:function(t){t._panes.popupPane.removeChild(this._container),o.Util.falseFn(this._container.offsetWidth),t.off(this._getEvents(),this),t.options.fadeAnimation&&o.DomUtil.setOpacity(this._container,0),this._map=null,this.fire("close"),t.fire("popupclose",{popup:this}),this._source&&this._source.fire("popupclose",{popup:this})},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=o.latLng(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},_getEvents:function(){var t={viewreset:this._updatePosition};return this._animated&&(t.zoomanim=this._zoomAnimation),("closeOnClick"in this.options?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this._close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_close:function(){this._map&&this._map.closePopup(this)},_initLayout:function(){var t,e="leaflet-popup",i=e+" "+this.options.className+" leaflet-zoom-"+(this._animated?"animated":"hide"),n=this._container=o.DomUtil.create("div",i);this.options.closeButton&&(t=this._closeButton=o.DomUtil.create("a",e+"-close-button",n),t.href="#close",t.innerHTML="&#215;",o.DomEvent.disableClickPropagation(t),o.DomEvent.on(t,"click",this._onCloseButtonClick,this));var s=this._wrapper=o.DomUtil.create("div",e+"-content-wrapper",n);o.DomEvent.disableClickPropagation(s),this._contentNode=o.DomUtil.create("div",e+"-content",s),o.DomEvent.disableScrollPropagation(this._contentNode),o.DomEvent.on(s,"contextmenu",o.DomEvent.stopPropagation),this._tipContainer=o.DomUtil.create("div",e+"-tip-container",n),this._tip=o.DomUtil.create("div",e+"-tip",this._tipContainer)},_updateContent:function(){if(this._content){if("string"==typeof this._content)this._contentNode.innerHTML=this._content;else{for(;this._contentNode.hasChildNodes();)this._contentNode.removeChild(this._contentNode.firstChild);this._contentNode.appendChild(this._content)}this.fire("contentupdate")}},_updateLayout:function(){var t=this._contentNode,e=t.style;e.width="",e.whiteSpace="nowrap";var i=t.offsetWidth;i=Math.min(i,this.options.maxWidth),i=Math.max(i,this.options.minWidth),e.width=i+1+"px",e.whiteSpace="",e.height="";var n=t.offsetHeight,s=this.options.maxHeight,a="leaflet-popup-scrolled";s&&n>s?(e.height=s+"px",o.DomUtil.addClass(t,a)):o.DomUtil.removeClass(t,a),this._containerWidth=this._container.offsetWidth},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=this._animated,i=o.point(this.options.offset);e&&o.DomUtil.setPosition(this._container,t),this._containerBottom=-i.y-(e?0:t.y),this._containerLeft=-Math.round(this._containerWidth/2)+i.x+(e?0:t.x),this._container.style.bottom=this._containerBottom+"px",this._container.style.left=this._containerLeft+"px"}},_zoomAnimation:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);o.DomUtil.setPosition(this._container,e)},_adjustPan:function(){if(this.options.autoPan){var t=this._map,e=this._container.offsetHeight,i=this._containerWidth,n=new o.Point(this._containerLeft,-e-this._containerBottom);this._animated&&n._add(o.DomUtil.getPosition(this._container));var s=t.layerPointToContainerPoint(n),a=o.point(this.options.autoPanPadding),r=o.point(this.options.autoPanPaddingTopLeft||a),h=o.point(this.options.autoPanPaddingBottomRight||a),l=t.getSize(),u=0,c=0;s.x+i+h.x>l.x&&(u=s.x+i-l.x+h.x),s.x-u-r.x<0&&(u=s.x-r.x),s.y+e+h.y>l.y&&(c=s.y+e-l.y+h.y),s.y-c-r.y<0&&(c=s.y-r.y),(u||c)&&t.fire("autopanstart").panBy([u,c])}},_onCloseButtonClick:function(t){this._close(),o.DomEvent.stop(t)}}),o.popup=function(t,e){return new o.Popup(t,e)},o.Map.include({openPopup:function(t,e,i){if(this.closePopup(),!(t instanceof o.Popup)){var n=t;t=new o.Popup(i).setLatLng(e).setContent(n)}return t._isOpen=!0,this._popup=t,this.addLayer(t)},closePopup:function(t){return t&&t!==this._popup||(t=this._popup,this._popup=null),t&&(this.removeLayer(t),t._isOpen=!1),this}}),o.Marker.include({openPopup:function(){return this._popup&&this._map&&!this._map.hasLayer(this._popup)&&(this._popup.setLatLng(this._latlng),this._map.openPopup(this._popup)),this},closePopup:function(){return this._popup&&this._popup._close(),this},togglePopup:function(){return this._popup&&(this._popup._isOpen?this.closePopup():this.openPopup()),this},bindPopup:function(t,e){var i=o.point(this.options.icon.options.popupAnchor||[0,0]);return i=i.add(o.Popup.prototype.options.offset),e&&e.offset&&(i=i.add(e.offset)),e=o.extend({offset:i},e),this._popupHandlersAdded||(this.on("click",this.togglePopup,this).on("remove",this.closePopup,this).on("move",this._movePopup,this),this._popupHandlersAdded=!0),t instanceof o.Popup?(o.setOptions(t,e),this._popup=t):this._popup=new o.Popup(e,this).setContent(t),this},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},unbindPopup:function(){return this._popup&&(this._popup=null,this.off("click",this.togglePopup,this).off("remove",this.closePopup,this).off("move",this._movePopup,this),this._popupHandlersAdded=!1),this},getPopup:function(){return this._popup},_movePopup:function(t){this._popup.setLatLng(t.latlng)}}),o.LayerGroup=o.Class.extend({initialize:function(t){this._layers={};var e,i;if(t)for(e=0,i=t.length;i>e;e++)this.addLayer(t[e])},addLayer:function(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var e=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),delete this._layers[e],this},hasLayer:function(t){return t?t in this._layers||this.getLayerId(t)in this._layers:!1},clearLayers:function(){return this.eachLayer(this.removeLayer,this),this},invoke:function(t){var e,i,n=Array.prototype.slice.call(arguments,1);for(e in this._layers)i=this._layers[e],i[t]&&i[t].apply(i,n);return this},onAdd:function(t){this._map=t,this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t),this._map=null},addTo:function(t){return t.addLayer(this),this},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];for(var e in this._layers)t.push(this._layers[e]);return t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return o.stamp(t)}}),o.layerGroup=function(t){return new o.LayerGroup(t)},o.FeatureGroup=o.LayerGroup.extend({includes:o.Mixin.Events,statics:{EVENTS:"click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose"},addLayer:function(t){return this.hasLayer(t)?this:("on"in t&&t.on(o.FeatureGroup.EVENTS,this._propagateEvent,this),o.LayerGroup.prototype.addLayer.call(this,t),this._popupContent&&t.bindPopup&&t.bindPopup(this._popupContent,this._popupOptions),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.off(o.FeatureGroup.EVENTS,this._propagateEvent,this),o.LayerGroup.prototype.removeLayer.call(this,t),this._popupContent&&this.invoke("unbindPopup"),this.fire("layerremove",{layer:t})):this},bindPopup:function(t,e){return this._popupContent=t,this._popupOptions=e,this.invoke("bindPopup",t,e)},openPopup:function(t){for(var e in this._layers){this._layers[e].openPopup(t);break}return this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new o.LatLngBounds;return this.eachLayer(function(e){t.extend(e instanceof o.Marker?e.getLatLng():e.getBounds())}),t},_propagateEvent:function(t){t=o.extend({layer:t.target,target:this},t),this.fire(t.type,t)}}),o.featureGroup=function(t){return new o.FeatureGroup(t)},o.Path=o.Class.extend({includes:[o.Mixin.Events],statics:{CLIP_PADDING:function(){var e=o.Browser.mobile?1280:2e3,i=(e/Math.max(t.outerWidth,t.outerHeight)-1)/2;return Math.max(0,Math.min(.5,i))}()},options:{stroke:!0,color:"#0033ff",dashArray:null,lineCap:null,lineJoin:null,weight:5,opacity:.5,fill:!1,fillColor:null,fillOpacity:.2,clickable:!0},initialize:function(t){o.setOptions(this,t)},onAdd:function(t){this._map=t,this._container||(this._initElements(),this._initEvents()),this.projectLatlngs(),this._updatePath(),this._container&&this._map._pathRoot.appendChild(this._container),this.fire("add"),t.on({viewreset:this.projectLatlngs,moveend:this._updatePath},this)},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){t._pathRoot.removeChild(this._container),this.fire("remove"),this._map=null,o.Browser.vml&&(this._container=null,this._stroke=null,this._fill=null),t.off({viewreset:this.projectLatlngs,moveend:this._updatePath},this)},projectLatlngs:function(){},setStyle:function(t){return o.setOptions(this,t),this._container&&this._updateStyle(),this},redraw:function(){return this._map&&(this.projectLatlngs(),this._updatePath()),this}}),o.Map.include({_updatePathViewport:function(){var t=o.Path.CLIP_PADDING,e=this.getSize(),i=o.DomUtil.getPosition(this._mapPane),n=i.multiplyBy(-1)._subtract(e.multiplyBy(t)._round()),s=n.add(e.multiplyBy(1+2*t)._round());this._pathViewport=new o.Bounds(n,s)}}),o.Path.SVG_NS="http://www.w3.org/2000/svg",o.Browser.svg=!(!e.createElementNS||!e.createElementNS(o.Path.SVG_NS,"svg").createSVGRect),o.Path=o.Path.extend({statics:{SVG:o.Browser.svg},bringToFront:function(){var t=this._map._pathRoot,e=this._container;return e&&t.lastChild!==e&&t.appendChild(e),this},bringToBack:function(){var t=this._map._pathRoot,e=this._container,i=t.firstChild;return e&&i!==e&&t.insertBefore(e,i),this},getPathString:function(){},_createElement:function(t){return e.createElementNS(o.Path.SVG_NS,t)},_initElements:function(){this._map._initPathRoot(),this._initPath(),this._initStyle()},_initPath:function(){this._container=this._createElement("g"),this._path=this._createElement("path"),this.options.className&&o.DomUtil.addClass(this._path,this.options.className),this._container.appendChild(this._path)},_initStyle:function(){this.options.stroke&&(this._path.setAttribute("stroke-linejoin","round"),this._path.setAttribute("stroke-linecap","round")),this.options.fill&&this._path.setAttribute("fill-rule","evenodd"),this.options.pointerEvents&&this._path.setAttribute("pointer-events",this.options.pointerEvents),this.options.clickable||this.options.pointerEvents||this._path.setAttribute("pointer-events","none"),this._updateStyle()},_updateStyle:function(){this.options.stroke?(this._path.setAttribute("stroke",this.options.color),this._path.setAttribute("stroke-opacity",this.options.opacity),this._path.setAttribute("stroke-width",this.options.weight),this.options.dashArray?this._path.setAttribute("stroke-dasharray",this.options.dashArray):this._path.removeAttribute("stroke-dasharray"),this.options.lineCap&&this._path.setAttribute("stroke-linecap",this.options.lineCap),this.options.lineJoin&&this._path.setAttribute("stroke-linejoin",this.options.lineJoin)):this._path.setAttribute("stroke","none"),this.options.fill?(this._path.setAttribute("fill",this.options.fillColor||this.options.color),this._path.setAttribute("fill-opacity",this.options.fillOpacity)):this._path.setAttribute("fill","none")},_updatePath:function(){var t=this.getPathString();t||(t="M0 0"),this._path.setAttribute("d",t)},_initEvents:function(){if(this.options.clickable){(o.Browser.svg||!o.Browser.vml)&&o.DomUtil.addClass(this._path,"leaflet-clickable"),o.DomEvent.on(this._container,"click",this._onMouseClick,this);for(var t=["dblclick","mousedown","mouseover","mouseout","mousemove","contextmenu"],e=0;e<t.length;e++)o.DomEvent.on(this._container,t[e],this._fireMouseEvent,this)}},_onMouseClick:function(t){this._map.dragging&&this._map.dragging.moved()||this._fireMouseEvent(t)},_fireMouseEvent:function(t){if(this.hasEventListeners(t.type)){var e=this._map,i=e.mouseEventToContainerPoint(t),n=e.containerPointToLayerPoint(i),s=e.layerPointToLatLng(n);this.fire(t.type,{latlng:s,layerPoint:n,containerPoint:i,originalEvent:t}),"contextmenu"===t.type&&o.DomEvent.preventDefault(t),"mousemove"!==t.type&&o.DomEvent.stopPropagation(t)}}}),o.Map.include({_initPathRoot:function(){this._pathRoot||(this._pathRoot=o.Path.prototype._createElement("svg"),this._panes.overlayPane.appendChild(this._pathRoot),this.options.zoomAnimation&&o.Browser.any3d?(o.DomUtil.addClass(this._pathRoot,"leaflet-zoom-animated"),this.on({zoomanim:this._animatePathZoom,zoomend:this._endPathZoom})):o.DomUtil.addClass(this._pathRoot,"leaflet-zoom-hide"),this.on("moveend",this._updateSvgViewport),this._updateSvgViewport())
},_animatePathZoom:function(t){var e=this.getZoomScale(t.zoom),i=this._getCenterOffset(t.center)._multiplyBy(-e)._add(this._pathViewport.min);this._pathRoot.style[o.DomUtil.TRANSFORM]=o.DomUtil.getTranslateString(i)+" scale("+e+") ",this._pathZooming=!0},_endPathZoom:function(){this._pathZooming=!1},_updateSvgViewport:function(){if(!this._pathZooming){this._updatePathViewport();var t=this._pathViewport,e=t.min,i=t.max,n=i.x-e.x,s=i.y-e.y,a=this._pathRoot,r=this._panes.overlayPane;o.Browser.mobileWebkit&&r.removeChild(a),o.DomUtil.setPosition(a,e),a.setAttribute("width",n),a.setAttribute("height",s),a.setAttribute("viewBox",[e.x,e.y,n,s].join(" ")),o.Browser.mobileWebkit&&r.appendChild(a)}}}),o.Path.include({bindPopup:function(t,e){return t instanceof o.Popup?this._popup=t:((!this._popup||e)&&(this._popup=new o.Popup(e,this)),this._popup.setContent(t)),this._popupHandlersAdded||(this.on("click",this._openPopup,this).on("remove",this.closePopup,this),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this._popup=null,this.off("click",this._openPopup).off("remove",this.closePopup),this._popupHandlersAdded=!1),this},openPopup:function(t){return this._popup&&(t=t||this._latlng||this._latlngs[Math.floor(this._latlngs.length/2)],this._openPopup({latlng:t})),this},closePopup:function(){return this._popup&&this._popup._close(),this},_openPopup:function(t){this._popup.setLatLng(t.latlng),this._map.openPopup(this._popup)}}),o.Browser.vml=!o.Browser.svg&&function(){try{var t=e.createElement("div");t.innerHTML='<v:shape adj="1"/>';var i=t.firstChild;return i.style.behavior="url(#default#VML)",i&&"object"==typeof i.adj}catch(n){return!1}}(),o.Path=o.Browser.svg||!o.Browser.vml?o.Path:o.Path.extend({statics:{VML:!0,CLIP_PADDING:.02},_createElement:function(){try{return e.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return e.createElement("<lvml:"+t+' class="lvml">')}}catch(t){return function(t){return e.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}}(),_initPath:function(){var t=this._container=this._createElement("shape");o.DomUtil.addClass(t,"leaflet-vml-shape"+(this.options.className?" "+this.options.className:"")),this.options.clickable&&o.DomUtil.addClass(t,"leaflet-clickable"),t.coordsize="1 1",this._path=this._createElement("path"),t.appendChild(this._path),this._map._pathRoot.appendChild(t)},_initStyle:function(){this._updateStyle()},_updateStyle:function(){var t=this._stroke,e=this._fill,i=this.options,n=this._container;n.stroked=i.stroke,n.filled=i.fill,i.stroke?(t||(t=this._stroke=this._createElement("stroke"),t.endcap="round",n.appendChild(t)),t.weight=i.weight+"px",t.color=i.color,t.opacity=i.opacity,t.dashStyle=i.dashArray?o.Util.isArray(i.dashArray)?i.dashArray.join(" "):i.dashArray.replace(/( *, *)/g," "):"",i.lineCap&&(t.endcap=i.lineCap.replace("butt","flat")),i.lineJoin&&(t.joinstyle=i.lineJoin)):t&&(n.removeChild(t),this._stroke=null),i.fill?(e||(e=this._fill=this._createElement("fill"),n.appendChild(e)),e.color=i.fillColor||i.color,e.opacity=i.fillOpacity):e&&(n.removeChild(e),this._fill=null)},_updatePath:function(){var t=this._container.style;t.display="none",this._path.v=this.getPathString()+" ",t.display=""}}),o.Map.include(o.Browser.svg||!o.Browser.vml?{}:{_initPathRoot:function(){if(!this._pathRoot){var t=this._pathRoot=e.createElement("div");t.className="leaflet-vml-container",this._panes.overlayPane.appendChild(t),this.on("moveend",this._updatePathViewport),this._updatePathViewport()}}}),o.Browser.canvas=function(){return!!e.createElement("canvas").getContext}(),o.Path=o.Path.SVG&&!t.L_PREFER_CANVAS||!o.Browser.canvas?o.Path:o.Path.extend({statics:{CANVAS:!0,SVG:!1},redraw:function(){return this._map&&(this.projectLatlngs(),this._requestUpdate()),this},setStyle:function(t){return o.setOptions(this,t),this._map&&(this._updateStyle(),this._requestUpdate()),this},onRemove:function(t){t.off("viewreset",this.projectLatlngs,this).off("moveend",this._updatePath,this),this.options.clickable&&(this._map.off("click",this._onClick,this),this._map.off("mousemove",this._onMouseMove,this)),this._requestUpdate(),this._map=null},_requestUpdate:function(){this._map&&!o.Path._updateRequest&&(o.Path._updateRequest=o.Util.requestAnimFrame(this._fireMapMoveEnd,this._map))},_fireMapMoveEnd:function(){o.Path._updateRequest=null,this.fire("moveend")},_initElements:function(){this._map._initPathRoot(),this._ctx=this._map._canvasCtx},_updateStyle:function(){var t=this.options;t.stroke&&(this._ctx.lineWidth=t.weight,this._ctx.strokeStyle=t.color),t.fill&&(this._ctx.fillStyle=t.fillColor||t.color)},_drawPath:function(){var t,e,i,n,s,a;for(this._ctx.beginPath(),t=0,i=this._parts.length;i>t;t++){for(e=0,n=this._parts[t].length;n>e;e++)s=this._parts[t][e],a=(0===e?"move":"line")+"To",this._ctx[a](s.x,s.y);this instanceof o.Polygon&&this._ctx.closePath()}},_checkIfEmpty:function(){return!this._parts.length},_updatePath:function(){if(!this._checkIfEmpty()){var t=this._ctx,e=this.options;this._drawPath(),t.save(),this._updateStyle(),e.fill&&(t.globalAlpha=e.fillOpacity,t.fill()),e.stroke&&(t.globalAlpha=e.opacity,t.stroke()),t.restore()}},_initEvents:function(){this.options.clickable&&(this._map.on("mousemove",this._onMouseMove,this),this._map.on("click",this._onClick,this))},_onClick:function(t){this._containsPoint(t.layerPoint)&&this.fire("click",t)},_onMouseMove:function(t){this._map&&!this._map._animatingZoom&&(this._containsPoint(t.layerPoint)?(this._ctx.canvas.style.cursor="pointer",this._mouseInside=!0,this.fire("mouseover",t)):this._mouseInside&&(this._ctx.canvas.style.cursor="",this._mouseInside=!1,this.fire("mouseout",t)))}}),o.Map.include(o.Path.SVG&&!t.L_PREFER_CANVAS||!o.Browser.canvas?{}:{_initPathRoot:function(){var t,i=this._pathRoot;i||(i=this._pathRoot=e.createElement("canvas"),i.style.position="absolute",t=this._canvasCtx=i.getContext("2d"),t.lineCap="round",t.lineJoin="round",this._panes.overlayPane.appendChild(i),this.options.zoomAnimation&&(this._pathRoot.className="leaflet-zoom-animated",this.on("zoomanim",this._animatePathZoom),this.on("zoomend",this._endPathZoom)),this.on("moveend",this._updateCanvasViewport),this._updateCanvasViewport())},_updateCanvasViewport:function(){if(!this._pathZooming){this._updatePathViewport();var t=this._pathViewport,e=t.min,i=t.max.subtract(e),n=this._pathRoot;o.DomUtil.setPosition(n,e),n.width=i.x,n.height=i.y,n.getContext("2d").translate(-e.x,-e.y)}}}),o.LineUtil={simplify:function(t,e){if(!e||!t.length)return t.slice();var i=e*e;return t=this._reducePoints(t,i),t=this._simplifyDP(t,i)},pointToSegmentDistance:function(t,e,i){return Math.sqrt(this._sqClosestPointOnSegment(t,e,i,!0))},closestPointOnSegment:function(t,e,i){return this._sqClosestPointOnSegment(t,e,i)},_simplifyDP:function(t,e){var n=t.length,o=typeof Uint8Array!=i+""?Uint8Array:Array,s=new o(n);s[0]=s[n-1]=1,this._simplifyDPStep(t,s,e,0,n-1);var a,r=[];for(a=0;n>a;a++)s[a]&&r.push(t[a]);return r},_simplifyDPStep:function(t,e,i,n,o){var s,a,r,h=0;for(a=n+1;o-1>=a;a++)r=this._sqClosestPointOnSegment(t[a],t[n],t[o],!0),r>h&&(s=a,h=r);h>i&&(e[s]=1,this._simplifyDPStep(t,e,i,n,s),this._simplifyDPStep(t,e,i,s,o))},_reducePoints:function(t,e){for(var i=[t[0]],n=1,o=0,s=t.length;s>n;n++)this._sqDist(t[n],t[o])>e&&(i.push(t[n]),o=n);return s-1>o&&i.push(t[s-1]),i},clipSegment:function(t,e,i,n){var o,s,a,r=n?this._lastCode:this._getBitCode(t,i),h=this._getBitCode(e,i);for(this._lastCode=h;;){if(!(r|h))return[t,e];if(r&h)return!1;o=r||h,s=this._getEdgeIntersection(t,e,o,i),a=this._getBitCode(s,i),o===r?(t=s,r=a):(e=s,h=a)}},_getEdgeIntersection:function(t,e,i,n){var s=e.x-t.x,a=e.y-t.y,r=n.min,h=n.max;return 8&i?new o.Point(t.x+s*(h.y-t.y)/a,h.y):4&i?new o.Point(t.x+s*(r.y-t.y)/a,r.y):2&i?new o.Point(h.x,t.y+a*(h.x-t.x)/s):1&i?new o.Point(r.x,t.y+a*(r.x-t.x)/s):void 0},_getBitCode:function(t,e){var i=0;return t.x<e.min.x?i|=1:t.x>e.max.x&&(i|=2),t.y<e.min.y?i|=4:t.y>e.max.y&&(i|=8),i},_sqDist:function(t,e){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n},_sqClosestPointOnSegment:function(t,e,i,n){var s,a=e.x,r=e.y,h=i.x-a,l=i.y-r,u=h*h+l*l;return u>0&&(s=((t.x-a)*h+(t.y-r)*l)/u,s>1?(a=i.x,r=i.y):s>0&&(a+=h*s,r+=l*s)),h=t.x-a,l=t.y-r,n?h*h+l*l:new o.Point(a,r)}},o.Polyline=o.Path.extend({initialize:function(t,e){o.Path.prototype.initialize.call(this,e),this._latlngs=this._convertLatLngs(t)},options:{smoothFactor:1,noClip:!1},projectLatlngs:function(){this._originalPoints=[];for(var t=0,e=this._latlngs.length;e>t;t++)this._originalPoints[t]=this._map.latLngToLayerPoint(this._latlngs[t])},getPathString:function(){for(var t=0,e=this._parts.length,i="";e>t;t++)i+=this._getPathPartStr(this._parts[t]);return i},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._latlngs=this._convertLatLngs(t),this.redraw()},addLatLng:function(t){return this._latlngs.push(o.latLng(t)),this.redraw()},spliceLatLngs:function(){var t=[].splice.apply(this._latlngs,arguments);return this._convertLatLngs(this._latlngs,!0),this.redraw(),t},closestLayerPoint:function(t){for(var e,i,n=1/0,s=this._parts,a=null,r=0,h=s.length;h>r;r++)for(var l=s[r],u=1,c=l.length;c>u;u++){e=l[u-1],i=l[u];var d=o.LineUtil._sqClosestPointOnSegment(t,e,i,!0);n>d&&(n=d,a=o.LineUtil._sqClosestPointOnSegment(t,e,i))}return a&&(a.distance=Math.sqrt(n)),a},getBounds:function(){return new o.LatLngBounds(this.getLatLngs())},_convertLatLngs:function(t,e){var i,n,s=e?t:[];for(i=0,n=t.length;n>i;i++){if(o.Util.isArray(t[i])&&"number"!=typeof t[i][0])return;s[i]=o.latLng(t[i])}return s},_initEvents:function(){o.Path.prototype._initEvents.call(this)},_getPathPartStr:function(t){for(var e,i=o.Path.VML,n=0,s=t.length,a="";s>n;n++)e=t[n],i&&e._round(),a+=(n?"L":"M")+e.x+" "+e.y;return a},_clipPoints:function(){var t,e,i,n=this._originalPoints,s=n.length;if(this.options.noClip)return this._parts=[n],void 0;this._parts=[];var a=this._parts,r=this._map._pathViewport,h=o.LineUtil;for(t=0,e=0;s-1>t;t++)i=h.clipSegment(n[t],n[t+1],r,t),i&&(a[e]=a[e]||[],a[e].push(i[0]),(i[1]!==n[t+1]||t===s-2)&&(a[e].push(i[1]),e++))},_simplifyPoints:function(){for(var t=this._parts,e=o.LineUtil,i=0,n=t.length;n>i;i++)t[i]=e.simplify(t[i],this.options.smoothFactor)},_updatePath:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),o.Path.prototype._updatePath.call(this))}}),o.polyline=function(t,e){return new o.Polyline(t,e)},o.PolyUtil={},o.PolyUtil.clipPolygon=function(t,e){var i,n,s,a,r,h,l,u,c,d=[1,4,2,8],p=o.LineUtil;for(n=0,l=t.length;l>n;n++)t[n]._code=p._getBitCode(t[n],e);for(a=0;4>a;a++){for(u=d[a],i=[],n=0,l=t.length,s=l-1;l>n;s=n++)r=t[n],h=t[s],r._code&u?h._code&u||(c=p._getEdgeIntersection(h,r,u,e),c._code=p._getBitCode(c,e),i.push(c)):(h._code&u&&(c=p._getEdgeIntersection(h,r,u,e),c._code=p._getBitCode(c,e),i.push(c)),i.push(r));t=i}return t},o.Polygon=o.Polyline.extend({options:{fill:!0},initialize:function(t,e){o.Polyline.prototype.initialize.call(this,t,e),this._initWithHoles(t)},_initWithHoles:function(t){var e,i,n;if(t&&o.Util.isArray(t[0])&&"number"!=typeof t[0][0])for(this._latlngs=this._convertLatLngs(t[0]),this._holes=t.slice(1),e=0,i=this._holes.length;i>e;e++)n=this._holes[e]=this._convertLatLngs(this._holes[e]),n[0].equals(n[n.length-1])&&n.pop();t=this._latlngs,t.length>=2&&t[0].equals(t[t.length-1])&&t.pop()},projectLatlngs:function(){if(o.Polyline.prototype.projectLatlngs.call(this),this._holePoints=[],this._holes){var t,e,i,n;for(t=0,i=this._holes.length;i>t;t++)for(this._holePoints[t]=[],e=0,n=this._holes[t].length;n>e;e++)this._holePoints[t][e]=this._map.latLngToLayerPoint(this._holes[t][e])}},setLatLngs:function(t){return t&&o.Util.isArray(t[0])&&"number"!=typeof t[0][0]?(this._initWithHoles(t),this.redraw()):o.Polyline.prototype.setLatLngs.call(this,t)},_clipPoints:function(){var t=this._originalPoints,e=[];if(this._parts=[t].concat(this._holePoints),!this.options.noClip){for(var i=0,n=this._parts.length;n>i;i++){var s=o.PolyUtil.clipPolygon(this._parts[i],this._map._pathViewport);s.length&&e.push(s)}this._parts=e}},_getPathPartStr:function(t){var e=o.Polyline.prototype._getPathPartStr.call(this,t);return e+(o.Browser.svg?"z":"x")}}),o.polygon=function(t,e){return new o.Polygon(t,e)},function(){function t(t){return o.FeatureGroup.extend({initialize:function(t,e){this._layers={},this._options=e,this.setLatLngs(t)},setLatLngs:function(e){var i=0,n=e.length;for(this.eachLayer(function(t){n>i?t.setLatLngs(e[i++]):this.removeLayer(t)},this);n>i;)this.addLayer(new t(e[i++],this._options));return this},getLatLngs:function(){var t=[];return this.eachLayer(function(e){t.push(e.getLatLngs())}),t}})}o.MultiPolyline=t(o.Polyline),o.MultiPolygon=t(o.Polygon),o.multiPolyline=function(t,e){return new o.MultiPolyline(t,e)},o.multiPolygon=function(t,e){return new o.MultiPolygon(t,e)}}(),o.Rectangle=o.Polygon.extend({initialize:function(t,e){o.Polygon.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return t=o.latLngBounds(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}}),o.rectangle=function(t,e){return new o.Rectangle(t,e)},o.Circle=o.Path.extend({initialize:function(t,e,i){o.Path.prototype.initialize.call(this,i),this._latlng=o.latLng(t),this._mRadius=e},options:{fill:!0},setLatLng:function(t){return this._latlng=o.latLng(t),this.redraw()},setRadius:function(t){return this._mRadius=t,this.redraw()},projectLatlngs:function(){var t=this._getLngRadius(),e=this._latlng,i=this._map.latLngToLayerPoint([e.lat,e.lng-t]);this._point=this._map.latLngToLayerPoint(e),this._radius=Math.max(this._point.x-i.x,1)},getBounds:function(){var t=this._getLngRadius(),e=this._mRadius/40075017*360,i=this._latlng;return new o.LatLngBounds([i.lat-e,i.lng-t],[i.lat+e,i.lng+t])},getLatLng:function(){return this._latlng},getPathString:function(){var t=this._point,e=this._radius;return this._checkIfEmpty()?"":o.Browser.svg?"M"+t.x+","+(t.y-e)+"A"+e+","+e+",0,1,1,"+(t.x-.1)+","+(t.y-e)+" z":(t._round(),e=Math.round(e),"AL "+t.x+","+t.y+" "+e+","+e+" 0,23592600")},getRadius:function(){return this._mRadius},_getLatRadius:function(){return this._mRadius/40075017*360},_getLngRadius:function(){return this._getLatRadius()/Math.cos(o.LatLng.DEG_TO_RAD*this._latlng.lat)},_checkIfEmpty:function(){if(!this._map)return!1;var t=this._map._pathViewport,e=this._radius,i=this._point;return i.x-e>t.max.x||i.y-e>t.max.y||i.x+e<t.min.x||i.y+e<t.min.y}}),o.circle=function(t,e,i){return new o.Circle(t,e,i)},o.CircleMarker=o.Circle.extend({options:{radius:10,weight:2},initialize:function(t,e){o.Circle.prototype.initialize.call(this,t,null,e),this._radius=this.options.radius},projectLatlngs:function(){this._point=this._map.latLngToLayerPoint(this._latlng)},_updateStyle:function(){o.Circle.prototype._updateStyle.call(this),this.setRadius(this.options.radius)},setLatLng:function(t){return o.Circle.prototype.setLatLng.call(this,t),this._popup&&this._popup._isOpen&&this._popup.setLatLng(t),this},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius}}),o.circleMarker=function(t,e){return new o.CircleMarker(t,e)},o.Polyline.include(o.Path.CANVAS?{_containsPoint:function(t,e){var i,n,s,a,r,h,l,u=this.options.weight/2;for(o.Browser.touch&&(u+=10),i=0,a=this._parts.length;a>i;i++)for(l=this._parts[i],n=0,r=l.length,s=r-1;r>n;s=n++)if((e||0!==n)&&(h=o.LineUtil.pointToSegmentDistance(t,l[s],l[n]),u>=h))return!0;return!1}}:{}),o.Polygon.include(o.Path.CANVAS?{_containsPoint:function(t){var e,i,n,s,a,r,h,l,u=!1;if(o.Polyline.prototype._containsPoint.call(this,t,!0))return!0;for(s=0,h=this._parts.length;h>s;s++)for(e=this._parts[s],a=0,l=e.length,r=l-1;l>a;r=a++)i=e[a],n=e[r],i.y>t.y!=n.y>t.y&&t.x<(n.x-i.x)*(t.y-i.y)/(n.y-i.y)+i.x&&(u=!u);return u}}:{}),o.Circle.include(o.Path.CANVAS?{_drawPath:function(){var t=this._point;this._ctx.beginPath(),this._ctx.arc(t.x,t.y,this._radius,0,2*Math.PI,!1)},_containsPoint:function(t){var e=this._point,i=this.options.stroke?this.options.weight/2:0;return t.distanceTo(e)<=this._radius+i}}:{}),o.CircleMarker.include(o.Path.CANVAS?{_updateStyle:function(){o.Path.prototype._updateStyle.call(this)}}:{}),o.GeoJSON=o.FeatureGroup.extend({initialize:function(t,e){o.setOptions(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e,i,n,s=o.Util.isArray(t)?t:t.features;if(s){for(e=0,i=s.length;i>e;e++)n=s[e],(n.geometries||n.geometry||n.features||n.coordinates)&&this.addData(s[e]);return this}var a=this.options;if(!a.filter||a.filter(t)){var r=o.GeoJSON.geometryToLayer(t,a.pointToLayer,a.coordsToLatLng,a);return r.feature=o.GeoJSON.asFeature(t),r.defaultOptions=r.options,this.resetStyle(r),a.onEachFeature&&a.onEachFeature(t,r),this.addLayer(r)}},resetStyle:function(t){var e=this.options.style;e&&(o.Util.extend(t.options,t.defaultOptions),this._setLayerStyle(t,e))},setStyle:function(t){this.eachLayer(function(e){this._setLayerStyle(e,t)},this)},_setLayerStyle:function(t,e){"function"==typeof e&&(e=e(t.feature)),t.setStyle&&t.setStyle(e)}}),o.extend(o.GeoJSON,{geometryToLayer:function(t,e,i,n){var s,a,r,h,l="Feature"===t.type?t.geometry:t,u=l.coordinates,c=[];switch(i=i||this.coordsToLatLng,l.type){case"Point":return s=i(u),e?e(t,s):new o.Marker(s);case"MultiPoint":for(r=0,h=u.length;h>r;r++)s=i(u[r]),c.push(e?e(t,s):new o.Marker(s));return new o.FeatureGroup(c);case"LineString":return a=this.coordsToLatLngs(u,0,i),new o.Polyline(a,n);case"Polygon":if(2===u.length&&!u[1].length)throw new Error("Invalid GeoJSON object.");return a=this.coordsToLatLngs(u,1,i),new o.Polygon(a,n);case"MultiLineString":return a=this.coordsToLatLngs(u,1,i),new o.MultiPolyline(a,n);case"MultiPolygon":return a=this.coordsToLatLngs(u,2,i),new o.MultiPolygon(a,n);case"GeometryCollection":for(r=0,h=l.geometries.length;h>r;r++)c.push(this.geometryToLayer({geometry:l.geometries[r],type:"Feature",properties:t.properties},e,i,n));return new o.FeatureGroup(c);default:throw new Error("Invalid GeoJSON object.")}},coordsToLatLng:function(t){return new o.LatLng(t[1],t[0],t[2])},coordsToLatLngs:function(t,e,i){var n,o,s,a=[];for(o=0,s=t.length;s>o;o++)n=e?this.coordsToLatLngs(t[o],e-1,i):(i||this.coordsToLatLng)(t[o]),a.push(n);return a},latLngToCoords:function(t){var e=[t.lng,t.lat];return t.alt!==i&&e.push(t.alt),e},latLngsToCoords:function(t){for(var e=[],i=0,n=t.length;n>i;i++)e.push(o.GeoJSON.latLngToCoords(t[i]));return e},getFeature:function(t,e){return t.feature?o.extend({},t.feature,{geometry:e}):o.GeoJSON.asFeature(e)},asFeature:function(t){return"Feature"===t.type?t:{type:"Feature",properties:{},geometry:t}}});var a={toGeoJSON:function(){return o.GeoJSON.getFeature(this,{type:"Point",coordinates:o.GeoJSON.latLngToCoords(this.getLatLng())})}};o.Marker.include(a),o.Circle.include(a),o.CircleMarker.include(a),o.Polyline.include({toGeoJSON:function(){return o.GeoJSON.getFeature(this,{type:"LineString",coordinates:o.GeoJSON.latLngsToCoords(this.getLatLngs())})}}),o.Polygon.include({toGeoJSON:function(){var t,e,i,n=[o.GeoJSON.latLngsToCoords(this.getLatLngs())];if(n[0].push(n[0][0]),this._holes)for(t=0,e=this._holes.length;e>t;t++)i=o.GeoJSON.latLngsToCoords(this._holes[t]),i.push(i[0]),n.push(i);return o.GeoJSON.getFeature(this,{type:"Polygon",coordinates:n})}}),function(){function t(t){return function(){var e=[];return this.eachLayer(function(t){e.push(t.toGeoJSON().geometry.coordinates)}),o.GeoJSON.getFeature(this,{type:t,coordinates:e})}}o.MultiPolyline.include({toGeoJSON:t("MultiLineString")}),o.MultiPolygon.include({toGeoJSON:t("MultiPolygon")}),o.LayerGroup.include({toGeoJSON:function(){var e,i=this.feature&&this.feature.geometry,n=[];if(i&&"MultiPoint"===i.type)return t("MultiPoint").call(this);var s=i&&"GeometryCollection"===i.type;return this.eachLayer(function(t){t.toGeoJSON&&(e=t.toGeoJSON(),n.push(s?e.geometry:o.GeoJSON.asFeature(e)))}),s?o.GeoJSON.getFeature(this,{geometries:n,type:"GeometryCollection"}):{type:"FeatureCollection",features:n}}})}(),o.geoJson=function(t,e){return new o.GeoJSON(t,e)},o.DomEvent={addListener:function(t,e,i,n){var s,a,r,h=o.stamp(i),l="_leaflet_"+e+h;return t[l]?this:(s=function(e){return i.call(n||t,e||o.DomEvent._getEvent())},o.Browser.pointer&&0===e.indexOf("touch")?this.addPointerListener(t,e,s,h):(o.Browser.touch&&"dblclick"===e&&this.addDoubleTapListener&&this.addDoubleTapListener(t,s,h),"addEventListener"in t?"mousewheel"===e?(t.addEventListener("DOMMouseScroll",s,!1),t.addEventListener(e,s,!1)):"mouseenter"===e||"mouseleave"===e?(a=s,r="mouseenter"===e?"mouseover":"mouseout",s=function(e){return o.DomEvent._checkMouse(t,e)?a(e):void 0},t.addEventListener(r,s,!1)):"click"===e&&o.Browser.android?(a=s,s=function(t){return o.DomEvent._filterClick(t,a)},t.addEventListener(e,s,!1)):t.addEventListener(e,s,!1):"attachEvent"in t&&t.attachEvent("on"+e,s),t[l]=s,this))},removeListener:function(t,e,i){var n=o.stamp(i),s="_leaflet_"+e+n,a=t[s];return a?(o.Browser.pointer&&0===e.indexOf("touch")?this.removePointerListener(t,e,n):o.Browser.touch&&"dblclick"===e&&this.removeDoubleTapListener?this.removeDoubleTapListener(t,n):"removeEventListener"in t?"mousewheel"===e?(t.removeEventListener("DOMMouseScroll",a,!1),t.removeEventListener(e,a,!1)):"mouseenter"===e||"mouseleave"===e?t.removeEventListener("mouseenter"===e?"mouseover":"mouseout",a,!1):t.removeEventListener(e,a,!1):"detachEvent"in t&&t.detachEvent("on"+e,a),t[s]=null,this):this},stopPropagation:function(t){return t.stopPropagation?t.stopPropagation():t.cancelBubble=!0,o.DomEvent._skipped(t),this},disableScrollPropagation:function(t){var e=o.DomEvent.stopPropagation;return o.DomEvent.on(t,"mousewheel",e).on(t,"MozMousePixelScroll",e)},disableClickPropagation:function(t){for(var e=o.DomEvent.stopPropagation,i=o.Draggable.START.length-1;i>=0;i--)o.DomEvent.on(t,o.Draggable.START[i],e);return o.DomEvent.on(t,"click",o.DomEvent._fakeStop).on(t,"dblclick",e)},preventDefault:function(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this},stop:function(t){return o.DomEvent.preventDefault(t).stopPropagation(t)},getMousePosition:function(t,e){if(!e)return new o.Point(t.clientX,t.clientY);var i=e.getBoundingClientRect();return new o.Point(t.clientX-i.left-e.clientLeft,t.clientY-i.top-e.clientTop)},getWheelDelta:function(t){var e=0;return t.wheelDelta&&(e=t.wheelDelta/120),t.detail&&(e=-t.detail/3),e},_skipEvents:{},_fakeStop:function(t){o.DomEvent._skipEvents[t.type]=!0},_skipped:function(t){var e=this._skipEvents[t.type];return this._skipEvents[t.type]=!1,e},_checkMouse:function(t,e){var i=e.relatedTarget;if(!i)return!0;try{for(;i&&i!==t;)i=i.parentNode}catch(n){return!1}return i!==t},_getEvent:function(){var e=t.event;if(!e)for(var i=arguments.callee.caller;i&&(e=i.arguments[0],!e||t.Event!==e.constructor);)i=i.caller;return e},_filterClick:function(t,e){var i=t.timeStamp||t.originalEvent.timeStamp,n=o.DomEvent._lastClick&&i-o.DomEvent._lastClick;return n&&n>100&&1e3>n||t.target._simulatedClick&&!t._simulated?(o.DomEvent.stop(t),void 0):(o.DomEvent._lastClick=i,e(t))}},o.DomEvent.on=o.DomEvent.addListener,o.DomEvent.off=o.DomEvent.removeListener,o.Draggable=o.Class.extend({includes:o.Mixin.Events,statics:{START:o.Browser.touch?["touchstart","mousedown"]:["mousedown"],END:{mousedown:"mouseup",touchstart:"touchend",pointerdown:"touchend",MSPointerDown:"touchend"},MOVE:{mousedown:"mousemove",touchstart:"touchmove",pointerdown:"touchmove",MSPointerDown:"touchmove"}},initialize:function(t,e){this._element=t,this._dragStartTarget=e||t},enable:function(){if(!this._enabled){for(var t=o.Draggable.START.length-1;t>=0;t--)o.DomEvent.on(this._dragStartTarget,o.Draggable.START[t],this._onDown,this);this._enabled=!0}},disable:function(){if(this._enabled){for(var t=o.Draggable.START.length-1;t>=0;t--)o.DomEvent.off(this._dragStartTarget,o.Draggable.START[t],this._onDown,this);this._enabled=!1,this._moved=!1}},_onDown:function(t){if(this._moved=!1,!(t.shiftKey||1!==t.which&&1!==t.button&&!t.touches||(o.DomEvent.stopPropagation(t),o.Draggable._disabled||(o.DomUtil.disableImageDrag(),o.DomUtil.disableTextSelection(),this._moving)))){var i=t.touches?t.touches[0]:t;this._startPoint=new o.Point(i.clientX,i.clientY),this._startPos=this._newPos=o.DomUtil.getPosition(this._element),o.DomEvent.on(e,o.Draggable.MOVE[t.type],this._onMove,this).on(e,o.Draggable.END[t.type],this._onUp,this)}},_onMove:function(t){if(t.touches&&t.touches.length>1)return this._moved=!0,void 0;var i=t.touches&&1===t.touches.length?t.touches[0]:t,n=new o.Point(i.clientX,i.clientY),s=n.subtract(this._startPoint);(s.x||s.y)&&(o.DomEvent.preventDefault(t),this._moved||(this.fire("dragstart"),this._moved=!0,this._startPos=o.DomUtil.getPosition(this._element).subtract(s),o.DomUtil.addClass(e.body,"leaflet-dragging"),o.DomUtil.addClass(t.target||t.srcElement,"leaflet-drag-target")),this._newPos=this._startPos.add(s),this._moving=!0,o.Util.cancelAnimFrame(this._animRequest),this._animRequest=o.Util.requestAnimFrame(this._updatePosition,this,!0,this._dragStartTarget))},_updatePosition:function(){this.fire("predrag"),o.DomUtil.setPosition(this._element,this._newPos),this.fire("drag")},_onUp:function(t){o.DomUtil.removeClass(e.body,"leaflet-dragging"),o.DomUtil.removeClass(t.target||t.srcElement,"leaflet-drag-target");for(var i in o.Draggable.MOVE)o.DomEvent.off(e,o.Draggable.MOVE[i],this._onMove).off(e,o.Draggable.END[i],this._onUp);o.DomUtil.enableImageDrag(),o.DomUtil.enableTextSelection(),this._moved&&this._moving&&(o.Util.cancelAnimFrame(this._animRequest),this.fire("dragend",{distance:this._newPos.distanceTo(this._startPos)})),this._moving=!1}}),o.Handler=o.Class.extend({initialize:function(t){this._map=t},enable:function(){this._enabled||(this._enabled=!0,this.addHooks())},disable:function(){this._enabled&&(this._enabled=!1,this.removeHooks())},enabled:function(){return!!this._enabled}}),o.Map.mergeOptions({dragging:!0,inertia:!o.Browser.android23,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,inertiaThreshold:o.Browser.touch?32:18,easeLinearity:.25,worldCopyJump:!1}),o.Map.Drag=o.Handler.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new o.Draggable(t._mapPane,t._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDrag,this),t.on("viewreset",this._onViewReset,this),t.whenReady(this._onViewReset,this))}this._draggable.enable()},removeHooks:function(){this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(){var t=this._map;t._panAnim&&t._panAnim.stop(),t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(){if(this._map.options.inertia){var t=this._lastTime=+new Date,e=this._lastPos=this._draggable._newPos;this._positions.push(e),this._times.push(t),t-this._times[0]>200&&(this._positions.shift(),this._times.shift())}this._map.fire("move").fire("drag")},_onViewReset:function(){var t=this._map.getSize()._divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.project([0,180]).x},_onPreDrag:function(){var t=this._worldWidth,e=Math.round(t/2),i=this._initialWorldOffset,n=this._draggable._newPos.x,o=(n-e+i)%t+e-i,s=(n+e+i)%t-e-i,a=Math.abs(o+i)<Math.abs(s+i)?o:s;this._draggable._newPos.x=a},_onDragEnd:function(t){var e=this._map,i=e.options,n=+new Date-this._lastTime,s=!i.inertia||n>i.inertiaThreshold||!this._positions[0];if(e.fire("dragend",t),s)e.fire("moveend");else{var a=this._lastPos.subtract(this._positions[0]),r=(this._lastTime+n-this._times[0])/1e3,h=i.easeLinearity,l=a.multiplyBy(h/r),u=l.distanceTo([0,0]),c=Math.min(i.inertiaMaxSpeed,u),d=l.multiplyBy(c/u),p=c/(i.inertiaDeceleration*h),_=d.multiplyBy(-p/2).round();_.x&&_.y?(_=e._limitOffset(_,e.options.maxBounds),o.Util.requestAnimFrame(function(){e.panBy(_,{duration:p,easeLinearity:h,noMoveStart:!0})})):e.fire("moveend")}}}),o.Map.addInitHook("addHandler","dragging",o.Map.Drag),o.Map.mergeOptions({doubleClickZoom:!0}),o.Map.DoubleClickZoom=o.Handler.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var e=this._map,i=e.getZoom()+(t.originalEvent.shiftKey?-1:1);"center"===e.options.doubleClickZoom?e.setZoom(i):e.setZoomAround(t.containerPoint,i)}}),o.Map.addInitHook("addHandler","doubleClickZoom",o.Map.DoubleClickZoom),o.Map.mergeOptions({scrollWheelZoom:!0}),o.Map.ScrollWheelZoom=o.Handler.extend({addHooks:function(){o.DomEvent.on(this._map._container,"mousewheel",this._onWheelScroll,this),o.DomEvent.on(this._map._container,"MozMousePixelScroll",o.DomEvent.preventDefault),this._delta=0},removeHooks:function(){o.DomEvent.off(this._map._container,"mousewheel",this._onWheelScroll),o.DomEvent.off(this._map._container,"MozMousePixelScroll",o.DomEvent.preventDefault)},_onWheelScroll:function(t){var e=o.DomEvent.getWheelDelta(t);this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var i=Math.max(40-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(o.bind(this._performZoom,this),i),o.DomEvent.preventDefault(t),o.DomEvent.stopPropagation(t)},_performZoom:function(){var t=this._map,e=this._delta,i=t.getZoom();e=e>0?Math.ceil(e):Math.floor(e),e=Math.max(Math.min(e,4),-4),e=t._limitZoom(i+e)-i,this._delta=0,this._startTime=null,e&&("center"===t.options.scrollWheelZoom?t.setZoom(i+e):t.setZoomAround(this._lastMousePos,i+e))}}),o.Map.addInitHook("addHandler","scrollWheelZoom",o.Map.ScrollWheelZoom),o.extend(o.DomEvent,{_touchstart:o.Browser.msPointer?"MSPointerDown":o.Browser.pointer?"pointerdown":"touchstart",_touchend:o.Browser.msPointer?"MSPointerUp":o.Browser.pointer?"pointerup":"touchend",addDoubleTapListener:function(t,i,n){function s(t){var e;if(o.Browser.pointer?(_.push(t.pointerId),e=_.length):e=t.touches.length,!(e>1)){var i=Date.now(),n=i-(r||i);h=t.touches?t.touches[0]:t,l=n>0&&u>=n,r=i}}function a(t){if(o.Browser.pointer){var e=_.indexOf(t.pointerId);if(-1===e)return;_.splice(e,1)}if(l){if(o.Browser.pointer){var n,s={};for(var a in h)n=h[a],s[a]="function"==typeof n?n.bind(h):n;h=s}h.type="dblclick",i(h),r=null}}var r,h,l=!1,u=250,c="_leaflet_",d=this._touchstart,p=this._touchend,_=[];t[c+d+n]=s,t[c+p+n]=a;var m=o.Browser.pointer?e.documentElement:t;return t.addEventListener(d,s,!1),m.addEventListener(p,a,!1),o.Browser.pointer&&m.addEventListener(o.DomEvent.POINTER_CANCEL,a,!1),this},removeDoubleTapListener:function(t,i){var n="_leaflet_";return t.removeEventListener(this._touchstart,t[n+this._touchstart+i],!1),(o.Browser.pointer?e.documentElement:t).removeEventListener(this._touchend,t[n+this._touchend+i],!1),o.Browser.pointer&&e.documentElement.removeEventListener(o.DomEvent.POINTER_CANCEL,t[n+this._touchend+i],!1),this}}),o.extend(o.DomEvent,{POINTER_DOWN:o.Browser.msPointer?"MSPointerDown":"pointerdown",POINTER_MOVE:o.Browser.msPointer?"MSPointerMove":"pointermove",POINTER_UP:o.Browser.msPointer?"MSPointerUp":"pointerup",POINTER_CANCEL:o.Browser.msPointer?"MSPointerCancel":"pointercancel",_pointers:[],_pointerDocumentListener:!1,addPointerListener:function(t,e,i,n){switch(e){case"touchstart":return this.addPointerListenerStart(t,e,i,n);case"touchend":return this.addPointerListenerEnd(t,e,i,n);case"touchmove":return this.addPointerListenerMove(t,e,i,n);default:throw"Unknown touch event type"}},addPointerListenerStart:function(t,i,n,s){var a="_leaflet_",r=this._pointers,h=function(t){o.DomEvent.preventDefault(t);for(var e=!1,i=0;i<r.length;i++)if(r[i].pointerId===t.pointerId){e=!0;break}e||r.push(t),t.touches=r.slice(),t.changedTouches=[t],n(t)};if(t[a+"touchstart"+s]=h,t.addEventListener(this.POINTER_DOWN,h,!1),!this._pointerDocumentListener){var l=function(t){for(var e=0;e<r.length;e++)if(r[e].pointerId===t.pointerId){r.splice(e,1);
break}};e.documentElement.addEventListener(this.POINTER_UP,l,!1),e.documentElement.addEventListener(this.POINTER_CANCEL,l,!1),this._pointerDocumentListener=!0}return this},addPointerListenerMove:function(t,e,i,n){function o(t){if(t.pointerType!==t.MSPOINTER_TYPE_MOUSE&&"mouse"!==t.pointerType||0!==t.buttons){for(var e=0;e<a.length;e++)if(a[e].pointerId===t.pointerId){a[e]=t;break}t.touches=a.slice(),t.changedTouches=[t],i(t)}}var s="_leaflet_",a=this._pointers;return t[s+"touchmove"+n]=o,t.addEventListener(this.POINTER_MOVE,o,!1),this},addPointerListenerEnd:function(t,e,i,n){var o="_leaflet_",s=this._pointers,a=function(t){for(var e=0;e<s.length;e++)if(s[e].pointerId===t.pointerId){s.splice(e,1);break}t.touches=s.slice(),t.changedTouches=[t],i(t)};return t[o+"touchend"+n]=a,t.addEventListener(this.POINTER_UP,a,!1),t.addEventListener(this.POINTER_CANCEL,a,!1),this},removePointerListener:function(t,e,i){var n="_leaflet_",o=t[n+e+i];switch(e){case"touchstart":t.removeEventListener(this.POINTER_DOWN,o,!1);break;case"touchmove":t.removeEventListener(this.POINTER_MOVE,o,!1);break;case"touchend":t.removeEventListener(this.POINTER_UP,o,!1),t.removeEventListener(this.POINTER_CANCEL,o,!1)}return this}}),o.Map.mergeOptions({touchZoom:o.Browser.touch&&!o.Browser.android23,bounceAtZoomLimits:!0}),o.Map.TouchZoom=o.Handler.extend({addHooks:function(){o.DomEvent.on(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){o.DomEvent.off(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var i=this._map;if(t.touches&&2===t.touches.length&&!i._animatingZoom&&!this._zooming){var n=i.mouseEventToLayerPoint(t.touches[0]),s=i.mouseEventToLayerPoint(t.touches[1]),a=i._getCenterLayerPoint();this._startCenter=n.add(s)._divideBy(2),this._startDist=n.distanceTo(s),this._moved=!1,this._zooming=!0,this._centerOffset=a.subtract(this._startCenter),i._panAnim&&i._panAnim.stop(),o.DomEvent.on(e,"touchmove",this._onTouchMove,this).on(e,"touchend",this._onTouchEnd,this),o.DomEvent.preventDefault(t)}},_onTouchMove:function(t){var e=this._map;if(t.touches&&2===t.touches.length&&this._zooming){var i=e.mouseEventToLayerPoint(t.touches[0]),n=e.mouseEventToLayerPoint(t.touches[1]);this._scale=i.distanceTo(n)/this._startDist,this._delta=i._add(n)._divideBy(2)._subtract(this._startCenter),1!==this._scale&&(e.options.bounceAtZoomLimits||!(e.getZoom()===e.getMinZoom()&&this._scale<1||e.getZoom()===e.getMaxZoom()&&this._scale>1))&&(this._moved||(o.DomUtil.addClass(e._mapPane,"leaflet-touching"),e.fire("movestart").fire("zoomstart"),this._moved=!0),o.Util.cancelAnimFrame(this._animRequest),this._animRequest=o.Util.requestAnimFrame(this._updateOnMove,this,!0,this._map._container),o.DomEvent.preventDefault(t))}},_updateOnMove:function(){var t=this._map,e=this._getScaleOrigin(),i=t.layerPointToLatLng(e),n=t.getScaleZoom(this._scale);t._animateZoom(i,n,this._startCenter,this._scale,this._delta)},_onTouchEnd:function(){if(!this._moved||!this._zooming)return this._zooming=!1,void 0;var t=this._map;this._zooming=!1,o.DomUtil.removeClass(t._mapPane,"leaflet-touching"),o.Util.cancelAnimFrame(this._animRequest),o.DomEvent.off(e,"touchmove",this._onTouchMove).off(e,"touchend",this._onTouchEnd);var i=this._getScaleOrigin(),n=t.layerPointToLatLng(i),s=t.getZoom(),a=t.getScaleZoom(this._scale)-s,r=a>0?Math.ceil(a):Math.floor(a),h=t._limitZoom(s+r),l=t.getZoomScale(h)/this._scale;t._animateZoom(n,h,i,l)},_getScaleOrigin:function(){var t=this._centerOffset.subtract(this._delta).divideBy(this._scale);return this._startCenter.add(t)}}),o.Map.addInitHook("addHandler","touchZoom",o.Map.TouchZoom),o.Map.mergeOptions({tap:!0,tapTolerance:15}),o.Map.Tap=o.Handler.extend({addHooks:function(){o.DomEvent.on(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){o.DomEvent.off(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(t.touches){if(o.DomEvent.preventDefault(t),this._fireClick=!0,t.touches.length>1)return this._fireClick=!1,clearTimeout(this._holdTimeout),void 0;var i=t.touches[0],n=i.target;this._startPos=this._newPos=new o.Point(i.clientX,i.clientY),n.tagName&&"a"===n.tagName.toLowerCase()&&o.DomUtil.addClass(n,"leaflet-active"),this._holdTimeout=setTimeout(o.bind(function(){this._isTapValid()&&(this._fireClick=!1,this._onUp(),this._simulateEvent("contextmenu",i))},this),1e3),o.DomEvent.on(e,"touchmove",this._onMove,this).on(e,"touchend",this._onUp,this)}},_onUp:function(t){if(clearTimeout(this._holdTimeout),o.DomEvent.off(e,"touchmove",this._onMove,this).off(e,"touchend",this._onUp,this),this._fireClick&&t&&t.changedTouches){var i=t.changedTouches[0],n=i.target;n&&n.tagName&&"a"===n.tagName.toLowerCase()&&o.DomUtil.removeClass(n,"leaflet-active"),this._isTapValid()&&this._simulateEvent("click",i)}},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_onMove:function(t){var e=t.touches[0];this._newPos=new o.Point(e.clientX,e.clientY)},_simulateEvent:function(i,n){var o=e.createEvent("MouseEvents");o._simulated=!0,n.target._simulatedClick=!0,o.initMouseEvent(i,!0,!0,t,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),n.target.dispatchEvent(o)}}),o.Browser.touch&&!o.Browser.pointer&&o.Map.addInitHook("addHandler","tap",o.Map.Tap),o.Map.mergeOptions({boxZoom:!0}),o.Map.BoxZoom=o.Handler.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane,this._moved=!1},addHooks:function(){o.DomEvent.on(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){o.DomEvent.off(this._container,"mousedown",this._onMouseDown),this._moved=!1},moved:function(){return this._moved},_onMouseDown:function(t){return this._moved=!1,!t.shiftKey||1!==t.which&&1!==t.button?!1:(o.DomUtil.disableTextSelection(),o.DomUtil.disableImageDrag(),this._startLayerPoint=this._map.mouseEventToLayerPoint(t),o.DomEvent.on(e,"mousemove",this._onMouseMove,this).on(e,"mouseup",this._onMouseUp,this).on(e,"keydown",this._onKeyDown,this),void 0)},_onMouseMove:function(t){this._moved||(this._box=o.DomUtil.create("div","leaflet-zoom-box",this._pane),o.DomUtil.setPosition(this._box,this._startLayerPoint),this._container.style.cursor="crosshair",this._map.fire("boxzoomstart"));var e=this._startLayerPoint,i=this._box,n=this._map.mouseEventToLayerPoint(t),s=n.subtract(e),a=new o.Point(Math.min(n.x,e.x),Math.min(n.y,e.y));o.DomUtil.setPosition(i,a),this._moved=!0,i.style.width=Math.max(0,Math.abs(s.x)-4)+"px",i.style.height=Math.max(0,Math.abs(s.y)-4)+"px"},_finish:function(){this._moved&&(this._pane.removeChild(this._box),this._container.style.cursor=""),o.DomUtil.enableTextSelection(),o.DomUtil.enableImageDrag(),o.DomEvent.off(e,"mousemove",this._onMouseMove).off(e,"mouseup",this._onMouseUp).off(e,"keydown",this._onKeyDown)},_onMouseUp:function(t){this._finish();var e=this._map,i=e.mouseEventToLayerPoint(t);if(!this._startLayerPoint.equals(i)){var n=new o.LatLngBounds(e.layerPointToLatLng(this._startLayerPoint),e.layerPointToLatLng(i));e.fitBounds(n),e.fire("boxzoomend",{boxZoomBounds:n})}},_onKeyDown:function(t){27===t.keyCode&&this._finish()}}),o.Map.addInitHook("addHandler","boxZoom",o.Map.BoxZoom),o.Map.mergeOptions({keyboard:!0,keyboardPanOffset:80,keyboardZoomOffset:1}),o.Map.Keyboard=o.Handler.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,173]},initialize:function(t){this._map=t,this._setPanOffset(t.options.keyboardPanOffset),this._setZoomOffset(t.options.keyboardZoomOffset)},addHooks:function(){var t=this._map._container;-1===t.tabIndex&&(t.tabIndex="0"),o.DomEvent.on(t,"focus",this._onFocus,this).on(t,"blur",this._onBlur,this).on(t,"mousedown",this._onMouseDown,this),this._map.on("focus",this._addHooks,this).on("blur",this._removeHooks,this)},removeHooks:function(){this._removeHooks();var t=this._map._container;o.DomEvent.off(t,"focus",this._onFocus,this).off(t,"blur",this._onBlur,this).off(t,"mousedown",this._onMouseDown,this),this._map.off("focus",this._addHooks,this).off("blur",this._removeHooks,this)},_onMouseDown:function(){if(!this._focused){var i=e.body,n=e.documentElement,o=i.scrollTop||n.scrollTop,s=i.scrollLeft||n.scrollLeft;this._map._container.focus(),t.scrollTo(s,o)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanOffset:function(t){var e,i,n=this._panKeys={},o=this.keyCodes;for(e=0,i=o.left.length;i>e;e++)n[o.left[e]]=[-1*t,0];for(e=0,i=o.right.length;i>e;e++)n[o.right[e]]=[t,0];for(e=0,i=o.down.length;i>e;e++)n[o.down[e]]=[0,t];for(e=0,i=o.up.length;i>e;e++)n[o.up[e]]=[0,-1*t]},_setZoomOffset:function(t){var e,i,n=this._zoomKeys={},o=this.keyCodes;for(e=0,i=o.zoomIn.length;i>e;e++)n[o.zoomIn[e]]=t;for(e=0,i=o.zoomOut.length;i>e;e++)n[o.zoomOut[e]]=-t},_addHooks:function(){o.DomEvent.on(e,"keydown",this._onKeyDown,this)},_removeHooks:function(){o.DomEvent.off(e,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){var e=t.keyCode,i=this._map;if(e in this._panKeys){if(i._panAnim&&i._panAnim._inProgress)return;i.panBy(this._panKeys[e]),i.options.maxBounds&&i.panInsideBounds(i.options.maxBounds)}else{if(!(e in this._zoomKeys))return;i.setZoom(i.getZoom()+this._zoomKeys[e])}o.DomEvent.stop(t)}}),o.Map.addInitHook("addHandler","keyboard",o.Map.Keyboard),o.Handler.MarkerDrag=o.Handler.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new o.Draggable(t,t)),this._draggable.on("dragstart",this._onDragStart,this).on("drag",this._onDrag,this).on("dragend",this._onDragEnd,this),this._draggable.enable(),o.DomUtil.addClass(this._marker._icon,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off("dragstart",this._onDragStart,this).off("drag",this._onDrag,this).off("dragend",this._onDragEnd,this),this._draggable.disable(),o.DomUtil.removeClass(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(){this._marker.closePopup().fire("movestart").fire("dragstart")},_onDrag:function(){var t=this._marker,e=t._shadow,i=o.DomUtil.getPosition(t._icon),n=t._map.layerPointToLatLng(i);e&&o.DomUtil.setPosition(e,i),t._latlng=n,t.fire("move",{latlng:n}).fire("drag")},_onDragEnd:function(t){this._marker.fire("moveend").fire("dragend",t)}}),o.Control=o.Class.extend({options:{position:"topright"},initialize:function(t){o.setOptions(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this._map=t;var e=this._container=this.onAdd(t),i=this.getPosition(),n=t._controlCorners[i];return o.DomUtil.addClass(e,"leaflet-control"),-1!==i.indexOf("bottom")?n.insertBefore(e,n.firstChild):n.appendChild(e),this},removeFrom:function(t){var e=this.getPosition(),i=t._controlCorners[e];return i.removeChild(this._container),this._map=null,this.onRemove&&this.onRemove(t),this},_refocusOnMap:function(){this._map&&this._map.getContainer().focus()}}),o.control=function(t){return new o.Control(t)},o.Map.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.removeFrom(this),this},_initControlPos:function(){function t(t,s){var a=i+t+" "+i+s;e[t+s]=o.DomUtil.create("div",a,n)}var e=this._controlCorners={},i="leaflet-",n=this._controlContainer=o.DomUtil.create("div",i+"control-container",this._container);t("top","left"),t("top","right"),t("bottom","left"),t("bottom","right")},_clearControlPos:function(){this._container.removeChild(this._controlContainer)}}),o.Control.Zoom=o.Control.extend({options:{position:"topleft",zoomInText:"+",zoomInTitle:"Zoom in",zoomOutText:"-",zoomOutTitle:"Zoom out"},onAdd:function(t){var e="leaflet-control-zoom",i=o.DomUtil.create("div",e+" leaflet-bar");return this._map=t,this._zoomInButton=this._createButton(this.options.zoomInText,this.options.zoomInTitle,e+"-in",i,this._zoomIn,this),this._zoomOutButton=this._createButton(this.options.zoomOutText,this.options.zoomOutTitle,e+"-out",i,this._zoomOut,this),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),i},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},_zoomIn:function(t){this._map.zoomIn(t.shiftKey?3:1)},_zoomOut:function(t){this._map.zoomOut(t.shiftKey?3:1)},_createButton:function(t,e,i,n,s,a){var r=o.DomUtil.create("a",i,n);r.innerHTML=t,r.href="#",r.title=e;var h=o.DomEvent.stopPropagation;return o.DomEvent.on(r,"click",h).on(r,"mousedown",h).on(r,"dblclick",h).on(r,"click",o.DomEvent.preventDefault).on(r,"click",s,a).on(r,"click",this._refocusOnMap,a),r},_updateDisabled:function(){var t=this._map,e="leaflet-disabled";o.DomUtil.removeClass(this._zoomInButton,e),o.DomUtil.removeClass(this._zoomOutButton,e),t._zoom===t.getMinZoom()&&o.DomUtil.addClass(this._zoomOutButton,e),t._zoom===t.getMaxZoom()&&o.DomUtil.addClass(this._zoomInButton,e)}}),o.Map.mergeOptions({zoomControl:!0}),o.Map.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new o.Control.Zoom,this.addControl(this.zoomControl))}),o.control.zoom=function(t){return new o.Control.Zoom(t)},o.Control.Attribution=o.Control.extend({options:{position:"bottomright",prefix:'<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'},initialize:function(t){o.setOptions(this,t),this._attributions={}},onAdd:function(t){this._container=o.DomUtil.create("div","leaflet-control-attribution"),o.DomEvent.disableClickPropagation(this._container);for(var e in t._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());return t.on("layeradd",this._onLayerAdd,this).on("layerremove",this._onLayerRemove,this),this._update(),this._container},onRemove:function(t){t.off("layeradd",this._onLayerAdd).off("layerremove",this._onLayerRemove)},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):void 0},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):void 0},_update:function(){if(this._map){var t=[];for(var e in this._attributions)this._attributions[e]&&t.push(e);var i=[];this.options.prefix&&i.push(this.options.prefix),t.length&&i.push(t.join(", ")),this._container.innerHTML=i.join(" | ")}},_onLayerAdd:function(t){t.layer.getAttribution&&this.addAttribution(t.layer.getAttribution())},_onLayerRemove:function(t){t.layer.getAttribution&&this.removeAttribution(t.layer.getAttribution())}}),o.Map.mergeOptions({attributionControl:!0}),o.Map.addInitHook(function(){this.options.attributionControl&&(this.attributionControl=(new o.Control.Attribution).addTo(this))}),o.control.attribution=function(t){return new o.Control.Attribution(t)},o.Control.Scale=o.Control.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0,updateWhenIdle:!1},onAdd:function(t){this._map=t;var e="leaflet-control-scale",i=o.DomUtil.create("div",e),n=this.options;return this._addScales(n,e,i),t.on(n.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),i},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,i){t.metric&&(this._mScale=o.DomUtil.create("div",e+"-line",i)),t.imperial&&(this._iScale=o.DomUtil.create("div",e+"-line",i))},_update:function(){var t=this._map.getBounds(),e=t.getCenter().lat,i=6378137*Math.PI*Math.cos(e*Math.PI/180),n=i*(t.getNorthEast().lng-t.getSouthWest().lng)/180,o=this._map.getSize(),s=this.options,a=0;o.x>0&&(a=n*(s.maxWidth/o.x)),this._updateScales(s,a)},_updateScales:function(t,e){t.metric&&e&&this._updateMetric(e),t.imperial&&e&&this._updateImperial(e)},_updateMetric:function(t){var e=this._getRoundNum(t);this._mScale.style.width=this._getScaleWidth(e/t)+"px",this._mScale.innerHTML=1e3>e?e+" m":e/1e3+" km"},_updateImperial:function(t){var e,i,n,o=3.2808399*t,s=this._iScale;o>5280?(e=o/5280,i=this._getRoundNum(e),s.style.width=this._getScaleWidth(i/e)+"px",s.innerHTML=i+" mi"):(n=this._getRoundNum(o),s.style.width=this._getScaleWidth(n/o)+"px",s.innerHTML=n+" ft")},_getScaleWidth:function(t){return Math.round(this.options.maxWidth*t)-10},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),i=t/e;return i=i>=10?10:i>=5?5:i>=3?3:i>=2?2:1,e*i}}),o.control.scale=function(t){return new o.Control.Scale(t)},o.Control.Layers=o.Control.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0},initialize:function(t,e,i){o.setOptions(this,i),this._layers={},this._lastZIndex=0,this._handlingClick=!1;for(var n in t)this._addLayer(t[n],n);for(n in e)this._addLayer(e[n],n,!0)},onAdd:function(t){return this._initLayout(),this._update(),t.on("layeradd",this._onLayerChange,this).on("layerremove",this._onLayerChange,this),this._container},onRemove:function(t){t.off("layeradd",this._onLayerChange).off("layerremove",this._onLayerChange)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._update(),this},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._update(),this},removeLayer:function(t){var e=o.stamp(t);return delete this._layers[e],this._update(),this},_initLayout:function(){var t="leaflet-control-layers",e=this._container=o.DomUtil.create("div",t);e.setAttribute("aria-haspopup",!0),o.Browser.touch?o.DomEvent.on(e,"click",o.DomEvent.stopPropagation):o.DomEvent.disableClickPropagation(e).disableScrollPropagation(e);var i=this._form=o.DomUtil.create("form",t+"-list");if(this.options.collapsed){o.Browser.android||o.DomEvent.on(e,"mouseover",this._expand,this).on(e,"mouseout",this._collapse,this);var n=this._layersLink=o.DomUtil.create("a",t+"-toggle",e);n.href="#",n.title="Layers",o.Browser.touch?o.DomEvent.on(n,"click",o.DomEvent.stop).on(n,"click",this._expand,this):o.DomEvent.on(n,"focus",this._expand,this),o.DomEvent.on(i,"click",function(){setTimeout(o.bind(this._onInputClick,this),0)},this),this._map.on("click",this._collapse,this)}else this._expand();this._baseLayersList=o.DomUtil.create("div",t+"-base",i),this._separator=o.DomUtil.create("div",t+"-separator",i),this._overlaysList=o.DomUtil.create("div",t+"-overlays",i),e.appendChild(i)},_addLayer:function(t,e,i){var n=o.stamp(t);this._layers[n]={layer:t,name:e,overlay:i},this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex))},_update:function(){if(this._container){this._baseLayersList.innerHTML="",this._overlaysList.innerHTML="";var t,e,i=!1,n=!1;for(t in this._layers)e=this._layers[t],this._addItem(e),n=n||e.overlay,i=i||!e.overlay;this._separator.style.display=n&&i?"":"none"}},_onLayerChange:function(t){var e=this._layers[o.stamp(t.layer)];if(e){this._handlingClick||this._update();var i=e.overlay?"layeradd"===t.type?"overlayadd":"overlayremove":"layeradd"===t.type?"baselayerchange":null;i&&this._map.fire(i,e)}},_createRadioElement:function(t,i){var n='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"';i&&(n+=' checked="checked"'),n+="/>";var o=e.createElement("div");return o.innerHTML=n,o.firstChild},_addItem:function(t){var i,n=e.createElement("label"),s=this._map.hasLayer(t.layer);t.overlay?(i=e.createElement("input"),i.type="checkbox",i.className="leaflet-control-layers-selector",i.defaultChecked=s):i=this._createRadioElement("leaflet-base-layers",s),i.layerId=o.stamp(t.layer),o.DomEvent.on(i,"click",this._onInputClick,this);var a=e.createElement("span");a.innerHTML=" "+t.name,n.appendChild(i),n.appendChild(a);var r=t.overlay?this._overlaysList:this._baseLayersList;return r.appendChild(n),n},_onInputClick:function(){var t,e,i,n=this._form.getElementsByTagName("input"),o=n.length;for(this._handlingClick=!0,t=0;o>t;t++)e=n[t],i=this._layers[e.layerId],e.checked&&!this._map.hasLayer(i.layer)?this._map.addLayer(i.layer):!e.checked&&this._map.hasLayer(i.layer)&&this._map.removeLayer(i.layer);this._handlingClick=!1,this._refocusOnMap()},_expand:function(){o.DomUtil.addClass(this._container,"leaflet-control-layers-expanded")},_collapse:function(){this._container.className=this._container.className.replace(" leaflet-control-layers-expanded","")}}),o.control.layers=function(t,e,i){return new o.Control.Layers(t,e,i)},o.PosAnimation=o.Class.extend({includes:o.Mixin.Events,run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._newPos=e,this.fire("start"),t.style[o.DomUtil.TRANSITION]="all "+(i||.25)+"s cubic-bezier(0,0,"+(n||.5)+",1)",o.DomEvent.on(t,o.DomUtil.TRANSITION_END,this._onTransitionEnd,this),o.DomUtil.setPosition(t,e),o.Util.falseFn(t.offsetWidth),this._stepTimer=setInterval(o.bind(this._onStep,this),50)},stop:function(){this._inProgress&&(o.DomUtil.setPosition(this._el,this._getPos()),this._onTransitionEnd(),o.Util.falseFn(this._el.offsetWidth))},_onStep:function(){var t=this._getPos();return t?(this._el._leaflet_pos=t,this.fire("step"),void 0):(this._onTransitionEnd(),void 0)},_transformRe:/([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,_getPos:function(){var e,i,n,s=this._el,a=t.getComputedStyle(s);if(o.Browser.any3d){if(n=a[o.DomUtil.TRANSFORM].match(this._transformRe),!n)return;e=parseFloat(n[1]),i=parseFloat(n[2])}else e=parseFloat(a.left),i=parseFloat(a.top);return new o.Point(e,i,!0)},_onTransitionEnd:function(){o.DomEvent.off(this._el,o.DomUtil.TRANSITION_END,this._onTransitionEnd,this),this._inProgress&&(this._inProgress=!1,this._el.style[o.DomUtil.TRANSITION]="",this._el._leaflet_pos=this._newPos,clearInterval(this._stepTimer),this.fire("step").fire("end"))}}),o.Map.include({setView:function(t,e,n){if(e=e===i?this._zoom:this._limitZoom(e),t=this._limitCenter(o.latLng(t),e,this.options.maxBounds),n=n||{},this._panAnim&&this._panAnim.stop(),this._loaded&&!n.reset&&n!==!0){n.animate!==i&&(n.zoom=o.extend({animate:n.animate},n.zoom),n.pan=o.extend({animate:n.animate},n.pan));var s=this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,n.zoom):this._tryAnimatedPan(t,n.pan);if(s)return clearTimeout(this._sizeTimer),this}return this._resetView(t,e),this},panBy:function(t,e){if(t=o.point(t).round(),e=e||{},!t.x&&!t.y)return this;if(this._panAnim||(this._panAnim=new o.PosAnimation,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),e.animate!==!1){o.DomUtil.addClass(this._mapPane,"leaflet-pan-anim");var i=this._getMapPanePos().subtract(t);this._panAnim.run(this._mapPane,i,e.duration||.25,e.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){o.DomUtil.removeClass(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){var i=this._getCenterOffset(t)._floor();return(e&&e.animate)===!0||this.getSize().contains(i)?(this.panBy(i,e),!0):!1}}),o.PosAnimation=o.DomUtil.TRANSITION?o.PosAnimation:o.PosAnimation.extend({run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=i||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=o.DomUtil.getPosition(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(),this._complete())},_animate:function(){this._animId=o.Util.requestAnimFrame(this._animate,this),this._step()},_step:function(){var t=+new Date-this._startTime,e=1e3*this._duration;e>t?this._runFrame(this._easeOut(t/e)):(this._runFrame(1),this._complete())},_runFrame:function(t){var e=this._startPos.add(this._offset.multiplyBy(t));o.DomUtil.setPosition(this._el,e),this.fire("step")},_complete:function(){o.Util.cancelAnimFrame(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),o.Map.mergeOptions({zoomAnimation:!0,zoomAnimationThreshold:4}),o.DomUtil.TRANSITION&&o.Map.addInitHook(function(){this._zoomAnimated=this.options.zoomAnimation&&o.DomUtil.TRANSITION&&o.Browser.any3d&&!o.Browser.android23&&!o.Browser.mobileOpera,this._zoomAnimated&&o.DomEvent.on(this._mapPane,o.DomUtil.TRANSITION_END,this._catchTransitionEnd,this)}),o.Map.include(o.DomUtil.TRANSITION?{_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,e,i){if(this._animatingZoom)return!0;if(i=i||{},!this._zoomAnimated||i.animate===!1||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(e),o=this._getCenterOffset(t)._divideBy(1-1/n),s=this._getCenterLayerPoint()._add(o);return i.animate===!0||this.getSize().contains(o)?(this.fire("movestart").fire("zoomstart"),this._animateZoom(t,e,s,n,null,!0),!0):!1},_animateZoom:function(t,e,i,n,s,a){this._animatingZoom=!0,o.DomUtil.addClass(this._mapPane,"leaflet-zoom-anim"),this._animateToCenter=t,this._animateToZoom=e,o.Draggable&&(o.Draggable._disabled=!0),this.fire("zoomanim",{center:t,zoom:e,origin:i,scale:n,delta:s,backwards:a})},_onZoomTransitionEnd:function(){this._animatingZoom=!1,o.DomUtil.removeClass(this._mapPane,"leaflet-zoom-anim"),this._resetView(this._animateToCenter,this._animateToZoom,!0,!0),o.Draggable&&(o.Draggable._disabled=!1)}}:{}),o.TileLayer.include({_animateZoom:function(t){this._animating||(this._animating=!0,this._prepareBgBuffer());var e=this._bgBuffer,i=o.DomUtil.TRANSFORM,n=t.delta?o.DomUtil.getTranslateString(t.delta):e.style[i],s=o.DomUtil.getScaleString(t.scale,t.origin);e.style[i]=t.backwards?s+" "+n:n+" "+s},_endZoomAnim:function(){var t=this._tileContainer,e=this._bgBuffer;t.style.visibility="",t.parentNode.appendChild(t),o.Util.falseFn(e.offsetWidth),this._animating=!1},_clearBgBuffer:function(){var t=this._map;!t||t._animatingZoom||t.touchZoom._zooming||(this._bgBuffer.innerHTML="",this._bgBuffer.style[o.DomUtil.TRANSFORM]="")},_prepareBgBuffer:function(){var t=this._tileContainer,e=this._bgBuffer,i=this._getLoadedTilesPercentage(e),n=this._getLoadedTilesPercentage(t);return e&&i>.5&&.5>n?(t.style.visibility="hidden",this._stopLoadingImages(t),void 0):(e.style.visibility="hidden",e.style[o.DomUtil.TRANSFORM]="",this._tileContainer=e,e=this._bgBuffer=t,this._stopLoadingImages(e),clearTimeout(this._clearBgBufferTimer),void 0)},_getLoadedTilesPercentage:function(t){var e,i,n=t.getElementsByTagName("img"),o=0;for(e=0,i=n.length;i>e;e++)n[e].complete&&o++;return o/i},_stopLoadingImages:function(t){var e,i,n,s=Array.prototype.slice.call(t.getElementsByTagName("img"));for(e=0,i=s.length;i>e;e++)n=s[e],n.complete||(n.onload=o.Util.falseFn,n.onerror=o.Util.falseFn,n.src=o.Util.emptyImageUrl,n.parentNode.removeChild(n))}}),o.Map.include({_defaultLocateOptions:{watch:!1,setView:!1,maxZoom:1/0,timeout:1e4,maximumAge:0,enableHighAccuracy:!1},locate:function(t){if(t=this._locateOptions=o.extend(this._defaultLocateOptions,t),!navigator.geolocation)return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var e=o.bind(this._handleGeolocationResponse,this),i=o.bind(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,i,t):navigator.geolocation.getCurrentPosition(e,i,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){var e=t.code,i=t.message||(1===e?"permission denied":2===e?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+i+"."})},_handleGeolocationResponse:function(t){var e=t.coords.latitude,i=t.coords.longitude,n=new o.LatLng(e,i),s=180*t.coords.accuracy/40075017,a=s/Math.cos(o.LatLng.DEG_TO_RAD*e),r=o.latLngBounds([e-s,i-a],[e+s,i+a]),h=this._locateOptions;if(h.setView){var l=Math.min(this.getBoundsZoom(r),h.maxZoom);this.setView(n,l)}var u={latlng:n,bounds:r,timestamp:t.timestamp};for(var c in t.coords)"number"==typeof t.coords[c]&&(u[c]=t.coords[c]);this.fire("locationfound",u)}})}(window,document);
/**
* jquery.throttledAjax
* jQuery AJAX with throttling.
* https://github.com/jstonne/jquery.throttledAjax
*
* Requires jquery.Threads
* https://github.com/jstonne/jquery.Threads
*
* Copyright (c) 2012 Jensen Tonne
* www.jstonne.com
*
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

(function(){

var self = $.Ajax = function(options) {

	var request = $.Deferred(),
		args = arguments;

	// Allow others to decorate the request object
	$.isPlainObject(options) && $.isFunction(options.beforeCreate) && options.beforeCreate(request);

	self.queue.addDeferred(function(queue){

		request.xhr =
			$.ajax.apply(null, args)
				.pipe(
					request.resolve,
					request.reject,
					request.notify
				);

		var version = $.joomla.version.split("."),
			majorVersion = version[0],
			minorVersion = version[1],
			requestInterval = self.requestInterval;

		if (majorVersion >= 3 && minorVersion >= 2) {
			requestInterval = 0;
		}

		// Mark this queue as resolved
		setTimeout(queue.resolve, requestInterval);
	});

	return request;
}

self.queue = $.Threads({threadLimit: 1});

self.requestInterval = 1200;

})();

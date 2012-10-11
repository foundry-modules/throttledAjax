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

var self = $.throttledAjax = function() {

	var request = $.Deferred(),
		args = arguments;

	self.queue.addDeferred(function(queue){

		request.xhr =
			$.ajax.apply(null, args)
				.pipe(
					request.resolve,
					request.reject,
					request.notify
				);

		// Mark this queue as resolved
		setTimeout(queue.resolve, self.requestInterval);

	});

	return request;
}

self.queue = $.Threads({threadLimit: 1});

self.requestInterval = 1200;

})();

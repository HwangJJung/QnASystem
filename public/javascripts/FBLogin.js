


$('a.btn').on('click', function(e) {
	e.preventDefault();


	function PopupCenterDual(url, title, w, h) {
		// Fixes dual-screen position   Most browsers   Firefox
		var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
		var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
		var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

		var left = ((width / 2) - (w / 2)) + dualScreenLeft;
		var top = ((height / 2) - (h / 2)) + dualScreenTop;
		var newWindow = window.open(url, title, 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

		// Puts focus on the newWindow
		if (window.focus) {
			newWindow.focus();
		}
		return false;
	}
	var url = $(this).attr('href');

	PopupCenterDual(url,"FBlogin",300,250);

	//var request = new XMLHttpRequest();
	//request.open("GET" , url , true);
	//request.send(null);
	//request.onreadystatechange = function() {
	//	console.log(request.readyState);
	//
	//	if(request.readyState === 4 && request.status === 302) {
	//		var fBLogin = request.responseText;
	//		var modal_body = document.querySelector("list_container");
	//		modal_body.innerHTML = "";
	//		modal_body.insertAdjacentHTML('beforeend',FBLogin);
	//	}
	//};
});





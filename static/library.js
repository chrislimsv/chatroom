
function shakeWindow() {
	var x = 10;
	if (document.all || document.layers) {
		for (i = 0; i < 20; i ++)
		{	
			window.moveBy(0,x);	
			window.moveBy(x,0);
			window.moveBy(0,-x);
			window.moveBy(-x,0);
		}
	}
}

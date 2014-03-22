function shakeWindow(w) {
	var x = 10;
	if (w.moveBy)
	{
		for (var i = 0; i < 20; i ++)
		{	
			w.moveBy(0,x);	
			w.moveBy(x,0);
			w.moveBy(0,-x);
			w.moveBy(-x,0);
		}
	}
}

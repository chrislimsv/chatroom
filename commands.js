var types = ["write ", "open ", "clear", "send ", "lg ", "fu "];

function parse_string(str) {
	str = str.toLowerCase();

	for (var i = 0; i < types.length; i++)
	{
		if (str.indexOf(types[i]) == 0)
			return types[i];
	}

	return false;
}

function process_msg(str) {
	return replace_doge(str);
}

function replace_doge(str) {
	// process string (poor programming practice)
	return str.replace(/doge/g, "<img src='static/img/doge.jpg'>");
}

exports.parse_string = parse_string;
exports.process_msg = process_msg;




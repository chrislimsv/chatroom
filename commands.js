var types = ["write ", "open ", "clear", "send ", "lg ", "doge"];

function parse_string(str) {
	str = str.toLowerCase();

	for (var i = 0; i < types.length; i++)
	{
		if (str.indexOf(types[i]) == 0)
			return types[i];
	}

	return false;
}

exports.parse_string = parse_string;




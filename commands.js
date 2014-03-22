var types = ["write ", "open ", "clear", "send ", "lg ", "expel "];

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

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

function escapeHtml(string) {
	return String(string).replace(/[&<>"'\/]/g, function (s) {
	  return entityMap[s];
	});
}

function escapeQuotes(string) {
	return String(string).replace(/["']/g, function (s) {
	  return entityMap[s];
	});

}

exports.parse_string = parse_string;
exports.process_msg = process_msg;
exports.escapeHtml = escapeHtml;
exports.escapeQuotes = escapeQuotes;




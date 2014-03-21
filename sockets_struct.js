function Sockets(max) {
	this.userids = [];
	this.id_to_socket = [];
	this.current_id = 0;
	this.max_id = max;

	this.addSocket = function(socket) {
		do
		{
			if (++this.current_id > this.max_id) 
				this.current_id = 1;
		}
		while (this.userids.indexOf(this.current_id) != -1);

		this.userids.push(this.current_id);
		this.id_to_socket[this.current_id] = socket;

		return this.current_id;
	};

	this.getSocket = function(id) {
		if (this.userids.indexOf(id) == -1)
			return null;
		else
			return this.id_to_socket[id];
	};

	this.getId = function(socket) {
		for (var i = 0; i < this.userids.length; i++)
		{
			if (this.id_to_socket[this.userids[i]] == socket)
				return this.userids[i];
		}

		return -1;
	};

	this.removeSocketById = function (id) {
		var index = this.userids.indexOf(id);
		if (index != -1) {
			// mark userids to be cleaned
			this.userids.splice(index,1); 
			this.id_to_socket[id] = null;
		}
	};

	
	this.removeSocket = function(socket) {
		var id = this.getId(socket);
		this.removeSocketById(id);
	};

	this.numOfSockets = function() {
		return this.userids.length;
	};
}

exports.Sockets = Sockets;

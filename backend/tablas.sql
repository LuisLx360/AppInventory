CREATE TABLE users(
	id serial PRIMARY KEY,
	username varchar (20) UNIQUE NOT NULL,
	password varchar(100) NOT NULL,
	status varchar(1) DEFAULT ('A')
);


CREATE TABLE worker(
	id serial PRIMARY KEY,
	name varchar(25) NOT NULL,
	area varchar(30)
);

CREATE TABLE tool(
	id serial PRIMARY KEY,
	description varchar(60) NOT NULL,
	barcode varchar(30),
	status varchar(1) DEFAULT ('A'),
	url_foto varchar (100),
	created_at timestamp
);

CREATE TABLE transaction(
	id serial PRIMARY KEY,
	tool_id int,
	worker_id int,
	datetime timestamp,
	type varchar(1),
	FOREIGN KEY (tool_id) REFERENCES tool(id) ON DELETE CASCADE,
	FOREIGN KEY (worker_id) REFERENCES worker(id) ON DELETE CASCADE
);
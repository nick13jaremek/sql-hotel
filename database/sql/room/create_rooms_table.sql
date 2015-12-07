create table rooms(
  id serial primary key,
  name varchar(100) not null unique,
  status varchar(50) not null,
  room_size int not null
)
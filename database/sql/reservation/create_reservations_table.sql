create table reservations(
  id serial primary key,
  status varchar(50),
  paid decimal(7, 2),
  name varchar(100) not null unique,
  start_time timestamp not null,
  end_time timestamp not null,
  room_id int references rooms(id)
  )
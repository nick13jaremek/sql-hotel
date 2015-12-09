# SQL-Hotel: a SQL small test project with NodeJS

## Introduction

This is a sample project written on NodeJS to test the capabilities and possibilities of the `massive.js` library, which
includes flexible possibilities to manipulate PostgresSQL queries.

## Models

Since the project is called SQL-Hotel, there exists a single database made of different tables. The single database is
associated to the SQL-Hotel, a five starts digital building where ones can accommodate gracefully.

### Reservations

Reservations model the event of assigning a room object to a potential customer of the SQL-Hotel. An example of such an object is presented as follows:
```
{
  "name": "Mr. Fitzambow",
  "status": "pending",
  "paid": 49.95,
  "room_id": 1,
  "start_time": "2015-03-31T09:00:18.622Z",
  "end_time": "2015-04-06T09:00:18.622Z"
}
```

Reservations are related to a `Room` object through the foreign key (FK) labeled as `room_id`.


### Rooms

Rooms model the assets that the SQL-Hotel is composed of. A room is the main service available to
 any potential customer. An example of such an object is as follows:
```
{
  "name": "Presidential Suite",
  "status": "available",
  "room_size": 2
}
```

Room objects are related to the `reservations` table through the `id` <-> 'room_id' correspondence.

## Migrations

As its own name indicates, the SQL-Hotel operates on an SQL database, more precisely based on PostgreSQL.
Due to the changing nature of data, the `reservations` and `rooms` tables will need to update their columns
 via operations such as removal, addition, constraints, etc...

In order to modify the SQL tables' schema, migrations can be created, programmed and run.

1. Before dealing with migrations, make sure you have installed the `migrate` npm package **globally** (recommended):
  `npm install -g migrate`

2. Create a new migration file using the `migrate create <migration_file_name>` command. This will create a new JS file
 whose filename will have the {timestamp}_{migration_name} format.

3. In the newly created migration file, import the `setup_massive` file located at the `database` directory.

4. In the `database/sql` path, create two `sql` files for the new migration: one for the `up` function and one for
the `down` function.

5. Run `npm run migrate` to execute all the pending migration files.

*Note* Migration files are marked as applied after execution, that is, if you run your migrations again, those that were
already executed will be skipped.
 This ensures the consistency of the database, by not applying duplicate constraints or other table structure changes
  more than once. If you need to rerun some migration that was already registered, remove its corresponding line from
  the `.migrate` file located at the `database/migrations` directory.
// parser-test-data.js

const testCases = [
	{
		name: 'The Lot',
    text: `
#New syntax for what was human2ide

Menu:Top
  Home
  Schemas
  Tables(Private)
  Rows(Private)
  Settings
  Chat
  About

Collections
  Schemas: name
  Tables: schema_id, schema, table name, baa.
  Rows: table_id, table name, column name, data type, key, anon level, anon type, hash

Joins
  Schemas(_id): Tables(schema_id)
  Tables(_id): Rows(table_id)

Pages
  Home: Jumbotron: Welcome to my brave new world!
  Schemas: CRUD: Schemas
  Tables: CRUD: Tables
  Rows: CRUD: Rows

Popups
  Chat
  Settings

Accounts
  UI
  Password

Packages
  fortawesome:fontawesome

Templating:React
`,
  }
];

export default testCases;
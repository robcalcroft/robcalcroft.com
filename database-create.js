const sqlite = require('sqlite3');
const log = require('./log');

const db = new sqlite.Database('blog.database');

log(0, 'Creating database');
db.all(`
  create table posts (
    title TEXT not null,
    content MEDIUMTEXT not null,
    created datetime not null default(strftime('%s','now'))
  )
`, (error) => {
  if (error) {
    return log(1, `There was an error: ${error.message}`);
  }

  return log(2, 'Database created');
});

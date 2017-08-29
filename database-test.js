const sqlite = require('sqlite3');
const log = require('./log');

const db = new sqlite.Database('blog.database');

log(0, 'Adding test records to database');
db.run('insert into posts (title, content) values ("The Best Blog", "This is **the best** blog ever!\nComplete with [links](https://google.com)")');
db.run('insert into posts (title, content) values ("A Great Post", "Blog posts are *cool*")');

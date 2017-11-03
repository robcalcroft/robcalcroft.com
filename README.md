# blag
A simple blogging platform

To add a blog post:
1. Install SQLite on command line
2. Export contents of the blog post file to a variable `export BLOG=`cat blog.md``
3. Import the contents into the database: `sqlite3 blog.database "insert into posts (title, content) values ('HTTPS Tales', '$BLOG')"`
4. Confirm it with `sqlite3 blog.database "select * from posts where title=<TITLE>;"`

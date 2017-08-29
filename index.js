const express = require('express');
const expressHandlebars = require('express-handlebars');
const sqlite = require('sqlite3');
const showdown = require('showdown');
const log = require('./log');

const app = express();
const db = new sqlite.Database('blog.database');

// Create a post with the Markdown formatted to HTML and the date formatted to a
// readable one
const createPost = (rawPost) => {
  const htmlToMarkdown = new showdown.Converter();
  return {
    id: rawPost.id,
    title: rawPost.title,
    content: htmlToMarkdown.makeHtml(rawPost.content),
    created: new Date(rawPost.created * 1000).toLocaleString(),
  };
};

app.engine('handlebars', expressHandlebars({ defaultLayout: 'container' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => db.all(
  'select rowid as id, * from posts',
  (error, posts) => {
    if (error) {
      log(1, error.message);
      return res.status(500).render('home', {
        error: 'There was an error loading the posts',
      });
    }

    return res.render('home', {
      posts: posts.map(post => createPost(post)),
    });
  },
));

app.get('/post/:id', (req, res) => db.get(
  'select rowid as id, * from posts where rowid=?',
  req.params.id,
  (error, post) => {
    if (error) {
      log(1, error.message);
      return res.status(500).render('post', {
        error: 'There was an error loading this post',
      });
    }

    if (!post) {
      return res.status(404).render('post', {
        error: 'Sorry, no post was found with the provided ID',
      });
    }

    return res.render('post', createPost(post));
  },
));

// Start the server listening on the specified port
app.listen(process.env.PORT || 8080, () => (
  log(0, `Blag server running on port ${process.env.PORT || 8080}`)
));

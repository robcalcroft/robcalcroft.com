const fs = require('fs-extra');
const path = require('path');
const handlebars = require('handlebars');
const posts = require('./posts');

const DIST = path.resolve(__dirname, 'dist');
const SRC = path.resolve(__dirname, 'src');

const getReadingTime = (content) => {
  const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  const commentsTags = /<!--[\s\S]*?-->|<\??[\s\S]*?\?>/gi;
  const strippedContent = content.replace(tags, '').replace(commentsTags, '');
  return `${Math.ceil(strippedContent.split(' ').length / 250)} minute read`;
};

const getDateString = date => new Date(date * 1000).toLocaleDateString();

const getFileName = title => title.toLowerCase()
  .replace(/ /g, '-')
  .replace(/(\*|,|')/g, '');

handlebars.registerHelper('getFileName', getFileName);
handlebars.registerHelper('getDateString', getDateString);

(async () => {
  await fs.emptyDir(DIST);
  handlebars.registerPartial('container', await fs.readFile('src/container.handlebars', 'utf8'));

  await fs.copy(`${SRC}/style.css`, `${DIST}/style.css`);
  await fs.copy(`${SRC}/_headers`, `${DIST}/_headers`);

  const postTemplate = handlebars.compile(await fs.readFile('src/post.handlebars', 'utf8'));
  posts.sort((a, b) => b.created - a.created).forEach(async ({
    title,
    body,
    created,
  }) => {
    const filename = getFileName(title);
    const html = postTemplate({
      post: body,
      title,
      created,
      readingTime: getReadingTime(body),
      fileName: filename,
      filename: './',
    });
    await fs.writeFile(`${DIST}/${filename}.html`, html);
  });

  const indexTemplate = handlebars.compile(await fs.readFile('src/index.handlebars', 'utf8'));
  await fs.writeFile(`${DIST}/index.html`, indexTemplate({
    posts,
    title: 'Rob\'s Blog',
  }));
})();

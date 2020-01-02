const fs = require('fs-extra');
const path = require('path');
const handlebars = require('handlebars');
const { createClient } = require('contentful');
const showdown = require('showdown');

const converter = new showdown.Converter();

const client = createClient({
  accessToken: process.env.CONTENTFUL_TOKEN,
  space: process.env.CONTENTFUL_SPACE,
});

const DIST = path.resolve(__dirname, 'dist');
const SRC = path.resolve(__dirname, 'src');

const getReadingTime = (content) => {
  const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  const commentsTags = /<!--[\s\S]*?-->|<\??[\s\S]*?\?>/gi;
  const strippedContent = content.replace(tags, '').replace(commentsTags, '');
  return `${Math.ceil(strippedContent.split(' ').length / 250)} minute read`;
};

const getDateString = (dateString) => {
  const [year, month, date] = dateString.split('-');
  return `${date}/${month}/${year}`;
};

const getFileName = title => title.toLowerCase()
  .replace(/ /g, '-')
  .replace(/(\*|,|'|:)/g, '');

handlebars.registerHelper('getFileName', getFileName);
handlebars.registerHelper('getDateString', getDateString);

(async () => {
  const { items: posts } = await client.getEntries({
    content_type: 'blogPost',
    order: '-fields.date',
  });

  await fs.emptyDir(DIST);
  handlebars.registerPartial('container', await fs.readFile('src/container.handlebars', 'utf8'));

  await fs.copy(`${SRC}/style.css`, `${DIST}/style.css`);
  await fs.copy(`${SRC}/_headers`, `${DIST}/_headers`);
  await fs.copy(`${SRC}/favicon.ico`, `${DIST}/favicon.ico`);

  const postTemplate = handlebars.compile(await fs.readFile('src/post.handlebars', 'utf8'));
  posts.forEach(async ({
    fields: {
      title,
      description = "Rob's personal blog where he discusses the web, the challenges it faces and how to tackle them",
      body,
      date,
    },
  }) => {
    const filename = getFileName(title);
    const htmlBody = converter.makeHtml(body);
    const html = postTemplate({
      post: htmlBody,
      title,
      description,
      date,
      readingTime: getReadingTime(htmlBody),
    });
    await fs.writeFile(`${DIST}/${filename}.html`, html);
  });

  const indexTemplate = handlebars.compile(await fs.readFile('src/index.handlebars', 'utf8'));
  await fs.writeFile(`${DIST}/index.html`, indexTemplate({
    posts: posts.map(post => post.fields),
    title: 'Rob\'s Blog',
  }));
})();

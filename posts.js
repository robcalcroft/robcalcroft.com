const fs = require('fs');
const showdown = require('showdown');

const converter = new showdown.Converter();

module.exports = [{
  body: converter.makeHtml(fs.readFileSync('posts/my-wallpaper.md', 'utf8')),
  created: 1440284400,
  title: 'My Wallpaper',
}, {
  body: converter.makeHtml(fs.readFileSync('posts/rediscovering-sql.md', 'utf8')),
  created: 1440543600,
  title: 'Rediscovering SQL',
}, {
  body: converter.makeHtml(fs.readFileSync('posts/speed-up-your-remote-life.md', 'utf8')),
  created: 1440543600,
  title: 'Speed Up Your Remote Life',
}, {
  body: converter.makeHtml(fs.readFileSync('posts/uptime-monitoring-using-a-telegram-bot.md', 'utf8')),
  created: 1444172400,
  title: 'Uptime Monitoring using a Telegram Bot',
}, {
  body: converter.makeHtml(fs.readFileSync('posts/using-react-to-rebuild-my-website.md', 'utf8')),
  created: 1452988800,
  title: 'Using React to rebuild my website',
}, {
  body: converter.makeHtml(fs.readFileSync('posts/avoiding-global-npm-packages.md', 'utf8')),
  created: 1453766400,
  title: 'Avoiding global NPM packages',
}, {
  body: converter.makeHtml(fs.readFileSync('posts/changing-the-way-I-design-for-the-web.md', 'utf8')),
  created: 1465686000,
  title: 'Changing the way I design for the web',
}, {
  body: converter.makeHtml(fs.readFileSync('posts/from-233kb-to-3.8kb-a-website-re-engineering-story.md', 'utf8')),
  created: 1473548400,
  title: 'From 233kb to 3.8kb*, a website re-engineering story',
}, {
  body: converter.makeHtml(fs.readFileSync('posts/building-opsviews-cross-platform-mobile-app.md', 'utf8')),
  created: 1486684801,
  title: 'Building Opsview\'s cross platform mobile app',
}, {
  body: converter.makeHtml(fs.readFileSync('posts/jira-notifications-in-slack.md', 'utf8')),
  created: 1491519600,
  title: 'JIRA Notifications In Slack',
}, {
  body: converter.makeHtml(fs.readFileSync('posts/https-tales.md', 'utf8')),
  created: 1509726538,
  title: 'HTTPS Tales',
}, {
  body: converter.makeHtml(fs.readFileSync('posts/from-intern-to-full-time-employee-an-industrial-placement-success-story.md', 'utf8')),
  created: 1486684801,
  title: 'From Intern To Full-Time Employee: An Industrial Placement Success Story',
}];

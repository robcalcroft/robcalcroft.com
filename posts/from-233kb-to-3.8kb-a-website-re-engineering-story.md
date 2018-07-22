Not too long ago I wrote [a post on how I re-made my website using React](https://blog.calcroft.co/using-reactjs-to-rebuild-my-website/). It was fun and taught me a lot about React. It even taught me more about web performance. But alas it wasn't enough.

After assessing the site again a few months later, it didn't take long to notice a few things that weren't great:

- The use of React was to dynamically build the portfolio; but it never changed that much, so was it needed?.
- If you turned off JavaScript, you got no site.
- During the image lazyloading, all you got was a grey box.

These things really don't scream *well engineered site*, and ironically it was predominantly the use of React that made my site seem poorly engineered.

I decided that I wanted a site that could handle most anything the user throws at it: no js, old browser, slow connection (I plan to add offline soon).

First thing I did was strip out all the React code; I was gonna generate static site files, as I was the only one who added new portfolio items to the site and this was not a common occurrence, so it made little sense to generate this every page load. I also stripped away all the Webpack stuff that was handling the React and other libraries; I was gonna write my own simple build script.
I used Handlebars for the static site generation as this seemed the most basic option that still let me write pure HTML, eg not Jade. I decided to still use SCSS to allow me to separate my components and use variables for colours etc. I also removed the web fonts and went for using the browser system font instead (this hurt because I really like [Covered By Your Grace](https://fonts.google.com/specimen/Covered+By+Your+Grace)), but as I was going for a simple, quick site there was no room for slow, render blocking web fonts, plus some system fonts [actually look pretty good](https://developer.apple.com/fonts/).

The [build script](https://github.com/robcalcroft/calcroft.co/blob/master/build.js) was super simple: it rendered the SCSS, compiled the Handlebars, brought in the JavaScripts, and stuffed it all into an `index.html`.

The JavaScript was designed to be minimal and most importantly **optional**, in fact the only JavaScript code I wrote was to [progressively enhance](https://en.wikipedia.org/wiki/Progressive_enhancement) the site. The JavaScript adds high quality versions of all the portfolio images - the default images are super low quality ones that act as the no JavaScript fallback / substitute for those with slow connections.

The result was a site that looked almost identical the the previous one, but sported an 98.4% reduction in payload size* 😎

*Old site*
![Old site](https://imgur.com/7Ih3St4.png "Old site") *New site*![New site](https://imgur.com/k2Trv6i.png "New site")

The rest of it is [fairly standard](https://github.com/robcalcroft/calcroft.co) but the main reason I decided to write this blog was to document my complete change in approach to building the site, from *"Ooo look React"* to *"This is a simple site, so only needs simple engineering techniques and technologies"*.
There's a time and a place for complex frameworks, but this certainly wasn't it.

**TL;DR don't use complicated tech that you don't need to use, the simplest solution is often the best**

Many of the techniques used were inspired by [this demo](https://varvy.com/pagespeed/wicked-fast.html)

*These payload sizes were pre image download & gzipped. The latter will almost certainly change over time.

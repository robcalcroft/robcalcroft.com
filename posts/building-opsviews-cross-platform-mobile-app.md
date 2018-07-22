> A forray in React Native

###Where we started
I've spent a while now hacking around with React and when a mobile app project came up at work I was quick to add React's native friend into the list of potential solutions.
After reviewing a number of solutions including [Ionic](https://ionicframework.com/), [ExtJS 6](http://examples.sencha.com/extjs/6.0.0/examples/) (our current front-end solution) and *real* native, and a few prototypes later, it became clear React Native ticked all the boxes we were looking for:

- Cross platform.
- Allows us to send mobile notifications easily
- Performant; It compiles to native platform code which gives it a huge performance boosts over things like hybrid apps which sometimes struggle to get 60fps on mobile.
- Speed of development ie. time to MVP.
- Not require huge skill-set change for the front-end team.
- A solid roadmap

###Side bar
An omission some readers may have noticed from our list of potential solutions is a [progressive web app](http://blog.ionic.io/what-is-a-progressive-web-app/). This was something I would have loved to have looked into, however we were constrained by the lack of mobile support for many of the technologies that make PWAs great: [ServiceWorkers](http://caniuse.com/#feat=serviceworkers) (for offline and background sync), [HTTP/2](http://caniuse.com/#feat=http2), [web notifications](http://caniuse.com/#feat=notifications) and as we're purely focused on mobile and not desktop [(we already have a client)](https://www.opsview.com/sites/default/files/stripey-socks/event%20viewer.png) it didn't seem like an option that was feasible. Additionally a hosted PWA solution would require a lot of infrastructure implementations that we don't currently have. It is something I would like to prototype and add to Opsview in the future.

###And we're back
After selecting React Native I spent a good week developing and iterating the current prototype; investigating deployment practices and more advanced features.
When the groundwork started, I found that the initial prototype was so strong that I could iterate that project into what became the `master` branch.

During the initial stages of development I learnt a lot about mobile UX and its stark differences and requirements vs. desktop. From ensuring every user interaction has meaningful visual feedback, to refining the user journeys continuously as we alpha tested and found patterns and journeys users had that were not quite what we expected. This real user testing (along with real device testing) shaped the very nature and experience of the app.

On the technical side, it was great to be able to apply my React knowledge to a new and large project. I took some time to [learn more about React app structure](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.bophtfiab) and made the mistake that I thought I wasn't going to make: implementing [Redux](http://redux.js.org/docs/introduction/). This was a particularly annoying mistake as I had read [why I might not need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) but stubbornly went ahead and used it. It did offer some very clean looking code, and gave us the option to use [time travel debugging](https://github.com/gaearon/redux-devtools) (something I never ended up using!), but in the end I found Redux blocking me effectively reusing large components that I'd built, as they ended up using the shared component state. It blocked me so much and my workarounds failed, so I decided to just rip out Redux. This actually really helped; new features didn't require touching 3 files and it forced me to localise and refine my component state trees.

Finally a great thing about React is that its component based nature creates a fantastic community of component developers, [of which I am now a part](https://github.com/robcalcroft?utf8=%E2%9C%93&tab=repositories&q=react-native&type=&language=), and this huge array of components allowed me to quickly develop features without re-inventing the wheel for some of the basics such as collapsible components or navigation.

###What's next
I'm now squirreling away at a lot of really cool features that I hope users are going to love. However I'm not out of the water yet; I still have some big challenges ahead such as preparing the app for production, shipping betas, adding continuous integration and then actually shipping to production.

I'll be sure to report back on how we get on with that in part 2!|1486684800
From Intern To Full-Time Employee: An Industrial Placement Success Story|**I originally wrote this blog for Opsview and the original version can be [found here](https://www.opsview.com/resources/blog/intern-full-time-employee-industrial-placement-success-story)**

I started at Opsview in 2014 for my placement year at university. I began in Customer Success, learning about many aspects of DevOps, from server and virtual machine provisioning to LDAP maintenance and interaction. After a few months, I was picked up to move into the Engineering department to help build Opsview 5.0.

This was a great chance to put a lot of software engineering concepts I learned at university into practice. It was great to see how relevant the skills I learned were in a real world environment. We worked in an Agile environment for software development, something that I’d heard of but never been a part of. Having that year of Agile experience was great as it allowed me to apply those same concepts to my final year project work.

At the end of my placement year, Opsview offered to have me back after I finished my studies and of course, I accepted! I was invited along to the Christmas party and a couple of other events during my final year of university, which was a great chance to catch up with everyone and share my experiences from a busy final year!

It was a real help to me during my final year knowing that I had a placement secured, as I saw far too many people worried about both their studies AND finding a job at the end of the year; a worry that I thankfully, did not have.

Joining the company again was super easy and I found settling in to be a breeze. It was great to see a lot of old faces and meet a few new ones too!

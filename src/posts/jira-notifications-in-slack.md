**I originally wrote this blog for Opsview and the original version can be [found here](https://medium.com/@opsview/jira-notifications-via-slack-3f0c360dc4e0)**

### Intro

JIRA Agile is a big part of how we build software at Opsview. We often have multiple projects running at one time and a lot of back and fourth, that means a lot of communication to keep track of. One of the biggest elements of communication that is missed in the team is the assigning back and fourth of stories, defects and the like. JIRA attempts to fix this with their standard communication method, Email, which works for some, but not many of us here; its too invasive and feels like the ‘wrong’ sort of info to be in our mailboxes, it also feels dated as a way to receive notifications. That’s where Slack comes in, it slowly took over as the main place for communication in the company and for good reason, its slick design and plethora of integrations made everything better and gave us the idea to use it to notify one another of when we assign tasks to someone for testing, or back to the developer for further work; Slack felt like a better home for casual notifications, as we get so many already from colleagues and channels.

### How

With Slack being as popular as it is, there are SDKs for almost any language. I’m a big Node.js fan so decided to go with that. The bot needed to do a few things and these became the requirements for the project:
- Must alert users when they are assigned a task
- The notification must tell them what they have been assigned and by whom
- Must support future actions that we want to notify about
- Must be able to work without each user telling the bot what their Slack username is

With the requirements set I got to work. The first element was building a server to receive incoming web hooks from JIRA and to run the OAuth2 side of the app to get a token to talk to Slack with. I went with the industry standard Express.js and setup two routes to listen to: a POST request to `/jira-webhook` and a GET to `/redirect`. The POST request is listening out for messages from JIRA, JIRA sends a massive JSON payload with each web hook with volumes of data about the change, from that I can pull out all the info I need. Before that however, I need to work out what type of notification this is, so I use a simple switch case to check the contents of `issue_event_type_name` and run the notification code when it is `'issue_assigned’`. This allows me to easily add support for other events in the future.
Once I know something’s been assigned I can go about deconstructing the JSON payload to work out what it is and who to notify.

I first use ES6’s fantastic templating syntax to build a string to send to the recipient:
`${response.user.displayName} has just assigned ${response.issue.key} to you (${changelog.toString}) - https://opsview.atlassian.net/browse/${response.issue.key}`. Including the URL in there helps them save time fiddling around finding it in their queue or on the project board. Next, I check if there were any comments in the last 15 minutes on the task and tag them on to the message if there were. This really helps add context to why the task is being assigned to them and saves them another small back and fourth with the assigner about why they’ve been assigned the task. Next a quick check to make sure that when you’re assigning to yourself you don’t get a notification - some wanted to get notifications in this case, but we decided it could be confusing to new users. The last thing to do is to lookup the user in the Slack directory based on their JIRA email address. I list the users in the directory and compare the email address we have against each one until I find a match, I can then use the corresponding user Id to contact them in Slack. That’s it. Ping. The recipient gets a message in their `Slackbot` chat from our bot letting them know whats up.

This was a small but really fun and rewarding project as it gave us a chance to improve productivity as a direct result of gripes that we had about the way we communicate changes on JIRA. We’re hoping to add more support for other events in the future and we’ve tried to built the bot in a way that anyone can!
If you’re interesting in checking out the source its on GitHub https://github.com/opsview/opsview-jira/ and stay tuned for more projects coming to our GitHub.

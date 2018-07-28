I host a media server at my parents house, it's nothing much, but our family use it for [Plex](http://plex.tv) and some other bits and bobs. My parents had a power cut the other day and it took a while before my dad realised he couldn't watch his favourite episodes of Frasier, so he messaged me saying it was down.

This got me thinking, wouldn't it be nice to use a free service like [Uptime Robot](uptimerobot.com) to monitor that service and report to us if it was down. So I delved into Uptime Robot's interface and found they had a [webhook](https://en.wikipedia.org/wiki/Webhook) notification method!

Throw back to June 2015, when [Telegram announced their new Bots](https://telegram.org/blog/bot-revolution), I built a rubbish little test program to see how easy it was to get a working bot (the answer is *'pretty easy'*). Back to today, I thought I could use a Telegram bot to tell me when my servers had gone down, luckily the code for that rubbish program and what I planned to build were very similar, as it was just, `receive input -> use Telegram API to send response based on that message`.

##Time to get to work

I'm using NodeJS & Express for this, but other languages have very similar implementations.

<script src="https://gist.github.com/robcalcroft/c3c1afbe76038e43f2fd.js"></script>

Ok, code is done. Now you need to go create your Telegram bot using [The Bot Father](https://telegram.me/BotFather), an in house bot for building bots. There are [docs on the full process here](https://core.telegram.org/bots/api).

Ok bot is done. You have a token that you can start using for your bot.

Next up head over to [uptimerobot.com](http://uptimerobot.com), create an account, add a service and add your webhook notification method then link to your service's notification methods.

Now you need to get the `chat_id` of the chat you're going to be using this notification method with, you can use the code above and the `/setWebhook` method to send yourself a message from Telegram and you can grab the `chat_id` from the request body (it will be contained in `req.body.message.chat.id` in a request from Telegram).

Finally, add your bot on telegram, or add to a group chat (which is what I did for my families' group chat) and then take down your service and wait up to 5 minutes, you should hopefully then get a telegram message!

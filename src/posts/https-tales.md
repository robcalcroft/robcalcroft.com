HTTPS is here in a big way and I wanted to make sure my sites are as secure as can be.

Some of these practices are a little overkill for small personal websites with no major traffic or importance but I wanted to make sure I understood them well so that when I did need to implement them, I knew what's needed to keep a site safe.

I'm going to skip over the details of actually adding the TLS cert to my website but I did it with [Certbot](https://certbot.eff.org/) which is a fantastic tool and works so easily with something like Nginx as it does all the configuration for you and amends your configuration files with everything pre-configured - [this guide](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04) covers it really well but beware the article is a little old.

The best place to start is to analyse your TLS cert configuration using [this site](https://www.ssllabs.com/ssltest/) and fix some of the errors it throws up. A common thing it complains about is that your Diffe Hellman keys are too weak. The best way to sort this out is to generate some more complex Diffe Hellman keys, you do this like so:
```
openssl dhparam -out dhparam.pem 4096
```
this will take some time so just leave it for a while (mine took around 30 minutes but will depend on your CPU power).
Once thats been generated, you can add this config to your Nginx site config (assuming your `dhparam.pem` file is in `/etc/ssl/certs/`):
```
ssl_dhparam /etc/ssl/certs/dhparam.pem;
```
Any other issues that SSL Labs gives you should be fairly easy to resolve as they have good documentation for resolving these errors.

Next lets move onto some key headers that your server should be including in order to protect it from an array of attacks. The support for these headers is pretty good across most modern browsers, but IE is still a stick in the mud, so I recommend you look up workarounds if you need to support IE.
The most common form of attack we're trying to protect against is a cross site scripting attack, where an attacker attempts to have arbitrary code execute on a client - often achieved when a web application allows users to submit HTML that is saved on a server and presented to other users to view. There's a few great ways to prevent these type of attacks:

1. `X-XSS-Protection`
This is one of the most basic protections you can add to your site, and is actually enabled by default, what we need to do is just make it more strict. By setting the header to `1; mode=block` we stop the browser rendering any content it deems to have an attack in, whereas before it would've just filtered out any attack related content.
2. `X-Content-Type-Options`
This header can help stop MIME types like pictures being transformed into executable ones like JavaScripts and prevents any attacks that take advantage of browser
3. `Referrer-Policy`
The referrer policy header is a header than can help us stop leaks of HTTPS browsing data onto HTTP sites that could be illegitimate, and be mining or using that browsing data for advertising purposes - or something more nefarious! By setting the header to `no-referrer-when-downgrade` we stop the browser passing the `Referrer` header to the site we are visiting when the site we are moving to is using HTTP and we are using HTTPS on the current site.
4. `Strict-Transport-Security`
This header is more of a maintenance header, but is still important. It allows us to enforce a rule on the browser to not serve our website over HTTP anymore and only ever service it over HTTPS, this ensures that people who may have connected over HTTP in the past, are upgraded to a secure connection to the site.
5. `X-Frame-Options`
Finally, this header can help stop us being open to attacks where the attacker attempts to display our site as their own and possibly modify the contents for nefarious purposes. In practice, this header prevents our site being loaded inside an `iframe` and presented on another domain as that site.

So those are some of the measures I have to defend against web attacks on my infrastructure, but I'm sure there's probably a lot more I could be doing and this is why I'm writing this post; to evolve and add to my security knowledge to help make everything more secure!

I hope I've explained everything correctly in my descriptions but as is the nature of security: it's all in the detail, so if I've mis-explained something, [please do tell me!](https://twitter.com/robcalcroft)

P.S.
[This is a great tool](https://securityheaders.io/) to check that you've correctly configured some of the above headers and practices

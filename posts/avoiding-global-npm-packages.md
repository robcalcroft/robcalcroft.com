NB: [This article on Smashing](https://www.smashingmagazine.com/2016/01/issue-with-global-node-npm-packages/) covers most of what I want to talk about in this post, but I wanted to add my two cents 🙃.
As mentioned in the Smashing article, too many projects require a user to install e.g. Grunt or Gulp globally on their system. Other than polluting the system namespace more, this can mean another step to your installation instructions. In addition, if they're just trying out your project, they may be installing many global packages on their system which if they don't uninstall can start clogging up their system.
We can avoid this and create a more sustainable and coherent installation solution my using the following.
Firstly, when you install a npm module, it gets stored in `node_modules`, and this also happens when you install a package that is designed to be installed globally, for example Gulp. The executable for Gulp is located in `node_modules/.bin/gulp` and running that would yield the same result as if you ran `gulp` with it installed globally.
Now obviously we don't want our users having to type `node_modules/.bin/gulp` every time they want to build the project, so we can move that command into the `scripts` property of our `package.json` file, like so:
```json
"scripts": {
    "build": "node_modules/.bin/gulp"
}
```
Now we can simply run `npm run build` and the project is going to get built. Using named scripts also has the added bonus of allowing you to abstract the names of these processes to actions like 'build'. This means if a user has never used Gulp before, it doesn't matter, since they know what the result of a 'build' command would do.

> So there we go, discourage system clogging globals and promote intelligible maintenance commands.

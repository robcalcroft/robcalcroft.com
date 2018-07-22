##Why

So my website was in desperate need of a re-build. The design & UX was pretty solid. But the internals were pretty yucky.
We'd been using React for a unit at uni and I wanted to give it a spin in the real world.

##What
React is a JavaScript library for building UI which is built by and used by Facebook & Instagram. It's quite new, but it its getting really popular because of its unique abilities and structure.

##How
React is cool because it really takes advantage of a lot of ES2015 features and lives very happily in an ES2015 environment, not least becuase it uses [JSX](https://jsx.github.io/) in order to manipulate HTML-like elements in the JavaScript code.
Features like this:
```
export default class Name extends React.Component {}
```
or this
```
render() {
        return (
            <div className='container top-bar'>
                <div className='row' style={{postition:'relative'}}>
                    <div className='col-md-2'>
                        <i className='fa fa-bolt logo'></i>
                    </div>
                    <div className='col-md-offset-10 col-md-2'>
                        {this.props.thingy}
                    </div>
                </div>
            </div>
        );
    }
```
React was also attractive to me when I tried it out because despite it's complexity behind the scenes, the front end code is incredibly readable and intuitive.

React is also interesting because it works very well with [Webpack](https://webpack.github.io/) which is a module bundler. In short, you can `require()` or `import` anything you like, be that other JavaScripts or SCSS etc. Pretty cool! Webpack works by using *loaders* to read those `import` or `require()` statements and match the file extensions in there. So for example, if I was to do:
```
import './main.scss';
```
and I had the Webpack SCSS loader installed, it would load and compile my SCSS into CSS.
> But where does all this stuff go?

This is where the commonly named `bundle.js` comes in; `bundle.js` is basically a huge file containing all your ready to go code, styles and HTML. The styles come in the form of inline `<style>` tags and then everything just works using the normal JS runtime, all that's required to start is a basic HTML file that imports the `bundle.js` file like so:
```
<!DOCTYPE html>
<html>
    <head>
        <meta charset='UTF-8'/>
        <meta name='description' content='Rob Calcroft, Web Developer &amp; Designer. View my portfolio'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
        <title>Rob Calcroft</title>
    </head>
    <body>
        <div id='react-hook'></div>
        <script src='bundle.js'></script>
    </body>
</html>
```
---

I'm not gonna regergitate my entire project here - [it's on GitHub](https://github.com/robcalcroft/calcroft.co) - but I'd like to showcase one particularly cool thing React allowed me to do.
![Picture](https://i.imgur.com/3efjtEq.gif)
This probably looks like some pretty basic stuff, and it is. But the code behind it is even more simple and intuitive than I could have wanted. So I'm wanting to update the `class` of both the *"want to chat?"* and menu icon elements when I open or close the sidebar. I can do this by using the event functions that come with the sidebar library I was working with provided:
```
onOpen: () => {
    this.setState({
        sidebar: 'opened'
    });
},
```
So the `.setState` function allows me to set or update the state of the component that `this` refers to. I can use that variable here:
```
<div className={this.state.sidebar === 'closed' ? 'links-contact':'links-contact links-contact-on'}>want to chat?</div>
```
This HTML-like element is dynamically setting the `class` based on the result of that `this.state.sidebar` variable is. So when I update the state of the element using the above code, React redraws the element in the Virtual DOM and renders the updates to the actual DOM, making the value change. Again the concept behind this sounds simple, but doing this another way in practice takes a considerable amount more code than this did. Plus this way makes it so crazy readable! I love it.

> React is here, and its gonna be big.

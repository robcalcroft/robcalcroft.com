I've recently started working with GraphQL a lot and I'm really liking it! What I'm liking more is the GraphQL must-have, [Apollo](https://www.apollographql.com); its fantastic server and client libraries have made building GraphQL apps an absolute dream. 🌝

Amongst the host of Apollo's client libraries is [React Apollo](https://www.github.com/apollographql/react-apollo) which, like the rest of the Apollo tool set, has taken the JavaScript-GraphQL world by storm with its simple API and amazing caching features.

Unfortunately the React API has always annoyed me somewhat, thats right, [render props](https://reactjs.org/docs/render-props.html). I know you can use the higher order component (HOC) `withApollo`, but its not really advertised as the best practice and you don't get things like re-renders on cache change.

As the title suggests render props usually mean messy code. One top level render prop component usually looks ok and provides a cool declarative way of re-using functionality like
<script src="https://gist.github.com/robcalcroft/9c4fbe7538e0fd27bd77e45a209a0b6f.js?file=clean-render-props.jsx"></script>
Ok so that doesn't look to bad, but what happens when we need another render prop component?
<script src="https://gist.github.com/robcalcroft/9c4fbe7538e0fd27bd77e45a209a0b6f.js?file=two-render-props.jsx"></script>
Hmm, this is getting a little messy, and if you're building a complex component with React Apollo you can expect more render prop components thrown into the mix e.g. Mutation components. Now sure, you can use the HOC to move that mutation to somewhere else but now the component has become even more complex with two functionality sharing mechanisms in place just to make it more readable. Hopefully you can see the problem here.

Another, more annoying problem you run into with render props is scope and this one becomes *really* frustrating when you have a complex component with a lot of state and therefore, state setters. The problem arises because often the data you need to have in the event handlers for, lets say, an input needs to be given to a function and most of the time those functions are handlers, written towards the top of the function scope, problem is, how to get that data up there?
<script src="https://gist.github.com/robcalcroft/9c4fbe7538e0fd27bd77e45a209a0b6f.js?file=i-dont-think-that-handler-can-hear-me.jsx"></script>

We can try and solve this a couple of ways. First we could do all that handler work inline in the handler so its inside the scope where we have access to the `newData` variable, that solves the scope problem but leaves us with a messy inline arrow function that impacts the readability of the declariative UI code with imperative code. Secondly we could move the `button` element and its acompanying logic into its own component, that does solve both of these problems as we can then give that component `newData` as a prop, meaning that component can access `newData` at the top of its function scope. Unfortunately this comes with the cost of another component to maintain and the knowledge it only exists becuase we needed to *hack* the scope. So in some cases yes creating a new component is worth it, especially if there's a lot more the just a button in there! But for the cases where you want to `map` inside the original component, you're kind of stuck - unless you want to pass `newData` as an argument to the handler a la `() => handleClick(newData)`? No? Yeah I thought so too.

So where do we go from here? Well the twist in the tale is that, as some of you may have guessed React solved all these problems and more in v16.8 with [hooks](https://reactjs.org/docs/hooks-intro.html) the wonderous end to our reusable logic problems 😉. I won't reguritate the docs, but hooks give us the ablilty to build reusable logic into hooks that can live **at the top of the function scope**, giving us unadulterated access to any data that those reusable containers can give us
<script src="https://gist.github.com/robcalcroft/9c4fbe7538e0fd27bd77e45a209a0b6f.js?file=*angels-singing*.jsx"></script>

Sorted! Now, I'm off to clean up some code!


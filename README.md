# React Optimizations Guidelines

## react-unoptimized branch

When a component is re-rendered, every child and descendent will be also re-rendered **even if no changes are made**. Keep in mind that even though they are re-evaluated, the real DOM **will not be changed if there are no actual changes** (this is what makes React's virtual DOM perfomant). Anyway, re-render these components is a complete waste. 

So we can see this behaviour by clicking the _click to incremental local_ button of the parent component (App). Whenever the button is clicked, the Child component is re-rendered even if no changes are made to its class.

## react-memo branch

React.memo() solves the problem above.

A child component wrapped with React.memo() will not be re-rendered if no changes for its **props** are made.  
So why we don't use React.memo() for every component to optimize them?   
Because this optimization comes with a cost. Every time the component is about to re-render, React compares the prev props (that has stored) with the current props.

So the best use-case for using React.memo() is when we have a huge component tree with many child components.
By stopping the render of one component, you can prevent the re-rendering of N child components.

To use React memo we just need to import it from 'react' and wrap our Child component with it.

### The React.memo() limitation

How is the React.memo() comparison really made?

It's a shallow comparison then it will work only with **primitive values**.
If we pass a callback as a prop to our component, the React.memo() will fail cause it will perform a shallow comparison between the prev function and the re-created one (they are two objects at the end that have two different address in memory).

4. We can use the useCallback() hook.
   useCallback() will save a function of our choice somewhere in React's internal storage and will use the same function object
   when the component re-executes.
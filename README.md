# React Optimizations Guidelines

_This repo has been created by following this video_: <a href="https://www.youtube.com/watch?v=uojLJFt9SzY" target="_blank">REACT MEMO vs USECALLBACK vs USEMEMO</a> _by_ <a href="https://www.youtube.com/@CodingWithChaim" target="_blank">Coding With Chaim</a>

In order to go through the react optimizations step by step, is recommended to follow the order of the branches listed below (this way you will follow the steps of the video)

## 1-react-unoptimized

When a component is re-rendered, every child and descendent will be also re-rendered **even if no changes are made**. Keep in mind that even though they are re-evaluated, the real DOM **will not be changed if there are no actual changes** (this is what makes React's virtual DOM perfomant). Anyway, re-render these components is a complete waste. 

So we can see this behaviour by clicking the _click to incremental local_ button of the parent component (App). Whenever the button is clicked, the Child component is re-rendered even if no changes are made to its class.

## 2-react-memo 

`React.memo()` solves the problem above.

A child component wrapped with `React.memo()` will not be re-rendered if no changes for its **props** are detected.  
So why we don't use `React.memo()` for every component to optimize them?   
Because this optimization comes with a cost. Every time the component is about to re-render React compares the prev props (that has stored) with the current props.

So the best use-case for using `React.memo()` is when we have a huge component tree with many child components.
By stopping the render of one component, you can prevent the re-rendering of N child components.

To use React memo we just need to import it from `react` and wrap our Child component with it.


## 3-break-react-memo 

In this branch I'll show how to break the react memo by just using a callback as a prop of the Child component.

So why do the react memo break if I use a callback?  
To understand it we need to know how the comparison between props is really made.

### The React.memo() limitation

The comparison performed by `React.memo` is a **shallow** comparison, then it will work only with **primitive values**.
If we pass a callback as a prop to our component the `React.memo()` will fail because it will perform a shallow comparison between the prev function and the re-created one and since they're objects they will end up having two different address in memory.

## 4-react-usecallback 

To solve the problem above we can use `useCallback()`.

`useCallback()` will save a function of our choice somewhere in React's internal storage and will use the same function object when the component re-executes.
By doing this, the function will not be re-created so the comparison will be **true** because it will hold the same address in memory.

## 5-react-unoptimized-operation 

Whenever I re-render my component, all my functions get re-executed too.

Let's suppose we have a very large array and a function that calculates the maximum number for this array. Since this would presumably be a very expensive operation, we don't want it to be executed every time our component gets re-rendered.

If we now click the _Click to increment local_ button we can see the getLargestNumber getting executed at every render.

## 6-react-usememo 

Is it possible to memoize (memorize using memo) complex data or other functions?
Yes, by using the `useMemo()` hook.
We can use `useMemo()` to solve the problem we faced before. `useMemo()` will memoize our `getLargestNumber()` function and call it only when a certain dependency changes, in our case the `arr` dependency.

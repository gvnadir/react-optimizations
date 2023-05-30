1. When a component is re-evaluated, every child and descendent will be also re-evaluated EVEN IF NO CHANGES ARE MADE.
   Keep in mind that even though they are re-evaluated, the real DOM will not be changed if there are no actual changes.
   So, re-evaluate these components is a complete waste. Let's find a solution.

2. React.memo() is the solution.
   A child component wrapped with React.memo() will not be re-evaluated if no changes for his PROPS are made.
   So why we don't use React.memo() for every component to optimize them?
   Because this optimization comes with a cost.
   Every time the component is about to re-render, React compares the prev props (that has stored) with the current props.

   So the best use-case for using React.memo() is when we have a huge component tree with a large child components.
   By stopping the render of one component, you can prevent the re-evaluation of N child components.

3. The React.memo() limit:
   How is the React.memo() comparison really made?
   It's a shallow comparison then it will work only with primitive values!
   If we pass a callback as a prop to out component, the React.memo() will fail cause it will perform a shallow comparison between
   the prev function and re-created one (they are two objects at the end) that have two different address in memory.
   How to fix this limit?

4. We can use the useCallback() hook.
   useCallback() will save a function of our choice somewhere in React's internal storage and will use the same function object
   when the component re-executes.
   By doing this, the function will not be re-created so the comparison will be True because it will hold the same address in memory.

5. Is it possible to memoize (memorize using memo) complex data or other functions?
   Yes, by using the useMemo() hook.
   Let's say we have a component with a sort function inside.
   We don't want to re-run it whenever the component is re-evaluated.
   This is a perfect use-case for using useMemo().
   useMemo() will memoize this function and call it only when a certain dependency changes.


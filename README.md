# The amazing cookie clicker

### [Live demo](https://cranky-raman-d1ec70.netlify.com/)

## Design choices

### Styling - `styled-components`

I find `styled-components` to be the most react-y solution to css I have encountered so far. There is of course styling with object attributes, which isn't really css, and leaves out a lot of practical features, such as states on DOM elements (`:hover`, `:focus`, etc.). To remedy this there is then the use of `radium` as a HOC.

External css is the second best solution, with full control over styling. However I still think `styled-components` brings something to the table with the use of passing down props to alter specific attributes, and of course the ability to manage styling as react components.

### Persistency - `localStorage`

The choice between `sessionStorage` and `localStorage` wasn't a big one, however endless persistency seemed slightly more attractive so I went with that.

### Responsiveness - `react-breakpoints`

Simple solution with a root container where the render flow is adjusted to what screen width is currently available.

### Containers / Components

I really like this pattern, and the idea behind it is that you have two types of components. One component is for logic and the other is for display only. This makes for a very straight-to-the-point kind of pattern where only the components who needs to are stateful and subscribe to the react lifecycle.

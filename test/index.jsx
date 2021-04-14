const Favorite = function() {
    return (
        <ul>
            <li>苹果: <input /></li>
            <li>栗子: <input /></li>
        </ul>
    )
}

const App = function() {
    return (
        <div>
            <p>Hello, do you like: </p>
            <Favorite />
        </div>
    )
}

React.render(<App />, document.getElementById("root"));
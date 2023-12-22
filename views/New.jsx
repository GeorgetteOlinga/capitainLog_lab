const React = require("react")
// function New(){
//     return (

class New extends React.Component {
    render () {
        return (
            <div>
                <h1>Enter New Log Page</h1>
                {/* NOTE: action will be the route, method will be the HTTP verb */}
        <form action="/logs" method="POST">
            Title: <input type="text" name="title" /> <br />
            Entry: <textarea name="entry"></textarea> <br />
            Is broken: <input type="checkbox" name="shipIsBroken" /> <br />
            <input type="submit" value="submit"/>
          
        </form>
        </div>
    )
}
}
module.exports = New
/*
    {
        title: "something",
        entry: "today on the ship we hit an asteroid",
        shipIsBroken: true
    }
*/

// <div>
// <h1>New Fruit Page</h1>
// {/* NOTE: action will be the route, method will be the HTTP verb */}
// <form action='/fruits' method="POST">
//     Name: <input type="text" name="name" /><br />
//     Color: < input type="text" name="color"/> <br />
//     Is Ready to Eat: <input type="checkbox" name="readyToEat"/> <br />
//     <input type="submit" value="Create Fruit"/>
// </form>
// </div>
// )
// }
// }
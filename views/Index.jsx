import React from 'react'
//const React = require('react');

class Index extends React.Component {
    render() {
        const { logs } = this.props;
        
        // const logs = this.props.logs;

        return (
            <div>
                <h1>Logs Index Page</h1>
                <nav>
                    <a href="/logs/new">Create a New Log</a>
                </nav>
                <ul>
                    {logs.map((log, i) => {
                        return (
                            <li>
                                <a href={`/logs/${log._id}`}>
                                    {log.title}
                                </a>                                <p>{log.entry}</p> 
                                <span>Ship Condition {log.shipIsBroken ? "BROKEN" : "GOOD"}
                                </span>
                                
                            <br />
                            
                            <a href={`/logs/${log._id}/edit`}> Edit This log </a>
                            <form action={`/logs/${log._id}?_method=DELETE`} method="POST">
                                <input type="submit" value="DELETE" />
                            </form>
                            </li>
                        )
                    })

                    }
                </ul>
            </div>
        )
    }
}

module.exports = Index;










// // /logs

// // we're taking the logs in as a prop
// function Index({ logs }) {


//     function deleteLog(id) {
//         console.log('test')
//         fetch(`/log/delete/${id}`, {
//             method: "DELETE"
//         })
//         .then(()=>{location.reload()})
//     }

//     return (
//         <>
//             <h1>Captain's logs Home page</h1>
//             <a href="/logs/new">Add new log</a>
//             {logs.map((log, i) => {
//                 let shipCondition = log.shipIsBroken ? "BROKEN" : "good"
//                 let shipStyle = {
//                     color: log.shipIsBroken ? 'red' : 'green'
//                 }
//                 return (
//                     <article className='log' key={log._id}>
//                         <h3>{log.title}</h3>
//                         <p>{log.entry}</p>
//                         <div>
//                             Ship condition: <span style={shipStyle}>{shipCondition}</span>
//                         </div>
//                         <a href={`/log/${i}`}>Show log</a>
//                         <br />
//                         <a href={`/logs/edit/${i}`}>Edit log</a>
//                         <br />
//                         {/* 
//                             How am I supposed to add an event listener to this button, when jsx-view-engine doesn't allow react hooks and doesn't allow event handlers? Why are we using this npm package with only 39 weekly downloads?
//                         */}
//                         <button onClick={()=>{deleteLog(log._id)}}>Delete log</button>
//                     </article>
//                 )
//             })}
//         </>
//     )
// }

// module.exports = Index
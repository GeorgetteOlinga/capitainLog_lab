import React from 'react'

// /logs

// we're taking the logs in as a prop
function Index({ logs }) {


    function deleteLog(id) {
        console.log('test')
        fetch(`/log/delete/${id}`, {
            method: "DELETE"
        })
        .then(()=>{location.reload()})
    }

    return (
        <>
            <h1>Captain's logs</h1>
            <a href="/logs/new">Add new log</a>
            {logs.map((log, i) => {
                let shipCondition = log.shipIsBroken ? "BROKEN" : "good"
                let shipStyle = {
                    color: log.shipIsBroken ? 'red' : 'green'
                }
                return (
                    <article className='log' key={log._id}>
                        <h3>{log.title}</h3>
                        <p>{log.entry}</p>
                        <div>
                            Ship condition: <span style={shipStyle}>{shipCondition}</span>
                        </div>
                        <a href={`/log/${i}`}>Show log</a>
                        <br />
                        <a href={`/logs/edit/${i}`}>Edit log</a>
                        <br />
                        {/* 
                            How am I supposed to add an event listener to this button, when jsx-view-engine doesn't allow react hooks and doesn't allow event handlers? Why are we using this npm package with only 39 weekly downloads?
                        */}
                        <button onClick={()=>{deleteLog(log._id)}}>Delete log</button>
                    </article>
                )
            })}
        </>
    )
}

module.exports = Index
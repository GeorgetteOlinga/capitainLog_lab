import React from 'react'

// /logs

// we're taking the logs in as a prop
function Index({ logs }) {

    
    return (
        <>
            <h1>Captain's logs</h1>
            <a href="/logs/new">Add new log</a>
            {logs.map(log => {
                let shipCondition = log.shipIsBroken ? "BROKEN" : "good"
                let shipStyle = {
                    color: log.shipIsBroken ? 'red' : 'green'
                }
                return (
                    <article className='log'>
                        <h3>{log.title}</h3>
                        <p>{log.entry}</p>
                        <div>
                            Ship condition: <span style={shipStyle}>{shipCondition}</span>
                        </div>
                    </article>
                )
            })}
        </>
    )
}

module.exports = Index
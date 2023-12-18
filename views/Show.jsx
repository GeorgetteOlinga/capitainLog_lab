import React from 'react'

export default function Show({ log }) {
    let shipCondition = log?.shipIsBroken ? "BROKEN" : "good"
    let shipStyle = {
        color: log?.shipIsBroken ? 'red' : 'green'
    }
  return (
    <>
        <article className='log'>
            <a href="/logs">Go back</a>
            <h3>{log?.title}</h3>
            <p>{log?.entry}</p>
            <div>
                Ship condition: <span style={shipStyle}>{shipCondition}</span>
            </div>
        </article>
    </>
  )
}
import React from 'react'

export default function Show({ log }) {
    let shipCondition = log?.shipIsBroken ? "BROKEN" : "GOOD"
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
                Ship Condition: <span style={shipStyle}>{shipCondition}</span>
            </div>
        </article>
    </>
  )
}
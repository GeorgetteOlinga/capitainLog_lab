import React from 'react'

export default function Edit({ log }) {

  return (
    <>
        <form method="POST" action={"/logs/" + log._id}>
            Title: <input type="text" name="title" defaultValue={log.title}/> <br />
            Entry: <textarea name="entry" defaultValue={log.entry}></textarea> <br />
            Is broken: <input type="checkbox" name="shipIsBroken" defaultChecked={log.shipIsBroken ? "on" : ""}/> <br />

            {/* hidden input with the log */}
            <input type="text" style={{display:"none"}} value={log._id} name="id" />

            <button>Submit</button>
        </form>
    </>
  )
}

module.exports = Edit
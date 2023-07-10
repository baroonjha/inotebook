import React from 'react'

const Home = () => {
  return (
    <div>
      <h1>Add your notes</h1>
      <form actipn="/">
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Description of notes</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your notes with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      <h1>Your notes</h1>
    </div>
  )
}

export default Home
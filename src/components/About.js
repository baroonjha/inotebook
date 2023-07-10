import React from 'react'
import { useContext,useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
  const a=useContext(noteContext)
  useEffect(() => {
      a.update()
    /* eslint-disable */
  }, [])
  
  return (
    <div>
      <h3> Hi I'm {a.state.name} and I'm studying in {a.state.class} </h3>
    </div>
  )
}

export default About;
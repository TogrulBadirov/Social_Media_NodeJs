import React from 'react'
import "./index.scss"
const Posts = () => {
  return (
    <section id='Posts'>
        <div className="container">
            <div className="post-filter">
                <button className='active'>Following</button>
                <button>Popular</button>
            </div>
        </div>
    </section>
  )
}

export default Posts
import React from 'react'

const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map(part => 
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      )}
      <p><b>total {course.parts.reduce((total, item)=>total+item.exercises,0)}</b></p>
    </div>
  )
}

export default Course

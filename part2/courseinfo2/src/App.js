import Course from './components/Course'

const App = () => {
  const course =[ 
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    },
    {
      id: 2,
      name: 'Node.js', 
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ] 


  return(
    <div>
      {course.map(
        (item) =>
          <div key={item.id}>
            <Course course={item}/>
          </div>
      )}
    </div>
  )
}

export default App

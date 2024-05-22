import axios from 'axios';
import { useEffect, useState } from 'react';
import Exercise from './Exercise.js'


export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);  
  
  useEffect(() => {
    axios.get('http://localhost:5000/exercises/')
      .then(res => {
        setExercises(res.data)
      })
      .catch(error => console.log(error));
  }, [exercises])
  
  function handleDelete(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(res => {console.log(res.data)})
      .catch(error => console.log(error.response.data));
    
    setExercises(exercises.filter(e => e.id !== id));
  }

  return (
    <>
      <h3>Logged Exercises</h3>
      <table className='table'>
        <thead className='thead-light'> 
          <tr>
            <th>Username:</th>
            <th>Description:</th>
            <th>Duration:</th>
            <th>Date:</th>
            <th>Actions:</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((e, index) => {
            return (
              <tr key={index}>
                <Exercise
                  exercise={e}
                  deleteExercise={handleDelete}
                  id={e._id}
                />
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
import { Link } from "react-router-dom"
import '../App.css';

export default function Exercise({ exercise, deleteExercise, id }) {
  return (
    <>
      <td>{exercise.userName}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date.substring(0, 10)}</td>
      <td>
        <Link style={{color: '#0000EE'}} to={'/edit/' + id}>Edit</Link> |
        <button 
          onClick={() => 
            deleteExercise(id)
          }
          className="delete--button"
        >
          Delete
        </button>
      </td>
    </>
  )
}